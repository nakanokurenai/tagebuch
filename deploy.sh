#!/bin/bash

source loadenv.sh

./templates/firestore.rules.sh > $PWD/firestore.rules
./templates/storage.rules.sh > $PWD/storage.rules

firebase deploy --project $PROJECT_ID "$@"
