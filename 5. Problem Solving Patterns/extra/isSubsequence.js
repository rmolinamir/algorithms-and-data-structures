/**
 * Takes in two strings and checks whether the characters in the first string
 * form a subsequence of the characters in the second string. In other words,
 * the function should check whether the characters in the first string appear
 * somewhere in the second string, without their order changing.
 * @param {String} str1 - First string.
 * @param {String} str2 - Second string possibly containing the first string.
 */
function isSubsequence(str1, str2) {
  let i = 0;
  let str1Char = str1[i];
  for (const char of str2) {
    if (char === str1Char) {
      i += 1;
      if (i === str1.length) {
        return true;
      } else {
        str1Char = str1[i];
      }
    }
  }
  return false;
}

console.log(isSubsequence('hello', 'hello world')); // true
console.log(isSubsequence('sing', 'sting')); // true
console.log(isSubsequence('abc', 'abracadabra')); // true
console.log(isSubsequence('abc', 'acb')); // false
