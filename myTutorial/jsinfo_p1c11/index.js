

// Import packages 

// NOTE: a windows softlink was created, because we require using LiveServer
// For more info: shorturl.at/EMUVW
import { dynamicallyLoadScript } from "./xLibs/importScripts.js"

let src = "";
let expression = 0;

let SELECTION = 8; 
do expression++; while (expression < SELECTION);

switch(expression) {
  case 1:
    src = "./p1c11s1__callbacks.js"; break;
  case 2:
    src = "./p1c11s2__promises.js"; break;
  case 3:
    src = "./p1c11s3__chainingPromises.js"; break;
  case 4:
    src = "./p1c11s4__errorHandlingPromises.js"; break;
  case 5:
    src = "./p1c11s5__APIpromise.js"; break;
  case 6: 
    src = "p1c11s6__promisfication.js"; break;
  case 7:
    src = "p1c11s7__microtasks.js"; break;
  case 8:
    src = "p1c11s8__async_await.js"; break;
  default:
    console.error("ERROR: the provided expression is undefined!");
} 

dynamicallyLoadScript(src, true);