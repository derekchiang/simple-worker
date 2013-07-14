"use strict";

(function() {

  function fibo(n) {
    function fiboHelper(m, a, b) {
      if (m < n) {
        var k = a + b;
        a = b;
        b = k;
        return fiboHelper(++m, a, b);
      } else {
        return a;
      }
    }
    postMessage(fiboHelper(0, 0, 1));
  }

  $('#input').val(123)

  SimpleWorker.run({
    func: fibo,
    args: [123],
    success: function(res) {
      $('#result').text(res)
    },
    error: function(err) {
      console.log(err)
    }
  })

  var fiboWorker = new SimpleWorker({
    func: fibo,
    success: function(res) {
      $('#result').text(res)
    },
    error: function(err) {
      console.log(err)
    }
  })

  $('#run').click(function() {
    fiboWorker.run($('input').val())
  })

}).call(this)