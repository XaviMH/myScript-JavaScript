

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
    src = "./p1c2s1_javaScriptFundamentals"; break; // aggrecation of sections 1, up to 
  case 2:
    src = "./p1c2s2_conditionals"; break;
  case 3:
    src = "./p1c2s3_functions"; break;
  default:
    console.error("ERROR: the provided expression is undefined!");
} 

dynamicallyLoadScript(src);
console.log("script loaded");