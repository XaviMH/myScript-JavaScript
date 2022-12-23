
// SUMMARY
console.log("Testing the conditionals of JavaScript")


// Conditionals -----------------------------------------------
// First off, let's conditionals
5 > 4                  // True
"apple" > "pineapple"  // False, a dictionary comparison, hence false. "a" is smaller than "p".
"2" > "12"             // True, because strings are converted to numbers
undefined == null      // True, given that the values null and undefined equal each other only
undefined === null     // False, given that "strict equality" is strict. Different types from both sides lead to false.
null == "\n0\n"        // False, similar to (4), null only equals undefined.
null === "\n0\n"       // False, given that "Strict equality" is comparing "null" to a "string"
null === +"\n0\n"      // False, given that "Strict equality" is comparing "null" to a "number" (notice the "plus" symbol)

// Simple conditionals
let a = 10;
let b = 3;

if (a + b < 4) {
  result = 'Below';
} else {
  result = 'Over';
}

// ... that can also be written with "?"
result = (a + b < 4) ? 'Below' : 'Over';
console.log(`@result is: ${result}`);

// More complex conditional
let login = 'Director';
let message;

if (login == 'Employee') {
  message = 'Hello';
} else if (login == 'Director') {
  message = 'Greetings';
} else if (login == '') {
  message = 'No login';
} else {
  message = '';
}

 // ... that can also be written with "?"
message = (login == 'Employee') ? 'Hello' :
  (login == 'Director') ? 'Greetings' :
  (login == '') ? 'No login' :
  '';

console.log(`@message is: ${message}`);

// loops are accepted:
////    while – The condition is checked before each iteration.
//    do..while – The condition is checked after each iteration.
//    for (;;) – The condition is checked before each iteration, additional settings available.
for (let i = 0; i < 10; i++) {
  // if true, skip the remaining part of the body
  if (i % 2 == 0) continue;
  console.log(i); // 1, then 3, 5, 7, 9
}


// switch..case is also accepted
let browser = "Edge";
switch (browser) {
  case 'Edge':
    console.log( "You've got the Edge!" );
    break;

  case 'Chrome':
  case 'Firefox':
  case 'Safari':
  case 'Opera':
    console.log( 'Okay we support these browsers too' );
    break;

  default:
    console.log( 'We hope that this page looks ok!' );
}

/* 
  Exercise 1 
  A real life example on how to use conditionals
*/
// let userName = prompt("Who's there?", '');  // ommited for brevity
let userName = "John";

if (userName === 'Admin') {

  let pass = prompt('Password?', '');

  if (pass === 'TheMaster') {
    console.log( 'Welcome!' );
  } else if (pass === '' || pass === null) {
    console.log( 'Canceled' );
  } else {
    console.log( 'Wrong password' );
  }

} else if (userName === '' || userName === null) {
  console.log( 'Canceled' );
} else {
  console.log( "Invalid user name" );
}