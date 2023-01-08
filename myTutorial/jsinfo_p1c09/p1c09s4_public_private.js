/*
  SUMMARY 

  In terms of OOP, delimiting of the internal interface from the external one is called encapsulation.
  In object-oriented programming, properties and methods are split into two groups:
    1) Internal interface – private methods and properties, accessible from other methods of the class, but not from the outside.
    2) External interface – public methods and properties, accessible also from outside the clas 

  It gives the following benefits:  

    1) Protection for users, so that they don’t shoot themselves in the foot
      Imagine, there’s a team of developers using a coffee machine. It was made by the “Best CoffeeMachine” company, and works fine, 
      but a protective cover was removed. So the internal interface is exposed.
      All developers are civilized – they use the coffee machine as intended. But one of them, John, decided that he’s the smartest 
      one, and made some tweaks in the coffee machine internals. So the coffee machine failed two days later.
      That’s surely not John’s fault, but rather the person who removed the protective cover and let John do his manipulations.
      The same in programming. If a user of a class will change things not intended to be changed from the outside – the consequences 
      are unpredictable.  

    2) Supportable
      The situation in programming is more complex than with a real-life coffee machine, because we don’t just buy it once. The code 
      constantly undergoes development and improvement.
      If we strictly delimit the internal interface, then the developer of the class can freely change its internal properties and methods, 
      even without informing the users.
      If you’re a developer of such class, it’s great to know that private methods can be safely renamed, their parameters can be changed, 
      and even removed, because no external code depends on them.
      For users, when a new version comes out, it may be a total overhaul internally, but still simple to upgrade if the external interface
      is the same.  

    3) Hiding complexity
      People adore using things that are simple. At least from outside. What’s inside is a different thing.
      Programmers are not an exception.
      It’s always convenient when implementation details are hidden, and a simple, well-documented external interface is available. 

  To hide an internal interface we use either protected or private properties:
    - Protected fields start with _. That’s a well-known convention, not enforced at the language level. Programmers should only access a field 
      starting with _ from its class and classes inheriting from it.
    - Private fields start with #. JavaScript makes sure we can only access those from inside the class.
*/

/* 
  Theory 1
  A simple coffee machine, where private properties are suffixed by an underscore
*/
{
  class CoffeeMachine {
    _waterAmount = 0;
  
    constructor(power) {
      this._power = power;
    }

    set waterAmount(value) {
      if (value < 0) {
        value = 0;
      }
      this._waterAmount = value;
    }
  
    get waterAmount() {
      return this._waterAmount;
    }

    get power() {
      return this._power;
    }
    
  }
  
  let coffeeMachine = new CoffeeMachine(100);  // create the coffee machine (with power being 100 -watts-) 
  coffeeMachine.waterAmount = 200;             // add water
  console.log(`Power is: ${coffeeMachine._power}W`); // Power is: 100W

  try{
    coffeeMachine._power = 25; // In theory it should produce an Error, given that CoffeMachine has no setter for @_power
  } catch (error) {
    console.error(error);
  }

  console.log(`Power is: ${coffeeMachine._power}W`); // Power is: 100W
  console.log("End!");

}