
/*
  SUMMARY

  Proxy is a wrapper around an object, that forwards operations on it to the object, optionally trapping 
  some of them.

  It can wrap any kind of object, including classes and functions.

  The syntax is:

      let proxy = new Proxy(target, {
          // traps
        });

    …Then we should use proxy everywhere instead of target. A proxy doesn’t have its own properties or 
    methods. It traps an operation if the trap is provided, otherwise forwards it to target object.
    
    We can trap:
    
        - Reading (get), writing (set), deleting (deleteProperty) a property (even a non-existing one).
        - Calling a function (apply trap).
        - The new operator (construct trap).
        - Many other operations (the full list is at the beginning of the article and in the docs).
    
    That allows us to create “virtual” properties and methods, implement default values, observable objects,
    function decorators and so much more.
    
    We can also wrap an object multiple times in different proxies, decorating it with various aspects of 
    functionality.
    
    The Reflect API is designed to complement Proxy. For any Proxy trap, there’s a Reflect call with same 
    arguments. We should use those to forward calls to target objects.
    
    Proxies have some limitations:
    
        - Built-in objects have “internal slots”, access to those can’t be proxied. See the workaround above
        - The same holds true for private class fields, as they are internally implemented using slots. So 
          proxied method calls must have the target object as this to access them.
        - Object equality tests === can’t be intercepted.
        - Performance: benchmarks depend on an engine, but generally accessing a property using a simplest 
          proxy takes a few times longer. In practice that only matters for some “bottleneck” objects though
        
*/


/* 
  Theory 1

  A Proxy object wraps another object and intercepts operations, like reading/writing
  properties and others, optionally handling them on its own, or transparently 
  allowing the object to handle them.

  Proxies are used in many libraries and some browser frameworks. We’ll see many 
  practical applications in this article. 

  As a starting example, let’s create a proxy without any traps. As we can see, without 
  any "traps" (or "handlers"), proxy is a transparent wrapper around target.

  In essence, Proxy is a special “exotic object”. It doesn’t have own properties. With 
  an empty handler it transparently forwards operations to target.
*/
{
  let target = {};
  let proxy = new Proxy(target, {});          // empty handler 

  proxy.test = 5;                             // writing to proxy (1)
  console.log("target --> " + target.test);   // 5, the property appeared in target!
  console.log("proxy  --> " + proxy.test);    // 5, we can read it from proxy too (2)

  for(let key in proxy) 
    console.log(key); // test, iteration works (3)

}

/*
  Theory 2

  For most operations on objects, there’s a so-called “internal method” in the JavaScript
  specification that describes how it works at the lowest level. For instance [[Get]], 
  the internal method to read a property, [[Set]], the internal method to write a property,
  and so on. These methods are only used in the specification, we can’t call them directly by name.

  Proxy traps intercept invocations of these methods. They are listed in the Proxy specification 
  and in the table "https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots"

  Let’s use get to implement default values for an object:
    - We’ll make a dictionary that translates some words
    - Usually when one tries to get a non-existing array item, they get undefined, but we’ll wrap 
      a regular array into the proxy that traps reading and returns the input phrase if no translation
      has been found

*/
{
  let dictionary = {
    'Hello': 'Hola',
    'Bye': 'Adiós'
  };
  
  dictionary = new Proxy(dictionary, {
    get(target, phrase) {       // intercept reading a property from dictionary
      if (phrase in target) {   // if we have it in the dictionary...
        return target[phrase];  // ...return the translation
      } else {
        return phrase;          // otherwise, return the non-translated provided phrase
      }
    }
  });
  
  // Look up arbitrary phrases in the dictionary!
  // At worst, they're not translated.
  console.log( dictionary['Hello'] ); // Hola
  console.log( dictionary['Bye'] );   // Adiós
  console.log( dictionary['Welcome to Proxy']); // Welcome to Proxy (no translation)

}

