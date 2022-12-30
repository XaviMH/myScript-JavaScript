
/*
  SUMMARY
    1) Methods setTimeout(func, delay, ...args) and setInterval(func, delay, ...args) allow us to run the func once/regularly
       after delay milliseconds.
    2) To cancel the execution, we should call clearTimeout/clearInterval with the value returned by setTimeout/setInterval.
    3) Nested setTimeout calls are a more flexible alternative to setInterval, allowing us to set the time between executions 
       more precisely.
    4) Zero delay scheduling with setTimeout(func, 0) (the same as setTimeout(func)) is used to schedule the call “as soon as
       possible, but after the current script is complete”.
    5) The browser limits the minimal delay for five or more nested calls of setTimeout or for setInterval (after 5th call) to 
       4ms. That’s for historical reasons.

  !!! Please note that all scheduling methods do not guarantee the exact delay !!!
  For example, the in-browser timer may slow down for a lot of reasons:
    1) The CPU is overloaded.
    2) The browser tab is in the background mode.
    3) The laptop is on battery saving mode.
*/

/* 
  Theory 1 
  Set and use timeouts can be done in different ways. A few examples follow
*/
{
    console.log("Starting!");
    function sayHi(phrase, who) {
        console.log("> " + phrase + ', ' + who );
    }

    abc = setTimeout(sayHi, 1000, "Hello", "John");  // outputs "Hello, John"
    clearTimeout(abc);                               // stops the timeout "abc"
}

/* 
  Theory 2 
  Note that the description of the function accepts a string, but don't use that, just replace it
  with a function arrow, like so:
*/
{
    console.log("Starting!");
    abc = setTimeout(() => console.log('Hello'), 1000);  // outputs "Hello"
    clearTimeout(abc);                                   // stops the timeout "abc"
}

/* 
  Theory 3
  There are two ways of running something regularly: one is setInterval. The other one is a nested setTimeout 
*/
{
    console.log("Starting!");
    let timerId = setInterval(() => console.log('tick Th3'), 1000);                  // set up and endless tick
    let whatevs = setTimeout(() => { clearInterval(timerId); console.log('...stopping'); }, 5000); // after 5 seconds, stop the ticking
}

/* 
  Theory 4 
  Nesting calls, where we can realize that nested "setTimeout" allows to set the delay between the executions more precisely than "setInterval"
*/
{
    let delay = 5000;

    let timerId = setTimeout(function request() {
      // Send a request
      let request = true;     // test value
      //let request = false;  // test value
    
      if (request/*request failed due to server overload*/) {
        // increase the interval to the next run!
        delay *= 2;
      }
    
      timerId = setTimeout(request, delay);
    
    }, delay);
}

/* 
  Theory 5
  Be careful, given that a delay of "zero" depends on the browser itself
*/
{
    let start = Date.now();
    let times = [];

    setTimeout(function run() {
        times.push(Date.now() - start); // remember delay from the previous call

        if (start + 100 < Date.now()) console.log(times); // show the delays for the first 100ms
        else setTimeout(run); // else re-schedule
    });

    // an example of the output:
    // 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100
}

/* 
  Exercise 1
  Write a function printNumbers(from, to) that outputs a number every second, starting from from and ending with to.
  Make two variants of the solution.
    1)  Using setInterval.
    2)  Using nested setTimeout.
*/

// Using setInterval:
{
    function printNumbers(from, to) {
        let current = from;

        let timerId = setInterval(function() {
              console.log(`Ex1 setInterval: time is now... ${current}`);
              if (current == to) {
                clearInterval(timerId);
              }
              current++;
        }, 1000);
    }
    // usage:
    printNumbers(5, 10);
}

// Using nested setTimeout
{
    function printNumbers(from, to) {
        let current = from;
      
        setTimeout(function go() {
          console.log(`Ex1 setTimeout: time is now... ${current}`);
          if (current < to) {
            setTimeout(go, 1000);
          }
          current++;
        }, 1000);
      }
      
    // usage:
    printNumbers(20, 25);
}
