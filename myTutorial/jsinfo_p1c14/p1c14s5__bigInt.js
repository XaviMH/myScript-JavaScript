
/*
  SUMMARY

  BigInt is a special numeric type that provides support for integers of arbitrary length.

  A bigint is created by appending n to the end of an integer literal or by calling the 
  function BigInt that creates bigints from strings, numbers etc.
*/


/* 
  Theory 1

  A bigint is created by appending n to the end of an integer literal or by calling the 
  function BigInt that creates bigints from strings, numbers etc.

  */
{
  const bigint = 1234567890123456789012345678901234567890n;
  console.log(bigint);

  const sameBigint = BigInt("1234567890123456789012345678901234567890");
  console.log(sameBigint);

  const bigintFromNumber = BigInt(10); // same as 10n
  console.log(bigintFromNumber);

}

/* 
  Theory 2

  We can’t mix bigints and regular numbers
  If we want to mix them, we should explicitly convert them if needed: using 
  either BigInt() or Number(), like this
  */
{
  let bigint = 1n;
  let number = 2;

  // number to bigint
  console.log(bigint + BigInt(number)); // 3n

  // bigint to number
  console.log(Number(bigint) + number); // 3

}

/* 
  Theory 3

  Polyfills are... complex. 
  For additional information, check:
    - https://javascript.info/bigint
*/