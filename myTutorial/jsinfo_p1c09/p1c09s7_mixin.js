
/*
  SUMMARY

  Mixin – is a generic object-oriented programming term: a class that contains methods for other 
  classes.

  Some other languages allow multiple inheritance. JavaScript does not support multiple inheritance, 
  but mixins can be implemented by copying methods into prototype.

  We can use mixins as a way to augment a class by adding multiple behaviors, like event-handling 
  as we have seen above.

  Mixins may become a point of conflict if they accidentally overwrite existing class methods. So 
  generally one should think well about the naming methods of a mixin, to minimize the probability 
  of that happening.
*/

/* 
  Theory 1
  The simplest way to implement a mixin in JavaScript is to make an object with useful methods, so 
  that we can easily merge them into a prototype of any class.
  For instance here the mixin sayHiMixin is used to add some “speech” for User
  Note that there’s no inheritance, but a simple method copying
*/
{
  // mixin
  let sayHiMixin = {
    sayHi() {
      console.log(`Hello ${this.name}`);
    },
    sayBye() {
      console.log(`Bye ${this.name}`);
    }
  };

  // usage:
  class User {
    constructor(name) {
      this.name = name;
    }
  }

  // copy the methods
  Object.assign(User.prototype, sayHiMixin);

  // now User can say hi
  new User("Dude").sayHi(); // Hello Dude!

}

/* 
  Theory 2 
  Note that mixin can also make use of inherited methods
  Please note that the call to the parent method super.say() from sayHiMixin (at lines labelled
  with (*)) looks for the method in the prototype of that mixin, not the class.
*/
console.log("Theory 2 ---------------------------------");
{
  let sayMixin = {
    say(phrase) {
      console.log(phrase);
    }
  };
  
  let sayHiMixin = {
    __proto__: sayMixin, // (or we could use Object.setPrototypeOf to set the prototype here)
  
    sayHi() {
      // call parent method
      super.say(`Hello ${this.name}`); // (*)
    },
    sayBye() {
      super.say(`Bye ${this.name}`); // (*)
    }
  };
  
  class User {
    constructor(name) {
      this.name = name;
    }
  }
  
  // copy the methods
  Object.assign(User.prototype, sayHiMixin);
  
  // now User can say hi
  new User("Dudette").sayHi(); // Hello Dudette!

}

/* 
  Theory 3

  Now let’s make a mixin for real life.

  An important feature of many browser objects (for instance) is that they can generate events. Events 
  are a great way to “broadcast information” to anyone who wants it. So let’s make a mixin that allows 
  us to easily add event-related functions to any class/object.
  
  1) The mixin will provide a method .trigger(name, [...data]) to “generate an event” when something 
     important happens to it. The name argument is a name of the event, optionally followed by additional 
     arguments with event data.
  2) Also the method .on(name, handler) that adds handler function as the listener to events with the 
     given name. It will be called when an event with the given name triggers, and get the arguments from 
     the .trigger call.
  3) …And the method .off(name, handler) that removes the handler listener.

  After adding the mixin, an object user will be able to generate an event "login" when the visitor logs 
  in. And another object, say, calendar may want to listen for such events to load the calendar for the 
  logged-in person. Or, a menu can generate the event "select" when a menu item is selected, and other 
  objects may assign handlers to react on that event. And so on.

*/

console.log("Theory 3 ---------------------------------");
{
  let eventMixin = {
    /**
     * Subscribe to event, usage:
     *  menu.on('select', function(item) { ... }
    */
    on(eventName, handler) {
      if (!this._eventHandlers) this._eventHandlers = {};
      if (!this._eventHandlers[eventName]) {
        this._eventHandlers[eventName] = [];
      }
      this._eventHandlers[eventName].push(handler);
    },
  
    /**
     * Cancel the subscription, usage:
     *  menu.off('select', handler)
     */
    off(eventName, handler) {
      let handlers = this._eventHandlers?.[eventName];
      if (!handlers) return;
      for (let i = 0; i < handlers.length; i++) {
        if (handlers[i] === handler) {
          handlers.splice(i--, 1);
        }
      }
    },
  
    /**
     * Generate an event with the given name and data
     *  this.trigger('select', data1, data2);
     */
    trigger(eventName, ...args) {
      if (!this._eventHandlers?.[eventName]) {
        return; // no handlers for that event name
      }
  
      // call the handlers
      this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
    }
  };

  // And now the test the @eventMixin!
  // Make a class
  class Menu {
    choose(value) {
      this.trigger("select", value);
    }
  }
  // Add the mixin with event-related methods
  Object.assign(Menu.prototype, eventMixin);

  let menu = new Menu();

  // add a handler, to be called on selection:
  menu.on("select", value => console.log(`Value selected: ${value}`));

  // triggers the event => the handler above runs and shows:
  menu.choose("123");  // Value selected: 123

  console.log("... ending exercise");

}