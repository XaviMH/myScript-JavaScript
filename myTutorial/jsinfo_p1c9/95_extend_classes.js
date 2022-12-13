

/* Theory 1 */
// Built-in classes like Array, Map and others are extendable also.
// For instance, here PowerArray inherits from the native Array:
{
  // add one more method to it (can do more)
  class PowerArray extends Array {
    isEmpty() {
      return this.length === 0;
    }
  }

  let arr = new PowerArray(1, 2, 5, 10, 50);
  console.log(arr.isEmpty()); // false

  let filteredArr = arr.filter(item => item >= 10);
  console.log(filteredArr); // 10, 50
  console.log(filteredArr.isEmpty()); // false

  filteredArr = arr.filter(item => item > 200);
  console.log(filteredArr); // empty
  console.log(filteredArr.isEmpty()); // true

}

/* Theory 2 */
// Bear in mind though that Built-in objects have their own static methods, for 
// instance Object.keys, Array.isArray etc.
// As we already know, native classes extend each other. For instance, Array 
// extends Object.
// Normally, when one class extends another, both static and non-static methods
// are inherited. That was thoroughly explained in the article Static properties and methods.
// But built-in classes are an exception. They don’t inherit statics from each other.
// For example, both Array and Date inherit from Object, so their instances have methods
// from Object.prototype. But Array.[[Prototype]] does not reference Object, so there’s 
// no, for instance, Array.keys() (or Date.keys()) static method.
{
  class PowerArray extends Array {
    isEmpty() {
      return this.length === 0;
    }
  
    // built-in methods will use this as the constructor
    static get [Symbol.species]() {
      return Array;
    }
  }
  
  let arr = new PowerArray(1, 2, 5, 10, 50);
  console.log(arr.isEmpty()); // false
  
  // filter creates new array using arr.constructor[Symbol.species] as constructor
  let filteredArr = arr.filter(item => item >= 10);
  
  // filteredArr is not PowerArray, but Array
  try{
    console.log(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
  } catch (error) {
    console.error(error)
  }


}