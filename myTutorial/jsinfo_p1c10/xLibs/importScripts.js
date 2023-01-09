
/*
  This function implements "Dynamic Script Loading" 
  
  It comes with a few drawbacks though. For more info you can read:
   - https://stackoverflow.com/questions/950087/how-do-i-include-a-javascript-file-in-another-javascript-file
   - https://web.dev/speed-script-loading/
  
  In order for Windows to work properly, you have to create a soft link to this folder, for example
  by using this URL: https://www.howtogeek.com/howto/16226/complete-guide-to-symbolic-links-symlinks-on-windows-or-linux/
  In essence, run "cmd" (as an Admin) and create a Juncture to create a soft link between the two provided directories:
    > mklink /J <SRC_FOLDER> <DEST_FOLDER>
  
  hence:
    > mklink /J D:\myScripts-JavaScript\myTutorial\jsinfo_p1c12\xLibs D:\myScripts-JavaScript\xLibs
    
  or, alternatively:
    > d:
    > cd myScripts-JavaScript\myTutorial\jsinfo_p1c12\
    > mklink /J xLibs D:\myScripts-JavaScript\xLibs
   
*/

export function dynamicallyLoadScript(url, log = false) {  

  if (log) {
    console.log(`Loading the script [${url}]`);
    if(!url.endsWith(".js") && !url.endsWith(".mjs")){
      console.log(`> WARNING: could this not be a standard JS file?`);
    }
  }

  var script = document.createElement("script");  // create a script DOM node
  script.type = 'text/javascript';
  script.src = url;                               // set its src to the provided URL
  script.defer = true;                            // set defer to be true
  
  document.head.appendChild(script);              // add it to the end of the 'head' section of the page
}
