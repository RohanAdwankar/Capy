#!/bin/bash

if [ ! -f .env ]; then
  echo "ERROR: please create .env and set MONGO_URI"
  exit 1
fi

if [ ! -d node_modules ]; then
    npm install
fi

if [ "$1" == "-b" ]; then
    npm run build
fi

node server/server.js