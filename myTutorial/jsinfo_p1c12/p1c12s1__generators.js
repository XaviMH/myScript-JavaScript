
/*
  SUMMARY

  Generators are created by generator functions function* f(…) {…}.
  Inside generators (only) there exists a yield operator.
  The outer code and the generator may exchange results via next/yield calls.

  In modern JavaScript, generators are rarely used. But sometimes they come in handy, 
  because the ability of a function to exchange data with the calling code during the 
  execution is quite unique. And, surely, they are great for making iterable objects.

  Also, in the next chapter we’ll learn async generators, which are used to read streams 
  of asynchronously generated data (e.g paginated fetches over a network) in 
  for await ... of loops.

  In web-programming we often work with streamed data, so that’s another very important
  use case.

*/


/* 
  Theory 1 
 
  Regular functions return only one, single value (or nothing).

  Generators can return (“yield”) multiple values, one after another, on-demand. They 
  work great with iterables, allowing to create data streams with ease.

  The main method of a generator is next(). When called, it runs the execution until the nearest yield <value> statement (value can be omitted, then it’s undefined). Then the function execution pauses, and the yielded value is returned to the outer code.

  The result of next() is always an object with two properties:
   - value: the yielded value.
   - done: true if the function code has finished, otherwise false.

*/
{
  function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
  }
  
  let generator = generateSequence();
  
  let one = generator.next();
  console.log(JSON.stringify(one)); // {value: 1, done: false}

  let two = generator.next();
  console.log(JSON.stringify(two)); // {value: 2, done: false}

  let three = generator.next();
  console.log(JSON.stringify(three)); // {value: 3, done: false}
}

/*
  Theory 2

  Generators are iterable!

  
  However, please note that the example below shows 1, then 2, and that’s all. It doesn’t show 3!
  It’s because for..of iteration ignores the last value, when done: true. So, if we want all 
  results to be shown by for..of, we must return them with yield.
*/
{
  function* generateSequence() {
    yield 1;
    yield 2;
    yield 3;  // a @yield replaces the @return
  }
  
  let generator = generateSequence();
  
  for(let value of generator) {
    console.log(value); // 1, then 2, then 3
  }


}

/*
  Theory 3

  As we already checked in the Iterables, on can manually create an iterable like so. 
  But, equivalently, one can also create a generator iterable, shown below:
*/

{
  let range = {
    from: 1,
    to: 5,
  
    // for..of range calls this method once in the very beginning
    [Symbol.iterator]() {
      // ...it returns the iterator object:
      // onward, for..of works only with that object, asking it for next values
      return {
        current: this.from,
        last: this.to,
  
        // next() is called on each iteration by the for..of loop
        next() {
          // it should return the value as an object {done:.., value :...}
          if (this.current <= this.last) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        }
      };
    }
  };
  
  // iteration over range returns numbers from range.from to range.to
  console.log([...range]); // 1,2,3,4,5
}

{
  let range = {
    from: 1,
    to: 5,
  
    *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
      for(let value = this.from; value <= this.to; value++) {
        yield value;
      }
    }
  };
  
  console.log( [...range] ); // 1,2,3,4,5
}

/* 
  Theory 4

  Generators accept parameters, as so...
*/
{
  function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) yield i;
  }

  let generator = generateSequence(1,5);

  for(let value of generator) {
    console.log(value);
  }
}


/*
  Theory 5

  Note that @yield can have several uses
  In particular, yield* The yield* directive delegates the execution to another 
  generator. This term means that yield* gen iterates over the generator gen 
  and transparently forwards its yields outside. As if the values were yielded
  by the outer generator.

  The following 2 test demosntrate the same behaviour with 2 pieces of code...

*/
{
  function* generateAlphaNum() {
    for (let i = 48; i <= 57; i++) yield i;
    for (let i = 65; i <= 90; i++) yield i;
    for (let i = 97; i <= 122; i++) yield i;
  }

  let str = '';
  for(let code of generateAlphaNum()) {
    str += String.fromCharCode(code);
  }
  console.log(str); // 0..9A..Za..z
}

{
  function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) yield i;
  }
  
  function* generatePasswordCodes() {
    yield* generateSequence(48, 57);
    yield* generateSequence(65, 90);
    yield* generateSequence(97, 122);
  }
  
  let str = '';
  for(let code of generatePasswordCodes()) {
    str += String.fromCharCode(code);
  }
  console.log(str); // 0..9A..Za..z
}

/* 
  Theory 6

  yield is powerful!

  Until this moment, generators were similar to iterable objects, with a special 
  syntax to generate values. But in fact they are much more powerful and flexible.

  That’s because yield is a two-way street: it not only returns the result to the 
  outside, but also can pass the value **inside** the generator.

  To do so, we should call generator.next(arg), with an argument. That argument 
  becomes the result of yield.
  
*/
{
  function* gen() {
    let ask1 = yield "2 + 2 = ?";
    console.log(ask1); // 4

    let ask2 = yield "3 * 3 = ?"
    console.log(ask2); // 9
  }

  let generator = gen();
  console.log( generator.next().value );   // "2 + 2 = ?"
  console.log( generator.next(4).value );     // "4", and "3 * 3 = ?"
  console.log( generator.next(9).done );      // "9", and "true"
}
