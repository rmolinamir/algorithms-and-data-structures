/**
 * Function responsible for arranging elements in an array on either side of the pivot.
 * Rearranges elements in an array so that all values less than the pivot are moved to
 * the left of the pivot, and all values greater than the pivot are moved to the right
 * side of the pivot.
 * @param {Array} arr - Array to be sorted.
 * @param {Number} startIndex - Rearranging start index for the pivot.
 * @param {Number} endIndex - Rearranging end index for the pivot.
 */
function pivot(arr, startIndex = 0, endIndex = arr.length - 1) {
  const pivot = arr[startIndex];
  let currentPivotIndex = startIndex;
  for (let i = currentPivotIndex + 1; i <= endIndex; i += 1) {
    if (pivot > arr[i]) {
      currentPivotIndex += 1;
      [arr[currentPivotIndex], arr[i]] = [arr[i], arr[currentPivotIndex]]; // swap
    }
  }
  [arr[startIndex], arr[currentPivotIndex]] = [arr[currentPivotIndex], arr[startIndex]]; // swap
  return currentPivotIndex;
}

/**
 * Rearrange elements in an array so that all values are sorted.
 * @param {Number[]} arr - Unsorted array of numbers.
 */
function quickSort(arr, pivotLeft = 0, pivotRight = arr.length - 1) {
  // - Call the pivot helper on the array.
  const pivotIndex = pivot(arr, pivotLeft, pivotRight);
  // - When the helper returns you the updated pivot index, recursively call
  // the pivot helper on the subarray to the left of that index, and the
  // subarray to the right of that index.
  if (pivotIndex > pivotLeft) {
    // If the pivotIndex is greater than the pivotLeft, then that means
    // that there are values that are unsorted.
    quickSort(arr, pivotLeft, pivotIndex - 1);
  }
  if (pivotIndex !== pivotRight) {
    // If the pivotIndex is not equal to the pivotRight, then that means
    // that there are values to the right that are unsorted.
    quickSort(arr, pivotIndex + 1, pivotRight);
  }
  // Only once both conditions are met, meaning there are no unsorted
  // values at each side of the array, return the sorted array.
  return arr;
}

console.log(quickSort([26, 23, 27, 44, 17, 47, 39, 42, 43, 1])); // [1, 17, 23, 26, 27, 39, 42, 43, 44, 47]
console.log(quickSort([-152, 0, 124, 4, -5, 26, 23, 1, 27, 44, 17, 47, 39, 42, 43, 1])); // [-152, -5, 0, 1, 1, 4, 17, 23, 26, 27, 39, 42, 43, 44, 47, 124]
