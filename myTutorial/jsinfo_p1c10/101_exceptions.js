//
// Summary

// We can inherit from Error and other built-in error classes normally. We just need to take care 
// of the name property and don’t forget to call super.
// We can use instanceof to check for particular errors. It also works with inheritance. But 
// sometimes we have an error object coming from a 3rd-party library and there’s no easy way to get 
// its class. Then name property can be used for such checks.
// Wrapping exceptions is a widespread technique: a function handles low-level exceptions and 
// creates higher-level errors instead of various low-level ones. Low-level exceptions sometimes 
// become properties of that object like err.cause in the examples above, but that’s not strictly required.


/* Theory 1 */
// The simpye try/catch/finish method
{ 
    try {   
      pop(); // undeclared!
  
    } catch (err) {
      console.log('Error detected!'); 

    } finally {
      console.log('Operation ended!'); 
    }
}

/* Theory 2 */
// You can throw any type of error (even primitives if you wish so)
{
  let json = '{ "age": 30 }'; // incomplete data

  try {

    let user = JSON.parse(json);  // no errors

    console.log( user.name );     // no name!
    if (!user.name) {
      throw new SyntaxError("Incomplete data: no name"); // (*)
    }

  } catch (err) {

    if (err instanceof SyntaxError) {
      console.log('SyntaxError'); // "ReferenceError" for accessing an undefined variable
    } else {
      console.log('Abstract Error');
    }

  } finally {    
      console.log("The script ends here");
  }
}

/* Theory 3 */
// Alternatively, you can throw an error, but note that it will have to be catched by an exterior ty/catch method

{ 
  function readData() {
    let json = '{ "age": 30 }';
  
    try {
      // ...
      blabla(); // error!
    } catch (err) {
      // ...
      if (!(err instanceof SyntaxError)) {
        throw err; // rethrow (don't know how to deal with it)
      }
    }
  }

  try {
    readData();
  } catch (err) {
    console.log( "External catch got: " + err ); // caught it!
  }

}

/* Theory 4 */
// The error class can be extended
{
  class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "ValidationError";
    }
  }
  
  // Usage
  function readUser(json) {
    let user = JSON.parse(json);
  
    if (!user.age) {
      throw new ValidationError("No field: age");
    }
    if (!user.name) {
      throw new ValidationError("No field: name");
    }
  
    return user;
  }
  
  // Working example with try..catch
  
  try {
    let user = readUser('{ "age": 25 }');
  } catch (err) {
    if (err instanceof ValidationError) {
      console.log("Invalid data: " + err.message); // Invalid data: No field: name
    } else if (err instanceof SyntaxError) { // (*)
      console.log("JSON Syntax Error: " + err.message);
    } else {
      throw err; // unknown error, rethrow it (**)
    }
  }

}

/* Theory 5 */
// Remember that error can inherit themselves!
{
  class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "ValidationError";
    }
  }
  
  class PropertyRequiredError extends ValidationError {
    constructor(property) {
      super("No property: " + property);
      this.name = "PropertyRequiredError";
      this.property = property;
    }
  }
  
  // Usage
  function readUser(json) {
    let user = JSON.parse(json);
  
    if (!user.age) {
      throw new PropertyRequiredError("age");
    }
    if (!user.name) {
      throw new PropertyRequiredError("name");
    }
  
    return user;
  }
  
  // Working example with try..catch
  
  try {
    let user = readUser('{ "age": 25 }');
  } catch (err) {
    if (err instanceof ValidationError) {
      console.log("Invalid data: " + err.message); // Invalid data: No property: name
      console.log(err.name); // PropertyRequiredError
      console.log(err.property); // name
    } else if (err instanceof SyntaxError) {
      console.log("JSON Syntax Error: " + err.message);
    } else {
      throw err; // unknown error, rethrow it
    }
  }  
}

/* Exercise 1 */
// Create a class FormatError that inherits from the built-in SyntaxError class.
// It should support message, name and stack properties.
{
  class FormatError extends SyntaxError {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
    }
  }
  
  let err = new FormatError("formatting error");
  
  console.log( err.message ); // formatting error
  console.log( err.name ); // FormatError
  console.log( err.stack ); // stack
  
  console.log( err instanceof FormatError ); // true
  console.log( err instanceof SyntaxError ); // true (because inherits from SyntaxError)


}