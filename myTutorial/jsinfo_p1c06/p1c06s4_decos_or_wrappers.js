//
// Summary
// Decorator is a wrapper around a function that alters its behavior. The main job is still carried out by the function.
// Decorators can be seen as “features” or “aspects” that can be added to a function. We can add one or add many. And all
// this without changing its code!
// To implement cachingDecorator, we studied methods:
//   1)  func.call(context, arg1, arg2…) – calls func with given context and arguments.
//   2)  func.apply(context, args) – calls func passing context as this and array-like args into a list of arguments.
//
// The generic call forwarding is usually done with apply:
//    let wrapper = function() {
//      return original.apply(this, arguments);
//    };
// We also saw an example of method borrowing when we take a method from an object and call it in the context of another object.
// It is quite common to take array methods and apply them to arguments. The alternative is to use rest parameters object that is a real array.

/* Theory 1 */
// Set a decorator (i.e. wrapper) around a slow function
{
  console.log("Theory 1 --------------")

  function slow(x) {
    // slow process starts running in here...
    // and here it ends
    console.log(`> New call to @slow, with parameter: ${x}`);
    return x;
  }
  
  function cachingDecorator(func) {
    let cache = new Map();
  
    return function(x) {
      if (cache.has(x)) {    // if there's such key in cache
        console.log(`> Returning cached result! (for ${x})`);
        return cache.get(x); // read the result from it
      }
  
      let result = func(x);  // otherwise call func
  
      cache.set(x, result);  // and cache (remember) the result
      return result;
    };
  }
  
  slow = cachingDecorator(slow);
  
  console.log( "Call 1, to slow(1): " + slow(1) ); // slow(1) is cached and the result returned
  console.log( "Call 2, to slow(1): " + slow(1) ); // slow(1) result returned from cache
  
  console.log( "Call 3, to slow(2): " + slow(2) ); // slow(2) is cached and the result returned
  console.log( "Call 4, to slow(2): " + slow(2) ); // slow(2) result returned from cache
}

/* Theory 2 */
// To make it all clear, let’s see more deeply how @this is passed along:
//  1) After the decoration worker.slow is now the wrapper function (x) { ... }.
//  2) So when worker.slow(2) is executed, the wrapper gets 2 as an argument and this=worker (it’s the object before dot).
//  3) Inside the wrapper, assuming the result is not yet cached, func.call(this, x) passes the current this (=worker) and 
//     the current argument (=2) to the original method.

{
  console.log("Theory 2 --------------")

  let worker = {
    someMethod() {
      return 1;
    },
  
    slow(x) {
      console.log("Called with " + x);
      return x * this.someMethod(); // (*)
    }
  };
  
  function cachingDecorator(func) {
    let cache = new Map();
    return function(x) {
      if (cache.has(x)) {
        return cache.get(x);
      }

      let result = func.call(this, x); // "this" (=worker) is passed correctly now
      
      cache.set(x, result);
      return result;
    };
  }
  
  worker.slow = cachingDecorator(worker.slow); // now make it caching
  
  console.log( worker.slow(2) ); // works
  console.log( "Again " +worker.slow(2) ); // works, doesn't call the original (cached)

}


/* Theory 2.5 */
// Explaining: func.apply
// Instead of  
//   - func.call(this, ...arguments)
// ... we could use 
//   - func.apply(this, arguments).

// The syntax of built-in method func.apply is:
//   - func.apply(context, args)
// It runs the func setting this=context and using an array-like object args as the list of arguments.
// The only syntax difference between call and apply is that call expects a list of arguments, while apply takes an array-like object with them.
// So these two calls are almost equivalent:
//   - func.call(context, ...args);
//   - func.apply(context, args);
// The simplest form of it would be:
{
  let wrapper = function() {
    return func.apply(this, arguments);
  };
}

/* Theory 3 */
// Going multi-argument is easy: just hash the arguments into a single key
// In the line (*) it calls hash to create a single key from arguments. Here we use a simple “joining” function that
// turns arguments (3, 5) into the key "3,5". More complex cases may require other hashing functions.
// Then (**) uses func.call(this, ...arguments) to pass both the context and all arguments the wrapper got (not just 
// the first one) to the original function.
console.log("Theory 3 --------------")
{
  let worker = {
    slow(min, max) {
      console.log(`Called with ${min},${max}`);
      return min + max;
    }
  };
  
  function cachingDecorator(func, hash) {
    let cache = new Map();
    return function() {
      let key = hash(arguments); // (*)
      if (cache.has(key)) {
        return cache.get(key);
      }
  
      let result = func.call(this, ...arguments); // (**)
  
      cache.set(key, result);
      return result;
    };
  }
  
  // Slow function
  function hash(args) {
    console.log("Args is: "+ args[0] + " and " + args[1]);
    return args[0] + ',' + args[1];
  }

  
  
  worker.slow = cachingDecorator(worker.slow, hash);
  
  console.log( worker.slow(3, 5) ); // works
  console.log( "Again " + worker.slow(3, 5) ); // same (cached)

}

// A faster function (uses borrowed arguments)
// function hash() {
//   console.log("Args is: "+ [].join.call(arguments));
//   return [].join.call(arguments);
// }
{
  function hash() {
    console.log( "Sup" + [].join.call(arguments) ); // 1,2
  }
  
  hash(1, 2);

}

/* Exercise 1 */
// Create a decorator spy(func) that should return a wrapper that saves all calls to function in its calls property.
// Every call is saved as an array of arguments.
console.log("Exercise 1 ----------------")

