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
  // - It will help to accept three arguments: an array, a start index, and an
  // end index (these can default to 0 and the array length minus 1, respectively).
  // - Grab the pivot from the start of the array.
  const pivot = arr[startIndex];
  // - Store the current pivot index in a variable (this will keep track of
  //   where the pivot should end up).
  let currentPivotIndex = startIndex;
  // - Loop through the array from the start until the end.
  for (let i = currentPivotIndex + 1; i <= arr.length; i += 1) {
    //   - If the pivot is greater than the current element, increment the pivot
    //   index variable and then swap the current element with the element at the pivot index.
    if (pivot > arr[i]) {
      currentPivotIndex += 1;
      [arr[currentPivotIndex], arr[i]] = [arr[i], arr[currentPivotIndex]];
    }
  }
  // - Swap the starting element (i.e. the pivot) with the pivot index.
  [arr[startIndex], arr[currentPivotIndex]] = [arr[currentPivotIndex], arr[startIndex]];
  return currentPivotIndex;
}

console.log(pivot([26, 23, 27, 44, 17, 47, 39, 42, 43, 1])); // 3
