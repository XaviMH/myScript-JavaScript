
/* 
  SUMMARY

  To demonstrate the use of callbacks, promises and other abstract concepts, we’ll be using some 
  browser methods: specifically, loading scripts and performing simple document manipulations.
  If you’re not familiar with these methods, and their usage in the examples is confusing, you 
  may want to read a few chapters from the next part of the tutorial.
  Although, we’ll try to make things clear anyway. There won’t be anything really complex 
  browser-wise.
*/

/* 
  Theory 1 
  Note that the script is executed “asynchronously”, as it starts loading now, but runs 
  later, when our original the function has already finished.
  Naturally, the browser probably didn’t have time to load the script. As of now, the loadScript 
  function doesn’t provide a way to track the load completion. The script loads and eventually 
  runs, that’s all. But we’d like to know when it happens, to use new functions and variables 
  from that script.

  Let’s add a callback function as a second argument to loadScript that should execute when the 
  script loads: the @onload event is described in the article Resource loading: onload and onerror, 
  which basically executes a function after the script is loaded and executed.
  This is called a “callback-based” style of asynchronous programming. A function that does something 
  asynchronously should provide a callback argument where we put the function to run after it’s complete.
*/
console.log("Theory 1 --------------------------");
{
  function loadScript(src, callback) {
    console.log(`T1) Now attempting to read script ${src}...`)
    let script = document.createElement('script');
    script.src = src;
    
    // script.onload = function() { return(callback(script));}  // <--- Run @callback as a Function Expression
    script.onload = () => callback(script);                     // <--- Run @callback as a Function Arrow -- shorter!
    
    document.head.append(script);
  }
  
  // Alternative 1: Function Expressions (to catch/process the callback)
  // loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', function(script)  {
  //    console.log(`1) Cool, the script ${script.src} is loaded with an Function Expression`);
  //    // console.log( _ );
  //    return 0;
  // });

  // Alternative 2: Function Arrows (to catch/process the callback) -- shorter!
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
    console.log(`T1) Cool, the script ${script.src} is loaded`);
    //console.log( _ ); 
  });
  
}

/* 
  Theory 2
  Note that we can also arrange it such that we can catch multiple errors
  The recipe that we will be using for @loadScript is actually quite common. It’s called the “error-first callback” style.
  The convention is:
    - The first argument of the callback is reserved for an error if it occurs. Then callback(err) is called.
    - The second argument (and the next ones if needed) are for the successful result. Then callback(null, result1, result2…) is called.
  Thus a single callback function is used both for reporting errors and passing back results.
*/
console.log("Theory 2 --------------------------");
{
  function loadScript(src, callback) {
    console.log(`T2) Now attempting to read script ${src}...`)
    let script = document.createElement('script');
    script.src = src;
  
    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));
  
    document.head.append(script);
  }

  // reading an existing script...
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js' , function(error, script) {
    if (error) {
      console.error(`T2.1) Error! For some reason, the script ${script.src} could not be loaded`);
    } else {
      console.log(`T2.1) Cool, the script ${script.src} is loaded (again!)`);
      //console.log( _ ); // _ is a function declared in the loaded script
    }
  });

  // reading a non-existing script...
  loadScript('https://helloworld-2.2' , function(error, script) {
    if (error) {
      console.error(`T2.2) Error! For some reason, the script "https://helloworld-2.2" could not be loaded`);
    } else {
      console.log(`T2.2) Cool, the script ${script.src} is loaded (again!)`);
      //console.log( _ ); // _ is a function declared in the loaded script
    }
  });

}

/* 
  Theory 3
  But be really wary: if we want to manage multiple errors the code might get spaghettified, which
  is something we reaaaaally hate to happen (which would be called "Pyramid of Doom")
*/
console.log("Theory 3 -----------------------------------");
{
  function loadScript(src, callback) {
    console.log(`T3) Now attempting to read script ${src}...`);
    let script = document.createElement('script');
    script.src = src;
  
    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));
  
    document.head.append(script);
  }

  loadScript("https://helloworld-1.1", function(error, script) {
    if (error) {
      console.error("T3) ERROR: Script helloworld-1.1 does not exist!");
      console.error(`T3) ERROR: The error seems to be >>>> ${error}`);
    } else {
      // ...
      loadScript("https://helloworld-2.2", function(error, script) {
        if (error) {
          console.error("T3) ERROR: Script helloworld-2.2 does not exist!");
        } else {
          // ...
          loadScript("https://helloworld-3.3", function(error, script) {
            if (error) {
              console.error("T3) ERROR: Script helloworld-3.3 does not exist!");
            } else {
              // ...continue after all scripts are loaded (*)
            }
          });

        }
      });
    }
  });
}

console.log("*******************************");