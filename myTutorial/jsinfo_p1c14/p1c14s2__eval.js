
/*
  SUMMARY

  Currying is a transform that makes f(a,b,c) callable as f(a)(b)(c). JavaScript implementations
  usually both keep the function callable normally and return the partial if the arguments count 
  is not enough.

  Currying allows us to easily get partials. As we’ve seen in the logging example, after currying
  the three argument universal function log(date, importance, message) gives us partials when 
  called with one argument (like log(date)) or two arguments (like log(date, importance)).
   
*/


/* 
  Theory 1

  A simple example of currying

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
  
  let curriedSum = curry(sum);
  
  console.log( curriedSum(1)(2) ); // 3
 }