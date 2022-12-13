

// Summary
/* 
  “Promisification” is a long word for a simple transformation. It’s the conversion of a function 
  that accepts a callback into a function that returns a promise.

  Such transformations are often required in real-life, as many functions and libraries 
  are callback-based. But promises are more convenient, so it makes sense to promisify them.

  Promisification is a great approach, especially when you use async/await (covered later in the 
  chapter Async/await), but not a total replacement for callbacks.

  Remember, a promise may have only one result, but a callback may technically be called many times.
  So promisification is only meant for functions that call the callback once. Further calls will be ignored.

*/

/* Theory 1 */
// As a call-back example, where the function loads a script with the given src, and then 
// calls callback(err) in case of an error, or callback(null, script) in case of successful 
// loading. That’s a widespread agreement for using callbacks, we saw it before.
{
  function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
  
    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Th1 - Script load error for ${src}`));
  
    document.head.append(script);
  }
  
  loadScript('./data/myScript.js', (error, script) => { 
    if (error) {
     console.log("Th1 - ERROR: Script could not be loaded") ;
    }
    else {
      console.log("Th1 - Script loaded successfully");
    }
  })
}

/* Theory 2 */
// Let’s promisify it.

// We’ll make a new function loadScriptPromise(src), that does the same (loads the script), 
// but returns a promise instead of using callbacks.
// In other words, we pass it only src (no callback) and get a promise in return, that resolves
// with script when the load is successful, and rejects with the error otherwise.

// As we can see in the next example, the new function is a wrapper around the original loadScript 
// function. It calls it providing its own callback that translates to promise resolve/reject.
// Now loadScriptPromise fits well in promise-based code. If we like promises more than callbacks 
// (and soon we’ll see more reasons for that), then we will use it instead.

{
  let loadScriptPromise = function(src) {
    return new Promise((resolve, reject) => {
      loadScript(src, (err, script) => {
        if (err) reject(err);
        else resolve(script);
      });
    });
  };
  
  // usage:
  // loadScriptPromise('./data/myScript.js').then(...)

}

/* Theory 3 */
// After following further steps, we can arrive to creating a wrapper that accepts multiple paramters,
// and is able to return the of a callback itself, a function that we call "promistify" 
{
  // promisify(f, true) to get array of results
  function promisify(f, manyArgs = false) {
    return function (...args) {
      return new Promise((resolve, reject) => {
        function callback(err, ...results) { // our custom callback for f
          if (err) {
            reject(err);
          } else {
            // resolve with all callback results if manyArgs is specified
            resolve(manyArgs ? results : results[0]);
          }
        }

        args.push(callback);

        f.call(this, ...args);
      });
    };
  }

  // Test function that loads a script with a Call-Back
  function loadScript(src, callback) {
    console.log(`@loadScript attempting to read script ${src}...`)
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(script);
    document.head.append(script);
  }
  // eof

  // Usage of "promisify"
  let f = promisify(loadScript, true);
  f("./data/myScript.js", script => console.log(`Th3 - external script ${script.src} loaded successfully (using promisify)`));
    // .then( result => {
    //   console.log("Script loaded")
    // })
    //.catch("ERROR: could not load the script!")

}
