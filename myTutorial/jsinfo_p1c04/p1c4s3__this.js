/* 
  SUMMARY

  Top sum up:
    - Functions that are stored in object properties are called “methods”.
    - Methods allow objects to “act” like object.doSomething().
    - Methods can reference the object as this.

  The value of this is defined at run-time:
    - When a function is declared, it may use this, but that this has no value until the 
      function is called.
    - A function can be copied between objects.
    - When a function is called in the “method” syntax: object.method(), the value of this 
      during the call is object.

  Please note that arrow functions are special: they have no this. When this is accessed 
  inside an arrow function, it is taken from outside.

*/

/*
  Theory 1
  Object keys can contain functions, and you can refer to tehem by using this
  First of all, we can add funcrions to an Object, in a few different ways
  Please, note that al lof them are using the 'this' call, which references the Object itself
*/
{
  let userAdmin = { 
    name: "John",
    age: 19,
  };

  // method 1 (slowest)
  function sayHi() {
    console.log("Hello", this.name);
  }
  userAdmin.sayHi = sayHi;
  userAdmin.sayHi();

  // method 2
  userAdmin = {
    name: "Ann",
    age: 19,
    sayHi: function() {
      console.log("Hello", this.name);
    },
  };
  userAdmin.sayHi();

  // method 3 (quickest - and preferred!)
  userAdmin = {
    name: "Chris",
    age: 19,
    sayHi() {  // same as "sayHi: function(){...}"
      console.log("Hello", this.name);
    },
  };
  userAdmin.sayHi();

  // Please, note that 'this' behaves in a special way when used within Arrow Functions
  // Note that the function is referring to the "original" name within the Object that is calling the function
  userAdmin = {
    name: "Ilya",
    sayBye: function() {  // as a Function Expression
      let arrow = () => console.log("Bye", this.name);
      arrow();
    },
    sayHi() {             // as a Function Arrow
      let arrow = () => console.log("Hello", this.name);
      arrow();
    }
  };
  userAdmin.sayHi(); // Ilya
  userAdmin.sayBye(); // Ilya
}


/*
  Exercise 1 

  Here the function makeUser returns an object.
  Make sure to access function ref with the parenthesis, otheerwise you will be receiving an error
*/
{
  function makeUser() {
    return {
      name: "John",
      ref() {
        return this;
      }
    };
  }
  userAdmin = makeUser();
  console.log(">", userAdmin.ref().name );  // John
}

/* 
  Exercise 2 
  Create a calculator!
*/
{
  console.log("Starting the calculator");
  let calculator = {
    a: 0,
    b: 0,
    sum() {
      return this.a + this.b;
    },

    mul() {
      return this.a * this.b;
    },

    read() {
      //this.a = +prompt('a?', 0);
      //this.b = +prompt('b?', 0);
      this.a = 2;  // we cheat, assuming that the user provided as input: [ 2, 3 ]
      this.b = 3;
    }
  };

  calculator.read();                    // Prompts the user for the @calculator.a and @calculator.b values
  console.log(">", calculator.sum() );  // sums them
  console.log(">", calculator.mul() );  // multiplies them
}

/* 
  Exercise 3 

  Imagine there's a latter object that functions like so:
  There’s a ladder object that allows to go up and down:

    let ladder = {
      step: 0,
      up() {
        this.step++;
      },
      down() {
        this.step--;
      },
      showStep: function() { // shows the current step
        console.log(">", this.step );
      }
    };
  
  Said function can work as: 
    ladder.up();
    ladder.up();
    ladder.down();
    ladder.showStep(); // 1
    ladder.down();
    ladder.showStep(); // 0
    
  Make it such that the function can work in a chaining mode.
*/
let ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep: function() { // shows the current step
    console.log(">", this.step );
    return this;
  }
};

ladder
  .up()
  .up()
  .up()
  .down()
  .showStep()  // 2
  .down()
  .showStep(); // 1