
/*
  SUMMARY

  To summarize, the core concepts are:

    1) A module is a file. To make import/export work, browsers need <script type="module">. 
      Modules have several differences:
        - Deferred by default.
        - Async works on inline scripts.
        - To load external scripts from another origin (domain/protocol/port), CORS headers 
          are needed.
        - Duplicate external scripts are ignored.
    2) Modules have their own, local top-level scope and interchange functionality via import
       or export.
    3) Modules always use strict.
    4) Module code is executed only once. Exports are created once and shared between 
       importers.

  When we use modules, each module implements the functionality and exports it. Then we 
  use import to directly import it where it’s needed. The browser loads and evaluates 
  the scripts automatically.

  In production, people often use bundlers such as Webpack to bundle modules together 
  for performance and other reasons.

  In the next chapter we’ll see more examples of modules, and how things can be exported
  /imported.

*/


/* 
  Theory 0
 
  A module is just a file. One script is one module. As simple as that.

  Modules can load each other and use special directives export and import to interchange
  functionality, call functions of one module from another one:
    - export keyword labels variables and functions that should be accessible from outside the current module.
    - import allows the import of functionality from other modules.

*/
{
  console.log(`
    Modules: the best example is to look at the current set-up, where...
      - "index.html" imports the module "index.js"
      - "index.js" imports a function from "./xLibs/importScripts.js"
      - "importScripts.js" describes the function itself
    
    For additional information, please check:
      - https://javascript.info/modules-intro
      - https://javascript.info/import-export
      - https://javascript.info/modules-dynamic-imports 
  `);
}