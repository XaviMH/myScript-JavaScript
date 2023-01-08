

// Import packages 

// NOTE: a windows softlink was created, because we require using LiveServer
// For more info: shorturl.at/EMUVW
import { dynamicallyLoadScript } from "./xLibs/importScripts.js"

let src = "";
let expression = 0;

let SELECTION = 4;
do expression++; while (expression < SELECTION);

switch(expression) {
  case 1:
    src = "./p1c09s1_classes.js"; break;
  case 2:
    src = "./p1c09s2_class_inheritance.js"; break;
  case 3:
    src = "./p1c09s3_static.js"; break;
  case 4:
    src = "./p1c09s4_public_private.js"; break;
  case 5:
    src = "./p1c09s5_extend_classes.js"; break;
  case 6:
    src = "./p1c09s6_instanceof.js"; break;
  case 7:
    src = "./p1c09s7_mixin.js"; break;
  default:
    console.error("ERROR: the provided expression is undefined!");
} 

dynamicallyLoadScript(src, true);