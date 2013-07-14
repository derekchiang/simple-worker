"use strict";

(function() {
  function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  this.SimpleWorker = function(options) {
    var func, args, handler, errHandler, runOnce

    func = options['func']

    if (!isFunction(func)) {
      throw new Error('`func` needs to be a function.')
    }

    args = options['args']
    handler = options['success'] || function() {}
    errHandler = options['error'] || function() {}
    runOnce = options['runOnce'] || false

    function setupOnMessage() {
      onmessage = function(e) {
        if (e.data.type == '__args') {
          __func.apply(this, e.data.args)
        }
      }
    }

    var funcString

    funcString = 'data:text/javascript;charset=US-ASCII,var __func = ' + func.toString() + ';'
    funcString += '(' + setupOnMessage.toString() + ').call(this);'

    var worker = new Worker(funcString)

    worker.onmessage = function(e) {
      handler(e.data)
      if (runOnce) worker.terminate()
    }

    worker.onerror = function(e) {
      errHandler(e)
    }

    this.run = function() {
      worker.postMessage({
        type: '__args',
        args: Array.prototype.slice.call(arguments)
      })
    }

    this.close = function() {
      worker.terminate()
    }

    if (args !== undefined) this.run.apply(this, args)
  }

  this.SimpleWorker.run = function(options) {
    options['runOnce'] = true
    new SimpleWorker(options)
  }
}).call(this)