/*
  Theory 2 
  
  This time we test the "set" key 
  (as said above, there are invariants to be held. For set, it must return true for a
   successful write. If we forget to do it or return any falsy value, the operation 
   triggers TypeError)
*/
{
  let numbers = [];

  numbers = new Proxy(numbers, { // (*)
    set(target, prop, val) { // to intercept property writing
      if (typeof val == 'number') {
        target[prop] = val;
        return true;
      } else {
        return false;
      }
    }
  });

  numbers.push(1); // added successfully
  numbers.push(2); // added successfully
  console.log("Length of @numbers array is: " + numbers.length); // 2

  try {
    numbers.push("test"); // it will throw a "TypeError" ('set' on proxy returned false)
  } catch (err) {
    console.error(err); 
  }

}

/* 
  Theory 3

  Let's use the key "getKey", which is the one used by the for..in loop and most other methods
  that iterate over object properties use [[OwnPropertyKeys]] internal method (intercepted by 
  ownKeys trap) to get a list of properties.
*/
{
  let user = {
    name: "John",
    age: 30,
    _password: "***"
  };
  
  user = new Proxy(user, {
    ownKeys(target) {
      return Object.keys(target).filter(key => !key.startsWith('_'));
    }
  });
  
  // "ownKeys" filters out _password
  for(let key in user) console.log(key); // name, age
  
  // same effect on these methods:
  console.log( Object.keys(user) ); // name,age
  console.log( Object.values(user) ); // John,30

}

/* 
  Theory 5

  Intercepting the @has trap, which intercepts the @in call
*/
{
  let range = {
    start: 1,
    end: 10
  };
  
  range = new Proxy(range, {
    has(target, prop) {
      return prop >= target.start && prop <= target.end;
    }
  });
  
  console.log(5 in range);  // true
  console.log(50 in range); // false

}

/* 
  Theory 6

  As we mentioned before, we can wrap a proxy around a function as well. For examp`le, the
  apply(target, thisArg, args) trap handles calling a proxy as function!

  If you can remember, we made an exercise in chapter 6 (p1ch6), where  we recalled delay(f, ms) decorator, 
  that we did in the article Decorators and forwarding, call/apply. In that article we did it 
  without proxies. A call to delay(f, ms) returned a function that forwards all calls to f after 
  ms milliseconds.

  On the other hand, Proxy is much more powerful, as it forwards everything to the target object.
  Let’s use Proxy instead of a wrapping function:
*/
{ // original
  function delay(f, ms) {
    // return a wrapper that passes the call to f after the timeout
    return function() { // (*)
      setTimeout(() => f.apply(this, arguments), ms);
    };
  }
  
  function sayHi(user) {
    console.log(`Hello, ${user}!`);
  }
  
  console.log(sayHi.length);   // --> 1 (function length is the arguments count in its declaration)
  sayHi = delay(sayHi, 3000);  // after this wrapping, calls to sayHi will be delayed for 3 seconds
  console.log(sayHi.length);   // --> 0 (in the wrapper declaration, there are zero arguments)
  
  sayHi("John"); // Hello, John! (after 3 seconds)
}

{ // proxy
  function delay(f, ms) {
    return new Proxy(f, {
      apply(target, thisArg, args) {
        setTimeout(() => target.apply(thisArg, args), ms);
      }
    });
  }
  
  function sayHi(user) {
    console.log(`Hello, ${user}!`);
  }
  
  console.log(sayHi.length); // --> 1 (function length is the arguments count in its declaration)
  sayHi = delay(sayHi, 3000);
  console.log(sayHi.length); // --> 1, given that the proxy forwards "get length" operation to the target
  
  sayHi("Ann"); // Hello, Ann! (after 3 seconds)
}

/*
  Theory 7

  In particular, Reflect allows us to call operators (new, delete…) as functions (Reflect.construct, 
  Reflect.deleteProperty, …). That’s an interesting capability, but here another thing is important.

  For every internal method, trappable by Proxy, there’s a corresponding method in Reflect, with the
  same name and arguments as the Proxy trap.

  So we can use Reflect to forward an operation to the original object.

  In this example, both traps get and set transparently (as if they didn’t exist) forward reading/writing 
  operations to the object, showing a message
*/
{
  let user = {
    name: "John",
  };
  
  user = new Proxy(user, {
    get(target, prop, receiver) {
      console.log(`GET ${prop}`);
      return Reflect.get(target, prop, receiver); // (1)
    },
    set(target, prop, val, receiver) {
      console.log(`SET ${prop}=${val}`);
      return Reflect.set(target, prop, val, receiver); // (2)
    }
  });
  
  let name = user.name; // shows "GET name"
  user.name = "Pete";   // shows "SET name=Pete"

}

