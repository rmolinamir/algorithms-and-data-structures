# Quick Sort

- Like merge sort, exploits the fact that arrays of 0 or 1 element are always sorted.
- Works by selecting one element (called the "pivot") and finding the index where the pivot should end up in the sorted array.
- Once the pivot is positioned appropriately, quick sort can be applied on either side of the spot.

## Pivot or Partition Helper

- In order to implement quick sort, it's useful to first implement a function responsible for arranging elements in an array on either side of the pivot.
- Given an array, this helper function should designate an element as the pivot.
- It should then rearrange elements in an array so that all values less than the pivot are moved to the left of the pivot, and all values greater than the pivot are moved to the right side of the pivot.
- The order of the elements on either side of the pivot doesn't matter.
- The helper should do this in place, that is, it should not create a new array.
- When complete, the helper should return the pivot.

## Picking a Pivot

- The runtime of quick sort depends in part on how one selects the pivot.
- Ideally, the pivot should be chosen so that it's roughly the median value in the data you're sorting.
- For simplicty, we'll always choose the pivot to be the first element (more about the consequences of this later).

## Pivot Pseudocode

- It will help to accept three arguments: an array, a start index, and an end index (these can default to 0 and the array length minus 1, respectively).
- Grab the pivot from the start of the array (optional).
- Store the current pivot index in a variable (this will keep track of where the pivot should end up).
- Loop through the array from the start until the end.
  - If the pivot is greater than the current element, increment the pivot index variable and then swap the current element with the element at the pivot index.
- Swap the starting element (i.e. the pivot) with the pivot index.

```js
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
```

## Quick Sort Pseudocode

- Call the pivot helper on the array.
- When the helper returns you  the updated pivot index, recursively call the pivot helper on the subarray to the left of that index, and the subarray to the right of that index.

```js
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
```

## Quick Sort Big O

The best and average case of quick sort time complexities are of `O(n * log n)`, while the worst case is `O(n^2)`. The space complexity is `O(log n)`

![quick sort big o](https://github.com/rmolinamir/algorithms-and-data-structures/blob/master/14.%20Quick%20Sort/images/Quick-Sort%20Big%20O_quick%20sort%20big%20o.png?raw=true "Quick Sort Big O")

The best case and average case scenarios of quick sort happen when the pivot is chosen as the average, or close to the average value of the array. Doing this will result in logarithmic decompositions because quick sort would end splitting the array in two halves.

The problem (and worst case) with quick sort arises when the pivot is chosen as the minimum value of the array, or the pivot is always the maximum element. And if we're pivoting around the minimum or the maximum values repeatedly, that's going to be cuadratic time - because quick sort will make decompositions (and `O(n)` comparisons) for every element in the array, resulting in `O(n^2)` time complexities.
