"use strict"

var connect = require('connect')
var path = require('path')

connect.createServer(
  connect.static(path.join(__dirname, 'client'))
).listen(8000)