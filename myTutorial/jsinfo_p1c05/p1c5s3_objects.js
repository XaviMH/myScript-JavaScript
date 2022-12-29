/* 
    SUMMARY

    Let’s step away from the individual data structures and talk about the iterations over them.

    In the previous chapter we saw methods map.keys(), map.values(), map.entries().

    These methods are generic, there is a common agreement to use them for data structures. If we ever create 
    a data structure of our own, we should implement them too.

    They are supported for:
        - Map
        - Set
        - Array

    Plain objects also support similar methods, but the syntax is a bit different.
    Object.keys, values, entries

    For plain objects, the following methods are available:
        - Object.keys(obj) – returns an array of keys.
        - Object.values(obj) – returns an array of values.
        - Object.entries(obj) – returns an array of [key, value] pairs.

    Please note the distinctions (compared to map for example):
	                        Map 	           Object
            Call syntax 	map.keys() 	       Object.keys(obj), but not obj.keys()
            Returns 	    iterable 	       “real” Array

        - The first difference is that we have to call Object.keys(obj), and not obj.keys().
          Why so? The main reason is flexibility. Remember, objects are a base of all complex structures in 
          JavaScript. So we may have an object of our own like data that implements its own data.values() method. 
          And we still can call Object.values(data) on it.
        - The second difference is that Object.* methods return “real” array objects, not just an iterable. 
          That’s mainly for historical reasons.

*/

/*
  Theory 1
  Loop over a property value of an object
*/
{
    console.log("Theory 1 ---------");
    let user = {
        name: "John",
        age: 30
    };

    // loop over values
    for (let value of Object.values(user)) {
        console.log(value); // John, then 30
    }

}

/* 
    Theory 2
    Objects lack many methods that exist for arrays, e.g. map, filter and others.
    If we’d like to apply them, then we can use Object.entries followed by Object.fromEntries:
        - Use Object.entries(obj) to get an array of key/value pairs from obj.
        - Use array methods on that array, e.g. map, to transform these key/value pairs.
        - Use Object.fromEntries(array) on the resulting array to turn it back into an object.

*/
{
    console.log("Theory 2 ---------");
    let prices = {
        banana: 1,
        orange: 2,
        meat: 4,
    };

    let doublePrices = Object.fromEntries(
        // convert prices to array, map each key/value pair into another pair
        // and then fromEntries gives back the object
        Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
    );

    console.log(doublePrices.banana); // 2 (i.e. 1*2 )
    console.log(doublePrices.orange); // 4 (i.e. 2*2 )
    console.log(doublePrices.meat);   // 8 (i.e. 4*2 )
    
}