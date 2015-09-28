#!/usr/bin/env bash

set -e

jspm config registries.github.auth $JSPM_GITHUB_AUTH_TOKEN
jspm registry create bower jspm-bower-endpoint -y
jspm install -y
tsd install
npm install -g karma-cli