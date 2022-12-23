

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
    src = "./p1c03s1__howToDebug.js"; break;
  default:
    console.error("ERROR: the provided expression is undefined!");
} 

console.log(`About to load this script: [${src}]`)
dynamicallyLoadScript(src)