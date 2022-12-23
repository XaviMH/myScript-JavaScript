
// Summary
//
// 1) All built-in objects follow the same pattern:
//    1.1) The methods are stored in the prototype (Array.prototype, Object.prototype, Date.prototype, etc.)
//    1.2) The object itself stores only the data (array items, object properties, the date)
// 2) Primitives also store methods in prototypes of wrapper objects: Number.prototype, String.prototype and Boolean.prototype. 
//    Only undefined and null do not have wrapper objects
// 3) Built-in prototypes can be modified or populated with new methods. But it’s not recommended to change them. The only 
//    allowable case is probably when we add-in a new standard, but it’s not yet supported by the JavaScript engine

/* Theory 1*/

// So then when obj.toString() is called the method is taken from Object.prototype.
// We can check it like this:
{
  // Objects
  let obj = {}; // which is the short form of --> obj = new Object()
  console.log(obj.__proto__ === Object.prototype);         // true
  console.log(obj.toString === obj.__proto__.toString);    // true
  console.log(obj.toString === Object.prototype.toString); // true

  // Arrays
  let arr = [1, 2, 3];
  console.log( arr.__proto__ === Array.prototype );            // true (it inherits from Array.prototype)
  console.log( arr.__proto__.__proto__ === Object.prototype ); // true (then from Object.prototype)
  console.log( arr.__proto__.__proto__.__proto__ );            // null (and null on the top)

  // Functions
  function f() {}
  console.log(f.__proto__ == Function.prototype);         // true
  console.log(f.__proto__.__proto__ == Object.prototype); // true (inherit from objects)

  // Primitives also store methods in prototypes of wrapper objects: Number.prototype, String.prototype 
  // and Boolean.prototype. Only undefined and null do not have wrapper objects

}

/* Theory 2 */
// In the chapter Decorators and forwarding, call/apply we talked about method borrowing.
// That’s when we take a method from one object and copy it into another.
// Some methods of native prototypes are often borrowed.
// For instance, if we’re making an array-like object, we may want to copy some Array methods to it.
// The following example works because the internal algorithm of the built-in join method only cares about 
// the correct indexes and the length property. It doesn’t check if the object is indeed an array. Many built-in methods are like that.
// Another possibility is to inherit by setting obj.__proto__ to Array.prototype, so all Array methods are automatically available in obj, but
// that’s impossible if obj already inherits from another object (remember, we only can inherit from one object at a time).
{
  let obj = {
    0: "Hello",
    1: "world!",
    length: 2,
  };
  
  obj.join = Array.prototype.join;
  
  console.log( obj.join(',') ); // Hello,world!

}

/* Exercise 1 */
// Add to the prototype of all functions the method defer(ms), that runs the function after ms milliseconds.
{
  Function.prototype.defer = function(ms) {
    setTimeout(this, ms);
  };
  
  function f() {
    console.log("Deferred 'Hello!'");
  }
  
  f.defer(1000); // shows "Hello!" after 1 sec
}

/* Exercise 2 */
// Add to the prototype of all functions the method defer(ms), that returns a wrapper, delaying the call by ms milliseconds.
{
  Function.prototype.defer = function(ms) {
    let f = this;
    return function(...args) {
      setTimeout(() => f.apply(this, args), ms);
    }
  };
  
  // check it
  function sum(a, b) {
    console.log( a + b );
  }
  
  sum.defer(2000)(1, 2); // shows "3" after 2 sec

}