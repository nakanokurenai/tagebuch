#!/bin/bash

loadenv () {
  for i in `cat $1`
  do
    export $i
  done
}

loadenv $PWD/.env

./templates/firestore.rules.sh > $PWD/firestore.rules
./templates/storage.rules.sh > $PWD/storage.rules

firebase deploy --project $PROJECT_ID "$@"
