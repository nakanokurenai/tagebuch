#!/bin/bash

echo $DOTENV | base64 --decode > .DOTENV
yarn
yarn build
