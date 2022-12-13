
// Theory -------------------------------------------------------------------------------------------------------

// About Iterators ------------------------------------------------------------------------------------------------

/* Theory 1 */
// We can build an iterator from anythign that can be iterated. For example:
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

/* Theory 2 */
// Remember that strings are iterable!
for (let char of "test") {
  console.log( char ); // t, then e, then s, then t
}

// We can break the previous loop into a simple "for..of" into a "while", like so:
let str = "Hello";
let iterator = str[Symbol.iterator]();
while (true) {
  let result = iterator.next();
  if (result.done) break;
  console.log(result.value); // outputs characters one by one
}