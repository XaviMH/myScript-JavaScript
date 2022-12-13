
// Summary
// In programming, we often want to take something and extend it.

// For instance, we have a user object with its properties and methods, and want to make admin and guest as
//  slightly modified variants of it. We’d like to reuse what we have in user, not copy/reimplement its 
//  methods, just build a new object on top of it.

// Prototypal inheritance is a language feature that helps in that.

// AS s a summary:
// - In JavaScript, all objects have a hidden [[Prototype]] property that’s either another object or null.
// - We can use obj.__proto__ to access it (a historical getter/setter, there are other ways, to be covered soon).
// - The object referenced by [[Prototype]] is called a “prototype”.
// - If we want to read a property of obj or call a method, and it doesn’t exist, then JavaScript tries to find it in the prototype.
// - Write/delete operations act directly on the object, they don’t use the prototype (assuming it’s a data property, not a setter).
// - If we call obj.method(), and the method is taken from the prototype, this still references obj. So methods always work with the current object even if they are inherited.
// - The for..in loop iterates over both its own and its inherited properties. All other key/value-getting methods only operate on the object itself.

/* Theory 1 */
// Here the line (*) sets animal to be the prototype of rabbit.
// Then, when console.log tries to read property rabbit.eats (**), it’s not in rabbit, so JavaScript follows 
// the [[Prototype]] reference and finds it in animal (look from the bottom up):
{
    let animal = {
        eats: true,
        walk() {
          console.log("Animal walk");
        }
    };
    let rabbit = {
        jumps: true
    };

    rabbit.__proto__ = animal;   // (*)

    // we can find both properties in rabbit now:
    console.log( rabbit.eats );  // true (**)
    console.log( rabbit.jumps ); // true
    rabbit.walk(); // Animal walk
}

// and alternatively...
{
    let animal = {
        eats: true,
        walk() {
          console.log("Animal walk");
        }
      };
      
      let rabbit = {
        jumps: true,
        __proto__: animal
      };
      
      let longEar = {
        earLength: 10,
        __proto__: rabbit
      };
      
      // walk is taken from the prototype chain
      longEar.walk(); // Animal walk
      console.log(longEar.jumps); // true (from rabbit)

}

/* Theory 2 */
// An interesting question may arise in the example above: what’s the value of this inside set fullName(value)? 
// Where are the properties this.name and this.surname written: into user or admin?
// The answer is simple: this is not affected by prototypes at all.
// No matter where the method is found: in an object or its prototype. In a method call, this is always the 
// object before the dot.
// So, the setter call admin.fullName= uses admin as this, not user.
// That is actually a super-important thing, because we may have a big object with many methods, and have objects 
// that inherit from it. And when the inheriting objects run the inherited methods, they will modify only their own 
// states, not the state of the big object.
// As a result, methods are shared, but the object state is not.
{
    // animal has methods
let animal = {
    walk() {
      if (!this.isSleeping) {
        console.log(`I walk`);
      }
    },
    sleep() {
      this.isSleeping = true;
    }
  };
  
  let rabbit = {
    name: "White Rabbit",
    __proto__: animal
  };
  
  rabbit.sleep();   // modifies rabbit.isSleeping
  console.log(rabbit.isSleeping); // true
  console.log(animal.isSleeping); // undefined (no such property in the prototype)

}

/* Theory 3 */ 
// Beware woth the loops! (e.g. for..in), given that said loop iterates over inherited properties too
{
    let animal = {
        eats: true
      };
      
      let rabbit = {
        jumps: true,
        __proto__: animal
      };
      
      // Object.keys only returns own keys
      console.log(Object.keys(rabbit)); // jumps
      
      // for..in loops over both own and inherited keys
      for(let prop in rabbit) console.log(prop); // jumps, then eats

}

// we can abvoid this by using the method obj.hasOwnProperty(key)
{
    let animal = {
        eats: true
      };
      
      let rabbit = {
        jumps: true,
        __proto__: animal
      };
      
      for(let prop in rabbit) {
        let isOwn = rabbit.hasOwnProperty(prop);
      
        if (isOwn) {
          console.log(`Our: ${prop}`); // Our: jumps
        } else {
          console.log(`Inherited: ${prop}`); // Inherited: eats
        }
      }

}