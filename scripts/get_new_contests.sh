#!/usr/bin/bash

if [[ -z "${VIRUTAL_ENV}" ]]; then
	python="${VIRTUAL_ENV}/bin/python"
fi

echo "Running Python script!"
python get_contests.py

echo "Copying contests.json to ../src/data/contests.json"
cp contests.json ../src/data/contests.json
