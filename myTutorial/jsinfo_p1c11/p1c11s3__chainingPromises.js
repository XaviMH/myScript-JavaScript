//
// Summary

// Let’s return to the problem mentioned in the chapter Introduction: callbacks: we have a 
// sequence of asynchronous tasks to be performed one after another — for instance, loading
// scripts. How can we code it well?

// Promises provide a couple of recipes to do that. In this chapter we cover "promise chaining".
// The idea is that the result is passed through the chain of .then handlers.

// Here the flow is:
//   1)  The initial promise resolves in 1 second (*),
//   2)  Then the .then handler is called (**), which in turn creates a new promise (resolved with 2 value).
//   3)  The next then (***) gets the result of the previous one, processes it (doubles) and passes it to the next handler.
//   4)  …and so on.

/* Theory 1 */
// The whole thing works, because every call to a .then returns a new promise, so that we can call the next .then on it.
// When a handler returns a value, it becomes the result of that promise, so the next .then is called with it.
{
  console.log("Theory 1 ----------- ");

  new Promise(function(resolve, reject) {

    setTimeout(() => resolve(1), 1000); // (*)
  
  }).then(function(result, reject) { // (**)
  
    console.log("Th1- " + result); // 1
    return result * 2;
  
  }).then(function(result, reject) { // (***)
  
    console.log("Th1- " + result); // 2
    return result * 2;
  
  }).then(function(result, reject) {
  
    console.log("Th1- " + result); // 4
    return result * 2;
  
  });
}

/* Theory 2 */
// A classic newbie error: technically we can also add many .then to a single promise. This is not chaining.
{
  console.log("Theory 2 ----------- ");

  let promise = new Promise(function(resolve, reject) {
    setTimeout(() => resolve(1), 1000);
  });
  
  promise.then(function(result) {
    console.log("Th2- " + result); // 1
    return result * 2;
  });
  
  promise.then(function(result) {
    console.log("Th2- " + result); // 1
    return result * 2;
  });
  
  promise.then(function(result) {
    console.log("Th2- " + result); // 1
    return result * 2;
  });

}

/* Theory 3*/
/* Obviously additional code can be added to each Promise, like follows... */
{
  console.log("Theory 3 ----------- ");

  new Promise(function(resolve, reject) {

    setTimeout(() => resolve(5), 1000);                // the @resolve is delayed 1 second

  }).then(function(result) {

    console.log("Th3- " + result); // 5

    return new Promise((resolve, reject) => { // (*)
      setTimeout(() => resolve(result * 10), 1000);    // the @resolve is delayed 1 second
    });

  }).then(function(result) { // (**)

    console.log("Th3- " + result); // 50

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 10), 1000);    // the @resolve is delayed 1 second
    });

  }).then(function(result) {

    console.log("Th3- " + result); // 500

  });
}

/* Theory 4 */
// Note that this resolves the "Pyramid of Doom" that was created in the "Callback" section
// section, which it can now be resolved as a code that "runs down" (check the tag (*)):
{
  function loadScript(src) {
    return new Promise(function(resolve, reject) {   // (*)  <--- this code creates new Promises
      let script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(script);
      script.onerror = () => reject(new Error(`Script load error for ${src}`));
      document.head.append(script); 
    });
  }

  loadScript("./data/myscript.js")                   // <-- new @Promise created
  .then(script => loadScript("./data/myscript.js"))  // <-- new @Promise created
  .then(script => loadScript("./data/myscript.js"))  // <-- new @Promise created
  .then(script => {                                                                                  // <-- new @Promise created
    // scripts are loaded, we can use functions declared there
    console.log("Th4- All 3 JavaScripts have been successfully loaded!")
  });
}

/* Theory 5 */
// Technically, we could add .then directly to each loadScript, but please, notice that we would be 
// running, again, into the Pyuramid of Doom (code "runs to the right")
// In general, the "run down" (i.e. chaining) is preferred to code that "runs to the right" (i.e. Pyramid of Doom)
//
// NOTE: please notice that sometimes it’s ok to write .then directly, because the nested function has access
// to the outer scope. In the that follows, the most nested callback has access to all variables script1, script2, 
// script3.
{
  function loadScript(src) {
    return new Promise(function(resolve, reject) {
      let script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(script);
      script.onerror = () => reject(new Error(`Script load error for ${src}`));
      document.head.append(script); 
    });
  }

  loadScript("./data/myscript.js").then(script1 => {
    loadScript("./data/myscript.js").then(script2 => {
      loadScript("./data/myscript.js").then(script3 => {
        // this function has access to variables script1, script2 and script3
        console.log("Th5- All 3 JavaScripts have been successfully loaded!")
      });
    });
  });
}

/* Theroy 6.1 */ 
// Here's a test on how to read a file, and process its contents, with "func expressions"
{
  fetch('./data/user.json')
    // .then below runs when the remote server responds
    .then(function(response) {
      // response.text() returns a new promise that resolves with the full response text
      // when it loads
      return response.text();
    })
    .then(function(text) {
      // ...and here's the content of the remote file
      console.error(text); // {"name": "XaviMH"}
    });
}
{
  // same as above, but response.json() parses the remote content as JSON
  // we also take this opposetunity to switch to "func arrows"
  fetch('./data/user.json')
    .then(response => response.json())
    .then(user => console.error(user.name)); // XaviMH, got user name
}

/* Theory 6.2 */ 
// In frontend programming, promises are often used for network requests. So let’s see an extended example of that.
// In this exercise we’ll use the fetch method to load the information about the user from the Live Server server. 
// It has a lot of optional parameters covered in separate chapters, but the basic syntax is quite simple:
//
//     let promise = fetch(url);
//
// This makes a network request to the url and returns a promise. The promise resolves with a response object when
// the remote server responds with headers, but before the full response is downloaded.
//
// NOTE:  the .then handler in line (*) now returns new Promise, that becomes settled only after the call 
// of resolve(githubUser) in setTimeout (**). The next .then in the chain will wait for that.
{
  fetch('./data/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))   // (here we rely on https://api.github.com/users/XXX to exist)
  .then(response => response.json())
  .then(githubUser => new Promise(function(resolve, reject) { // (*)
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser); // (**)
    }, 3000);
  }))
  // triggers after 3 seconds
  .then(githubUser => console.log(`Finished showing ${githubUser.name} for 3 seconds`));

}