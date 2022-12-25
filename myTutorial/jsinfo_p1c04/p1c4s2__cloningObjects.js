
/*
  SUMMARY

  Objects are assigned and copied by reference. In other words, a variable stores not the
  “object value”, but a “reference” (address in memory) for the value. So copying such a
  variable or passing it as a function argument copies that reference, not the object itself.

  All operations via copied references (like adding/removing properties) are performed on the 
  same single object.

  To make a “real copy” (a clone) we can use Object.assign for the so-called “shallow copy” 
  (nested objects are copied by reference) or a “deep cloning” function structuredClone or 
  use a custom cloning implementation, such as _.cloneDeep(obj).
*/

/*
 Theory 1: Objects are stored by reference 
*/
{
  console.log("Type 0")
  let user = { name: "John" };
  let admin = user;                  // copy the reference
  console.log(">", user == admin );  // true, both variables reference the same object
  console.log(">", user === admin ); // true, both variables reference the same object
}

/*
 Theory 2:
  If we want to copy the fields one by one, we can either useeither of these 2 methods:
*/ 
{
  console.log("Type 1")
  user = {
    name: "Johnny",
    age: 30
  };

  admin = {};               // the new empty object
  for (let key in user) {
    admin[key] = user[key];
  }
  admin.name = "Pete";          // now admin is a fully independent Object with the same content
  console.log(">", user.name ); // still John in the original user Object
}
// ... or
{
  console.log("Type 2")
  user = { name: "John" };
  let permissions1 = { canView: true };
  let permissions2 = { canEdit: true };
  Object.assign(user, permissions1, permissions2); // copies all properties from permissions1 and permissions2 into user
                                                  // now user = { name: "John", canView: true, canEdit: true }
  console.log(">", user.name);     // John
  console.log(">", user.canView);  // true
  console.log(">", user.canEdit);  // true
}


/*
  Theory 3:
  However, this still fails when user has inside of it!!
  For those purposes we will have to use a new call: @structuredClone
*/ 
{
console.log("Type 3")
  user = {
    name: "John",
    sizes: {
      height: 182,
      width: 50
    }
  };
  admin = structuredClone(user);
  console.log(">",user.sizes === admin.sizes ); // false, different objects
                                                // user and clone are totally unrelated now
  user.sizes.width = 60;               // change a property from one place within @user
  console.log(">", admin.sizes.width); // 50, the value of @admin, which is not related to @user
}