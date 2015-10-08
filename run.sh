#!/usr/bin/env bash
python ./server.py &
./node_modules/.bin/electron .
fuser -k -n tcp 1234