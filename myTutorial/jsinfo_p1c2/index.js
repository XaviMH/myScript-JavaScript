

// Import packages 

// NOTE: a windows softlink was created, because we require using LiveServer
// For more info: shorturl.at/EMUVW
import { dynamicallyLoadScript } from "./xLibs/importScripts.js"

let src = "";
let expression = 0;

let SELECTION = 1; 
do expression++; while (expression < SELECTION);

switch(expression) {
  case 1:
    src = "./p1c2s1_javaScriptFundamentals.js"; break;
  case 2:
    src = "./p1c2s2_conditionals.js"; break;
  case 3:
    src = "./p1c2s3_functions.js"; break;
  default:
    console.error("ERROR: the provided expression is undefined!");
} 

dynamicallyLoadScript(src);
console.log("script loaded");