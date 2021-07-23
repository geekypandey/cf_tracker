from datetime import datetime, timedelta

from github import Github

if __name__ == '__main__':
    g = Github()
    repo = g.get_repo('geekypandey/cf_tracker')
    last_modified = repo.last_modified
    dformat = '%a, %d %b %Y %H:%M:%S %Z'

    # dt = datetime.strptime(last_modified, dformat) + timedelta(hours=5, minutes=30)

    # on the machine where the code is running the timezone used is UTC
    dt = datetime.strptime(last_modified, dformat)
    now = datetime.now()
    diff = now - dt
    minutes = diff.total_seconds()//(60)
    print(f'Minutes to last modified is: {minutes}')
    if minutes > 60:
        exit(1)
