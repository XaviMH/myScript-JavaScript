
/* Summary

  There are 6 static methods of Promise class:

    1)  Promise.all(promises) – waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, it becomes the error of Promise.all, and all other results are ignored.
    2)  Promise.allSettled(promises) (recently added method) – waits for all promises to settle and returns their results as an array of objects with:
          status: "fulfilled" or "rejected"
          value (if fulfilled) or reason (if rejected).
    3)  Promise.race(promises) – waits for the first promise to settle, and its result/error becomes the outcome.
    4)  Promise.any(promises) (recently added method) – waits for the first promise to fulfill, and its result becomes the outcome. If all of the given promises are rejected, AggregateError becomes the error of Promise.any.
    5)  Promise.resolve(value) – makes a resolved promise with the given value.
    6)  Promise.reject(error) – makes a rejected promise with the given error.

    Of all these, Promise.all is probably the most common in practice.

*/

/* Theory 1 */
// Promise.all:
//
//      let promise = Promise.all(iterable);
//
// Let’s say we want many promises to execute in parallel and wait until all of them are ready.
// For instance, download several URLs in parallel and process the content once they are all done.
// That’s what Promise.all is for.
{
  Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
    new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
    new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
  //]).then(alert) // 1,2,3 when promises are ready: each promise contributes an array member
  ]).then(console.log("Th1- 3 taks have been launched!"))
    .catch(error => console.log(error));

}


// Theory 1.1
// Making it shorter...
{
  console.log("Th1.1- launching 3 taks have been launched");

  let urls = [
    'https://api.github.com/users/iliakan',   // <--- JSON files
    'https://api.github.com/users/remy',
    'https://api.github.com/users/jeresig' 
  ];
  
  // map every url to the promise of the fetch
  let requests = urls.map(url => fetch(url));
  
  // Promise.all waits until all jobs are resolved
  Promise.all(requests)
    .then(responses => responses.forEach(
      response => console.log(`Th1.1 - response:  ${response.url}: ${response.status}`)
    ));

  // Reporting
  console.log("Th1.1- all URL's have been launched");

}

// Theory 1.2
// If any promise fails, the error is through automatically
{
  console.log("Th1.2- launching 3 taks have been launched (the 2nd one will fail with a 'Whoops!' message)");
  Promise.all([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
  ])
  .then(console.log("Th1.2- all 3 tasks have been launched"))
  .catch(error => console.error(error)); // In 2 seconds --> "Error: Whoops!"
}

// Theory 2

{
  console.log("Th2- launching 3 taks have been launched (the 3rd one will fail)");

  let urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://no-such-url'
  ];
  
  Promise.allSettled(urls.map(url => fetch(url)))
    .then(results => { // (*)
      results.forEach((result, num) => {
        if (result.status == "fulfilled") {
          console.log(`Th2 - response: ${urls[num]}: ${result.value.status}`);
        }
        if (result.status == "rejected") {
          console.log(`Th2 - response: ${urls[num]}: ${result.reason}`);
        }
      });
    });
}

// Theory 3
// The first promise here was fastest, so it became the result. After the first settled promise “wins the 
// race”, all further results/errors are ignored.
{
  Promise.race([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
  ]).then(
    script => console.log("Th3 - We have a race winner! The script that returns the value: " + script)  // script 1 wins!
  ); 

}

// etc. Please check the summary for the conditions of other Promises to be completed

//
{
  console.log("... all tasks have now been started ...")
}
