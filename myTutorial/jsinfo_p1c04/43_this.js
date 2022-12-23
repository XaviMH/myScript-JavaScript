
// Theory -------------------------------------------------------------------------------------------------------

/* Object keys can contain functions */
// First of all, we can add funcrions to an Object, in a few different ways
// Please, note that al lof them are using the 'this' call, which references the Object itself
let userAdmin = { 
  name: "John",
  age: 19,
};

// method 1 (slowest)
function sayHi() {
  console.log("Hello", this.name);
}
userAdmin.sayHi = sayHi;
userAdmin.sayHi()

// method 2
userAdmin = {
  name: "Ann",
  age: 19,
  sayHi: function() {
    console.log("Hello", this.name);
  },
};
userAdmin.sayHi()

// method 3 (quickest - and preferred!)
userAdmin = {
  name: "Chris",
  age: 19,
  sayHi() {  // same as "sayHi: function(){...}"
    console.log("Hello", this.name);
  },
};
userAdmin.sayHi()

// Please, note that 'this' behaves in a special way when used within Arrow Functions
// Note that the function is referring to the "original" name within the Object that is calling the function
userAdmin = {
  name: "Ilya",
  sayHi() {
    let arrow = () => console.log("Hello", this.name);
    arrow();
  }
};
userAdmin.sayHi(); // Ilya

// Exercises ----------------------------------------------------------------------------------------------------

/* Exercise 1 */
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

/* Exercies 2 */
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
    this.a = 2;  // we cheat! :)
    this.b = 3;
  }
};

calculator.read();                // Prompts the user for the @calculator.a and @calculator.b values
console.log(">", calculator.sum() );  // sums them
console.log(">", calculator.mul() );  // multiplies them

/* Exercise 3 */
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