#!/usr/bin/env bash

set -e
npm install -g jspm
npm install -g jspm-bower-endpoint
jspm config registries.github.auth 882b9846a385f451ff0b828804f9d1c22313a8a5
jspm registry create bower jspm-bower-endpoint -y
jspm install -y
tsd install
npm install -g karma-cli