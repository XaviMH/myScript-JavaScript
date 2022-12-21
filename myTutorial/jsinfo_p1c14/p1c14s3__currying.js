
/*
  SUMMARY

  A call to eval(code) runs the string of code and returns the result of the last statement.

    Rarely used in modern JavaScript, as there’s usually no need.
    Can access outer local variables. That’s considered bad practice.
    Instead, to eval the code in the global scope, use window.eval(code).
    Or, if your code needs some data from the outer scope, use new Function and pass it as arguments.
   
*/


/* 
  Theory 1

  A simple use case

  */
{
  function curry(f) { // curry(f) does the currying transform
    return function(a) {
      return function(b) {
        return f(a, b);
      };
    };
  }

  // usage
  function sum(a, b) {
    return a + b;
  }

  // no currying
  console.log( sum(1,2) );  // 3

  // curried
  let curriedSum = curry(sum);
  console.log( curriedSum(1)(2) ); // 3

}

 /* 
  Theory 2
  
  Advanced currying! This would be the one used within the library package
  More advanced implementations of currying, such as _.curry from lodash library, 
  return a wrapper that allows a function to be called both normally and partially



*/
{
  function advancedCurry(func) {
    return function curried(...args) {
      if (args.length >= func.length) {
        return func.apply(this, args);
      } else {
        return function(...args2) {
          return curried.apply(this, args.concat(args2));
        }
      }
    };
  }

  // usage
  function sum(a, b, c) {
    return a + b + c;
  }

  // advanced curring
  let curriedSum = advancedCurry(sum);
  console.log( curriedSum(3,4,5))    // 12
  console.log( curriedSum(3)(4,5) ); // 12
  console.log( curriedSum(3,4)(5) ); // 12


}