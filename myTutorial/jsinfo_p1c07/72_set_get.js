
/* Theory 1 */
// Getters
// From the outside, an accessor property looks like a regular one. That’s the idea of accessor properties. We don’t 
// call user.fullName as a function, we read it normally: the getter runs behind the scenes.

// As of now, fullName has only a getter. If we attempt to assign user.fullName=, there will be an error


{
  "use strict";

  let user = {
    name: "John",
    surname: "Smith",
  
    get fullName() { // getter
      return `${this.name} ${this.surname}`;
    },
  
    set fullName(value) { // setter
      [this.name, this.surname] = value.split(" ");
    }
  };
  
  // set fullName is executed with the given value.
  user.fullName = "Alice Cooper";
  
  console.log(user.name);    // Alice
  console.log(user.surname); // Cooper

}


/* Theory 2 */
// The same get/set concept can be applied to a function itself
{
  function User(name, birthday) {
    this.name = name;
    this.birthday = birthday;
  
    // age is calculated from the current date and birthday
    Object.defineProperty(this, "age", {
      get() {

        if (typeof this.birthday != 'object') { // smart setter, which checks is the parameter is a Date or not
          console.error("> Date is incorrect!");
          return;
        }

        let todayYear = new Date().getFullYear();
        return todayYear - this.birthday.getFullYear();
      }
    });
  }
  
  let john;
  john = new User("John", "JohnDoe");
  console.log( "> John was born the: " + john.birthday ); // birthday is available, but it's just a number (and not a Date)
  console.log( "> Thus, he has this age: " + john.age );  // ...  which causes us not to be able to read John's age
  
  john = new User("John", new Date(1992, 6, 1));
  console.log( "> John was born the: " + john.birthday ); // birthday is available (as a Data object)
  console.log( "> Thus, he has this age: " + john.age );  // ...as well as the age

}