/* 
  SUMMARY

  Functions are values. They can be assigned, copied or declared in any place of the code.
  If the function is declared as a separate statement in the main code flow, that’s called a “Function Declaration”.
  If the function is created as a part of an expression, it’s called a “Function Expression”.
  Function Declarations are processed before the code block is executed. They are visible everywhere in the block.
  Function Expressions are created when the execution flow reaches them.
 */
console.log("Testing the functions of JavaScript")

/*
  Theory 1
  Function Declarations
*/
{
  console.log("Function Declarations ------------------------------------")

  function pow(x, n) {
    let result = x;
    for (let i = 1; i < n; i++) {
      result *= x;
    }
    return result;
  }

  function min(a, b) {
    return a < b ? a : b;
  }

  let x = 2 // We cheat. the right way should be ---> let x = prompt("x?", '');
  let n = 2 // We cheat. the right way should be ---> let n = prompt("n?", '');
  console.log(">", pow(x, n) );
  console.log(">", min(x, n) );
}

/*
  Theory 2
  Function Expressions
*/
{
  console.log("Function Expressions ------------------------------------")

  // Simple example
  let sayHi = function(name) {
    console.log( `> Hello, ${name}` );
    return;
  };
  sayHi("John");

  // Complex example
  "use strict";
  let age = 10;       // We cheat. the right way should be ---> let x = prompt("What is your age?", 20);
  // let welcome;     // In strict mode, adding this simple like will solve the global/local issue, given that "welcome" will be a global function

  if (age < 18) {
    welcome();                  // \   (runs)
    function welcome() {        //  |
      console.log("> Hello!");  //  |  Function Declaration is available everywhere in the block where it's declared
    }                           //  |
    welcome();                  // /   (runs)

  } else {
    function welcome() {
      console.log("> Greetings!");
    }
    welcome();
  }

  try {
    welcome();  // Here we're out of curly braces, so we can not see Function Declarations made inside of them.
                // Hence, this call will return an "Error" (only in strict mode), because welcome is not defined
  } catch (err) {
    console.error(err);
  }
}

/* 
  Theory 3
  Arrow functions
*/
{ 
  console.log("Arrow Functions ------------------------------------")

  // In a single line
  let sayHello = () => console.log("Hello!");
  sayHello()

  // In a single line (v2)
  let name = "Ann";
  let sayHelloWithName = (interiorName) => console.log(`> Hello! ${interiorName}`);
  sayHelloWithName();
  sayHelloWithName(name);
  sayHelloWithName("Pepe");

  // In multiple lines (requires a "return")
  let sum = (a, b) => {  
    let result = a + b;
    return result;
  };
  console.log(">", sum(2, 3) ); // 5

  // ***VERY IMPORTANT***: Remember that Arrow Functions are just a simplification 
  // of Expression Fuctions, so that these following two calls will return the same Array
  let arr = [ 1, 15, 2 ];
  arr.sort(function(a, b) { return a - b; });  // function expressions
  console.log(arr);                            // -> [ 1, 2, 15 ]                
  arr.sort( (a, b) => a - b );                 // function arrows
  console.log(arr);                            // -> [ 1, 2, 15 ]

  let countries = ['Österreich', 'Andorra', 'Vietnam'];
  console.log( countries.sort( (a, b) => a > b ? 1 : -1) );      // would return: [Andorra, Vietnam, Österreich] (which in theory is valid, but wrong)
  console.log( countries.sort( (a, b) => a.localeCompare(b) ) ); // returns [Andorra,Österreich,Vietnam] (which we consider to be correct!)

  // Complex example of Arrow Functions (where they are used as "Callbacks")
  // ----------------------------------------------------------------------
  function askExpressions(question, yes, no) {
    yes(); // We cheat. The right way should be asking the user to confirm the question (which is done right after)
    // if (confirm(question)) yes();
    // else no();
  }
  askExpressions(
    "Do you agree to this random question?",
    function() { console.log("You agreed to the question."); },
    function() { console.log("You disagreed!"); }
  );

  // or...
  let age = 20; // We cheat in here. The correct line would be: 
                // age = prompt("What is your age?", 20);
  let askArrows = (age < 18) ?
    () => console.log('> Hello!') :
    () => console.log("> Greetings!");

  askArrows();
  console.log(askArrows);    // NOTE: the name itself will stringify the function's code itself, but it will *NOT* run it
  console.log(askArrows());  // Using parenthesis will run the function, and log the result to the console

}