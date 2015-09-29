#!/usr/bin/env bash
npm install -g jspm
npm install -g jspm-bower-endpoint
jspm config registries.github.auth $GITHUB_AUTH_TOKEN
jspm registry create bower jspm-bower-endpoint -y
jspm install -y
tsd install
npm install -g karma-cli
npm install -g gulp
