#!/usr/bin/bash

set -e

if [[ -z "${VIRUTAL_ENV}" ]]; then
	python="${VIRTUAL_ENV}/bin/python"
fi

echo "Running Python script!"
if python get_contests.py; then
	echo "Copying contests.json to ../src/data/contests.json"
	cp contests.json ../src/data/contests.json
else
	exit 1
fi

