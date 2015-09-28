#!/usr/bin/env bash

set -e

jspm config registries.github.auth $JSPM_AUTH
jspm registry create bower jspm-bower-endpoint -y
jspm install -y
tsd install
npm install -g karma-cli