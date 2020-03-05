# Searching

- What is a searching algorithm.
- Linear search on arrays.
- Binary seach on arrays.
- Naive string searching algorithm.
- KMP string searching algorithm.

## Linear Search

Given an array, the simplest way to search for a value is to look at every element in the array and check if it's the value we want.

JavaScript has native linear search methods, such as:

- `indexOf`
- `includes`
- `find`
- `findIndex`

- Example:

**Write a function that accepts an array and a value. Loop through the array and check if the current array element is equal to the value. And if it is, return the index at which the element is found. If the value is never found, return -1.**

```js
function linearSearch(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    const currentElement = arr[i];
    if (currentElement === value) { return i; }
  }
  return -1;
}

const states= ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

console.log(linearSearch(states, 'Iowa')); // 18
```

## Linear Search Big O

As the length of the array grows so does the amount of loops to check if the value matches any of the elements of the array, for this reason, it is of `O(n)` - linear complexity.

## Binary Search

- Binary Search is a much faster form of search.
- Rather than eliminating one element at a time, you can eliminate half of the remaining elements at a time.
- Binary search only works on sorted arrays!

The idea is to apply a *divide and conquer* pattern. The idea is to divide the array in multiple parts by comparing the target value to the middle element of the array. If they are not equal, the half in which the target is not found (because we must assume *for a fact* that the array is sorted) can be removed and the search continues on the remaining half, then repeat the same process by calculating a new middle index, until a value is found. For example:

- Imagina a function that accepts a sorted array and a value.
- Create a left pointer at the start of the array, and a right pointer at the end of the array.
- While the left pointer comes before the right pointer.
  - Create a pointer in the middle.
  - If you find the value you want, return the index.
  - If the value is too small, move the left pointer up closer to the right.
  - If the value is too large, move the right pointer down closer to the left.
- If you never find the value, return -1.

- Example #1:

```js
/**
 * Accepts an array and a value and returns the index at which the value exists.
 * Otherwise, return -1.
 * @param {[Number]} arr - Array of numbers.
 * @param {Number} targetElement - Target element to be found.
 */
// - Imagina a function that accepts a sorted array and a value.
function binarySearch(arr, targetElement) {
  // - Create a left pointer at the start of the array, and a right pointer at the end of the array.
  let start = 0;
  let end = arr.length - 1;
  // - Create a pointer in the middle.
  let middle = Math.floor((start + end) / 2);
  // - While the left pointer comes before the right pointer.
  while(arr[middle] !== targetElement && start <= end) {
    // - If the value is too large, move the right pointer down closer to the left.
    if(targetElement < arr[middle]){
      end = middle - 1;
    // - If the value is too small, move the left pointer up closer to the right.
    } else {
      start = middle + 1;
    }
    middle = Math.floor((start + end) / 2);
  }
  // - If you find the value you want, return the index.
  if(arr[middle] === targetElement){
    return arr[middle];
  }
  // - If you never find the value, return -1.
  return -1;
}

console.log('ITERATIVE SOLUTION'); // ITERATIVE SOLUTION
console.log(binarySearch([2,5,6,9,13,15,28,30], 103)); // -1
console.log(binarySearch([2,5,6,9,13,15,28,30], 1)); // -1
console.log(binarySearch([2,5,6,9,13,15,28,30], 30)); // 30
console.log(binarySearch([2,5,6,9,13,15,28,30], 28)); // 28
console.log(binarySearch([2,5,6,9,13,15,28,30], 6)); // 6
```

- Example #2:

```js
/**
 * Accepts an array and a value and returns the index at which the value exists.
 * Otherwise, return -1.
 * @param {[Number]} arr - Array of numbers.
 * @param {Number} targetElement - Target element to be found.
 */
// - Imagina a function that accepts a sorted array and a value.
function binarySearch(arr, targetElement) {
  // - Create a left pointer at the start of the array, and a right pointer at the end of the array.
  const start = 0;
  const end = arr.length;
  // - While the left pointer comes before the right pointer.
  if (start < (end - 1)) {
    // - Create a pointer in the middle.
    const middle = Math.floor(end / 2);
    const value = arr[middle];
    switch (true) {
      // - If you find the value you want, return the index.
      case value === targetElement:
        return value;
      // - If the value is too small, move the left pointer up closer to the right.
      case value < targetElement:
        return binarySearch(arr.slice(middle, end), targetElement);
        // - If the value is too large, move the right pointer down closer to the left.
      case value > targetElement:
        return binarySearch(arr.slice(start, middle), targetElement);
    }
  }
  // - If you never find the value, return -1.
  return -1;
}

console.log('RECURSIVE SOLUTION'); // RECURSIVE SOLUTION
console.log(binarySearch([2,5,6,9,13,15,28,30], 103)); // -1
console.log(binarySearch([2,5,6,9,13,15,28,30], 1)); // -1
console.log(binarySearch([2,5,6,9,13,15,28,30], 30)); // 30
console.log(binarySearch([2,5,6,9,13,15,28,30], 28)); // 28
console.log(binarySearch([2,5,6,9,13,15,28,30], 6)); // 6
```

