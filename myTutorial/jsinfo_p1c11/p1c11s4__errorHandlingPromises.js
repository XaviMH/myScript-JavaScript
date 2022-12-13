//
// Summary
//
//  - .catch handles errors in promises of all kinds: be it a reject() call, or an error thrown in a handler.
//  - .then also catches errors in the same manner, if given the second argument (which is the error handler).
//  - We should place .catch exactly in places where we want to handle errors and know how to handle 
//    them. The handler should analyze errors (custom error classes help) and rethrow unknown ones (maybe they
//    are programming mistakes).
//  - It’s ok not to use .catch at all, if there’s no way to recover from an error.
//  - In any case we should have the unhandledrejection event handler (for browsers, and analogs for other 
//    environments) to track unhandled errors and inform the user (and probably our server) about them, so 
//    that our app never “just dies”.

/* Theory 1*/
{
  fetch('https://no-such-server.blabla') // rejects
    .then(response => response.json())
    .catch(err => console.error(err))    // TypeError: failed to fetch (the text may vary)can't

}

/* Theory 2 */
// As you can see, the .catch doesn’t have to be immediate. It may appear after one or maybe several .then.
// Or, maybe, everything is all right with the site, but the response is not valid JSON. The easiest way 
// to catch all errors is to append .catch to the end of chain, as added in here: (*)
// Normally, such .catch doesn’t trigger at all. But if any of the promises above rejects (a network 
// problem or invalid json or whatever), then it would catch it.
{
  console.log("Th2- showing the github  avatar of user 'iliakan' (within the json file)")
  fetch('./data/user.json')
    .then(response => response.json())
    .then(user => fetch(`https://api.github.com/users/${user.name}`))
    .then(response => response.json())
    .then(userGH => new Promise((resolve, reject) => {
      let img = document.createElement('img');
      img.src = userGH.avatar_url;
      img.className = "promise-avatar-example";
      document.body.append(img); 

      setTimeout(() => {
        img.remove();
        resolve(userGH);
      }, 3000);
    }))
    .catch(error => alert(error.message)); // (*)
}

/* Theory 3 */
// The code of a promise executor and promise handlers has an "invisible try..catch" around it. 
// If an exception happens, it gets caught and treated as a rejection, which is expected to be thrown
{
  // the execution: catch -> catch
  new Promise((resolve, reject) => {

    throw new Error("Whoops!");

  }).catch(function(error) { // (*)

    if (error instanceof URIError) {
      // handle it
    } else {
      console.error("Th3- Can't handle such error");

      throw error; // throwing this or another error jumps to the next catch
    }

  }).then(function() {
    /* doesn't run here */  
  }).catch(error => { // (**)

    console.error(`Th3- The unknown error has occurred: ${error}`);
    // don't return anything => execution goes the normal way

  });

}