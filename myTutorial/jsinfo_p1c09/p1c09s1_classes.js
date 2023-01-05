//
// Summary
// ...



/* 
  Theory 1
  Then use new MyClass() to create a new object with all the listed methods.
  The constructor() method is called automatically by new, so we can initialize the object there.
  */
console.log("Theory 1 ------------------");
{
  class User {

      constructor(name) {
        this.name = name;
      };

      sayHi() {
        console.log(this.name);
      };

    }

    // Usage:
    let user = new User("John");
    user.sayHi();
}

/* 
  Theory 2
  Please, note that a Class is just a normal Function

  Still, there are important differences between using a Class and using a Function:
    1) First, a function created by class is labelled by a special internal property [[IsClassConstructor]]: true. So 
       it’s not entirely the same as creating it manually.
    2) A string representation of a class constructor in most JavaScript engines starts with the “class…”
    3) Class methods are non-enumerable. A class definition sets enumerable flag to false for all methods in the "prototype",
       which is good, because if we for..in over an object, we usually don’t want its class methods.
    4) Classes always use strict. All code inside the class construct is automatically in strict mode.

  besides, class syntax brings many other features that we’ll explore later.
*/
console.log("Theory 2 ------------------");
{
  // Using Class ......
  class User {
    constructor(name) { this.name = name; }
    sayHi() { console.log(this.name); }
  }
  
  // class is a function
  console.log(typeof User); // function
  
  // ...or, more precisely, the constructor method
  console.log(User === User.prototype.constructor); // true
  
  // The methods are in User.prototype, e.g:
  console.log(User.prototype.sayHi); // the code of the sayHi method
  
  // there are exactly two methods in the prototype
  console.log(Object.getOwnPropertyNames(User.prototype)); // 2 (constructor, and sayHi)
}
{  // Using Functions could results in a similar, but not equal, representation:

  // 1. Create constructor function
  function User(name) {
    this.name = name;
  }
  // a function prototype has "constructor" property by default,
  // so we don't need to create it

  // 2. Add the method to prototype
  User.prototype.sayHi = function() {
    console.log(this.name);
  };

  // Usage:
  let user = new User("John");
  user.sayHi();
}

/*  
  Theory 3
  One can Class as if they were a function
*/
console.log("Theory 3 ------------------");
{
  function makeClass(phrase) {
    // declare a class and return it
    return class {
      sayHi() {
        console.log(phrase);
      }
    };
  }
  
  // Create a new class
  let User = makeClass("Hello");
  
  new User().sayHi(); // Hello
}

/* 
  Theory 4
  Remember that classes can incude getters/setters
*/
console.log("Theory 4 ------------------");
{ 
  class User {

    constructor(name) {
      // invokes the setter
      this.name = name;
    }
  
    get name() {
      return this._name;
    }
  
    set name(value) {
      if (value.length < 4) {
        console.log("Name is too short.");
        return;
      }
      this._name = value;
    }
  
  }
  
  let user;
  
  user = new User("John");
  console.log(user.name); // John
  
  user = new User("Ann"); // Name is too short.

}

/* 
  Theory 5
  Classes can also have fields
  The important difference of class fields is that they are set on individual objects, not User.prototype:
*/
console.log("Theory 5 ------------------");
{
  class User {
    name = "Ann";
  
    sayHi() {
      console.log(`Hello, ${this.name}!`);
    }
  }
  
  new User().sayHi(); // Hello, Ann!
  console.log(User.prototype.name); // undefined

}

/* 
  Theory 6
  As demonstrated in the chapter Function binding functions in JavaScript have a dynamic this. It depends on the context of the call.
  So if an object method is passed around and called in another context, this won’t be a reference to its object any more.
*/
console.log("Theory 6 ------------------");
{
  class Button {
    constructor(value) {
      this.value = value;
    }

    click() {
      console.log(this.value);
    }
  }

  let button = new Button("hello");

  setTimeout(button.click, 1000); // undefined
}

/* 
  Exercise 1
  Given the next Clock task, write it in Class syntax
*/
console.log("Exercise 1 ------------------");
{
  function Clock({ template }) {
  
    let timer;
  
    function render() {
      let date = new Date();
   
      let output = template
        .replace('h', date.getHours())
        .replace('m', date.getMinutes())
        .replace('s', date.getSeconds());
  
      console.log(output);
    }
  
    this.stop = function() {
      clearInterval(timer);
    };
  
    this.start = function() {
      render();
      timer = setInterval(render, 1000);
    };
  
  }
  
  let clock = new Clock({template: 'h-m-s'});
  clock.start();

  // we stop the clock after a few seconds, to avoid spam
  setTimeout(() => {
    clock.stop(); 
    console.log("... now stopping the low resolution clock")}, 3000); 

}

// the solution being...
{
  class Clock {
    constructor({ template }) {
      this.template = template;
    }
  
    render() {
      let date = new Date();
  
      let output = this.template
        .replace('h', date.getHours())
        .replace('m', date.getMinutes())
        .replace('s', date.getSeconds());
  
      console.log(output);
    }
  
    stop() {
      clearInterval(this.timer);
    }
  
    start() {
      this.render();
      this.timer = setInterval(() => this.render(), 1000);
    }
  }
  
  
  let clock = new Clock({template: 'h:m:s'});
  clock.start();

  // we stop the clock after a few seconds, to avoid spam
  setTimeout(() => {
    clock.stop(); 
    console.log("... now stopping the low resolution clock")}, 3000); 


}