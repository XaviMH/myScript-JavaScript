
/* 
  SUMMARY

  The instanceof operator allows to check whether an object belongs to a certain class. It also 
  takes inheritance into account.

  Such a check may be necessary in many cases. For example, it can be used for building a polymorphic 
  function, the one that treats arguments differently depending on their type.

  In short let’s summarize the type-checking methods that we know:
    works          for 	                   returns
    typeof 	       primitives 	           string
    {}.toString 	 primitives, built-in objects, objects with Symbol.toStringTag 	string
    instanceof 	   objects 	               true/false

  As we can see, {}.toString is technically a “more advanced” typeof.
  And instanceof operator really shines when we are working with a class hierarchy and want to check for the class taking into account inheritance.
*/

/* 
  Theory 1 
  How it works
*/
console.log("Theory 1 ----------------");
{
  class Rabbit {}
  let rabbit = new Rabbit();

  // is it an object of Rabbit class?
  console.log( rabbit instanceof Rabbit ); // true
}
{
  // It also works with constructor functions:
  function Rabbit() {}

  console.log( new Rabbit() instanceof Rabbit ); // true

  //…And with built-in classes like Array:
  let arr = [1, 2, 3];
  console.log( arr instanceof Array );  // true
  console.log( arr instanceof Object ); // true (given that Array extends Object)
}

/* 
  Theory 2 
  Object.prototype.toString for the type
*/
console.log("Theory 2 ----------------");
{
  let s = Object.prototype.toString;

  console.log( s.call(123) );         // [object Number]
  console.log( s.call(null) );        // [object Null]
  console.log( s.call(console.log) ); // [object Function]

}

