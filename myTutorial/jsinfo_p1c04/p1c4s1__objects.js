
/* 
  Theory 1
  We create a new Object called "user", and play with it
*/
{
  let user = {};
  user.name = "John";
  user.surname = "Smith";
  user.age = "19";

  listProperties(user)
  delete user.name;
  listProperties(user)

  function listProperties(obj) {
    console.log("Let us list the properties of", obj.constructor.name)
    for(let prop in obj){
      console.log(`> property [${prop}] contains: [${obj[prop]}]`);
    }
  }
}

/* 
  Theory 2 
  We create the function that checks if an Object owns any property
*/
{
  let schedule = {};

  console.log( "The object has no properties?", isEmpty(schedule) ); // true
  schedule["8:30"] = "get up";
  console.log( "The object has no properties?", isEmpty(schedule) ); // false

  function isEmpty(obj) {
    for (let key in obj) {
      // if the loop has started, there is a property
      return false;
    }
    return true;
  }
}

/* 
  Theory 3
  Retun the sum of everyone's salaries within an Object
*/
{
  let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
  };

  let sum = 0;
  for (let key in salaries) {
    sum += salaries[key];
  }

  console.log(`Sum of the salaries is: ${sum}`); // 390
}

/* 
  Theory 4
  Multiply numeric values by 2 after the function "multiplyNumeric()"
*/
{
  let menu = {
    width: 200,
    height: 300,
    title: "My menu"
  };

  listProperties(menu);  // <-- picks it up from Theory 1, because we are not in "strict" mode
  multiplyNumeric(menu);
  listProperties(menu);

  function multiplyNumeric(obj) {
    for (let key in obj) {
      if (typeof obj[key] == 'number') {
        obj[key] *= 2;
      } else if (typeof obj[key] == 'string') {
        // do nothing!
      }
    }
  }
}