
// Theory -------------------------------------------------------------------------------------------------------

/* Theory 1 */
// The simple way
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

user = new User("Jack with New", true);
console.log("> ", user.name)
console.log("> ", user.isAdmin)

user = new User("Ann with New", false);
console.log("> ", user.name)
console.log("> ", user.isAdmin)

/* Theory 2 */
// The simple way
user = {
   name: "Ann",
   sayHi: function() { console.log( "> My name is: " + this.name ); }
}
user.sayHi();

/* The better way */
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

/* Exercise 1 */
// Program a calculator object that is able to read, sum, and multiply 2 provided values
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


/* Exercies 2*/
// Create an accumulator, that adds new values (asked to the user) to a certanig initial value
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