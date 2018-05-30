#!/bin/bash

echo $DOTENV | base64 --decode > .env
yarn
yarn build
