

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
    src = "./p1c4s1__objects.js"; break;
  case 2:
    src = "./p1c4s2__cloningObjects.js"; break;
  case 3:
    src = "./p1c4s3__this.js"; break;
  case 4:
    src = "./p1c4s4__new.js"; break;
  case 5:
    src = "./p1c4s5__question.js"; break;
  case 6:
    src = "./p1c4s6__symbols_primitives.js"; break;
  default:
    console.error("ERROR: the provided expression is undefined!");
} 

dynamicallyLoadScript(src, true);