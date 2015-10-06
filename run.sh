#!/usr/bin/env bash
fuser -k -n tcp 1234
sleep 1
python ./server.py &
./node_modules/.bin/electron .
fuser -k -n tcp 1234