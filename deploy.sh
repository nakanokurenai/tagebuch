#!/bin/bash

loadenv () {
  for i in `cat $1`
  do
    export $i
  done
}

loadenv $PWD/.env

./templates/firestore.rules.sh > firestore.rules
./templates/storage.rules.sh > storage.rules
