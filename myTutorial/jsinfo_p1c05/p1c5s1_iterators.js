
/* 
  SUMMARY

  Objects that can be used in for..of are called iterable.

    - Technically, iterables must implement the method named Symbol.iterator.
      - The result of obj[Symbol.iterator]() is called an iterator. It handles further iteration process.
      - An iterator must have the method named next() that returns an object {done: Boolean, value: any}, 
        here done:true denotes the end of the iteration process, otherwise the value is the next value.
    - The Symbol.iterator method is called automatically by for..of, but we also can do it directly.
    - Built-in iterables like strings or arrays, also implement Symbol.iterator.
    - String iterator knows about surrogate pairs.

  Objects that have indexed properties and length are called array-like. Such objects may also have other
  properties and methods, but lack the built-in methods of arrays.

  If we look inside the specification – we’ll see that most built-in methods assume that they work with 
  iterables or array-likes instead of “real” arrays, because that’s more abstract.

  Array.from(obj[, mapFn, thisArg]) makes a real Array from an iterable or array-like obj, and we can 
  then use array methods on it. The optional arguments mapFn and thisArg allow us to apply a function to 
  each item.

*/

/* 
  Theory 1 
  We can build an iterator from anythign that can be iterated. For example:
*/
{
  let range = {
    from: 1,
    to: 5,
  }

  // We can iterate from 1 to 5 like so:
  range = {
    from: 1,
    to: 5,

    [Symbol.iterator]() {
      this.current = this.from;
      return this;
    },

    next() {
      if (this.current <= this.to) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };

  for (let num of range) {
    console.log(num); // 1, then 2, 3, 4, 5
  }
}

/* 
  Theory 2 
  Remember that strings are iterable!
*/
{
  for (let char of "test") {
    console.log( char ); // t, then e, then s, then t
  }

  // We can break the previous loop into a simple "for..of" into a "while", like so:
  let str = "yadda";
  let iterator = str[Symbol.iterator]();
  while (true) {
    let result = iterator.next();
    if (result.done) break;
    console.log(result.value); // outputs characters one by one
  }
}