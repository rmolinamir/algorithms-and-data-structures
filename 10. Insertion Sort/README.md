# Insertion Sort

It's very similar to Bubble Sort and Selection Sort, and there are situations where insertion sort is really good to know at. It builds up the sort by gradually creating a larger left half which is always sorted. It is very good for realtime data when we have to insert new data into a sorted position in an array.

Insertion Sort consists of the following pattern:

- Start by pucking the second element in the array.
- Now compare the second element with the one before it and swap if necessary.
- Continue to the next element and if it is in the incorrect order, iterate through the sorted position (i.e. the left side) to place the element in the correct place.
- Repeat until the array is sorted.

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
```

## Insertion Sort Time Complexity

At the worst case, Insertion Sort is `O(n^2)` for as the length of the array grows we also have to make `n` comparisons. If the data is almost all sorted, Insertion Sort is practically `O(n)` similarly to Bubble Sort.

Insertion Sort is very good is at online algorithm. It's an algorithm that sorts data as it receives new data. For example, users are submitting numbers to a server on realtime, because of how Insertion Sort where it always keeps one side of the array sorted, and we're inserting numbers one at a time, we can place it where it needs to go at an `O(n)` time complexity. To reiterate, this is all possible because this algorithm always keeps the left side sorted.
