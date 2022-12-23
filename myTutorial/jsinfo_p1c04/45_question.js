
// Theory -------------------------------------------------------------------------------------------------------
// The optional chaining "?."" syntax has three forms:
//   1)  obj?.prop      – returns obj.prop if obj exists, otherwise undefined
//   2)  obj?.[prop]    – returns obj[prop] if obj exists, otherwise undefined
//   3)  obj.method?.() – calls obj.method() if obj.method exists, otherwise returns undefined
let userAdmin;
let userAGuest;

/* Theory 1 */
userAdmin = {name: "John"};  // a user without "address" property

// The following line will throw an "Error", and the JS will end right there
// console.log(user.address.street);  

// The following two lines are OK, but they repeat the same variable multiple times
console.log(userAdmin.address ? userAdmin.address.street : undefined); 
console.log(userAdmin.address ? userAdmin.address.street ? userAdmin.address.street.name : null : null);
console.log(userAdmin.address && userAdmin.address.street && userAdmin.address.street.name );

// The easiest way would be this one, which returns "Undefined" instead of an "Error"
console.log( userAdmin.address?.street ); 

/* Theory 2 */
// It works for functions too!
userAdmin = {
    name: "John",
    //report: function() {  // way 1 (to define a function inside an object -cleaner-)
    report() {              // way 2 (to define a function inside an object -shorter-)
        console.log(`I am ${this.name}, and I am the admin!`);
    },
};
userGuest = {
    name: "Pete",
};

userAdmin.report?.();                               // This will print "I am John, and I am the admin"
console.log("> My name is", userAdmin?.["name"]);   // This will print "My name is John"

userGuest.report?.();                               // No printing (given that function "userGuest.report()" does not exist)
console.log("> My name is", userGuest?.["name"]);   // This will print "My name is John"