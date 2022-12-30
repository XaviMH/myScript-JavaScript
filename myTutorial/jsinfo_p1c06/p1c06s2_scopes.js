// About function scopes (more info: https://javascript.info/closure)

/* 
  Theory 1 
  Code blocks: 
    - if a variable is declared inside a code block {...}, it’s only visible inside that block.
*/
{
  let message = "Hello";
  console.log(message);
}
{
  let message = "Goodbye";
  console.log(message);
}

/* 
  Theory 2 
  All functions remember the Lexical Environment in which they were made. Technically, there’s no 
  magic here: all functions have the hidden property named [[Environment]], that keeps the reference
  to the Lexical Environment where the function was created:
*/
{
  function makeWorker() {
    let name = "Pete";

    return function() {
      console.log(name);
    };
  }
  let name = "John";

  let work = makeWorker();
  work(); // It will show "Pete", given that it's the closest vairable accessed, given that the [[Enviroment]]
          // storedf within work() contains "Pete"
}

/* 
  Exercise 1
  The following code creates an array of shooters.
  Every function is meant to output its number. But something is wrong...
*/
{
  function makeArmy() {
    let shooters = [];

    let i = 0;
    while (i < 10) {
      let shooter = function() { // create a shooter function,
        console.log( i ); // that should show its number
      };
      shooters.push(shooter); // and add it to the array
      i++;
    }

    // ...and return the array of shooters
    return shooters;
  }

  let army = makeArmy();

  // all shooters show 10 instead of their numbers 0, 1, 2, 3...
  army[0](); // 10 from the shooter number 0
  army[1](); // 10 from the shooter number 1
  army[2](); // 10 ...and so on.
}

// Now why do all such functions show the same value, 10?
// That’s because there’s no local variable i inside shooter functions. When such a function is called, 
// it takes i from its outer lexical environment.
// Then, what will be the value of i? Always 10. The solution is to either use 2 variables (or simply 
// using a "for" loop, which declares the i to be internal within the function itself)
{ 
  function makeArmy() {
    let shooters = [];
    let i = 0;
    while (i < 10) {
        let j = i;
        let shooter = function() { // shooter function
          console.log( j ); // should show its number
        };
      shooters.push(shooter);
      i++;
    }

    return shooters; // the current function is returning an Array
  }
  let army = makeArmy();
  army[0](); // 0
  army[1](); // 1
  army[2](); // 2
}

// ... using "for"
{
  function makeArmy() {
    let shooters = [];
    for(let i = 0; i < 10; i++) {
      let shooter = function() { // shooter function
        console.log( i ); // should show its number
      };
      shooters.push(shooter);
    }
    return shooters;
  }
  let army = makeArmy();
  army[7](); // 7
  army[8](); // 8
  army[9](); // 9
}

/*
  Exercise 2 
  Playing around!
*/
{
  console.log("------- count! --------")
  function makeCounter() {
    let count = 0;

    function counter() {
      return count++;
    }

    counter.set = value => count = value;                           // short form
    // counter.set = (value) => count = value;                      // medium form
    // counter.set = function (value) { return(count = value) };    // long form

    counter.decrease = () => count--;                               // short form
    // counter.decrease = function() { return( count--) };          // long form

    return counter;
  }

  let counter = makeCounter();
  console.log(counter());
  console.log(counter());
  counter.set(10);
  console.log(counter());
  console.log(counter());
  counter.decrease();
  counter.decrease();
  console.log(counter());
  console.log(counter());
}
