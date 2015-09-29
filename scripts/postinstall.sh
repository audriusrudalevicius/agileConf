#!/usr/bin/env bash
set -e
JSPM_GITHUB_AUTH_TOKEN=${VARIABLE:=GITHUB_AUTH_TOKEN}
npm install -g jspm
npm install -g jspm-bower-endpoint
jspm cc
jspm config registries.github.auth $JSPM_GITHUB_AUTH_TOKEN
jspm registry create bower jspm-bower-endpoint -y
jspm install -y
tsd install
npm install -g karma-cli