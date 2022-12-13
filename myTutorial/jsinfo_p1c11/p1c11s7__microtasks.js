
/*
  SUMMARY

  Promise handling is always asynchronous, as all promise actions pass through
  the internal “promise jobs” queue, also called “microtask queue” (V8 term).

  So .then/catch/finally handlers are always called after the current code 
  is finished.  

  If we need to guarantee that a piece of code is executed after .then/catch/
  finally, we can add it into a chained .then call.  

  In most Javascript engines, including browsers and Node.js, the concept of 
  microtasks is closely tied with the “event loop” and “macrotasks”. As these 
  have  no direct relation to promises, they are covered in another part of 
  the tutorial, in the article Event loop: microtasks and macrotasks.

*/

/* Theory 1 */
// Notice that the promises run always after the code is finished
{
  let firstPromise = Promise.resolve();
  firstPromise.then(() => console.log("Th1/First - Message 1"));
  console.log("Th1/First - Message 2"); // this console.error shows first

  let secondPromise = Promise.resolve();
  secondPromise
    .then(() => console.log("Th1/Second - Message 1"))
    .then(() => console.log("Th1/Second - Message 2"));
}

/* 
  Theory 2 
 
  Notice the difference in the following 3 examples
  If we didn’t know about the microtasks queue, we could wonder: “Why did 
  unhandledrejection handler run? We did catch and handle the error!”

  But now we understand that unhandledrejection is generated when the 
  microtask queue is complete: the engine examines promises and, if any 
  of them is in the “rejected” state, then the event triggers.

  In the following examples, .catch added by setTimeout also triggers. 
  But it does so later, after unhandledrejection has already occurred, 
  so it doesn’t change anything.
*/
{
  let promise = Promise.reject(new Error("Promise Failed!"));
  promise.catch(err => console.error('caught'));                                        // runs
  window.addEventListener('unhandledrejection', event => console.error(event.reason));  // does not run
}

{
  let promise = Promise.reject(new Error("Promise Failed!"));
  window.addEventListener('unhandledrejection', event => console.error(event.reason));  // runs
}

{
  let promise = Promise.reject(new Error("Promise Failed!"));
  setTimeout(() => promise.catch(err => console.error('caught')), 1000);                // runs... with a 1 second delay
  window.addEventListener('unhandledrejection', event => console.error(event.reason));  // runs
}