# Merge Sort

- It's a combination of two things - merging and sorting! (and splitting).
- Exploits the fact that arrays of 0 or 1 element are always sorted.
- Works by decomposing an array into smaller arrays of 0 or 1 elements (divide and conquer approach), then building up a newly sorted array.

## How does it work

It begins by splitting the array into two halves, then proceeds to repeatedly split the arrays until a group arrays of 1 element at most is reached. Then, it sorts the previously split arrays of 2 elements, and then it starts to merge all of the split arrays back into one while also sorting it. Here's a visual example:

![merge sort](https://github.com/rmolinamir/algorithms-and-data-structures/blob/master/13.%20Merge%20Sort/images/Merge-Sort_merge%20sort.png?raw=true "Merge Sort")

## Merging Arrays

In order to implement merge sort, it's useful to first implement a function responsible for merging two sorted arrays **in the same way**. Given two arrays which are sorted, this helper function should create a new array which is also sorted, and consists of all of the elements in the two input arrays.

This function should run in `O(n + m)` time and `O(n + m)` space and should not modify the parameters passed to it. Here's how it should work:

- Create an empty array, take a look at the smallest values in each input array.
- While there are still values we haven't looked at...
  - If the value in the first array is smaller than the value in the second array, push the value in the first array into our results and move onto the next value in the first array.
  - If the value in the first array is larger than the value in the second array, push the value in the second array into our results and move on to the next value in the second array.
  - Once we exhaust one array, push in all remaining values from the other array.

```js
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
```

## Merge Sort pseudocode

- Break up the array into halves until you have arrays that are empty or have on element.
- Once you have smaller sorted arrays, merge those arrays with other sorted arrays until you are back at the full length of the array.
- Once the array has been merged back together, return the merged (and sorted!) array.

```js
/**
 * Decomposing an array into smaller arrays of 0 or 1 elements
 * (divide and conquer approach), then building up a newly
 * sorted array
 * @param {Number[]} arr - Unsorted array of numbers.
 */
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const half = Math.floor(arr / 2);
  return merge(mergeSort(arr.slice(0, half)), mergeSort(arr.slice(half)));
}
```

![merge sort visual breakdown](https://github.com/rmolinamir/algorithms-and-data-structures/blob/master/13.%20Merge%20Sort/images/Merge-Sort%20Visual%20Breakdown_merge%20sort%20visual%20breakdown.png?raw=true "Merge Sort Visual Breakdown")

## Merge Sort Big O

The best case, worst case, and average case for time complexities are always `O(n * log n)`. space complexity is of `O(n)`.

Merge sort has no edge case, it doesn't care how the array is initially structure. Because of this, merge sort will always be of `O(n * log n)`. But why is it `n * log n`?

If we start with an array of 8 elements, we have to split it into 2 arrays, so that's one decomposition. These two arrays are split into 2 more arrays, and so on and on until we reach arrays of 1 or 0 elements.

For an array of 32 values, we would do the following operations:

```js
32
16 16
8 8 8 8
4 4 4 4 4 4 4 4
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
```

When `n` was 32, we have 5 splits. If `n` was 8, we'd have 3 splits. This is `log n`. As we are decomposing the array logarithmically, we do `O(n)` operations when we're doing the merges. So in total, we end up with `O(n * log n)`.

As for the space complexity, merge sort takes up a lot more space than previous sorts such as bubble sort - which makes it a tradeoff.