## Binary Search Big O

Time complexity of binary search algorithms is of `O(log n)`. Here's why:

Suppose we're searching for `13` in this array, how many steps does it take?

- First step:

```js
//                           M
    [2, 4, 5, 9, 11, 14, 15, 19, 21, 25, 28, 30, 50, 52, 69, 63]
//  ^------------------------^
//   13 should be around here
```

- The first step is to pick a mid poin, `19` would be the middle.
- `13` is less than `19`, so we know it's somewhere on the left side of the array.
- Let's repeat the process several times until we find `13` or we realize it's not in the array:

- Second step:

```js
//            M
    [2, 4, 5, 9, 11, 14, 15]
//               ^---------^
//         13 should be around here
```

- Third step:

```js
//       M
    [11, 14, 15]
//  ^------^
//  13 should be around here
```

- Fourth step:

```js
    [11]
```

- At this point we can tell `13` is not in the array.

**16 elements took 4 "steps"** to conclude that the number `13` is not in this array.

Now, suppose we're searching for `32` in this array, how many steps does it take?

```js
//                                                      M
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 35]
//                                                      ^-----------------------------------------------------------------^
//                                                                          32 should be around here
```

- If we repeat the exact same process by cutting the array in half, over and over, we would arrive at the following array after 5 steps where we find `32`:

```js
    [32, 35]
```

**32 elements took 5 "steps"** to conclude that the number `32` is in this array.

The following two elements to step relationships can be written as:

- A: `log2(16) = 4`.
- B: `log2(32) = 5`.

Every time we **double** the size of the array (the size of `n`) we would be adding only 1 extra step, which is really good.

![different big O complexities comparison](https://github.com/rmolinamir/algorithms-and-data-structures/blob/master/07.%20Searching/images/Comparison-of%20the%20different%20types%20of%20Big%20O%20complexities_different%20big%20O%20complexities%20comparison.png?raw=true "Comparison of the different types of Big O complexities")

## Naive String Search

Searching for substrings (more than a single character) in a large string in the simplest solution.

- Suppose you want to count the number of times a smaller string appears in a longer string.
- The most simple approach involves checking pairs of characters individually.
- Loop over the longer string.
- Loop over the shorter string.
- If the characters don't match, break out of the inner loop.
- If the characters do match, keep going.
- If you complete the inner loop and find a match, increment the count of matches.
- Return the count.

```js
/**
  - Suppose you want to count the number of times a smaller string appears in a longer string.
  - The most simple approach involves checking pairs of characters individually.
  - Loop over the longer string.
  - Loop over the shorter string.
  - If the characters don't match, break out of the inner loop.
  - If the characters do match, keep going.
  - If you complete the inner loop and find a match, increment the count of matches.
  - Return the count.
  @param {String} long - Long string.
  @param {String} short - Short string.
 */
function naiveStringSearch(long, short) {
  let count = 0;
  for (let i = 0; i < long.length; i++) {
    for (let j = 0; j < short.length; j++) {
      const longChar = long[i + j];
      const shortChar = short[j];
      if (longChar !== shortChar) { break; }
      if (j === short.length - 1) { count += 1; }
    }
  }
  return count;
}

console.log(naiveStringSearch('lorie loled', 'lol')); // 1
console.log(naiveStringSearch('lorie loled', 'lo')); // 2
console.log(naiveStringSearch('lorie loled', 'l')); // 3
console.log(naiveStringSearch('lorie loled', 'lor')); // 1
console.log(naiveStringSearch('lorie loled', 'lorie')); // 1
```

## KMP String Searching

WIP.

[Video explanation.](https://www.youtube.com/watch?v=BXCEFAzhxGY)
[Written explanation.](https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/11273112#questions/8932824)
