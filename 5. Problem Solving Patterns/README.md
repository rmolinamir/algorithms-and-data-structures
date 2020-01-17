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
