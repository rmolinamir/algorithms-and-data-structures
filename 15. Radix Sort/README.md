# Radix Sort

All of the previous sorts that have been explained are **comparison** sort algorithms. In short, the base process of all of the previous algorithms is a comparison at any given point. With that in mind, due to mathematical boundaries caused by limited information that we can gain from a single comparison, the best average time complexity for sorting algorithms is `O(n * log n)`.

But there are ways around it through other types of sorting algorithms, but not by making comparisons. One of these special types are the integer sorting algorithms, and it only works with integers. And among these, we have the Radix Sort which exploits the properties of numbers.

Radix Sort is a special sorting algorithm that works on numbers. Direct comparisons are never made, i.e. it never checks which number is smaller or larger. It exploits the fact that information about the size of a number is encoded in the amount & number of digits, i.e. More digits means a bigger number.

## How does it work

It stores the numbers from the list into buckets. Each bucket represent a digit (0-9). The algorithm goes through the entire list of numbers and it groups them into the respective buckets depending on the rightmost digit. For example, on the first loop, the number `1556` would be stored in the bucket corresponding the integer `6`.

After they're all stored in the buckets, they are formed back into a list keeping the order that they were in. So at the beginning we'll have numbers that ended in `0`, and at the end we'll have numbers that end in `9`. Then, the algorithm repeats the sorting process for every digit given by the largest number in terms of amount of digits.

## Radix Sort Helper

In order to implement Radix Sort, it's helpful to implement a few helper functions.

- `getDigit(num, place)`: returns a digit in `num` at the given `place` value.

```js
/**
 * Returns a digit in `num` at the given `place` value.
 * @param {Number} num - Number.
 * @param {Number} place - Place to look at the digit.
 */
function getDigit(num, place) {
  const index = (String(num).length - 1) - place;
  const digit = Number(String(num).charAt(index));
  return digit || 0;
}

console.log(getDigit(12345, 0)); // 5
console.log(getDigit(12345, 1)); // 4
console.log(getDigit(12345, 2)); // 3
console.log(getDigit(12345, 3)); // 2
console.log(getDigit(12345, 4)); // 1
console.log(getDigit(12345, 5)); // 0
```

- `digitCount(num)`: returns the number of digits in `num`.

```js
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
```

- `mostDigits(nums)`: Given an array of numbers, return the number of digits in the largest number in the list.

```js
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
```

## Radix Sort Pseudocode

- Define a function that accepts a list of numbers.
- Figure out how many digits the largest numbers has.
- Loop from `k = 0` up to this largest number of digits.
  - (Optional) The calculation from the digits of the largest number can be done inside the first loop.
- For each iteration of the loop:
  - Create buckets for each digit (0 to 9).
  - Place each number in the corresponding bucket on its "*k*th" digit.
  - At the end of every loop, reform the list by concatenating the lists in every bucket from 0 to 9 without breaking that order.
- Return the list at the end.

```js
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
```

## Radix Sort Big O

There's a bit of controversy around the Radix Sort Big O notation. But here's the generally acepted notation:

![radix sort big o notation](https://github.com/rmolinamir/algorithms-and-data-structures/blob/master/17.%20Singly%20Linked%20Lists/images/Singly-Linked%20Lists%20Big%20O%20Notation_singly%20linked%20lists%20big%20o%20notation.png?raw=true "Radix Sort Big O Notation")

The best time complexity for the worst, best, and average case scenario is `O(nk)`, where `n` is the amount of numbers we're sorting and `k` is the amount of digits of the largest number. If we have really, really long digits, then it's an important factor to consider. 

There are also other considerations, which are the cause of controversy for the notation. For example, if all of the numbers of `n` are all unique and randomly distributed data, then `w` has to be at least `log n` to be able to store those numbers in memory. This results in `n * log n` complexity. This is quite a rabit hole of counter arguments. In conclusion though, Radix Sort theoretically can be faster than any of the comparison sorts.
