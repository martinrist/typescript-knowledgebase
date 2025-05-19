# Asynchronous JavaScript

## Contents
<!-- TOC -->
- [Asynchronous JavaScript](#asynchronous-javascript)
  - [Contents](#contents)
  - [Overview](#overview)
  - [Async Programming with Callbacks](#async-programming-with-callbacks)
  - [Promises](#promises)
    - [Overview \& Motivation](#overview--motivation)
    - [Using Promises](#using-promises)
    - [Promise Terminology](#promise-terminology)
    - [Making Promises](#making-promises)
    - [Chaining Promises](#chaining-promises)
    - [Resolving Promises](#resolving-promises)
    - [Promises and Errors](#promises-and-errors)
    - [Promises in Parallel](#promises-in-parallel)
  - [`async` \& `await`](#async--await)
  - [Asynchronous Iteration](#asynchronous-iteration)
<!-- TOC -->

## Overview

- Asynchronous programming in JavaScript can be achieved using various features:
    - _Callbacks_ - functions that are written and passed to another function.
      That other function then invokes ('calls back') to your function when
      some condition is met or some async event occurs.
    - _Promises_ - new in ES6 - objects that represent the 'not-yet-available'
      result of an asynchronous operation.
    - `async / await` - new in ES2017 - provide new syntax that simplifies
      Promise-based code to look more like synchronous code.
    - _Asynchronous iterators and `for / await` - new in ES2018 - allows working
      with streams of async events using loops that appear synchronous.



## Async Programming with Callbacks

- One of the simplest types of asynchrony is to run code after a period of time,
  using `setTimeout()`, or repeatedly, using `setInterval()`:

    ```javascript
    // Call the `checkForUpdates` callback function after 60 seconds
    setTimeout(checkForUpdates, 60000);

    // Call the `checkForUpdates` callback function every minute
    const updateIntervalId = setInterval(checkForUpdates, 60000);

    // `setInterval()` returns an identifier that can be used to stop
    // the repeated invocations:
    function stopCheckingForUpdates() {
        clearInterval(updateIntervalId);
    }
    ```

- Client-side JavaScript programs are almost universally event-driven:
    - Callback functions are registered as _event handlers_ or _event
      listeners_.
    - These are registered using `addEventListener()`.

- Another common source of asynchrony is network requests, where data can be
  retrieved over the network, and a callback function registered to handle the
  response, or errors.

- Node defines many APIs that use callbacks and events, e.g. reading files:

    ```javascript
    const fs = require("fs");
    const options = { };

    fs.readFile("config.json", "utf-8", (err, text) => {
        if (err) {
            // there was an error reading the file
        } else {
            // parse the file contents
            Object.assign(options, JSON.parse(text));
        }
    })
    ```



## Promises

### Overview & Motivation

- A _Promise_ is an object that represents the result of an asynchronous
  computation:
    - The result may or may not be ready yet, and the API is intentionally
      vague about this.

- There is no way to synchronously get the value of a Promise:
    - All you can do is ask the Promise to call a callback function when the
      value is ready.

- Promises are a key way to avoid _callback hell_ - where callbacks become
  deeply-nested to handle chains of async calls:
    - With Promises, these are turned into a _promise chain_ which looks more
      linear.

- Another problem with callbacks is that they make error handling more complex:
    - If an async function throws an exception, there's no way for that
      exception to get propagated back to the initiator of the async operation.
    - This is a fundamental issue - async programming breaks exception handling.
    - Promises help by standardising a way to handle errors, providing a way
      for errors to propagate correctly through a promise chain.

- Note that Promises _cannot_ be used to represent repeated asynchronous
  operations - they only represent the future result of a single async
  operation.


### Using Promises

- To use a Promise-returning function (e.g. `getJSON()`), call `then()` and
  pass a callback to be asynchronously invoked:

    ```javascript
    getJSON(url).then(jsonData => {
        // This is the callback function that will get
        // invoked asynchronously
    })
    ```

- `then()` is a callback registration method like `addEventListener()` for
  registering event handlers in client-side JavaScript.

- It's idiomatic to append `.then()` directly to the function invocation that
  returns the Promise, rather than assigning the Promise object to an
  intermediate variable.


### Promise Terminology

- A Promise is said to be:
    - _Fulfilled_ if and when the first callback passed to `then()` is called.
    - _Rejected_ if and when the second callback passed to `then()` is called.
    - _Settled_ if it is either _fulfilled_ or _rejected_.
    - _Pending_ if it is neither _fulfilled_ or _rejected_.

- Some key points:
    - A Promise can never be both _fulfilled_ and _rejected_.
    - Once a Promise is _settled_ it can never change from _fulfilled_ to
      _rejected_, or vice versa.

- Any Promise that is _settled_ has a value associated with it:
    - If it is _fulfilled_, that value is the return value that gets passed to
      the callback.
    - If it is _rejected_, that value is an error that is passed to any callback
      function registered with `catch()`, or the second argument to `then()`.


### Making Promises

- There are various ways of writing functions that return Promises, depending
  on whether you have an existing Promise, an existing synchronous value, or
  need to create the Promise from scratch.

- If you already have an existing Promise-returning function, you can always
  create and return a new one by calling `.then()`, e.g.:

    ```javascript
    function getJSON(url) {

        return fetch(url)
            // `response.json()` returns a Promise which is returned by `getJSON`
            // when this Promise fulfils, the returned Promise fulfils to the
            // same value.
            .then(response => response.json());
    }
    ```

- If you need to return a Promise, but the computation doesn't require any async
  operations (or has a branch that doesn't need it), use `Promise.resolve()` or
  `Promise.reject()`:
    - `Promise.resolve()` takes a value as its argument and returns a Promise
      that is immediately (but asynchronously) _fulfilled_ with that value.
    - `Promise.reject()` takes a single value as its argument and returns a
      Promise that is immediately rejected with that value as the reason.
    - Note that a _resolved_ Promise isn't the same as a _fulfilled_ or
      `rejected_ one - if you pass a Promise `p1` to `Promise.resolve()` it
      returns a new Promise `p2` which is _immediately_ resolved, but will
      not be fulfilled or rejected until `p1` is fulfilled or rejected.

- If you need to write a Promise from scratch, you can use the `Promise()`
  constructor and pass a function as its argument:
    - Function expects two parameters, conventionally named `resolve` and
      `reject`.
    - Constructor calls in the passed function _synchronously_, then returns
      the newly-created Promise.
    - Your function should perform some async work, then call `resolve` to
      resolve or fulfil the returned Promise, or `reject` to reject it.

- Example:

    ```javascript
    function wait(duration) {
        // Create and return a new Promise
        return new Promise((resolve, reject) => { // These control the Promise
            // If the argument is invalid, reject the Promise
            if (duration < 0) {
                reject(new Error("Time travel not yet implemented"));
            }
            // Otherwise, wait asynchronously and then resolve the Promise.
            // setTimeout will invoke resolve() with no arguments, which means
            // that the Promise will fulfill with the undefined value.
            setTimeout(resolve, duration);
        });
    }
    ```


### Chaining Promises

- Promises can be _chained_ to express a sequence of asynchronous operations as
  a linear chain of `then()` invocations, e.g.:

    ```javascript
    fetch(documentURL)                      // Make an HTTP request
        .then(response => response.json())  // Ask for the JSON body of the response
        .then(document => {                 // When we get the parsed JSON
            return render(document);        // display the document to the user
        })
        .then(rendered => {                 // When we get the rendered document
            cacheInDatabase(rendered);      // cache it in the local database.
        })
        .catch(error => handle(error));     // Handle any errors that occur
    ```

- In some cases, the next steps will then also return a Promise, because they
  introduce further asynchrony.  But we want to avoid the nesting that callbacks
  introduce - i.e. the following is non-idiomatic:

    ```javascript
    fetch("/api/user/profile").then(response => {
        response.json().then(profile => {  // Ask for the JSON-parsed body
            // When the body of the response arrives, it will be automatically
            // parsed as JSON and passed to this function.
            displayUserProfile(profile);
        });
    });
    ```

- Instead we should use the Promises in a sequential _Promise chain_ -

    ```javascript
    fetch("/api/user/profile")
        .then(response => {
            return response.json();
        })
        .then(profile => {
            displayUserProfile(profile);
        });
    ```

- Note that, whereas in normal method chaining (of the form `a().b().c()`), each
  method typically uses `this` to return the original object each time:
    - However, with _Promise chaining_ each clal to `then()` returns a new
      Promise object, which isn't fulfilled until the function passed to
      `then()` is complete.


### Resolving Promises

- When you pass a callback `c` to the `then()` method, `then()` returns a
  Promise `p` and arranges to asynchronously invoke `c` at some later time:
    - The callback `c` performs some computation and returns a value `v`.
    - When the callback `c` returns, `p` is said to be _resolved_ with that
      value `v`.

- When a Promise is _resolved_ with a value `v` that is not itself a Promise,
  then the Promise is immediately _fulfilled_ with that value `v`.

- However, if the return value `v` is itself Promise, then `p` is _resolved_
  but not fulfilled:
    - `p` cannot _settle_ (either be _fulfilled_ or _rejected_) until `v` has
      also _settled_.
    - If `v` is _fulfilled_, `p` is then _fulfilled_ to the same value.
    - If `v` is _rejected_, `p` is then _rejected_ with the same error.

- This is the essence of _resolved_ Promises - `p` has beomce associated with,
  or locked on to another Promise:
    - We don't yet know whether `p` will be _fulfilled_ or _rejected_, but its
      fate is now entirely dependent on the Promise `v`.


### Promises and Errors

- Because the async work in a Promise is carried out after the Promise returns,
  the computation can't signal an error by throwing and exception.  Instead, one
  option is to pass a second function to `then()`, which is the error handler
  callback, e.g.:

    ```javascript
    getJSON(url).then(displayUserProfile, handleProfileError);
    ```

- An alternative, more idiomatic approach is to use the `.catch()` method.
  With this approach, `handleProfileError` handles any errors arising in
  _either_ `getJSON()` _or_ `displayUserProfile()`:

    ```javascript
    getJSON(url)
        .then(displayUserProfile)
        .catch(handleProfileError);
    ```

- In ES2018, Promise objects also define a `finally()` method with a callback
  that _always_ runs when the Promise to which it is attached _settles_ (either
  through fulfilment or rejection).

- `catch()` can be used midway through a Promise chain, where it will catch
  errors arising earlier in the chain.

- Once an error has been passed to a `catch()` callback, it stops propagating
  down the chain, e.g.:

    ```javascript
    startAsyncOperation()
        .then(doStageTwo)
        // This will catch errors in `startAsyncOperation()` and `doStageTwo`
        .catch(recoverFromStageTwoError)
        // Errorsfrom `startAsyncOperation() and `doStageTwo` don't get past here
        .then(doStageThree)
        .then(doStageFour)
        // This only catches errors in `doStageThree` and `doStageFour`
        .catch(logStageThreeAndFourErrors);
    ```


### Promises in Parallel

- To execute a number of async operations in parallel, we can use the function
  `Promise.all()`:
    - Takes an array of Promise objects and returns a Promise.
    - Returned Promise is _rejected_ if any of the original Promises are
      _rejected_.
    - Otherise, returned Promise is fulfilled with an array of the fulfillment
      values of the original Promsies.

- Example:

    ```javascript
    const urls = [ /* zero or more URLs here */ ];
    // And convert it to an array of Promise objects
    promises = urls.map(url => fetch(url).then(r => r.text()));

    // Now get a Promise to run all those Promises in parallel
    Promise.all(promises)
        .then(bodies => { /* do something with the array of strings */ })
        .catch(e => console.error(e));
    ```

- Arguments to `Promise.all()` can be a mixture of Promise and non-Promise
  values:
    - If an element is a non-Promise, it's treated as if it's an
      already-fulfilled Promise with that value.

- As an alternative to rejecting when the first rejection occurs, ES2020
  introduces `Promise.allSettled()`:
    - Never rejects the returned Promise.
    - Fulfils returned Promise once all Promises have _settled_.
    - Each returned object has a `status` property set to `fulfilled` or
      `rejected`.
    - `status === 'fufilled'` - has a `value` property with the fulfilled value.
    - `status === 'rejected'` - has a `reason` property iwth the rejection value.

- As another alternative, to settle the returned Promise as soon as the first
  dependent Promise settles, use `Promise.race()`.



## `async` & `await`

- ES2017 introduces the `async` and `await` keywords to simplify the use of
  Promise-based code:
    - Allows us to write Promise-based asynchronous code that looks like
      synchronous, linear code.

- The `await` keyword takes a Promise and turns it back into a return value
  or a thrown exception:
    - Given a Promsie object `p`, the expression `await p` waits until `p`
      _settles_.
    - If `p` _fulfills_, the value of `await p` is the fulfillment value of `p`.
    - If `p` is _rejected_, then `await p` throws the rejection value of `p`.

- Example of `await`:

    ```javascript
    const response  = await fetch('/api/user/profile');
    const profile = await response.json();
    ```

- Note that `await` doesn't block - the code remains asynchronous and
  non-blocking.

- `await` can only be used inside functions that have been declared asynchronous
  using the `async` keyword in the function definition:

    ```javascript
    async function getHighScore() {
        const response  = await fetch('/api/user/profile');
        const profile = await response.json();
        return profile.highScore;
    }
    ```

- At the top-level, to call a nest of `async` functions from a synchronous
  context, we need to use a normal Promise, with `then()` and a callback
  function:

    ```javascript
    getHighScore()
        .then(displayHighScore)
        .catch(console.error);
    ```

- To await multiple Promises, use the following idiom:

    ```javascript
    // This is the function to call
    async function getJSON(url) {
        const response = await fetch(url);
        const body = await response.json();
        return body;
    }

    // This would make the two calls sequentially:
    const value1 = await getJSON(url1);
    const value2 = await getJSON(url2);

    // This approach runs the two calls in parallel:
    const [value1, value2] = await Promise.all([getJSON(url1), getJSON(url2)]);
    ```



## Asynchronous Iteration

- _Asynchronous Iterators_ are like normal iterators, but are Promise-based, and
  intended for use with a new form of the `for / of` loop:

    ```javascript
    const fs = require('fs');

    async function parseFile(filename) {
        let stream = fs.createReadStream(filename, { encoding: "utf-8"});
        for await (let chunk of stream) {
            parseChunk(chunk); // Assume `parseChunk()` is defined elsewhere
        }
    }
    ```

- Rough operation:
    - The asynchronous iterator produces a Promise.
    - The `for / await` loop waits for that Promise to fulfill, assigns the
      fulfillment value to the loop variable and executes the loop body.
    - Then starts again, getting another Promise from the iterator.

- Example:

    ```javascript
    // Fetch a list of URLs
    const urls = [url1, url2, url3];
    const promises = urls.map(url => fetch(url));

    // Iterate through using the traditional iterator:
    for(const promise in promises) {
        response = await promise;
        handle(response);
    }

    // Better version with `for / await`:
    for await (const reposne of promises) {
        handle(response);
    }
    ```

- Async iterators are similar to synchronous iterators with the following
  differences:
    - An asynchronously iterable object implements a method with the symbolic
      name `Symbol.asyncIterator` instead of `Symbol.iterator`.
    - The `next()` method returns a Promise that resolves to an iterator
      result object instead of returning the result object directly.

- Similar to synchronous iterators, we can implement asynchronous iterators
  using _asynchronous generators_ - declared using `async function*`.

- Example asynchronous generator:

    ```javascript
    // A Promise-based wrapper around setTimeout() that we can use await with.
    // Returns a Promise that fulfills in the specified number of milliseconds
    function elapsedTime(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // An async generator function that increments a counter and yields it
    // a specified (or infinite) number of times at a specified interval.
    async function* clock(interval, max=Infinity) {
        for(let count = 1; count <= max; count++) { // regular for loop
            await elapsedTime(interval); // wait for time to pass
            yield count; // yield the counter
        }
    }

    // A test function that uses the async generator with for/await
    async function test() { // Async so we can use for/await
        for await (let tick of clock(300, 100)) { // Loop 100 times every 300ms
            console.log(tick);
        }
    }
    ```


<!-- References -->
