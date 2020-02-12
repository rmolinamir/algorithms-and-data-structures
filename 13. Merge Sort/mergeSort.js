/**
 * Responsible for merging two sorted arrays **in the same way**. Given two
 * arrays which are sorted, this helper function should create a new array
 * which is also sorted, and consists of all of the elements in the two
 * input arrays.
 * @param {Number[]} arr1 - Array of sorted numbers.
 * @param {Number[]} arr2 - Array of sorted numbers.
 */
function merge(arr1 = [], arr2 = []) {
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
 * sorted array.
 * @param {Number[]} arr - Unsorted array of numbers.
 */
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const half = Math.floor(arr / 2);
  return merge(mergeSort(arr.slice(0, half)), mergeSort(arr.slice(half)));
}

console.log(mergeSort([10, 24, 76, 73])) // [10, 24, 73, 76]
console.log(mergeSort([44, 3, 38, 5, 47, 15, 83, 14, 158, 31, 35, 61, 31, 45, 91, 64, 34, 45, 51, 52])) // [3,  5, 14, 15, 31,  31, 34, 35, 38, 44, 45, 45,  47, 51, 52, 61, 64, 83, 91, 158]
console.log(mergeSort([21,5,18,15,37,14,6,16,31,20,2,31,18,2,15,32,16,38,16,2,34,22,3,34,22,25,10,37,29,22,4,38,33,15,31,28,10,36,9,37,9,3,0,13,38,13,23,35,12,32,24,18,3,22,18,31,33,27,8,14,16,9,12,18,8,36,23,23,33,6,33,27,29,36,19,27,29,0,6,15,1,7,3,35,7,6,21,30,21,23,16,38,2,15,10,11,25,36,0,17,0,24,29,1,22,4,25,23,35,7,39,0,39,38,3,16,18,29,36,18,15,19,5,27,10,27,10,18,5,21,20,28,39,22,16,25,24,27,26,9,11,35,18,26,28,14,17,0,10,24,35,22,24,12,12,37,2,21,27,0,31,36,14,34,5,2,25,9,17,3,16,26,7,10,15,32,27,7,39,17,10,11,31,13,11,20,21,23,38,20,30,27,35,5,34,7,11,22,7,20,33,22,15,15,26,32,39,12,12,16,14,33,7,15,22,37,31,34,39,18,1,6,15,28,6,35,5,33,19,4,7,4,37,2,21,36,28,34,24,36,37,36,19,12,27,16,11,14,34,34,13,33,37,32,30,38,35,24,9,24,2,7,27,30,35,29,2,12,20,17,9,35,24,21,2,33,35,13,12,16,38,2,32,32,16,28,27,26,29,20,2,4,26,23,18,11,4,36,2,37,5,18,1,1,15,10,16,22,30,7,6,27,2,21,26,17,3,10,7,5,33,34,14,34,3,18,33,3,5,38,16,11,21,13,37,22,34,36,18,7,20,37,33,25,32,0,11,16,9,23,25,7,11,26,20,2,25,3,14,20,36,7,20,17,12,15,27,22,16,5,4,7,28,27,22,5,17,23,9,33,25,32,35,31,7,21,34,6,2,1,19,17,31,16,29,19,14,20,24,14]));
