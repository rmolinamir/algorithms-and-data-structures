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
 * Sorting algorithm where the largest values "bubble" (more accurately,
 * move, or swap) up to the top.
 * @param {[Number]} arr - Array to be sorted.
 */
function bubbleSort(arr) {
  // - Start looping with a variable called `i` from the end of the array towards the beginning.
  // - Start an inner loop with a variable called `j` from the beginning until `i - 1`.
  // - If `arr[j]` is greater than `arr[j + 1]`, swap those two values.
  // - If no swaps were made in the previous loop, then that means the array is sorted.
  //   Therefore, break all loops and return the array.
  let swapped;
  for (let i = arr.length; i > 0; i--) {
    swapped = false;
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swapped = true;
        swap(arr, j, j + 1);
      }
    }
    if (!swapped) { break; }
  }
  return arr;
}

console.log(bubbleSort([37, 45, 29, 8])); // [8, 29, 37, 45]
// The highest values will "bubble" to the top
// [37, 45, 29, 8]
// [37, 29, 8, 45]
// [29, 8, 37, 45]
// [8, 29, 37, 45]

console.log(bubbleSort([8, 7, 1, 2, 3, 4, 5, 6])); // [1, 2, 3, 4, 5, 6, 7, 8]
