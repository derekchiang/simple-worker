# simple-worker

Pain-free web worker utilities.

## What are web workers?

Simply put, web workers are a HTML5 standard that allow you to run computationally intensive JS code in new threads, therefore keeping your user interface responsive.

`simple-worker` makes using web workers super-simple.

## Usage

Include the script first, of course.

To run a function once:

```javascript
function intensiveFunction(n) {
  // Long computations...

  // instead of returning, use `postMessage`
  postMessage(result);
}

SimpleWorker.run({
  func: intensiveFunction,
  args: [123456],
  success: function(res) {
  	// do whatever you want
  },
  error: function(err) {
  	// do whatever you want
  }
})
```

Create a worker for later use:

```javascript
var worker = new SimpleWorker({
  func: intensiveFunction,
  success: function(res) {
  	// do whatever you want
  },
  error: function(err) {
  	// do whatever you want
  }
})

// Run however many times your want
worker.run(123456)
worker.run(999999)

// Close the worker when you don't need it anymore
worker.close()
```

## A Complete Example

Excerpt from `demo/`

```javascript
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

// Run once

SimpleWorker.run({
  func: fibo,
  args: [123],
  success: function(res) {
    console.log(res);
  },
  error: function(err) {
    console.log(err);
  }
});

// Create a worker for later use

var fiboWorker = new SimpleWorker({
  func: fibo,
  success: function(res) {
    console.log(res);
  },
  error: function(err) {
    console.log(err);
  }
});

fiboWorker.run(123);
fiboWorker.run(456);
```

## Run Demo

Simple open up `demo/client/index.html` in your browser.

Or, if you prefer to run it via a server:

1. CD into `demo/`
2. `npm install`
3. `node server.js`
4. Go to localhost:8000

## Know Restrictions

The following restrictions apply to the function that you give to `SimpleWorker` to run:

1. Closures won't work.  Web workers have to be run in their own isolated environments; therefore you need to make sure your function does not make use of anything outside of its body.

2. Simicolons are not optional.  You need to make sure you use simicolons to separate statements in your function; otherwise weird bugs might occur.

And of course, `simple-worker` only works in browsers that support web workers.  Check out the table at [this page](https://developer.mozilla.org/en-US/docs/Web/Guide/Performance/Using_web_workers) for the list of browsers.

## License

[WTFPL](http://www.wtfpl.net/about/).
