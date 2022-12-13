
/*
  SUMMARY

  The async keyword before a function has two effects:

    -  Makes it always return a promise.
    -  Allows await to be used in it.

  The await keyword before a promise makes JavaScript wait until that promise 
  settles, and then:

    -  If it’s an error, an exception is generated — same as if throw error 
  were called at that very place.
    -  Otherwise, it returns the result.

  Together they provide a great framework to write asynchronous code that is 
  easy to both read and write.

  With async/await we rarely need to write promise.then/catch, but we still 
  shouldn’t forget that they are based on promises, because sometimes (e.g. in
  the outermost scope) we have to use these methods. Also Promise.all is nice
  when we are waiting for many tasks simultaneously.

*/

/* 
  Theory 1 :

  The word “async” before a function means one simple thing: a function always 
  returns a promise. Other values are wrapped in a resolved promise automatically.
  In the following context, both code snippets result in the same behavior
*/
{
  async function f1() {
    return "Th1 - one!";
  }
  f1().then( script => console.log(script)); // 1

  //-------------
  async function f2() {
    return Promise.resolve("Th1 - two!");
  }
  f2().then( script => console.log(script)); // 2
}

/*
  Theory 2
  
  In the following example, the function execution “pauses” at the line (*) and 
  resumes when the promise settles, with result becoming its result. So the code 
  below shows “done!” in one second.

  Let’s emphasize: await literally suspends the function execution until the promise 
  settles, and then resumes it with the promise result. That doesn’t cost any CPU 
  resources, because the JavaScript engine can do other jobs in the meantime: execute
  other scripts, handle events, etc.

  It’s just a more elegant syntax of getting the promise result than promise.then. 
  And, it’s easier to read and write.
*/
{
  async function sleep(time) {

    let promise = new Promise((resolve, reject) => {

      if (typeof time === "undefined") time = 1000;   // default value: 1000ms (using @typeof)
      time = time ?? 1000;                            // default value: 1000ms (using @??)

      console.log(`Th2 - time to wait is: ${time}`);
      setTimeout(() => resolve(`Th2 - ...done waiting: ${time} millisecons!`), time);
    });
  
    let result = await promise; // wait until the promise resolves (*)
  
    console.log(result); // "done!"
  }
  
  sleep(1000);
  sleep(2000);
  sleep(3000);

}

/* 
  Theory 3 

  Let’s take the showAvatar() example from the chapter Promises chaining and rewrite it using async/await:
    - We’ll need to replace .then calls with await.
    - Also we should make the function async for them to work.

  Remember that showAvatar() was written as:

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
  
*/
{
  async function showAvatar() {

    // read our JSON
    let response = await fetch('./data/user.json');
    let user = await response.json();
  
    // read github user
    let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
    let githubUser = await githubResponse.json();
  
    // show the avatar
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);
  
    // wait 3 seconds, and remove image
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    img.remove();
  
    return githubUser;
  }
  
  console.log("Th3 - showing the avatar of './data/user.json' for 3 seconds...")
  showAvatar();

}

/* 
  Theory 4

  await accepts “thenables”

  Like promise.then, await allows us to use thenable objects (those with a 
  callable then method). The idea is that a third-party object may not be
  a promise, but promise-compatible: if it supports .then, that’s enough to 
  use it with await.

  Here’s a demo Thenable class; the await below accepts its instances:
*/
{
  class Thenable {
    constructor(num) {
      this.num = num;
    }
    then(resolve, reject) {
      console.log(resolve);
      // resolve with this.num*2 after 1000ms
      setTimeout(() => resolve(this.num * 2), 1000); // (*)
    }
  }
  
  async function f() {
    // waits for 1 second, then result becomes 2
    let result = await new Thenable(1);
    console.log(`Th4 - result is: ${result}`);
  }
  
  f();

}

/*
  Theory 5

  If a promise resolves normally, then await promise returns the result. But in 
  the case of a rejection, it throws the error, just as if there were a throw 
  statement at that line.
  In the following context, both code snippets result in the same behavior, which
  would be raising 3 errors
*/
{
  async function func1() {
    await Promise.reject(new Error("Whoops!"));
  }

  async function func2() {
    throw new Error("Whoops!");
  }

  async function func3() {
    try {
      let response = await fetch('/no-user-here');
      let user = await response.json();
    } catch(err) {
      // catches errors both in fetch and response.json
      console.error(err);
    }
  }

  func1();
  func2();
  func3();
  
}



/* 
  Exercise 1

  Rewrite this example code from the chapter "Promises chaining" using async/await instead of .then/catch:

  {
    function loadJson(url) {
    return fetch(url)
      .then(response => {
        if (response.status == 200) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      });
    }

    loadJson('https://javascript.info/no-such-user.json')    // <-- it will return an error!
      .catch(alert); // Error: 404
  }

  In essence:
    (1) The function loadJson becomes async.
    (2) All .then inside are replaced with await.
    (3) We can return response.json() instead of awaiting for it
    (4) The error thrown from loadJson is handled by .catch. We can’t use await loadJson(…) there, because we’re not in an async function.
*/
{
  async function loadJson(url) { // (1)
    let response = await fetch(url); // (2)
  
    if (response.status == 200) {
      let json = await response.json(); // (3)
      return json;
    }
  
    throw new Error(response.status);
  }
  
  loadJson('https://javascript.info/no-such-user.json')
    .catch( (error)=> console.log(error)); // Error: 404 (4)

}

/* 
  Exercise 2 
  
  We have a “regular” function called @f. How can you call the async function wait() 
  and use its result inside of f?

  Simple! Just make use of "Theory 1" and...
*/

{
  async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    return "f() just ended!";
  }
  
  function f() {
    // shows 10 after 1 second
    wait().then(result => console.log(`Ex2 - I am f(), returning --> ${result}`));
  }
  
  f();

}