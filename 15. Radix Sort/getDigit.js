/**
 * Returns a digit in `num` at the given `place` value.
 * @param {Number} num - Number.
 * @param {Number} place - Place to look at the digit.
 */
function getDigit(num, place) {
  const integer = Math.floor(num);
  const index = (String(integer).length - 1) - place;
  const digit = Number(String(integer).charAt(index));
  return digit || 0;
}

//
// OR
//

/**
 * Returns a digit in `num` at the given `place` value.
 * @param {Number} num - Number.
 * @param {Number} place - Place to look at the digit.
 */
function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

console.log(getDigit(12345, 0)); // 5
console.log(getDigit(12345, 1)); // 4
console.log(getDigit(12345, 2)); // 3
console.log(getDigit(12345, 3)); // 2
console.log(getDigit(12345, 4)); // 1
console.log(getDigit(12345, 5)); // 0
