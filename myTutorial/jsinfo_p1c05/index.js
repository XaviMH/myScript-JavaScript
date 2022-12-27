

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
    src = "./p1c5s1_iterators.js"; break;
  case 2:
    src = "./p1c5s2_maps_sets.js"; break;
  case 3:
    src = "./p1c5s3_destructuring.js"; break;
  default:
    console.error("ERROR: the provided expression is undefined!");
} 

dynamicallyLoadScript(src, true);