
/*
  This function implements "Dynamic Script Loading" 
  
  It comes with a few drawbacks though. For more info you can read:
   - https://stackoverflow.com/questions/950087/how-do-i-include-a-javascript-file-in-another-javascript-file
   - https://web.dev/speed-script-loading/
*/
export function dynamicallyLoadScript(url) {             
  var script = document.createElement("script");  // create a script DOM node
  script.type = 'text/javascript';
  script.src = url;                               // set its src to the provided URL
  script.defer = true;                            // set defer to be true
  document.head.appendChild(script);              // add it to the end of the 'head' section of the page
}
