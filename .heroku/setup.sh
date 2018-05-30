#!/bin/bash

echo $DOTENV | base64 --decode > .DOTENV
npm run build
