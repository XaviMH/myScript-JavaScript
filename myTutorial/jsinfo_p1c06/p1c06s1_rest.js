// About "rest" calls, and more

/* 
  Theory 1 
  Reiterating on a past exercise, remember that you can use "rest" calls
*/
{
  function showName(firstName, lastName, ...titles) {
    console.log( firstName + ' ' + lastName ); // Julius Caesar

    // the rest go into titles array
    // i.e. titles = ["Consul", "Imperator"]
    console.log( titles[0] ); // Consul
    console.log( titles[1] ); // Imperator
    console.log( titles.length ); // 2
  }
  showName("Julius", "Caesar", "Consul", "Imperator");
}

/* 
  Theory 2
  Also, the reverse if also possible, by using what JavaScript calls: "Spread Syntax"
  This allows us to even merge two different arrays
*/
{
  let arr = [3, 5, 1];
  console.log( Math.max(3, 5, 1) ); // 5
  console.log( Math.max(arr) );     // it prints: "NaN", given that we expect a list of parameters (and not an Array)
  //arr = [3, 5, 1];
  console.log( Math.max(...arr) );  // 5, given that the "spread sytax" turns array into a list of arguments!

  let arr1 = [3, 5, 1];
  let arr2 = [8, 9, 15];
  let merged = [11, ...arr, 22, ...arr2];
  console.log(merged); // 11,3,5,1,22,8,9,15 (0, then arr1, then 2, then arr2)
}

/* 
  Theory 3 
  Note that, as a consequence, we no longer need the Object.assign() that we've used in the past courses
  Instead we can just copy the objects, and a new instance is created! Note that, modifying our initial array does not modify the copy
*/
{
  let arr = [1, 2, 3];
  let arrCopy = [...arr]; // spread the array into a list of parameters
                          // then put the result into a new array
                          
  console.log(JSON.stringify(arr) === JSON.stringify(arrCopy)); // The arrays have the same content: "true"
  console.log(arr === arrCopy); // But, the arrays are NOT equal: "false" (not same reference)
  arr.push(4);
  console.log(arr);      // 1, 2, 3, 4
  console.log(arrCopy);  // 1, 2, 3
}