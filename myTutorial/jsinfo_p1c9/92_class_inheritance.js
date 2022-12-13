//
// Summary
//
// To extend a class: 
//    - class Child extends Parent:
//    - That means Child.prototype.__proto__ will be Parent.prototype, so methods are inherited.
//
// When overriding a constructor:
//    - We must call parent constructor as super() in Child constructor before using this.
// 
// When overriding another method:
//    - We can use super.method() in a Child method to call Parent method.
//
// Internals:
//    - Methods remember their class/object in the internal [[HomeObject]] property. That’s how super resolves parent methods.
//    - So it’s not safe to copy a method with super from one object to another.
//
// Also:
//    - Arrow functions don’t have their own this or super, so they transparently fit into the surrounding context.


/* Theory 1 */
// If we assume that we have the animal class, we can create a rabbit one that extends it with the "extends" word, like so:
{
  class Animal {
    constructor(name) {
      this.speed = 0;
      this.name = name;
    }
    run(speed) {
      this.speed = speed;
      console.log(`${this.name} runs with speed ${this.speed}.`);
    }
    stop() {
      this.speed = 0;
      console.log(`${this.name} stands still.`);
    }
  }

  class Rabbit extends Animal {
    hide() {
      console.log(`${this.name} hides!`);
    }
  }

  let animal = new Animal("My animal");
  let rabbit = new Rabbit("White Rabbit");
  rabbit.run(5); // White Rabbit runs with speed 5.
  rabbit.hide(); // White Rabbit hides!

}

/* Theory 2 */
// Now let’s move forward and override a method. By default, all methods that are not specified in class Rabbit are 
// taken directly “as is” from class Animal.
// But if we specify our own method in Rabbit, such as stop() then it will be used instead
// Usually, however, we don’t want to totally replace a parent method, but rather to build on top of it to tweak or 
// extend its functionality. We do something in our method, but call the parent method before/after it or in the process.
// Classes provide "super" keyword for that.
{
  class Animal {

    constructor(name) {
      this.speed = 0;
      this.name = name;
    }
  
    run(speed) {
      this.speed = speed;
      console.log(`${this.name} runs with speed ${this.speed}.`);
    }
  
    stop() {
      this.speed = 0;
      console.log(`${this.name} stands still.`);
    }
  
  }
  
  class Rabbit extends Animal {
    hide() {
      console.log(`${this.name} hides!`);
    }
  
    stop() {
      super.stop(); // call parent stop
      this.hide(); // and then hide
    }
  }
  
  let rabbit = new Rabbit("White Rabbit");
  
  rabbit.run(5); // White Rabbit runs with speed 5.
  rabbit.stop(); // White Rabbit stands still. White Rabbit hides!

}

/* Theory 3 */ 
// Overwriting the constuctor is a little more complex however
{
  class Animal {
    constructor(name) {
      this.speed = 0;
      this.name = name;
    }
    // ...
  }
  
  class Rabbit extends Animal {
  
    constructor(name, earLength) {
      this.speed = 0;
      this.name = name;
      this.earLength = earLength;
    }
  
    // ...
  }
  
  // Doesn't work!
  try{
    let rabbit = new Rabbit("White Rabbit", 10); // Error: this is not defined.
  } catch (error){ 
    console.error("Something went wrong assigning the constructor or @rabbit. The error being: " + error);
  }
}

// the solution is the following...
{
  class Animal {

    constructor(name) {
      this.speed = 0;
      this.name = name;
    }
  
    // ...
  }
  
  class Rabbit extends Animal {
  
    constructor(name, earLength) {
      super(name); // (*)
      this.earLength = earLength;
    }
  
    // ...
  }
  
  // now fine
  let rabbit = new Rabbit("White Rabbit", 10);
  console.log(rabbit.name); // White Rabbit
  console.log(rabbit.earLength); // 10  
  
}

/* Theory 3 */
// Beware of this particular case
{
  class Animal {
    name = 'animal';
  
    constructor() {
      console.log(this.name); // (*)
    }
  }
  
  class Rabbit extends Animal {
    name = 'rabbit';
  }
  
  new Animal(); // animal
  new Rabbit(); // animal
}
{
  class Animal {
    showName() {  // instead of this.name = 'animal'
      console.log('animal');
    }
  
    constructor() {
      this.showName(); // instead of console.log(this.name);
    }
  }
  
  class Rabbit extends Animal {
    showName() {
      console.log('rabbit');
    }
  }
  
  new Animal(); // animal
  new Rabbit(); // rabbit
}

/* Exercise 1 */
// Here’s the code with Rabbit extending Animal.
// Unfortunately, Rabbit objects can’t be created. What’s wrong? Fix it.
{
  class Animal {

    constructor(name) {
      this.name = name;
    }

  }

  class Rabbit extends Animal {
    constructor(name) {
      super(name);  // <---- this line was missing!
      this.created = Date.now();
    }
  }

  let rabbit = new Rabbit("White Rabbit"); // ok now
  console.log(rabbit.name); // White Rabbit
}


/* Exercise 2 */
// We’ve got a Clock class. As of now, it prints the time every second.
// Create a new class ExtendedClock that inherits from Clock and adds the parameter precision – the number of 
// ms between “ticks”. Should be 1000 (1 second) by default.
//   1) Your code should be in the file extended-clock.js
//   2) Don’t modify the original clock.js. Extend it.
{
  class Clock {
    constructor({ template }) {
      this.template = template;
    }
  
    render() {
      let date = new Date();
  
      let hours = date.getHours();
      if (hours < 10) hours = '0' + hours;
  
      let mins = date.getMinutes();
      if (mins < 10) mins = '0' + mins;
  
      let secs = date.getSeconds();
      if (secs < 10) secs = '0' + secs;
  
      let output = this.template
        .replace('h', hours)
        .replace('m', mins)
        .replace('s', secs);
  
      console.log(output);
    }
  
    stop() {
      clearInterval(this.timer);
    }
  
    start() {
      this.render();
      this.timer = setInterval(() => this.render(), 1000);
    }
  }

  // Assuming that you properly input both scripts in your HTML:
  //
  //    <script src="clock.js"></script>
  //    <script src="extended-clock.js"></script>
  //
  // ... then the solution would be:
  class ExtendedClock extends Clock {
    constructor(options) {
      super(options);
      let { precision = 1000 } = options;   // recommended method
      // let precision = options.precision; // alternative method
      this.precision = precision;
    }
  
    start() {
      this.render();
      this.timer = setInterval(() => this.render(), this.precision);
    }
  };

  // and the HTML test should be:
  let lowResolutionClock = new ExtendedClock({
    template: 'h:m:s',
    precision: 5000 // every 5 seconds
  });

  lowResolutionClock.start();

}
