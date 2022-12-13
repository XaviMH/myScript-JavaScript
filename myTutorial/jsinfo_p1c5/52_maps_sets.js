
// Theory -------------------------------------------------------------------------------------------------------

// About Maps ------------------------------------------------------------------------------------------------
// Map is a collection of keyed data items, just like an Object. But the main difference is that Map allows keys of any type.
// Methods and properties are:
//     new Map() – creates the map.
//     map.set(key, value) – stores the value by the key.
//     map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
//     map.has(key) – returns true if the key exists, false otherwise.
//     map.delete(key) – removes the value by the key.
//     map.clear() – removes everything from the map.
//     map.size – returns the current element count.


/* Theory 1 */
// Note JS maps that they can ever store Objects as keys!
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

/* Theory 2 */
// Iterations? Use:
//  - map.keys() – returns an iterable for keys,
//  - map.values() – returns an iterable for values,
//  - map.entries() – returns an iterable for entries [key, value], it’s used by default in for..of.
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

for (let vegetable of recipeMap.keys()) { // iterate over keys (vegetables)
  console.log(vegetable);                 // --> cucumber, tomatoes, onion
}
for (let amount of recipeMap.values()) { // iterate over values (amounts)
  console.log(amount);                   // --> 500, 350, 50
}
for (let entry of recipeMap) { // iterate over [key, value] entries (the same as of recipeMap.entries())
  console.log(entry);          // --> cucumber,500 tomatoes,350 onion,50
}

// Or, alternatively, use the for.Each method that is already built in the Map objects:
recipeMap.forEach( (value, key, map) => {
  console.log(`${key}: ${value}`); // cucumber: 500 etc
});

// About Sets ------------------------------------------------------------------------------------------------
// A Set is a special type collection – “set of values” (without keys), where each value may occur only once.
// Its main methods are:
//     new Set(iterable) – creates the set, and if an iterable object is provided (usually an array), copies values from it into the set.
//     set.add(value) – adds a value, returns the set itself.
//     set.delete(value) – removes the value, returns true if value existed at the moment of the call, otherwise false.
//     set.has(value) – returns true if the value exists in the set, otherwise false.
//     set.clear() – removes everything from the set.
//     set.size – is the elements count.

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

/* Exercise 1 */
// Filter a set of words, and make it return an Array that should return an array with unique items of arr.
let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];
let mySet = new Set(values); // Adding twice the same element overwrites the previous value! 
console.log(mySet); 
console.log (Array.from(mySet));  // Hare, Krishna, :-O 

/* Exercise 2 */
// Filter anagrams!
// For instance:
//   nap <-- pan
//   ear <-- are - era
//   cheaters <-- hectares - teachers
console.log("Exercise 2");
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

/* Exercise 3 */
// Iterable keys
// We’d like to get an array of map.keys() in a variable and then apply array-specific methods to it, e.g. .push.
// But that doesn’t work:
let map2 = new Map();
map2.set("name", "John");
let keys2 = map2.keys();
try {
  keys2.push("Doe"); 
} catch (error) { console.error(error); } // Error! We cannot push into a MapIterator!

// The solution is conveting the Map into an Array
let map3 = new Map();
map3.set("name", "John");
let keys3 = Array.from(map3.keys());
keys3.push("Doe"); 
console.log(keys3); // Correct! It will print: name, more