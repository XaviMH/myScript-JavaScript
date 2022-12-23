
// SUMMARY
console.log("Testing the fundamentals of JavaScript")

// Valiables and constants --------------------------------------------------------------------------------------
// using varaibles
let user = 'John';
let age = 25;
let message = 'Hello';

// using constants
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";
let color = COLOR_ORANGE;

// Defining data types -------------------------------------------------------------------------------------------
// Playing with variable types (both, single and double quotes are allowed, but only backticks replaces variables)
let string1 = "Double quotes work";
let string2 = 'Single quotes work too';
console.log( `Hello, ${user}!, you selected the color ${color}`);  // embedding variables within a string
console.log( `Summing "1 + 2" equals ${1+2}` );                    // embedding an expression, which outputs "3"

// Different types exist
typeof undefined // "undefined"
typeof 0         // "number"
typeof 10n       // "bigint"
typeof true      // "boolean"
typeof "foo"     // "string"
typeof Symbol("id") // "symbol"
typeof Math      // "object"  (1)
typeof null      // "object"  (2)
typeof console.log  // "function"  (3)

// String conversion
let value = true;
console.log(`@value is a ${typeof value}`);   // boolean
value = String(value);                        
console.log(`@value is a ${typeof value}`);   // string

// Value conversion
console.log( Number("   123   ") ); // 123
console.log( Number("123z") );      // NaN (error reading a number at "z")
console.log( Number(true) );        // 1
console.log( Number(false) );       // 0

// Boolean conversion
console.log( Boolean(1) );       // true
console.log( Boolean(0) );       // false
console.log( Boolean("hello") ); // true
console.log( Boolean("") );      // false

// Different ways to prompt the user ------------------------------------------------------------------------
let namePrompt;
let isBoss;
// namePrompt = prompt("What is your name?", "");   // using function @prompt
console.log(namePrompt);                            // Stores your name
// isBoss = confirm("Are you the boss?");           // using function @confirm
console.log( isBoss );                              // true if OK is pressed