//
// Summary
// To create an object with the given prototype, use:
//   1)  literal syntax: { __proto__: ... }, allows to specify multiple properties
//   2)  or Object.create(proto, [descriptors]), allows to specify property descriptors.
//
// The Object.create provides an easy way to shallow-copy an object with all descriptors:
//
//    let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
//
// Modern methods to get/set the prototype are:
//   1)  Object.getPrototypeOf(obj) – returns the [[Prototype]] of obj (same as __proto__ getter).
//   2)  Object.setPrototypeOf(obj, proto) – sets the [[Prototype]] of obj to proto (same as __proto__ setter).

// Getting/setting the prototype using the built-in __proto__ getter/setter isn’t recommended, it’s now in the Annex B of the specification.

// We also covered prototype-less objects, created with Object.create(null) or {__proto__: null}.

// These objects are used as dictionaries, to store any (possibly user-generated) keys.

// Normally, objects inherit built-in methods and __proto__ getter/setter from Object.prototype, making corresponding keys “occupied” and potentially causing side effects. With null prototype, objects are truly empty.





/* Theory 1 */
// In the first chapter of this section, we mentioned that there are modern methods to setup a prototype.
//
// Setting or reading the prototype with obj.__proto__ is considered outdated and somewhat deprecated (moved 
// to the so-called “Annex B” of the JavaScript standard, meant for browsers only).

// The modern methods to get/set a prototype are:

//     Object.getPrototypeOf(obj) – returns the [[Prototype]] of obj.
//     Object.setPrototypeOf(obj, proto) – sets the [[Prototype]] of obj to proto.

// The only usage of __proto__, that’s not frowned upon, is as a property when creating a new object: { __proto__: ... }.

{
  let animal = {
    eats: true
  };
  
  // create a new object with @animal as a prototype
  let rabbit = Object.create(animal); // same as {__proto__: animal}
  console.log(rabbit.eats); // true
  console.log(Object.getPrototypeOf(rabbit) === animal); // true
  
  // change the prototype of rabbit to {}
  Object.setPrototypeOf(rabbit, {}); 

  // The method Object.create method is a bit more powerful, as it has an optional second argument: property descriptors.
  rabbit = Object.create(animal, {
    jumps: {
      value: true
    }
  });
  
  console.log(rabbit.jumps); // true
}

/* Theory 2 */
// We can use Object.create to perform an object cloning more powerful than copying properties in for..in:
// This call makes a truly exact copy of obj, including all properties: enumerable and non-enumerable, data 
// properties and setters/getters – everything, and with the right [[Prototype]].
{
  let obj = {};
  let clone = Object.create(
    Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj)
  );
}

/* Theory 3 */
// Now, if we intend to use an object as an associative array and be free of such problems, we can do it with a little trick,
// given that Object.create(null) creates an empty object without a prototype ([[Prototype]] is null):
{
  let obj = Object.create(null);
  // or: obj = { __proto__: null }

  //let key = prompt("What's the key?", "__proto__");
  key = "__proto__"; // quick workaround to avoid prompting the user

  obj[key] = "some value";

  console.log(obj[key]); // "some value"
}

/* Exercise 1 */
// There’s an object dictionary, created as Object.create(null), to store any key/value pairs.
//
// Add method dictionary.toString() into it, that should return a comma-delimited list of keys. 
// Your toString should not show up in for..in over the object.
{
  console.log("Exercise 1 ---------------------")
  let dictionary = Object.create(null, {
    toString: { // define toString property
      value() { // the value is a function
        return Object.keys(this).join("-...-");
      }
    }
  });
  
  dictionary.apple = "Apple";
  dictionary.__proto__ = "test";
  
  for(let key in dictionary) {
    console.log(key); // "apple", then "__proto__", given than the keys @apple and @__proto__ are in the loop
  }
  
  console.log(dictionary); // "apple<separator>__proto__", a dots-separated list of properties by toString

}

/* Exercise 2 */
// The first call has this == rabbit, the other ones have this equal to Rabbit.prototype, because it’s actually the object before the dot.
//
// So only the first call shows Rabbit, other ones show undefined:
{
  function Rabbit(name) {
    this.name = name;
  }
  Rabbit.prototype.sayHi = function() {
    console.log( this.name );
  }

  let rabbit = new Rabbit("Rabbit");

  rabbit.sayHi();                        // Rabbit
  Rabbit.prototype.sayHi();              // undefined
  Object.getPrototypeOf(rabbit).sayHi(); // undefined
  rabbit.__proto__.sayHi();              // undefined
}