/* 
  Theory 8

  Mind that Proxies can be revoked temporarilly
*/
{
  let object = {
    data: "Valuable data"
  };
  
  let {proxy, revoke} = Proxy.revocable(object, {});
  
  // pass the proxy somewhere instead of object...
  console.log(proxy.data); // Valuable data
  
  // later in our code
  revoke();
  
  // the proxy isn't working any more (revoked)
  try {
    console.log(proxy.data); // Error
  } catch (err) {
    console.log(err);
  }

}

/* 
  Exercise 1

  Error on reading non-existent property
  Usually, an attempt to read a non-existent property returns undefined.
  Create a proxy that throws an error for an attempt to read of a non-existent property instead.
  That can help to detect programming mistakes early.
  Write a function wrap(target) that takes an object target and return a proxy that adds this functionality aspect.
*/
{
  let user = {
    name: "John"
  };
  
  function wrap(target) {
    return new Proxy(target, {
      get(target, prop, receiver) {
        if (prop in target) {
          return Reflect.get(target, prop, receiver);
        } else {
          throw new ReferenceError(`Property doesn't exist: "${prop}"`)
        }
      }
    });
  }
  
  user = wrap(user);
  
  console.log(user.name); // John
  console.log(user.age); // ReferenceError: Property doesn't exist: "age"

}

/*
  Exercise 2

  In some programming languages, we can access array elements using negative indexes, counted from the end.

  Like this:

    let array = [1, 2, 3];
    array[-1]; // 3, the last element
    array[-2]; // 2, one step from the end
    array[-3]; // 1, two steps from the end

  In other words, array[-N] is the same as array[array.length - N].
  Create a proxy to implement that behavior.
*/
{
  let array = [1, 2, 3];

  array = new Proxy(array, {
    get(target, prop, receiver) {
      if (prop < 0) {
        // even if we access it like arr[1]
        // prop is a string, so need to convert it to number
        prop = +prop + target.length;
      }
      return Reflect.get(target, prop, receiver);
    }
  });


  console.log(array[-1]); // 3
  console.log(array[-2]); // 2


}

/* 
  Exercise 3

  Create a function makeObservable(target) that “makes the object observable” by returning a proxy.
  In other words, an object returned by makeObservable is just like the original one, but also has 
  the method observe(handler) that sets handler function to be called on any property change.

  Whenever a property changes, handler(key, value) is called with the name and value of the property.

  P.S. In this task, please only take care about writing to a property. Other operations can be 
  implemented in a similar way.

  The solution consists of two parts:
    (1) Whenever .observe(handler) is called, we need to remember the handler somewhere, to be able
        to call it later. We can store handlers right in the object, using our symbol as the property 
        key.
    (2) We need a proxy with set trap to call handlers in case of any change.

*/
{
  let handlers = Symbol('handlers');

  function makeObservable(target) {
    // 1. Initialize handlers store
    target[handlers] = [];
  
    // Store the handler function in array for future calls
    target.observe = function(handler) {
      this[handlers].push(handler);
    };
  
    // 2. Create a proxy to handle changes
    return new Proxy(target, {
      set(target, property, value, receiver) {
        let success = Reflect.set(...arguments); // forward the operation to object
        if (success) { // if there were no error while setting the property
          // call all handlers
          target[handlers].forEach(handler => handler(property, value));
        }
        return success;
      }
    });
  }
  
  let user = {};
  
  user = makeObservable(user);
  
  user.observe((key, value) => {
    alert(`SET ${key}=${value}`); // <--- ideally, this line should pop an alert whenever changes applies to "user"
  });
  
  user.name = "John";

}