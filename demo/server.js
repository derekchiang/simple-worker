#!/usr/bin/env node

"use strict"

var connect = require('connect')
var path = require('path')

connect.createServer(
  connect.static(path.join(__dirname, 'client'))
).listen(8000)

console.log('Listening at http://localhost:8000')