

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
    src = "./p1c13s1__modules.js"; break;
  case 2:
    src = "./p1c13s2__exportImport.js"; break;
  case 3:
    src = "./p1c13s3__dynamicImports.js"; break;
  default:
    console.error("ERROR: the provided expression is undefined!");
} 

dynamicallyLoadScript(src)