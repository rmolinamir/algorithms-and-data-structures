/**
 * Many sorting algorithms involve some type of swapping functionality
 * (e.g. swapping to numbers to put them in order).
 * @param {*} arr - Array.
 * @param {*} idx1 - Index 1.
 * @param {*} idx2 - Index 2.
 */
function swap(arr, idx1, idx2) {
  // This line swaps the positions of the values in the `idx1` and `idx2` positions
  // of the array `arr` with each other.
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
}

/**
 * Builds up the sort by gradually creating a larger left half which is always sorted.
 * @param {[Number]} arr - Array of numbers to be sorted.
 */
function insertionSort(arr) {
  // - Start by picking the second element in the array.
  // - Now compare the second element with the one before it and swap if necessary.
  // - Continue to the next element and if it is in the incorrect order, iterate through the sorted position (i.e. the left side) to place the element in the correct place.
  // - Repeat until the array is sorted.
  for (let i = 1; i < arr.length; i += 1) {
    const currentValue = arr[i]
    let j = i - 1;
    for (j; j >= 0 && arr[j] > currentValue; j -= 1) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = currentValue;
  }
  return arr;
}

console.log(insertionSort([44, 3, 38, 5, 47, 15])); // [3, 5, 15, 38, 44, 47]
console.log(insertionSort([37, 45, 29, 8])); // [8, 29, 37, 45]
console.log(insertionSort([8, 7, 1, 2, 3, 4, 5, 6])); // [1, 2, 3, 4, 5, 6, 7, 8]
