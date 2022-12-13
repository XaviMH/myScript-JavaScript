
// Summary
// In this chapter we briefly described the way of setting a [[Prototype]] for objects created via a 
// constructor function. Later we’ll see more advanced programming patterns that rely on it.

// Everything is quite simple, just a few notes to make things clear:
//
//   1) The F.prototype property (don’t mistake it for [[Prototype]]) sets [[Prototype]] of new objects when new F() is called.
//   2) The value of F.prototype should be either an object or null: other values won’t work.
//   3) The "prototype" property only has such a special effect when set on a constructor function, and invoked with new.

/* Theory 1 */
{
  let animal = {
    eats: true
  };
  
  function Rabbit(name) {
    this.name = name;
  }
  
  Rabbit.prototype = animal;
  let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal
  console.log( rabbit.eats ); // true
}

/* Theory 2 */
{
  function Rabbit(name) {
    this.name = name;
    console.log(name);
  }
  // by default, JS assumes that:
  // Rabbit.prototype = { constructor: Rabbit }

  let rabbit = new Rabbit("White Rabbit");                // inherits from {constructor: Rabbit}
  let rabbit2 = new rabbit.constructor("Black Rabbit");   // inherits from rabbit's constructor

  console.log(rabbit.constructor == Rabbit); // true (from prototype)
}