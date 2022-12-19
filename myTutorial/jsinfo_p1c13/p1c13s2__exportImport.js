
/*
  Summary

  Regular iterators and generators work fine with the data that doesn’t take time 
  to generate.

  When we expect the data to come asynchronously, with delays, their async counterparts 
  can be used, and for await..of instead of for..of.

  Syntax differences between async and regular iterators:
                                  -- Iterable -- 	               -- Async Iterable --
      Method to provide iterator 	Symbol.iterator 	             Symbol.asyncIterator
      next()                      return value is 	             Promise that resolves to 
                                  {value:…, done: true/false} 	 {value:…, done: true/false}

  Syntax differences between async and regular generators:
                                  -- Generators -- 	            -- Async generators --
      Declaration 	              function* 	                  async function*
      next() return value is 	    {value:…, done: true/false} 	  Promise that resolves to {value:…, done: true/false}

    In web-development we often meet streams of data, when it flows chunk-by-chunk.
    For instance, downloading or uploading a big file.

    We can use async generators to process such data. It’s also noteworthy that in
    some environments, like in browsers, there’s also another API called Streams,
    that provides special interfaces to work with such streams, to transform the 
    data and to pass it from one stream to another (e.g. download from one place 
    and immediately send elsewhere).

  */


/* 
  Theory 0
 
  Iterables (as seen in the Iterables -https://javascript.info/iterable-)
  
*/
{
  let range = {
    from: 1,
    to: 5
  };
  
  // 1. call to for..of calls this next line one time, which returns the iterator object
  //    Onward, for..of works only with the iterator object below, asking it for next values
  range[Symbol.iterator] = function() { 
    return {  
        current: this.from,
        last: this.to,
    
        // 2. next() is called on each iteration by the for..of loop
        next() {
          if (this.current <= this.last) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        }
      };
  };
  
  // now it works!
  for (let num of range) {
    console.log(num); // 1, then 2, 3, 4, 5
  }
  
}

/* 
  Theory 2

  Async iterables

  Asynchronous iteration is needed when values come asynchronously: after 
  setTimeout or another kind of delay.

  The most common case is that the object needs to make a network request to 
  deliver the next value, we’ll see a real-life example of it a bit later.

  To make an object iterable asynchronously:
      - Use Symbol.asyncIterator instead of Symbol.iterator.
      - The next() method should return a promise (to be fulfilled with the next value).
          The async keyword handles it, we can simply make async next().
      - To iterate over such an object, we should use a for await (let item of 
          iterable) loop. Note the await word.

  As a starting example, let’s make an iterable range object, similar like the one
  before, but now it will return values asynchronously, one per second.
  All we need to do is to perform a few replacements in the code above.

  As we can see, the structure is similar to regular iterators:
    1- To make an object asynchronously iterable, it must have a method Symbol.asyncIterator (1).
    2- This method must return the object with next() method returning a promise (2).
    3- The next() method doesn’t have to be async, it may be a regular method returning a promise, 
       but async allows us to use await, so that’s convenient. Here we just delay for a second (3).
    4- To iterate, we use for await(let value of range) (4), namely add “await” after “for”. It 
       calls range[Symbol.asyncIterator]() once, and then its next() for values.

*/
{
  let range = {
    from: 10,
    to: 15,
  
    
    [Symbol.asyncIterator]() { // (1) , a shorthand for range[Symbol.iterator]: function()
      return {
        current: this.from,
        last: this.to,
  
        async next() { // (2)
  
          // note: we can use "await" inside the async next:
          await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
  
          if (this.current <= this.last) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        }
      };
    }
  };
  
  (async () => {
    for await (let value of range) { // (4)
      console.log(value); // 1,2,3,4,5
    }
  })()

}

/* 
  Theory 3

  Async iterables, with generators

  Note that we can shorten the iteration by using Generators, like so...
*/
{
  let range = {
    from: 20,
    to: 25,
  
    *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
      for(let value = this.from; value <= this.to; value++) {
        yield value;
      }
    }
  };
  
  for(let value of range) {
    console.log(value); // 21, then 22, then 23, then 24, then 25
  }

}

/* 
  Theroy 4

  Async generators

  However, please note that in the previous Theory, in regular generators we can’t 
  use await. All values must come synchronously, as required by the for..of construct.
  What if we’d like to generate values asynchronously? From network requests, for instance!

  For most practical applications, when we’d like to make an object that asynchronously 
  generates a sequence of values, we can use an asynchronous generator.

  The syntax is simple:
    (1) prepend function* with async. That makes the generator asynchronous.
    (2) And then use for await (...) to iterate over it, like this...

*/
{
  async function* generateSequence(start, end) { // (1)

    for (let i = start; i <= end; i++) {
      // Wow, we can use await!
      await new Promise(resolve => setTimeout(resolve, 1000));
      yield i;
    }
  
  }
  
  (async () => {
      let generator = generateSequence(61, 65);
      for await (let value of generator) { // (2)
        console.log(value); // 61 ... then 65 (with delay between)
      }
    }
  )();


  /* 
    Example 1

    Here we just add a delay in the previous Theory call , by iterating with a normal Iterator 
  */
 {  
  let range = {
    from: 71,
    to: 75,
  
    // this line is same as [Symbol.asyncIterator]: async function*() {
    async *[Symbol.asyncIterator]() {
      for(let value = this.from; value <= this.to; value++) {
  
        // make a pause between values, wait for something (possibly network-related)
        await new Promise(resolve => setTimeout(resolve, 1000));
  
        yield value;
      }
    }
  };
  
  (async () => {
    for await (let value of range) {
      console.log(value); // 71, then 72, then 73, then 74, then 75 (with delay between)
    }
  })();

 }

}

/*
  Example 2

  Real-life example: paginated data

  So far we’ve seen basic examples, to gain understanding. Now let’s review a real-
  life use case.

  There are many online services that deliver paginated data. For instance, when we 
  need a list of users, a request returns a pre-defined count (e.g. 100 users) – “one 
  page”, and provides a URL to the next page.

  This pattern is very common. It’s not about users, but just about anything.

  For instance, GitHub allows us to retrieve commits in the same, paginated fashion:

    -  We should make a request to fetch in the form https://api.github.com/repos/<repo
  >/commits.
    -  It responds with a JSON of 30 commits, and also provides a link to the next page
  in the Link header.
    -  Then we can use that link for the next request, to get more commits, and so on.

  For our code, we’d like to have a simpler way to get commits.

  Let’s make a function fetchCommits(repo) that gets commits for us, making requests 
  whenever needed. And let it care about all pagination stuff. For us it’ll be a 
  simple async iteration for await..of.

*/
{
  async function* fetchCommits(repo) {
    let url = `https://api.github.com/repos/${repo}/commits`;
  
    while (url) {
      const response = await fetch(url, { // (1)
        headers: {'User-Agent': 'Our script'}, // github needs any user-agent header
      });
  
      const body = await response.json(); // (2) response is JSON (array of commits)
  
      // (3) the URL of the next page is in the headers, extract it
      let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
      nextPage = nextPage?.[1];
  
      url = nextPage;
  
      for(let commit of body) { // (4) yield commits one by one, until the page ends
        yield commit;
      }
    }
  }


  (async () => {
    let count = 0;  
    for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {
      console.log(commit.author.login);
      if (++count == 62) { // let's stop at a certain number of commits
        break;
      }
    }
  })();



}