import os
import json
import time
import itertools

import requests
import pandas as pd
import numpy as np


class BlacklistError(Exception):
    pass

def get_all_contests():
    """Fetch all the contests using codeforces api"""
    url = "https://codeforces.com/api/contest.list"
    res = requests.get(url)
    if res.status_code != 200:
        raise RuntimeError(f"Request status code : {res.status_code}. Try again!")
    res = res.json()
    if res["status"] != "OK":
        raise RuntimeError(f"Response from codeforces, status: {res['status']}")
    return res["result"]


def get_required_fields(contest, fields, as_fields):
    return {key: contest[field] for key, field in zip(as_fields, fields)}


def get_contest_division(contest):
    div = ""
    if contest["name"].find("Educational") >= 0:
        div = "E"
    elif contest["name"].find("Div. 1") >= 0:
        div = "1"
    elif contest["name"].find("Div. 2") >= 0:
        div = "2"
    elif contest["name"].find("Div. 3") >= 0:
        div = "3"
    return div


def replace_nan(x):
    if isinstance(x, str):
        return x
    if np.isnan(x):
        return None
    return x


def strip_x(x: str):
    if not isinstance(x, str):
        return x
    return x.strip('x').strip()


def get_problems(contest):
    idx = contest['id']
    url = f'https://codeforces.com/contest/{idx}'
    df = pd.read_html(url)[1]
    if 'Name' not in df.columns:
        raise BlacklistError(f'{idx} is blacklisted')
    df.dropna(axis=1, how='all', inplace=True)
    columns = ['idx', 'name', 'solved_count']
    df.columns = [columns[i] for i in range(len(df.columns))]
    indices = [str(val) for val in df['idx'].values]
    solved_count = []
    if 'solved_count' in df.columns:
        df['solved_count'] = df['solved_count'].apply(strip_x)
        solved_count = df['solved_count'].apply(replace_nan).values
    problems = [{"index": idx, "solvedCount": count} for idx, count in itertools.zip_longest(indices, solved_count)]
    return problems


def process_contests(contests):
    contest_data = []
    blacklisted = set()
    fields = ["id", "name", "startTimeSeconds"]
    as_fields = ["contestId", "name", "startTimeSeconds"]
    for idx, contest in enumerate(contests, start=1):
        time.sleep(0.2)
        c = get_required_fields(contest, fields=fields, as_fields=as_fields)
        c["div"] = get_contest_division(contest)
        try:
            c["problems"] = get_problems(contest)
        except BlacklistError:
            print(f"{idx} : {contest['id']} blacklisted!")
            blacklisted.add(contest["id"])
            continue
        contest_data.append(c)
        print(f"{idx} : {contest['id']} completed!")
    return (contest_data, blacklisted)


if __name__ == "__main__":
    FILENAME = "contests.json"

    # get all contests
    contests = get_all_contests()

    # select only completed ones
    contests = [contest for contest in contests if contest['phase'] != 'BEFORE']

    # remove processed contests
    processed_ids = {}
    blacklisted = {}
    if os.path.exists(FILENAME):
        with open(FILENAME) as f:
            result = json.load(f)
        processed_contests = result.get('contests', [])
        processed_ids = {contest['contestId'] for contest in processed_contests}
        blacklisted_ids = {idx for idx in result.get('blacklisted', [])}

    # select unprocessed contests
    contests = [contest for contest in contests if contest['id'] not in processed_ids]

    # filter blacklisted contests out, if TRY_BLACKLISTED env variable is not set
    if not os.environ.get('TRY_BLACKLISTED'):
        contests = [contest for contest in contests if contest['id'] not in blacklisted_ids]

    if not contests:
        print('No contests for processing')
        exit(1)

    print(f'Processing {len(contests)} new contests')
    new_contests, new_blacklisted_ids = process_contests(contests)

    print(f'Processed! {len(new_contests)} added and {len(new_blacklisted_ids)} blacklisted.')

    contests = processed_contests + new_contests
    blacklisted_ids =  blacklisted_ids.union(new_blacklisted_ids)

    contests_ids = {contest['contestId'] for contest in contests}

    blacklisted_ids = [idx for idx in blacklisted_ids if idx not in contests_ids]

    json_data = {"contests": contests, "blacklisted": blacklisted_ids}

    with open(FILENAME, "w") as f:
        json.dump(json_data, f)
