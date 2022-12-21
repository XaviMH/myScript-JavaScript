

// Import packages 

// NOTE: a windows softlink was created, because we require using LiveServer
// For more info: shorturl.at/EMUVW
import { dynamicallyLoadScript } from "./xLibs/importScripts.js"

let src = "";
let expression = 0;

let SELECTION = 6; 
do expression++; while (expression < SELECTION);

switch(expression) {
  case 1:
    src = "./p1c14s1__proxy.js"; break;
  case 2:
    src = "./p1c14s2__eval.js"; break;
  case 3:
    src = "./p1c14s3__currying.js"; break;
  case 4:
    src = "./xxxxxxxxxxxxxxxxx.js"; break; // consciously avoided
  case 5:
    src = "./p1c14s5__bigInt.js"; break;
  case 6:
    src = "./p1c14s5__unicode.js"; break;
  default:
    console.error("ERROR: the provided expression is undefined!");
} 

dynamicallyLoadScript(src);


