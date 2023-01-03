//

/* 
  SUMMARY

  Method func.bind(context, ...args) returns a “bound variant” of function func that fixes the context 
  this and first arguments if given.

  Usually we apply bind to fix this for an object method, so that we can pass it somewhere. For 
  example, to setTimeout.

  When we fix some arguments of an existing function, the resulting (less universal) function is 
  called partially applied or partial.

  Partials are convenient when we don’t want to repeat the same argument over and over again. Like 
  if we have a send(from, to) function, and from should always be the same for our task, we can get 
  a partial and go on with it.

*/



/* 
  Theory 1 
  Losing “this”
  We’ve already seen examples of losing this. Once a method is passed somewhere separately from the object – this is lost.
  Here’s how it may happen with setTimeout:
*/
console.log("Theory 1 -------------------");
{
  let user = {
    firstName: "John",
    sayHi: function() {
      console.log(`Theory 1, saying: [Hello, ${this.firstName}!]`);
    }
  };

  let f = user.sayHi;
  setTimeout(f, 1000); // setTimeout will lose the @user context. It should print "Hello undefined"
}

/* 
  Theory 2 
  Simple solution: just povide a wrapper 
  This function will however fail if user.firstname has been changed (e.g. during a setTimeout())
*/
console.log("Theory 2 -------------------");
{
  let user = {
    firstName: "John",
    sayHi() {
      console.log(`Theory 2, saying: [Hello, ${this.firstName}!]`);
    }
  };

  setTimeout(function() {
    user.sayHi(); // Hello, John!
  }, 1000);
  // or 
  // setTimeout(() => user.sayHi(), 1000); // Hello, John!
}

/* 
  Theory 3
  A better solution though would be using the "function.bind()" call, like so:
    let boundFunc = func.bind(context);
*/
console.log("Theory 3 -------------------");
{
  let user = {
    firstName: "John",
    sayHi() {
      console.log(`Theory 3, saying: [Hello, ${this.firstName}!]`);
    }
  };
  
  let sayHi = user.sayHi.bind(user); // (*)
  
  sayHi(); // Hello, John!
  
  setTimeout(sayHi, 1000); // Hello, John!
  
  // NOTE: even if the value of user changes within 1 second,
  // sayHi uses the pre-bound value which is reference to the old user object
  user = {
    sayHi() { console.log("Another user in setTimeout!"); }
  };

  let say = user.sayHi.bind(user);
  say("Hello"); // Hello, John! ("Hello" argument is passed to say)
  say("Bye"); // Bye, John! ("Bye" is passed to say)

}

/* 
  Theory 4 
  Partial functions:
  The call to mul.bind(null, 2) creates a new function double that passes calls to mul, fixing null as the context 
  and 2 as the first argument. Further arguments are passed “as is”.
  That’s called partial function application – we create a new function by fixing some parameters of the existing one.
*/
console.log("Theory 4 -------------------");
{
  function mul(a, b) {
    return a * b;
  }

  let double = mul.bind(null, 2);

  console.log( `mul() says: ${double(3)}` ); // = mul(2, 3) = 6
  console.log( `mul() says: ${double(4)}` ); // = mul(2, 4) = 8
  console.log( `mul() says: ${double(5)}` ); // = mul(2, 5) = 10

}

/* 
  Exercise 1 
  The call to askPassword() in the code below should check the password and then 
  call user.loginOk/loginFail depending on the answer
*/
console.log("Exercise 1 -------------------");
{
  function askPassword(ok, fail) {
    let password = 'McGriffin';
    // let password = prompt("Password?", ''); // removed the prompt call, so as not to bother the user
    
    if (password == "rockstar") ok();
    else fail();
  }

  let user = {
    name: 'John',

    loginOk() {
      console.log(`${this.name} logged in`);
    },

    loginFail() {
      console.log(`${this.name} failed to log in`);
    },

  };

  askPassword(user.loginOk.bind(user), user.loginFail.bind(user));  // method 1 (more clear)
  askPassword(() => user.loginOk(), () => user.loginFail());        // method 2 (faster)
} 

/* 
  Exercise 2
  The task is a little more complex variant of Fix a function that loses "this" (i.e. Exercise 1)
  The user object was modified. Now instead of two functions loginOk/loginFail, it has a single function user.login(true/false).
  What should we pass askPassword in the code below, so that it calls user.login(true) as ok and user.login(false) as fail?
*/
console.log("Exercise 2 -------------------");
{
  function askPassword(ok, fail) {
    let password = 'McGriffin';
    // let password = prompt("Password?", ''); // removed the prompt call, so as not to bother the user
    if (password == "rockstar") ok();
    else fail();
  }

  let user = {
    name: 'John',

    login(result) {
      console.log( this.name + (result ? ' logged in' : ' failed to log in') );
    }
  };

  askPassword(user.login.bind(user, true), user.login.bind(user, false)); // method 1 (more clear)
  askPassword(() => user.login(true), () => user.login(false));           // method 2 (faster)
} 
