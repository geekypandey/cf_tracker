#!/usr/bin/env sh

set -e

npm run build

cd dist
echo "cf-tracker.tech" > CNAME

git init .
git add -A
git commit -m 'deploy'

git push -f git@github.com:geekypandey/cf_tracker.git master:gh-pages

cd -
