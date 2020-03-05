# Selection Sort

Similar to bubble sort, but instead of placing the largest values into a sorted position, it places the smaller values into a sorted position. It's worth noting that this algorithm is really bad for nearly sorted data.

![selection sort example](https://github.com/rmolinamir/algorithms-and-data-structures/blob/master/9.%20Selection%20Sort/images/Selection-Sort%20Visual%20Example_selection%20sort%20example.png?raw=true "Selection Sort Visual Example")

Selection Sort consists of the following pattern:

- Store the first element as the smallest value you've seen so far.
- Compare this item to the next item in the array until you find a smaller number.
- If a smaller number is found, designate that smaller number to be the new minimum, and continue until the end of the array.
- If the minimum is nto the value (index) you initially began with, swap the two values.
- Repeat this with the next element until the array is sorted.

Every loop we set the minimum value in the desired position, so we apply the same process with the remaining values and thus reducing the "window" of possible unsorted values. We're shrinking the scope of what we're comparing as we loop through.

```js
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
 * we set the minimum value in the desired position, so we apply the same process
 * with the remaining values and thus reducing the "window" of possible unsorted values.
 * We're shrinking the scope of what we're comparing as we loop through.
 * @param {[Number]} arr - Array of numbers to be sorted.
 */
function selectionSort(arr) {
  // - Store the first element as the smallest value you've seen so far.
  // - Compare this item to the next item in the array until you find a smaller number.
  // - If a smaller number is found, designate that smaller number to be the new minimum, and continue until the end of the array.
  // - If the minimum is nto the value (index) you initially began with, swap the two values.
  // - Repeat this with the next element until the array is sorted.
  for (let i = 0; i < arr.length; i += 1) {
    let smallestNumber = i;
    for (let j = i; j < arr.length; j += 1) {
      if (arr[j] < arr[smallestNumber]) {
        smallestNumber = j
      }
    }
    if (smallestNumber !== i) {
      swap(arr, i, smallestNumber);
    }
  }
  return arr;
}

console.log(selectionSort([37, 45, 29, 8])); // [8, 29, 37, 45]
// The smallest values will swap until the array is ordered.
// [37, 45, 29, 8]
// [8, 45, 29, 37]
// [8, 29, 45, 37]
// [8, 29, 37, 45]

console.log(selectionSort([8, 7, 1, 2, 3, 4, 5, 6])); // [1, 2, 3, 4, 5, 6, 7, 8]
```

## Selection Sort Time Complexity

Selection Sort is not very efficient because it's `O(n^2)`. Selection Sort is only useful, if for some reason you want to minimize the number of swaps you're making, e.g. worried about writing to memory or doing the swap, then Selection Sort is better than Bubble Sort.
