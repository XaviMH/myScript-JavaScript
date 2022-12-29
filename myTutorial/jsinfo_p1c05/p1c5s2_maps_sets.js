/* 
  SUMMARY 

  Map – is a collection of keyed values.

  Methods and properties:
      - new Map([iterable]) – creates the map, with optional iterable (e.g. array) of [key,value] pairs for initialization.
      - map.set(key, value) – stores the value by the key, returns the map itself.
      - map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
      - map.has(key) – returns true if the key exists, false otherwise.
      - map.delete(key) – removes the element by the key, returns true if key existed at the moment of the call, otherwise false.
      - map.clear() – removes everything from the map.
      - map.size – returns the current element count.

  The differences from a regular Object:
      - Any keys, objects can be keys.
      - Additional convenient methods, the size property.

  
  Set – is a collection of unique values.

  Methods and properties:

    - new Set([iterable]) – creates the set, with optional iterable (e.g. array) of values for initialization.
    - set.add(value) – adds a value (does nothing if value exists), returns the set itself.
    - set.delete(value) – removes the value, returns true if value existed at the moment of the call, otherwise false.
    - set.has(value) – returns true if the value exists in the set, otherwise false.
    - set.clear() – removes everything from the set.
    - set.size – is the elements count.

  Iteration (over Map and Set) is always in the insertion order, so we can’t say that these collections are 
  unordered, but we can’t reorder elements or directly get an element by its number.

  Alternatively, remember that we can use Weak versions of said objects:
    - WeakMap is Map-like collection that allows only objects as keys and removes them together with associated value 
      once they become inaccessible by other means.
    - WeakSet is Set-like collection that stores only objects and removes them once they become inaccessible by other means.

  Their main advantages are that they have weak reference to objects, so they can easily be removed by garbage collector.
  That comes at the cost of not having support for clear, size, keys, values…
  WeakMap and WeakSet are used as “secondary” data structures in addition to the “primary” object storage. Once the object 
  is removed from the primary storage, if it is only found as the key of WeakMap or in a WeakSet, it will be cleaned up automatically.

*/



/* 
  Theory 1 
  Maps that they can ever store Objects as keys!
*/
console.log("Maps -----------------------------------------")
{
  let map = new Map();
  map.set('1', 'str1');   // a string key
  map.set(1, 'num1');     // a numeric key
  map.set(true, 'bool1'); // a boolean key

  let john = { name: "John"}
  map.set(john, 'John!'); // an object

  console.log( map.get(1)   );  // 'num1'
  console.log( map.get('1') );  // 'str1'
  console.log( map.get(john) ); // 'John!'
  console.log( map.size ); // 4
}

/* Theory 2 */
// Iterations? Use:
//  - map.keys() – returns an iterable for keys,
//  - map.values() – returns an iterable for values,
//  - map.entries() – returns an iterable for entries [key, value], it’s used by default in for..of.
{
  let recipeMap = new Map([
    ['cucumber', 500],
    ['tomatoes', 350],
    ['onion',    50]
  ]);

  for (let vegetable of recipeMap.keys()) { // iterate over keys (which we call "vegetables")
    console.log(vegetable);                 // --> cucumber, tomatoes, onion
  }
  for (let amount of recipeMap.values()) { // iterate over values (which we call "amounts")
    console.log(amount);                   // --> 500, 350, 50
  }
  for (let entry of recipeMap) { // iterate over [key, value] entries (the same as of recipeMap.entries())
    console.log(entry);          // --> cucumber,500 tomatoes,350 onion,50
  }

  // Or, alternatively, use the for.Each method that is already built in the Map objects:
  recipeMap.forEach( (value, key, map) => {
    console.log(`${key}: ${value}`); // ['cucumber', 500], etc
  });
}

// About Sets ------------------------------------------------------------------------------------------------
console.log("Sets -----------------------------------------")
{
  let set = new Set();

  let ann  = { name: "Ann" };
  let pete = { name: "Pete" };
  let mary = { name: "Mary" };

  // visits, some users come multiple times
  set.add(ann);
  set.add(pete);
  set.add(mary);
  set.add(ann);
  set.add(mary);

  // set keeps only unique values
  console.log( set.size ); // 3

  for (let user of set) {
    console.log(user.name); // Ann (then Pete and Mary)
  }
}

/* 
  Exercise 1
  Filter a set of words, and make it return an Array that should return an array with unique items of arr.
*/
{
  console.log("Exercise 1 ----- ");
  let values = ["Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare", ":-O"
  ];
  let mySet = new Set(values); // Adding twice the same element overwrites the previous value! 
  console.log(mySet); 
  console.log (Array.from(mySet));  // Hare, Krishna, :-O 
}

/* Exercise 2 
  
  Filter anagrams!
  For instance:
   nap <-- pan
   ear <-- are - era
   cheaters <-- hectares - teachers
*/
{
  console.log("Exercise 2 ----- ");
  function aclean(arr) {
    let map = new Map();

    for (let word of arr) {
      // for each element, split the word by letters, sort them, and join back. For example:
      let sorted = word // PAN
        .toLowerCase()  // pan
        .split('')      // ['p','a','n']
        .sort()         // ['a','n','p']
        .join('');      // anp
      map.set(sorted, word);
    }

    return Array.from(map.values());
  }

  let array = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
  console.log( aclean(array) );
}

/* 
  Exercise 3 
  Iterable keys
  We’d like to get an array of map.keys() in a variable and then apply array-specific methods to it, e.g. .push.
  But that doesn’t work:
*/
{
  console.log("Exercise 3 ----- ");
  let map;

  map = new Map();
  map.set("name", "John");
  let keys2 = map.keys();
  try {
    keys2.push("Doe"); 
  } catch (error) { console.error(error); } // Error! We cannot push into a MapIterator!

  // The solution is conveting the Map into an Array
  map = new Map();
  map.set("name", "John");
  let keys3 = Array.from(map.keys());
  keys3.push("Doe"); 
  console.log(keys3); // Correct! It will print: name, more
}