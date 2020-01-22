/**
 * Returns true if the string passed to it is a palindrome (reads the same forward and backward).
 * Otherwise it returns false.
 * @param {String} str - String.
 * @return {Boolean}
 */
function isPalindrome(str) {
  function reverse(str) {
    if (str.length) {
      return `${str[str.length - 1]}${reverse(str.slice(0, str.length - 1))}`
    }
    return '';
  }
  const reversedStr = reverse(str);
  return str === reversedStr;
}

console.log(isPalindrome('awesome')); // false
console.log(isPalindrome('foobar')); // false
console.log(isPalindrome('tacocat')); // true
console.log(isPalindrome('amanaplanacanalpanama')); // true
console.log(isPalindrome('amanaplanacanalpandemonium')); // false
