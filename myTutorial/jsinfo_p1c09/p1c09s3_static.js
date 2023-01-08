/*
  SUMMARY

  Static methods are used for the functionality that belongs to the class “as a whole”. 
  It doesn’t relate to a concrete class instance.
  For example, a method for comparison Article.compare(article1, article2) or a factory 
  method Article.createTodays().
  They are labeled by the word static in class declaration.
  Static properties are used when we’d like to store class-level data, also not bound 
  to an instance.
*/

/* 
  Theory 1
  We can also assign a method to the class as a whole. Such methods are called static.
  Usually, static methods are used to implement functions that belong to the class as a 
  whole, but not to any particular object of it.
  In a class declaration, they are prepended by static keyword, like this:
*/
console.log("Theory 1 --------------------------");
{
  class User {
    static staticMethod() {
      console.log(this === User);
    }
  }
  
  User.staticMethod(); // true
}

/// ... which is equivalent to ...
{
  class User { }

  User.staticMethod = function() {
    console.log(this === User);
  };

  User.staticMethod(); // true

}

/* 
  Theory 2
  Usually, static methods are used to implement functions that belong to the class 
  as a whole, but not to any particular object of it.
  For instance, we have Article objects and need a function to compare them.
  A natural solution would be to add Article.compare static method:
*/
console.log("Theory 2 --------------------------");
{
  class Article {
    constructor(title, date) {
      this.title = title;
      this.date = date;
    }
  
    static compare(articleA, articleB) {
      return articleA.date - articleB.date;
    }
  }
  
  // usage
  let articles = [
    new Article("HTML", new Date(2019, 1, 1)),
    new Article("CSS", new Date(2019, 0, 1)),
    new Article("JavaScript", new Date(2019, 11, 1))
  ];
  
  articles.sort(Article.compare);
  
  console.log( articles[0].title ); // CSS

}

/* 
  Theory 3

  Another example would be a so-called “factory” method.
  Let’s say, we need multiple ways to create an article:
    1)  Create by given parameters (title, date etc).
    2)  Create an empty article with today’s date.
    3)  …or else somehow.
  The first way can be implemented by the constructor. And for the second one we can make 
  a static method of the class. Such as Article.createTodays() here
  Note that for class B extends A the prototype of the class B itself points
  to A: B.[[Prototype]] = A. So if a field is not found in B, the search continues in A.
*/
console.log("Theory 3 --------------------------");
{
  class Article {
    constructor(title, date) {
      this.title = title;
      this.date = date;
    }
  
    static createTodays() {
      // remember, this = Article
      return new this("Today's digest", new Date());
    }
  }
  
  let article = Article.createTodays();
  
  console.log( article.title ); // Today's digest

}

/* 
  Theory 4
  In this example we mix class static proerties with a function that is editing them
*/
console.log("Theory 4 --------------------------");
{
  class Animal {
    static planet = "Earth";
  
    constructor(name, speed) {
      this.speed = speed;
      this.name = name;
    }
  
    run(speed = 0) {
      this.speed += speed;
      console.log(`${this.name} runs with speed ${this.speed}.`);
    }
  
    static compare(animalA, animalB) {
      return animalA.speed - animalB.speed;
    }
  
  }
  
  // Inherit from Animal
  class Rabbit extends Animal {
    hide() {
      console.log(`${this.name} hides!`);
    }
  }
  
  let rabbits = [
    new Rabbit("White Rabbit", 10),
    new Rabbit("Black Rabbit", 5)
  ];
  
  rabbits.sort(Rabbit.compare);
  rabbits[0].hide(); // Black Rabbit hides!
  rabbits[0].run();  // Black Rabbit runs with speed 5.
  console.log(Rabbit.planet); // Earth
}

/* 
  Exercise 1
  As we know, all objects normally inherit from Object.prototype and get access to “generic” object methods like hasOwnProperty etc.
  But if we spell it out explicitly like "class Rabbit extends Object", then the result would be different from a simple "class Rabbit"?
  What’s the difference?
*/
console.log("Exercise 1 --------------------")
{
  class Rabbit extends Object {  // (*) <--- issue comes here
    constructor(name) {
      super();                   // (*) <--- which is called by typing super(), the parent constructor when inheriting
      this.name = name;
    }
  }
  
  let rabbit = new Rabbit("Rab");
  
  console.log( rabbit.hasOwnProperty('name') ); // true
}

// .. but be aware that we don’t have extends Object, then Rabbit.__proto__ is not set to Object.
// As a consequence, Rabbit doesn’t provide access to static methods of Object in that case. 
// You can see it here:
{
  class Rabbit {}

  console.log( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
  console.log( Rabbit.__proto__ === Object ); // (2) false (!)
  console.log( Rabbit.__proto__ === Function.prototype ); // (3) true, as any function by default

  // error, no such function in Rabbit
  try{
    console.log ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // Error, given that @getOwnPropertyNames is a static method of Object
  } catch (error){
    console.error(error);
  }

}

