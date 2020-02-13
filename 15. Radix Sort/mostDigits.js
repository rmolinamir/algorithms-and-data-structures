/**
 * Returns the number of digits in `num`.
 * @param {Number} num - Number.
 */
function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

/**
 * Given an array of numbers, return the number of digits
 * in the largest number in the list.
 * @param {Number[]} nums - Array of numbers.
 */
function mostDigits(nums) {
  let largestNumber = nums[0];
  for (let i = 1; i < nums.length; i += 1) {
    if (nums[i] > largestNumber) largestNumber = nums[i];
  }
  return digitCount(largestNumber);
}

console.log(mostDigits([1234, 56, 7])); // 4
console.log(mostDigits([1, 1, 11111, 11])); // 5
console.log(mostDigits([12, 34, 56, 78])); // 2
