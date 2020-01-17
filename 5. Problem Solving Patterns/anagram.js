/**
 * Determines if the second string is an anagram of the first. An anagram is a word, phrase, or name
 * formed by rearranging the letters of another, such as cinema, formed from iceman.
 * Disregarding edge cases.
 * @param {String} string1
 * @param {String} string2
 */
function anagram(string1, string2) {
  if (
    typeof string1 === 'string' &&
    typeof string2 === 'string' &&
    string1.length !== string1.length
  ) return false;
  const charCounter = new Map();
  const anagramCounter = new Map();
  for (let i = 0; i < string1.length; i++) {
    const char = string1[i];
    charCounter.set(char, (charCounter.get(char) + 1) || 0);
    const anagramChar = string2[i];
    anagramCounter.set(anagramChar, (anagramCounter.get(anagramChar) + 1) || 0);
  }
  for (const [key, value] of charCounter.entries()) {
    if (anagramCounter.get(key) !== value) {
      return false;
    }
  }
  return true;
}

console.log(anagram('', '')); // true
console.log(anagram('aaz', 'zza')); // false
console.log(anagram('anagram', 'nagaram')); // true
console.log(anagram('rat', 'car')); // false
console.log(anagram('awesome', 'awesom')); // false
console.log(anagram('qwerty', 'qeywrt')); // true
console.log(anagram('texttwisttime', 'timetwisttext')); // true
