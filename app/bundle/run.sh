#!/usr/bin/env bash
export MONGO_URL='mongodb://localhost:27017/thianco-iso'
export ROOT_URL='http://localhost:3000/'
export MAIL_URL='smtp://user:password@localhost:3000/'
export PORT=3000
node main.js
