/*
  SUMMARY

  Remember that Arrow functions:
    1) Do not have this
    2) Do not have arguments
    3) Can’t be called with new
    4) They also don’t have super (but we didn’t study it yet, we will on the chapter Class inheritance)

  That’s because they are meant for short pieces of code that do not have their own “context”, but rather work
  in the current one. And they really shine in that use case.
*/

/* 
  Theory 1
  In the following example, displayThis2 and displayThis3 are equivalent. Each of these is the outer lexical environment of the 
  arrow function, but that's probably more obvious in displayThis3 where the expression is pulled out of
  the function call.
*/
console.log("Theory 1 -------------------");
{
  let person = {
    name: "Joe",
    displayThis1() {
      setTimeout(function() {
        console.log(this.name); // window.name
      }, 0);
    },
    displayThis2() {
      setTimeout(() => console.log(this.name), 0); // person.name
    },
    displayThis3() {
      const f = () => console.log(this.name);
      setTimeout(f, 0); // person.name
    }
  }

  window.name = "My Window";
  person.displayThis1(); // My Window
  person.displayThis2(); // Joe
  person.displayThis3(); // Joe
}

/* 
  Theory 2 
  Arrow functions also have no arguments variable.
  That’s great for decorators, when we need to forward a call with the current this and arguments.
  For instance, defer(f, ms) gets a function and returns a wrapper around it that delays the call by ms milliseconds:
*/
console.log("Theory 2 -------------------");
{
  function defer(f, ms) {
    return function() {
      setTimeout(() => f.apply(this, arguments), ms);
    };
  }

  // Which would be the shorthand of:
  //   function defer(f, ms) {
  //     return function(...args) {
  //       let ctx = this;
  //       setTimeout(function() {
  //         return f.apply(ctx, args);
  //       }, ms);
  //     };
  //   }
  
  function sayHi(who) {
    console.log(`Thoery 2 saying: [Hello, ${who}]`);
  }
  
  let sayHiDeferred = defer(sayHi, 2000);
  sayHiDeferred("John"); // Hello, John after 2 seconds   


}