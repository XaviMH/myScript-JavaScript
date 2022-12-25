
/*
  SUMMARY

  To sum up:
    - Constructor functions or, briefly, constructors, are regular functions, but there’s 
      a common agreement to name them with capital letter first.
    - Constructor functions should only be called using new. Such a call implies a creation
      of empty this at the start and returning the populated one at the end.

  We can use constructor functions to make multiple similar objects.

  JavaScript provides constructor functions for many built-in language objects: like Date 
  for dates, Set for sets and others that we plan to study.

*/

/* Theory 1 

  The regular {...} syntax allows us to create one object. But often we need to create many 
  similar objects, like multiple users or menu items and so on.

  That can be done using constructor functions and the "new" operator.
  
  Constructor functions technically are regular functions. There are two conventions though:
    - They are named with capital letter first.
    - They should be executed only with "new" operator.

*/
{
  console.log("Creating John");
  let user = { 
    name: "John",
    isAdmin: false,
  };
  console.log("> ", user.name)
  console.log("> ", user.isAdmin)

  // The simple way
  function User(name, isAdmin) {
    // this = {};  (implicitly)
    this.name = name;
    this.isAdmin = isAdmin;
    // return this; (implicitly)
  }

  console.log("Creating Jack");
  user = new User("Jack with New", true);
  console.log("> ", user.name)
  console.log("> ", user.isAdmin)

  console.log("Creating Ann");
  user = new User("Ann with New", false);
  console.log("> ", user.name)
  console.log("> ", user.isAdmin)
}

/* 
  Theory 2 
  Remember that objects accept functions as parameters, too
*/
{
  console.log("Using the object Ann");
  user = {
    name: "Ann",
    sayHi: function() { console.log( "> My name is: " + this.name ); }
  }
  user.sayHi();

  /* The better way */
  console.log("Using the @new constructor");
  function UserFunction(name) {
    // this = {};  (implicitly)
    this.name = name;
    this.sayHi = function() {
      console.log( "> My name is: " + this.name );
    // return this; (implicitly)
    };
  }

  let john = new UserFunction("John with New");
  john.sayHi();
}

/* 
  Exercise 1
  Program a calculator object that is able to read, sum, and multiply 2 provided values
*/
{
  console.log("Exercise 1 ---------------------------");
  function Calculator() {

    this.read = function() {
      this.a = 2; // we cheat, it should have been --> this.a = +prompt('a?', 0); 
      this.b = 4; // we cheat, it should have been --> this.b = +prompt('b?', 0);
    };

    this.sum = function() {
      return this.a + this.b;
    };

    this.mul = function() {
      return this.a * this.b;
    };
  }

  let calculator = new Calculator();
  calculator.read();
  console.log( "Sum=" + calculator.sum() );
  console.log( "Mul=" + calculator.mul() );
}

/* 
  Exercise 2
  Create an accumulator, that adds new values (asked to the user) to a certanig initial value
*/
{
  console.log("Exercise 2 ---------------------------"); 
  function Accumulator(startingValue) {
    this.value = startingValue;

    this.read = function() {
      this.value += 7; // we cheat by setting it to 7. In reality it should have been 
                      // --> this.value += +prompt('How much to add?', 0);
    };

  }

  let accumulator = new Accumulator(1);
  accumulator.read();
  accumulator.read();
  console.log("> ", accumulator.value);
}