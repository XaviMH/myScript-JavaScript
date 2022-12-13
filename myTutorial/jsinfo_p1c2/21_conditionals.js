
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

// Simple conditional
let a = 2, b = 3;
let result1;

if (a + b < 4) {
  result1 = 'Below';
} else {
  result1 = 'Over';
}

// ... that can also be written with "?"
let result2 = (a + b < 4) ? 'Below' : 'Over';

// More complex conditional
let login = 'Whatever'
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

// Real life example
let userName = prompt("Who's there?", '');

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
  console.log( "I don't know you" );
}