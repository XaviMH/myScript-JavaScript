
/* Test 1 */
// Open your console to see these printed logs
for (let i = 0; i < 5; i++) {
    console.log("Test 1: logging value to the console: ", i);
}

/* Test 2 */
// Here you can place Breakpoints on different lines and events
//  e.g. here's good guide: https://www.youtube.com/watch?v=H0XScE08hy8

function hello(name) {
    let phrase = `Hello, ${name}!`;
  
    say(phrase);
  }

  function say(phrase) {
    alert(`** ${phrase} **`);
    console.log(`Test 2: ** ${phrase} **`);
  }
  

