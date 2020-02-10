/**
 * Responsible for merging two sorted arrays **in the same way**. Given two
 * arrays which are sorted, this helper function should create a new array
 * which is also sorted, and consists of all of the elements in the two
 * input arrays.
 * @param {Number[]} arr1 - Array of sorted numbers.
 * @param {Number[]} arr2 - Array of sorted numbers.
 */
function merge(arr1, arr2) {
  const arr = [];
  let i = 0; // arr1 loop counter.
  let j = 0; // arr2 loop counter.
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      arr.push(arr1[i]);
      i += 1;
    } else {
      arr.push(arr2[j]);
      j += 1;
    }
  }
  if (i === arr1.length) {
    for (j; j < arr2. length; j += 1) {
      arr.push(arr2[j]);
    }
  } else {
    for (i; i < arr1. length; i += 1) {
      arr.push(arr1[i]);
    }
  }
  return arr;
}

/**
 * Decomposing an array into smaller arrays of 0 or 1 elements
 * (divide and conquer approach), then building up a newly
 * sorted array
 * @param {Number[]} arr - Array of numbers.
 */
function mergeSort(arr) {

}