{
  function work(a, b) {
    console.log( a + b ); // work is an arbitrary function or method
  }

  function spy(func) {

    function wrapper(...args) {
      // using ...args instead of arguments to store "real" array in wrapper.calls
      wrapper.calls.push(args);
      return func.apply(this, args);
    }
  
    wrapper.calls = [];
  
    return wrapper;
  }
  
  work = spy(work);
  
  work(1, 2); // 3
  work(4, 5); // 9
  
  for (let args of work.calls) {
    console.log( 'call: ' + args.join() ); // "call:1,2", "call:4,5"
  }

}


/* Exercise 2*/
// Create a decorator delay(f, ms) that delays each call of f by ms milliseconds.
// In other words, delay(f, ms) returns a "delayed by ms" variant of f.
console.log("Exercise 2 ----------------")

{
  function f(x) {
    console.log(x);
  }

  function delay(f, ms) {

    return function(...args) {
      let savedThis = this; // store this into an intermediate variable
      setTimeout(function() {
        f.apply(savedThis, args); // use it here
      }, ms);
    };

    // alternatively, we could have just used and arrow function, like so:
    //   return function() {
    //     setTimeout(() => f.apply(this, arguments), ms);
    //   };
  
  }
  
  // create wrappers
  let f1000 = delay(f, 1000);
  let f1500 = delay(f, 1500);
  
  f1000("test"); // shows "test" after 1000ms
  f1500("test"); // shows "test" after 1500ms
}

/* Exercise 3 */
// Create a debouncer function (that already exists within many different JS functions!)
// 
// The result of debounce(f, ms) decorator is a wrapper that suspends calls to f until there’s ms milliseconds of inactivity (no calls, “cooldown period”), then invokes f once with the latest arguments.
// In other words, debounce is like a secretary that accepts “phone calls”, and waits until there’s ms milliseconds of being quiet. And only then it transfers the latest call information to “the boss” (calls the actual f).
// For instance, we had a function f and replaced it with f = debounce(f, 1000).
// Then if the wrapped function is called at 0ms, 200ms and 500ms, and then there are no calls, then the actual f will be only called once, at 1500ms. That is: after the cooldown period of 1000ms from the last call.
console.log("Exercise 3 -----------------")
{
  function debounce(func, ms) {
    let timeout;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, arguments), ms);
    };
  }
}

/* Exercise 4 */
// Create a “throttling” decorator throttle(f, ms) – that returns a wrapper.
// When it’s called multiple times, it passes the call to f at maximum once per ms milliseconds.

// Compared to the debounce decorator, the behavior is completely different:
//   1)  debounce runs the function once after the “cooldown” period. Good for processing the final result.
//   2)  throttle runs it not more often than given ms time. Good for regular updates that shouldn’t be very often.

// In other words, throttle is like a secretary that accepts phone calls, but bothers the boss (calls the actual f) not
// more often than once per ms milliseconds. Let’s check the real-life application to better understand that requirement 
// and to see where it comes from.

// For instance, we want to track mouse movements.
// In a browser we can setup a function to run at every mouse movement and get the pointer location as it moves. During 
// an active mouse usage, this function usually runs very frequently, can be something like 100 times per second (every 
// 10 ms). We’d like to update some information on the web-page when the pointer moves.
// ... But updating function update() is too heavy to do it on every micro-movement. There is also no sense in updating 
// more often than once per 100ms.

// So we’ll wrap it into the decorator: use throttle(update, 100) as the function to run on each mouse move instead of the
//  original update(). The decorator will be called often, but forward the call to update() at maximum once per 100ms.

// Visually, it will look like this:
//   1) For the first mouse movement the decorated variant immediately passes the call to update. That’s important, the
//      user sees our reaction to their move immediately.
//   2) Then as the mouse moves on, until 100ms nothing happens. The decorated variant ignores calls.
//   3) At the end of 100ms – one more update happens with the last coordinates.
//   4) Then, finally, the mouse stops somewhere. The decorated variant waits until 100ms expire and then runs update
//      with last coordinates. So, quite important, the final mouse coordinates are processed.

// In the end, A call to throttle(func, ms) returns wrapper:
//  1)  During the first call, the wrapper just runs func and sets the cooldown state (isThrottled = true).
//  2)  In this state all calls are memorized in savedArgs/savedThis. Please note that both the context and the arguments are equally important and should be memorized. We need them simultaneously to reproduce the call.
//  3)  After ms milliseconds pass, setTimeout triggers. The cooldown state is removed (isThrottled = false) and, if we had ignored calls, wrapper is executed with the last memorized arguments and context.
console.log("Exercise 4 -----------------")
{
  function f(a) {
    console.log(a);
  }
  
  function throttle(func, ms) {

    let isThrottled = false,
      savedArgs,
      savedThis;
  
    function wrapper() {
  
      if (isThrottled) { // (2)
        savedArgs = arguments;
        savedThis = this;
        return;
      }
      isThrottled = true;
  
      func.apply(this, arguments); // (1)
  
      setTimeout(function() {
        isThrottled = false; // (3)
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }
  
    return wrapper;
  }


  // f1000 passes calls to f at maximum once per 1000 ms
  let f1000 = throttle(f, 1000);
  
  f1000(1); // shows 1
  f1000(2); // (throttling, 1000ms not out yet)
  f1000(3); // (throttling, 1000ms not out yet)
  
  // when 1000 ms time out...
  // ...outputs 3, intermediate value 2 was ignored



}