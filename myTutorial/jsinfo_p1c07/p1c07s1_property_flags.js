
// Summary

// As we know, objects can store properties.

// Until now, a property was a simple “key-value” pair to us. But an object property is actually a more flexible 
// and powerful thing.

// In this chapter we’ll study additional configuration options, and in the next we’ll see how to invisibly turn 
// them into getter/setter functions (not, however, that these methods are rarely used in practice)

// Object properties, besides a value, have three special attributes (so-called “flags”):
//  1) writable – if true, the value can be changed, otherwise it’s read-only.
//  2) enumerable – if true, then listed in loops, otherwise not listed.
//  3) configurable – if true, the property can be deleted and these attributes can be modified, otherwise not.

// We didn’t see them yet, because generally they do not show up. When we create a property “the usual way”, all of them are true. But we also can change them anytime.


/* 
  Theory 1
  The method Object.getOwnPropertyDescriptor allows to query the full information about a property.
  The syntax is:
    let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
  where:
    - obj is the object to get information from.
    - propertyName is the name of the property.

  The returned value is a so-called “property descriptor” object: it contains the value and all the flags.
*/
{
  let user = {
    name: "John"
  };
  
  let descriptor = Object.getOwnPropertyDescriptor(user, 'name');
  
  console.log( JSON.stringify(descriptor, null, 2 ) );
  /* property descriptor:
  {
    "value": "John",
    "writable": true,
    "enumerable": true,
    "configurable": true
  }
  */
}

/* Theory 2 */ 
// To change the flags, we can use Object.defineProperty
{
let user = {};

  Object.defineProperty(user, "name", {
    value: "John"
  });

  let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

  console.log( JSON.stringify(descriptor, null, 2 ) );
  /*
  {
    "value": "John",
    "writable": false,
    "enumerable": false,
    "configurable": false
  }
  */
}
