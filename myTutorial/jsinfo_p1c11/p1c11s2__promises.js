/*
  SUMMARY

   Promises 
    - Promises allow us to do things in the natural order. First, we run loadScript(script), 
      and .then we write what to do with the result. 	

   Callbacks
    - We must have a callback function at our disposal when calling loadScript(script, callback).
      In other words, we must know what to do with the result before loadScript is called.

   Promises
     - We must have a callback function at our disposal when calling loadScript(script, callback). 
       In other words, we must know what to do with the result before loadScript is called.

   Callbacks
     - We can call .then on a Promise as many times as we want. Each time, we’re adding a new “fan”, 
       a new subscribing function, to the “subscription list”. More about this in the next 
       chapter: Promises chaining. There can be only one callback.

   So promises give us better code flow and flexibility. But there’s more. We’ll see that in the next chapters.
*/


/* 
  Theory 1
  The simplest example, where an executor should perform a job (usually something 
  that takes time) and then call resolve or reject to change the state of the corresponding promise object.
*/
console.log("Theory 1 --------------------------- ");
{
  let promise = new Promise(function(resolve, reject) {
    // this function code is the "singer", it automatically executes when the promise is constructed  
    // in our case, after 1 second signal that the job is done with the result "done"
    setTimeout(() => resolve("T1) done"), 1000);
  });

}

/* 
  Theory 2
  A usable example
*/
console.log("Theory 2 --------------------------- ");
{
  let promise = new Promise(function(resolve, reject) {
    // ...successful call:
    setTimeout(() => resolve("T2) done!"), 1000);
    // ...rejected call:
    // setTimeout(() => reject("2) error!"), 1000);
  });
  
  // Runs the first function in .then (and moves on)
  // Alternative 1: Function Expressions, to catch/process the promise
  // promise.then(
  //   function(result) { console.log(result) }, // shows "2) done!"  after 1 second
  //   function(error) { console.error(error) }  // shows "2) error!" after 1 second
  // );

  // Alternative 2: Function Arrows, to catch/process the promise -- shorter!
  promise.then( 
    result => console.log(result), // shows "2) done!"  after 1 second
    error => console.error(error)  // shows "2) error!" after 1 second
  );

  // As an alternative for catching the error, we can use @catch:
  promise.catch( 
    error => console.error(error)  // shows "2) error!" after 1 second
  );
}

/* 
  Theory 3
  In order to follow clean-up procedures, we can use the @finally preffix
*/
console.log("Theory 3 --------------------------- ");
{
  let promise = new Promise(function(resolve, reject) {
    // ...successful call:
    setTimeout(() => resolve("T3) done!"), 1000); 
    // ...rejected call:
    // setTimeout(() => reject("2) error!"), 1000);
  });

  promise.then(
    script => console.log(`T3) done!`),
    error => console.error(`T3) error`)
  );

  promise.finally(script => console.log('T3) Last handler @finally being processed!'));

}

/* Exercise 1 */
/* 
  Given the following Callback function...
    {
      function loadScript(src, callback) { 
        let script = document.createElement('script');
        script.src = src;

        script.onload = () => callback(null, script);
        script.onerror = () => callback(new Error(`Script load error for ${src}`));

        document.head.append(script);
      } 
      
      // usage:
      // loadScript('path/script.js', (err, script) => {...})
    }

  ... please, do rewrite it by using Promise objects
*/
{
  function loadScript(src) {
    return new Promise(function(resolve, reject) {
      let script = document.createElement('script');
      script.src = src;
  
      // Alternative 1 (funct expressions)
      // script.onload = function() {resolve(script)};
      // script.onerror = function() {reject(new Error(`4) Script load error for ${src}`));};

      // Alternative 2 (funct arrows)
      script.onload = () => resolve(script);
      script.onerror = () => reject(new Error(`Script load error for ${src}`));
   
      document.head.append(script); 
    });
  }

  let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");
  promise.then(
    script => console.log(`E1) Loading: ${script.src}`),
    error => console.error(`E1) Error: ${error.message}`)
  );

  /////////////////
  // in addition...
  let nonPromise = loadScript("https://helloworld");
  nonPromise.then(
    script => console.log(`E1.2) Loading: ${script.src}`),
    error => console.error(`E1.2) Error: ${error.message}`)
  );
  /////////////////

}

console.log("*******************************");