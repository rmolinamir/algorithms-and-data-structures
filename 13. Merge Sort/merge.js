/**
 * Responsible for merging two sorted arrays **in the same way**. Given two
 * arrays which are sorted, this helper function should create a new array
 * which is also sorted, and consists of all of the elements in the two
 * input arrays.
 * @param {Number[]} arr1 - Array of sorted numbers.
 * @param {Number[]} arr2 - Array of sorted numbers.
 */
function merge(arr1, arr2) {
  // - Create an empty array, take a look at the smallest values in each input array.
  const arr = [];
  let i = 0; // arr1 loop counter.
  let j = 0; // arr2 loop counter.
  // - While there are still values we haven't looked at...
  //   - If the value in the first array is smaller than the value
  //     in the second array, push the value in the first array into our
  //     results and move onto the next value in the first array.
  //   - If the value in the first array is larger than the value in the
  //     second array, push the value in the second array into our results
  //     and move on to the next value in the second array.
  //   - Once we exhaust one array, push in all remaining values from
  //     the other array.
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      arr.push(arr1[i]);
      i += 1;
    } else {
      arr.push(arr2[j]);
      j += 1;
    }
  }
  // If `i` is equal to the arr1 length, then we exhausted that array.
  // So we push the remaining values of arr2.
  // Otherwise, the inverse happens.
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

console.log(merge([1, 10, 50], [2, 14, 99, 100])); // [1, 2, 10, 14, 50, 99, 100]
console.log(merge([], [1, 3])); // [1, 3]
console.log(merge([1, 3], [1, 3])); // [1, 1, 3, 3]
