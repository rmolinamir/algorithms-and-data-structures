# Common Problem Solving Patterns

## Frequency Counters

This pattern uses objects or sets to collect values/frequencies of values. This can often avoid the need for nested loops or `O(n^2)` operations with arrays/strings.

- Example:

**Write a function called `same`, which accepts two array. The function should return `true` if every value in the array has it's corresponding value squared in the second array. The frequency of values must be the same.**

Naive solution:

```js
/**
 * Returns `true` if every value in the first array has it's corresponding value squared in the second array.
 * **`O(n^2)` solution**
 * @param {[Number]} arr1
 * @param {[Number]} arr2
 */
function same(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    let correctIndex = arr2.indexOf(arr1[i] ** 2);
    if (correctIndex === -1) {
      return false;
    }
    arr2.splice(correctIndex, 1);
  }
  return true;
}

same([1, 2, 3], [4, 1, 9]); // true;
same([1, 2, 3], [1, 9]); // false;
same([1, 2 ,1], [4, 4, 1]); // false (must be same frequency);
```

The solution above is naive because `indexOf` and `splice` are two `O(n)` operations executed inside a loop. `indexOf` will search through the array the index of its parameter, and `splice` will re-index the array. All of these operations are done for every value of `arr1`, which results in `O(n^2)` operations.

Frequency counter pattern:

```js
/**
 * Returns `true` if every value in the first array has it's corresponding value squared in the second array.
 * **`O(n)` solution** using frequency counter.
 * @param {[Number]} arr1
 * @param {[Number]} arr2
 */
function same(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  const frequencyCounter = new Map();
  // Counting how many times the values are in arr1.
  for (const value of arr1) {
    if (!Number.isInteger) return false;
    const storedValue = frequencyCounter.get(value);
    if (Number.isInteger(storedValue)) {
      frequencyCounter.set(value, storedValue + 1);
    } else {
      frequencyCounter.set(value, 1);
    }
  }
  // Checking if the stored and counted values in arr1 match the square values in arr2.
  for (const value of arr2) {
    if (!Number.isInteger) return false;
    const squareRoot = Math.sqrt(value);
    const storedValue = frequencyCounter.get(squareRoot);
    if (storedValue >= 1) {
      frequencyCounter.set(squareRoot, storedValue - 1);
    } else {
      return false;
    }
  }
  return true;
}

same([1, 2, 3], [4, 1, 9]); // true;
same([1, 2, 3], [1, 9]); // false;
same([1, 2 ,1], [4, 4, 1]); // false (must be same frequency);
```

Two loops are vastly superior than `O(n^2)`.

Check `anagram.js` for another example.

## Multiple Pointers Pattern

Creating pointers or values that correspond to an index or position and move towards the beginning, end, or middle based on a certain condition. Very efficient for solving problems with minimal space complexity as well.

- Example #1:

**Write a function called `sumZero` which accepts a sorted array of integers. The function should find the first pair where the sum is 0. Return an array that includes both values that sum to zero or undefined if a pair does not exist.**

```js
/**
 * Accepts a sorted array of integers. The function should find the first pair where
 * the sum is 0. Return an array that includes both values that sum to zero or undefined
 * if a pair does not exist.
 * @param {[Number]} arr - Sorted array of integers.
 */
function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === 0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  }
}

sumZero([-3, -2, -1, 0, 1, 2, 3]); // [-3, 3]
sumZero([-2, 0, 1 ,3]); // undefined
sumZero([1, 2, 3]); // undefined
```

- Example #2:

**Implement a function called `countUniqueValues`, which accepts a sorted array, and counts the unique values in the array. There can be negative numbers in the array, but it will always be sorted.**

```js
/**
 * Implement a function called `countUniqueValues`, which accepts a sorted array,
 * and counts the unique values in the array. There can be negative numbers in the
 * array, but it will always be sorted.
 * @param {[Number]} arr - Sorted array of integers.
 */
function countUniqueValues(arr) {
  if (arr.length) {
    let i = 0;
    // The first loop is irrelevant since we would compare the same value.
    for (let j = 1; j < arr.length; j++) {
      const lastUniqueValue = arr[i];
      const currentValue = arr[j];
      if (currentValue !== lastUniqueValue) {
        // Current value of i is unique, replace the next value for a new unique value.
        i++;
        arr[i] = currentValue;
      }
    }
    return i + 1;
  }
  return 0;
}

countUniqueValues([1, 1, 1, 1, 1, 2]); // 2
countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13]); // 7
countUniqueValues([]); // 0
countUniqueValues([-2, -1, -1, 0, 1]); // 4

// Modern solution using a JavaScript Set constructor.
function countUniqueValues(arr) {
  return new Set(arr).size;
}

countUniqueValues([1, 1, 1, 1, 1, 2]); // 2
countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13]); // 7
countUniqueValues([]); // 0
countUniqueValues([-2, -1, -1, 0, 1]); // 4

```

## Sliding Window

This pattern involves creating a window which can either be an array or number from one position to another. Depending on a certain condition, the window either increases or closes (and a new window is created). Very useful for keeping track of a subset of data in an array, string, etc.

**Write a function called `maxSubArraySum` which accepts an array of integers and a number called `n`. The function should calculate the maximum sum of `n` consecutive elements in the array.**

```js
/**
 * Write a function called `maxSubArraySum` which accepts an array of integers and a
 * number called `n`. The function should calculate the maximum sum of `n` consecutive
 * elements in the array.
 * @param {[Number]} arr - Sorted array of integers.
 * @param {Number} num - Consecutive elements integer.
 */
function maxSubArraySum(arr, num) {
  let maxSum = 0;
  let tempSum = 0;
  if (arr.length < num) return null;
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}

maxSubArraySum([1, 2, 5, 2, 8, 1, 5], 2); // 10
maxSubArraySum([1, 2, 5, 2, 8, 1, 5], 4); // 17
maxSubArraySum([4, 2, 1, 6], 1); // 6
maxSubArraySum([4, 2, 1, 6, 2], 4); // 13
maxSubArraySum([], 4); // null
```

## Divide and Conquer

This pattern involves dividing a data set into smaller chunks and then repeating a process with a subset of data. **This pattern can tremendously decrease time complexity**.

- An Example

Given a **sorted** array of integers, write a function called `search`, that accepts a value and returns the index where the value passed to the function is located. If the value is not found, return -1.

```js
search([1, 2, 3, 4, 5, 6], 4); // 3
```

- A naive solution:

```js
function search(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      return i;
    }
  }
  return -1;
}
```

Time Complexity is `O(n)`.

- A Binary Search solution:

```js
function search(array, val) {
  let min = 0;
  let max = array.length - 1;
  while (min <= max) {
    let middle = Math.floor((min + max) / 2);
    let currentElement = array[middle];
    if (array[middle] < val) {
      min = middle + 1;
    } else if (array[middle] > val) {
      max = middle - 1;
    } else {
      return middle;
    }
  }
  return -1;
}
```

Time Complexity is `O(log n)`.

Check the examples inside the `extra` directory for more advanced examples.
