/**
 * Implement a function called `countUniqueValues`, which accepts a sorted array,
 * and counts the unique values in the array. There can be negative numbers in the
 * array, but it will always be sorted.
 * @param {[Number]} arr - Sorted array of integers.
 */
function countUniqueValues(arr) {
  if (arr.length) {
    let i = 0;
    // The first loop is irrelevant since we would compare the same value.
    for (let j = 1; j < arr.length; j++) {
      const lastUniqueValue = arr[i];
      const currentValue = arr[j];
      if (currentValue !== lastUniqueValue) {
        // Current value of i is unique, replace the next value for a new unique value.
        i++;
        arr[i] = currentValue;
      }
    }
    return i + 1;
  }
  return 0;
}

console.log(countUniqueValues([1, 1, 1, 1, 1, 2])); // 2
console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7
console.log(countUniqueValues([])); // 0
console.log(countUniqueValues([-2, -1, -1, 0, 1])); // 4

// Modern solution using a JavaScript Set constructor.
function countUniqueValues(arr) {
  return new Set(arr).size;
}

console.log(countUniqueValues([1, 1, 1, 1, 1, 2])); // 2
console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7
console.log(countUniqueValues([])); // 0
console.log(countUniqueValues([-2, -1, -1, 0, 1])); // 4
