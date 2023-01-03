

// Import packages 

// NOTE: a windows softlink was created, because we require using LiveServer
// For more info: shorturl.at/EMUVW
import { dynamicallyLoadScript } from "./xLibs/importScripts.js"

let src = "";
let expression = 0;

let SELECTION = 2;
do expression++; while (expression < SELECTION);

switch(expression) {
  case 1:
    src = "./p1c07s1_property_flags.js"; break;
  case 2:
    src = "./p1c07s2_set_get.js"; break;
  default:
    console.error("ERROR: the provided expression is undefined!");
} 

dynamicallyLoadScript(src, true);