import os
import json
import time


import requests
from bs4 import BeautifulSoup as bs

url = 'https://codeforces.com/api/contest.list'

res = requests.get(url)
res = res.json()
contests = res['result']


def get_problem_index(idx):
    url = 'https://codeforces.com/contest/' + str(idx)
    print(url)
    res = requests.get(url)
    soup = bs(res.text, 'html.parser')
    index = []
    try:
        trs = soup.find('table', {'class': 'problems'}).find_all('tr')[1:]
        for tr in trs:
            index.append(tr.find('td').text.strip())
    except:
        return []
    return index


result = []
completed_results = []
if os.path.exists('contests.json'):
    with open('contests.json') as f:
        completed_results = json.load(f)['contests']


def get_unprocessed_contests():
    for contest in contests:
        if contest['phase'] == 'BEFORE':
            continue
        if all(contest['id'] != cc['contestId'] for cc in completed_results):
            yield contest


for idx, contest in enumerate(get_unprocessed_contests()):
    print(idx, end=' ')
    time.sleep(0.2)
    c = {}
    c['contestId'] = contest['id']
    c['name'] = contest['name']
    c['startTimeSeconds'] = contest['startTimeSeconds']
    c['index'] = get_problem_index(contest['id'])
    c['div'] = ''
    if contest['name'].find('Educational') >= 0:
        c['div'] = 'E'
    elif contest['name'].find('Div. 1') >= 0:
        c['div'] = '1'
    elif contest['name'].find('Div. 2') >= 0:
        c['div'] = '2'
    elif contest['name'].find('Div. 3') >= 0:
        c['div'] = '3'
    result.append(c)

result.extend(completed_results)

contests = {"contests": result}

with open('contests.json', 'w') as f:
    json.dump(contests, f)
