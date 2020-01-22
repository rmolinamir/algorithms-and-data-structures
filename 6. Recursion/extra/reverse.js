/**
 * Accepts a string and returns a new string in reverse.
 * @param {String} str - String.
 * @return {String} - Reversed string.
 */
function reverse(str) {
  if (str.length) {
    return `${str[str.length - 1]}${reverse(str.slice(0, str.length - 1))}`
  }
  return '';
}

console.log(reverse('awesome')); // 'emosewa'
console.log(reverse('rithmschool')); // 'loohcsmhtir'
