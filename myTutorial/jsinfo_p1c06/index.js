

// Import packages 

// NOTE: a windows softlink was created, because we require using LiveServer
// For more info: shorturl.at/EMUVW
import { dynamicallyLoadScript } from "./xLibs/importScripts.js"

let src = "";
let expression = 0;

let SELECTION = 3; 
do expression++; while (expression < SELECTION);

switch(expression) {
  case 1:
    src = "./p1c06s1_rest.js"; break;
  case 2:
    src = "./p1c06s2_scopes.js"; break;
  case 3:
    src = "./p1c06s3_timeouts.js"; break;
  case 4:
    src = "./p1c06s4_decos_or_wrappers.js"; break;
  case 5:
    src = "./p1c06s5_binding.js"; break;
  case 6:
    src = "./p1c06s6_arrow_funcs.js"; break;
  default:
    console.error("ERROR: the provided expression is undefined!");
} 

dynamicallyLoadScript(src, true);