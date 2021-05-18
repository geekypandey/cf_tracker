import os
import json
import time

import requests
from bs4 import BeautifulSoup as bs


class BlacklistError(Exception):
    pass


def get_all_contests():
    url = "https://codeforces.com/api/contest.list"
    res = requests.get(url)
    if res.status_code != 200:
        raise RuntimeError(f"Request status code : {res.status_code}. Try again!")
    res = res.json()
    if res["status"] != "OK":
        raise RuntimeError(f"Response from codeforces, status: {res['status']}")
    contests = res["result"]
    return contests


def filter_contests(contests, completed=True):
    if completed:
        contests = [contest for contest in contests if contest["phase"] != "BEFORE"]
    else:
        contests = [contest for contest in contests if contest["phase"] == "BEFORE"]
    return contests


def get_unprocessed_contests(contests, processed_contests):
    if not processed_contests:
        return contests
    processed_ids = {contest["contestId"] for contest in processed_contests}
    contests = [contest for contest in contests if contest["id"] not in processed_ids]
    return contests


def remove_blacklisted(contests, blacklisted):
    if not blacklisted:
        return contests
    contests = [contest for contest in contests if contest["id"] not in blacklisted]
    return contests


def get_processed_and_blacklisted_contests(filename):
    if not os.path.exists(filename):
        return []
    with open(filename) as f:
        result = json.load(f)
    return (result.get("contests", []), result.get("blacklisted", []))


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


def get_problems(contest):
    idx = contest["id"]
    url = "https://codeforces.com/contest/" + str(idx)
    res = requests.get(url)
    if res.status_code != 200:
        raise RuntimeError(f"Request status code: {res.status_code}")
    soup = bs(res.text, "html.parser")
    problems = []
    try:
        trs = soup.find("table", {"class": "problems"}).find_all("tr")[1:]
        for tr in trs:
            index = tr.find("td").text.strip()
            solvedCount = tr.find(
                "a", {"title": "Participants solved the problem"}
            ).text.strip()[1:]
            p = {"index": index, "solvedCount": solvedCount}
            problems.append(p)
    except Exception:
        raise BlacklistError(f"{idx} is blacklisted")
    return problems


def process_contests(contests):
    contest_data = []
    blacklisted = []
    fields = ["id", "name", "startTimeSeconds"]
    as_fields = ["contestId", "name", "startTimeSeconds"]
    for idx, contest in enumerate(contests, start=1):
        print(idx, contest["id"])
        time.sleep(0.2)
        c = get_required_fields(contest, fields=fields, as_fields=as_fields)
        c["div"] = get_contest_division(contest)
        try:
            c["problems"] = get_problems(contest)
        except BlacklistError:
            blacklisted.append(contest["id"])
            continue
        contest_data.append(c)
    return (contest_data, blacklisted)


if __name__ == "__main__":
    filename = "contests.json"
    contests = get_all_contests()
    contests = filter_contests(contests, completed=True)

    processed_contests, blacklisted = get_processed_and_blacklisted_contests(filename)

    contests = get_unprocessed_contests(contests, processed_contests)
    contests = remove_blacklisted(contests, blacklisted)

    if not contests:
        print('No new contests for processing. Done.')
        exit(1)

    print(f'Processing {len(contests)} new contests')
    new_contests, new_blacklisted = process_contests(contests)

    print(f'Processed! {len(new_contests)} added and {len(new_blacklisted)} blacklisted.')

    contests = processed_contests + new_contests
    blacklisted = blacklisted + new_blacklisted

    json_data = {"contests": contests, "blacklisted": blacklisted}

    with open(filename, "w") as f:
        json.dump(json_data, f)
