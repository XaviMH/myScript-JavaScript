
// Theory -------------------------------------------------------------------------------------------------------

// About Destructuring-------------------------------------------------------------------------------------------
// 
// Destructuring assignment allows for instantly mapping an object or array onto many variables.

// The full object syntax:
//    let {prop : varName = default, ...rest} = object
// This means that property prop should go into the variable varName and, if no such property exists, then the default value should be used.
// Object properties that have no mapping are copied to the rest object.
//
// The full array syntax:
//    let [item1 = default, item2, ...rest] = array
// The first item goes to item1; the second goes into item2, all the rest makes the array rest.
// It’s possible to extract data from nested arrays/objects, for that the left side must have the same structure as the right one.

/* Theory 1 */
// Array destructuring, truning an array into a set of variables
{
  let arr = ["John", "Smith"]
  let [firstName, surname] = arr;
  console.log(firstName); // John
  console.log(surname);   // Smith
}

/* Theory 2 */
// It actually works with any Iterable object on the right-side (strings and Sets) and not only Arrays
{
  let [a, b, c] = "abc";                        // ["a", "b", "c"]
  let [one, two, three] = new Set([1, 2, 3]);   // [1, 2, 3]
}

/* Theory 3*/
// It's possible to manually iterate over the objects
{
  user = {
    name: "John",
    age: 30
  };

  // loop over keys-and-values
  for (let [key, value] of Object.entries(user)) {
    console.log(`> Iterting as Object: ${key}:${value}`); // name:John, then age:30
  }

  /* Theory 4 */
  // The similar code for a Map is simpler, as it’s iterable, given that we can simply
  // iterate over the map as [key, value] pairs, whhich is very convenient for destructuring
  /*let*/ user = new Map();
  user.set("name", "John");
  user.set("age", "30");

  for (let [key, value] of user) {
    console.log(`> Iterating as a Map: ${key}:${value}`); // name:John, then age:30
  }
}

/* Theory 4.5 */
// You can also iterate over Objects, too (though you have to use curly brackets)
{
  let options = {
    title: "Menu",
    width: 100,
    height: 200
  };
  let {title, width, height} = options;
  console.log(title);  // Menu
  console.log(width);  // 100
  console.log(height); // 200

  // which you can further simplyfy as...
  {
    let options = {
      title: "Menu"
    };
    let {width: w = 100, height: h = 200, title} = options;
    console.log(title);  // Menu
    console.log(w);      // 100
    console.log(h);      // 200
  }
}

/* Theory 5 */
// The 'rest' symbol: "..."
{
  let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
  console.log(name1);   // Julius
  console.log(name2);   // Caesar
  console.log(rest[0]); // Consul
  console.log(rest[1]); // of the Roman Republic
  console.log(rest.length); // 2
}

/* Theory 6 */
// Remember that you can write functions parametere like this?
{
  function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
    // ...
  }

  // ...well, tyou can do the same with destructuring, by simply passing an object to the function, like this:
  let options = {
    title: "My menu",
    items: ["Item1", "Item2"]
  };

  // ...and it immediately expands it to variables
  function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
    // title, items – taken from options,
    // width, height – defaults used
    console.log( `${title} ${width} ${height}` ); // My Menu 200 100
    console.log( items ); // Item1, Item2
  }
  showMenu(options);
}

// ... or make it even better!
{
  let options = {
    title: "My menu",
    items: ["Item1", "Item2"]
  };

  function showMenu({
    title = "Untitled",
    width: w = 100,  // width goes to w
    height: h = 200, // height goes to h
    items: [item1, item2] // items first element goes to item1, second to item2
  }) {
    console.log( `${title} ${w} ${h}` ); // My Menu 100 200
    console.log( item1 ); // Item1
    console.log( item2 ); // Item2
  }

  showMenu(options);
}