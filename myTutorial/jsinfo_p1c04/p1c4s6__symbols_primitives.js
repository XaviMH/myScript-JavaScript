
/* 
  SUMMARY

  ==== Regarding Symbols ====

    Symbol is a primitive type for unique identifiers.

    Symbols are created with Symbol() call with an optional description (name).

    Symbols are always different values, even if they have the same name. If we want 
    same-named symbols to be equal, then we should use the global registry: Symbol.for(key) 
    returns (creates if needed) a global symbol with key as the name. Multiple calls of 
    Symbol.for with the same key return exactly the same symbol.

    Symbols have two main use cases:
      - “Hidden” object properties.
      - If we want to add a property into an object that “belongs” to another script or a library, 
        we can create a symbol and use it as a property key. A symbolic property does not appear 
        in for..in, so it won’t be accidentally processed together with other properties. Also it 
        won’t be accessed directly, because another script does not have our symbol. So the property
        will be protected from accidental use or overwrite.
      - So we can “covertly” hide something into objects that we need, but others should not see, 
        using symbolic properties.
      - There are many system symbols used by JavaScript which are accessible as Symbol.*. We can 
        use them to alter some built-in behaviors. For instance, later in the tutorial we’ll use 
        Symbol.iterator for iterables, Symbol.toPrimitive to setup object-to-primitive conversion 
        and so on.

    Technically, symbols are not 100% hidden. There is a built-in method Object.getOwnPropertySymbols(obj) that allows us to get all symbols. Also there is a method named Reflect.ownKeys(obj) that returns all keys of an object including symbolic ones. But most libraries, built-in functions and syntax constructs don’t use these methods.

  ==== Regarding Primitives ====

    The object-to-primitive conversion is called automatically by many built-in functions and 
    operators that expect a primitive as a value.

    There are 3 types (hints) of it:
      - "string" (for alert and other operations that need a string)
      - "number" (for maths)
      - "default" (few operators, usually objects implement it the same way as "number")

    The specification describes explicitly which operator uses which hint.

    The conversion algorithm is:
      - Call obj[Symbol.toPrimitive](hint) if the method exists,
      - Otherwise if hint is "string"
            try calling obj.toString() or obj.valueOf(), whatever exists.
      - Otherwise if hint is "number" or "default"
            try calling obj.valueOf() or obj.toString(), whatever exists.

    All these methods must return a primitive to work (if defined).

    In practice, it’s often enough to implement only obj.toString() as a “catch-all” method for 
    string conversions that should return a “human-readable” representation of an object, for 
    logging or debugging purposes.

*/


/*
  Regarding Symbols 
   - Symbol is a primitive type for unique identifiers.
   - Symbols are created with Symbol() call with an optional description (name).
   - Symbols are always different values, even if they have the same name. If we want same-named symbols to be equal, 
     then we should use the global registry: Symbol.for(key) returns (creates if needed) a global symbol with key as
     the name. Multiple calls of Symbol.for with the same key return exactly the same symbol.
*/
{
  /* Example 1 */
  // Two identical symbols are different
  console.log("Hello world")

  let id1 = Symbol("id");
  let id2 = Symbol("id");
  console.log(id1 == id2); // false

  /* Example 2 */
  // Directly referenced Symbols can be accessed with .toString() and .description
  let id3 = Symbol("id");
  console.log(id3.toString()); // Symbol(id), now it works

  let id4 = Symbol("id");
  console.log(id4.description); // id

  /** Example 3 */
  // You can set them Object properties as Symbols in two ways:
  // 1)
  let user5 = {name: "John", age: 19};
  let id5 = Symbol("id");
  user5[id5] = "Setting the @user id value"; // We can read and write the Symbols as if they were "hidden" values
  console.log(user5[id5]);

  // 2)
  let id6 = Symbol("id");
  let user6 = {
    name: "John",
    age: 18,
    [id6]: 111333
  };
  console.log(user6[id6]);

  /* Exercise 3 */
  // Symbols are skipped by for…in
  let id7 = Symbol("id");
  let user7 = {
    name: "Ann",
    age: 30,
    [id7]: 123
  };
  for (let key in user7) console.log(key); // name, age, but no Symbols
  console.log( "Direct access to the symbol: " + user7[id7] );        // but you can still call the Symbol itself


  /* Exercise 4*/
  // In the particular case that we wish to access the same symbol, but add the .for suffix
  // read from the global registry
  let id8 = Symbol.for("id");        // if the symbol did not exist, it is created
  let id8Again = Symbol.for("id");   // read it again (maybe from another part of the code)
  console.log( id8 === id8Again );   // It will prompt "true"
}

/*
  Regarding  Primitives
    To do the conversion from an Object to a primitive (i.e. "string", "number", or "default"), JavaScript tries to 
    find and call three object methods:

    1) Call obj[Symbol.toPrimitive](hint) – the method with the symbolic key Symbol.toPrimitive (system symbol), if 
        such method exists
    2) Otherwise if hint is "string"
        try calling obj.toString() or obj.valueOf(), whatever exists.
    3) Otherwise if hint is "number" or "default"
        try calling obj.valueOf() or obj.toString(), whatever exists.
*/
{
  // So, the two following examples will work:
  // 1)
  let user9 = {
      name: "Bill",
      money: 1000,
      [Symbol.toPrimitive](hint) {
        console.log(`hint: ${hint}`);
        return hint == "string" ? `{name: "${this.name}"}` : this.money;
      }
    };
    
    // conversions demo:
    console.log(user9); // hint: string -> {name: "John"}
    console.log(+user9); // hint: number -> 1000
    console.log(user9 + 500); // hint: default -> 1500

  // 2)
  let user10 = {
      name: "Laura",
      money: 300,
      // for hint="string"}
      toString(){
        return `{name: "${this.name}"}`;
      },
      // for hint="number" or "default"
      valueOf() {
        return this.money;
      }
  };
  console.log(user10); // toString -> {name: "John"}
  console.log(+user10); // valueOf -> 1000
  console.log(user10 + 500); // valueOf -> 1500

  // As a last resort, to be 100% sure that we are catching the conversion, just use .toString()
  let obj = {
      toString: function() { // toString handles all conversions in the absence of other methods
          return "2";
      }
  };
  console.log(obj * 2) // numeric conversion! It will print: "2" * 2, or 2 * 2, or 4
  console.log(obj + 2) // string conversion!  It will print: "2" + 2, or "2" + "2", or "22"
}