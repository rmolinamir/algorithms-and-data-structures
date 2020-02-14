/**
 * Returns the number of digits in `num`.
 * @param {Number} num - Number.
 */
function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

/**
 * Returns a digit in `num` at the given `place` value.
 * @param {Number} num - Number.
 * @param {Number} place - Place to look at the digit.
 */
function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
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

/**
 * Special sorting algorithm that works on numbers. Direct
 * comparisons are never made, i.e. it never checks which
 * number is smaller or larger. It exploits the fact that
 * information about the size of a number is encoded in
 * the amount & number of digits, i.e. More digits means
 * a bigger number.
 * @param {Number[]} arr - Array of numbers.
 */
function radixSort(arr) {
  let nums = arr;
  // - Figure out how many digits the largest numbers has.
  const largestNumber = mostDigits(arr);
  // - Loop from `k = 0` up to this largest number of digits.
  for (let k = 0; k <= largestNumber; k += 1) {
    // - For each iteration of the loop:
    //   - Create buckets for each digit (0 to 9).
    const digitBuckets = [
      [], // 0
      [], // 1
      [], // 2
      [], // 3
      [], // 4
      [], // 5
      [], // 6
      [], // 7
      [], // 8
      [], // 9
    ];
    //   - Place each number in the corresponding bucket on its "*k*th" digit.
    nums.forEach(number => {
      const digit = getDigit(number, k);
      digitBuckets[digit].push(number);
    });
    //   - At the end of every loop, reform the list by concatenating the lists
    //     in every bucket from 0 to 9 without breaking that order.
    nums = [].concat(...digitBuckets);
  }
  // - Return the list at the end.
  return nums;
}

console.log(radixSort([1, 53, 31, 129, 3131, 358, 9991, 10, 31])); // [1, 10, 31, 31, 53, 129, 358, 3131, 9991]
