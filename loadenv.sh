#!/bin/bash

loadenv () {
  for i in `cat $1`
  do
    export $i
  done
}

loadenv $PWD/.env
