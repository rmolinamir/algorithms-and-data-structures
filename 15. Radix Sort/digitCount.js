/**
 * Returns the number of digits in `num`.
 * @param {Number} num - Number.
 */
function digitCount(num) {
  return String(Math.floor(num)).length;
}

//
// OR
//

/**
 * Returns the number of digits in `num`.
 * @param {Number} num - Number.
 */
function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

console.log(digitCount(1)); // 1
console.log(digitCount(23));  // 2
console.log(digitCount(345));  // 3
