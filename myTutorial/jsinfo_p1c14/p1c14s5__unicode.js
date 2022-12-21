
/*
  SUMMARY

  As we already know, JavaScript strings are based on Unicode: each character is represented by a byte 
  sequence of 1-4 bytes.

  JavaScript allows us to insert a character into a string by specifying its hexadecimal Unicode code with
  one of these three notations...

  Notation 1 :
    \xXX

    XX must be two hexadecimal digits with a value between 00 and FF, then \xXX is 
    the character whose Unicode code is XX.
    Because the \xXX notation supports only two hexadecimal digits, it can be used
    only for the first 256 Unicode characters.
    These first 256 characters include the Latin alphabet, most basic syntax 
    characters, and some others. For example, "\x7A" is the same as "z" (Unicode U+007A).

  Notation 2:

    \uXXXX 
    
    XXXX must be exactly 4 hex digits with the value between 0000 and FFFF, then \uXXXX 
    is the character whose Unicode code is XXXX.
    Characters with Unicode values greater than U+FFFF can also be represented with this 
    notation, but in this case, we will need to use a so called surrogate pair (we will 
    talk about surrogate pairs later in this chapter).

  Notation 3
    \u{X…XXXXXX}

    X…XXXXXX must be a hexadecimal value of 1 to 6 bytes between 0 and 10FFFF (the highest 
    code point defined by Unicode). This notation allows us to easily represent all existing 
    Unicode characters.

  If you want to learn more about normalization rules and variants – they are described in 
  the appendix of the Unicode standard: Unicode Normalization Forms (https://www.unicode.org/reports/tr15/), 
  but for most practical purposes the information from this section is enough.
*/
{
  console.log( "\x7A" ); // z
  console.log( "\xA9" ); // ©, the copyright symbol

  
  console.log( "\u00A9" ); // ©, the same as \xA9, using the 4-digit hex notation
  console.log( "\u044F" ); // я, the Cyrillic alphabet letter
  console.log( "\u2191" ); // ↑, the arrow up symbol

  console.log( "\u{20331}" ); // 佫, a rare Chinese character (long Unicode)
  console.log( "\u{1F60D}" ); // 😍, a smiling face symbol (another long Unicode)
}

/* 
  Theory 1

  Surrogate pairs

  All frequently used characters have 2-byte codes (4 hex digits). Letters in most European languages, 
  numbers, and the basic unified CJK ideographic sets (CJK – from Chinese, Japanese, and Korean writing 
  systems), have a 2-byte representation.

  Initially, JavaScript was based on UTF-16 encoding that only allowed 2 bytes per character. But 2 bytes 
  only allow 65536 combinations and that’s not enough for every possible symbol of Unicode.

  So rare symbols that require more than 2 bytes are encoded with a pair of 2-byte characters 
  called “a surrogate pair”.

  That’s because surrogate pairs did not exist at the time when JavaScript was created, and thus are not 
  correctly processed by the language!

  We actually have a single symbol in each of the strings above, but the length property shows a length of 2.
*/
{
  console.log( '𝒳'.length );  // 2, MATHEMATICAL SCRIPT CAPITAL X
  console.log( '😂'.length ); // 2, FACE WITH TEARS OF JOY
  console.log( '𩷶'.length );  // 2, a rare Chinese character

}

/*
Theory 2:

  Diacritical marks

  In many languages, there are symbols that are composed of the base character with a mark above/under 
  it. For instance, the letter a can be the base character for these characters: àáâäãåā.
  Most common “composite” characters have their own code in the Unicode table. But not all of them, 
  because there are too many possible combinations. To support arbitrary compositions, the Unicode 
  standard allows us to use several Unicode characters: the base character followed by one or many 
  “mark” characters that “decorate” it.

*/
{
  console.log( 'S\u0307' );       // Ṡ
  console.log( 'S\u0307\u0323' ); // Ṩ

  let s1 = 'S\u0307\u0323';   // Ṩ, S + dot above + dot below
  let s2 = 'S\u0323\u0307';   // Ṩ, S + dot below + dot above 
  console.log( `s1: ${s1}, s2: ${s2}` );
  console.log( s1 == s2 );    // false though the characters look identical (?!)

  let s3 = 'S\u0307\u0323'.normalize(); 
  let s4 = 'S\u0323\u0307'.normalize(); 
  console.log( `s3: ${s3}, s4: ${s4}` );
  console.log( s3 == s4 );    // true!

}

