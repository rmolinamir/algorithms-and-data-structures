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

Naive string searching can take a lot of time. This is because as the algorithm iterates through the long string, it compares the current character to the first character of the short string, and if there is a match it proceeds to compare the rest of the characters one by one to the consecutive characters of the long string. In the worst case, this algorithm will be of `O(m * n)` where `m` and `n` are the lengths of the long string and short string respectively, which is pretty slow. This is where the Knuth-Morris-Pratt (KMP) search algorithm comes in.

## KMP String Searching Algorithm

The KMP algorithm is a simple substring search algorithm and therefore its purpose is to search for the existence of a substring within a string. To do this, it uses information based on previous matches and failures, taking advantage of the information that the word to search itself contains, to determine where the next existence could occur, without having to analyze the text more than once.

The algorithm was originally developed by Donald Knuth and Vaughan Pratt and independently by James H. Morris in 1977, but they were published together by all three.

The aim of the KMP algorithm is to not go backwards as done in the naive string search algorithm. The way it works is by doing comparisons with suffix and prefix information from the search string to the long string as it iterates.

### The Pattern Table

To compare suffixes and prefixes the KMP algorithm builds a table of jump lengths or pattern table with a time complexity of `O(n)` where `n` is the length of the short/tested string. This table works by iterating through the search string and assigning each character a jump length depending on the pattern of the string.

The jump length is calculated as the algorithm iterates through the search string. As it iterates, the algorithm will keep track of two pointers, `j` and `i`, where `i` represents the suffix index or current character and `j` represents the prefix index or "jumps", and both start at `0`. The algorithm then determines if there is a match or if there is no match as it iterates:

- If there is a match, the jump length that each character is assigned equals the index of `i` plus 1 (`i + 1`) of the previously matched character, then it adds 1 to both `i` and `j`.
- If there is no match, then `j` will "jump back" by the most recent amount of jump length until there is a match or `j` is 0, then the algorithm moves forward by adding 1 to `i` to evaluate the next character.

- Example #1:

| Characters           | a | b | c | d | a | b | c | a |
|----------------------|---|---|---|---|---|---|---|---|
| Index                | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| Jump Length          | 0 | 0 | 0 | 0 | 1 | 2 | 3 | 1 |

- Example #2:

| Characters           | a | a | b | a | a | b | a | a | a |
|----------------------|---|---|---|---|---|---|---|---|---|
| Index                | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| Jump Length          | 0 | 1 | 0 | 1 | 2 | 3 | 4 | 5 | 2 |

The idea of using a pattern table is to determine if we need to go backwards while searching through the long string by comparing the current characters to the pattern table.

```js
/**
 * Pattern or jump table.
 * @param {string} word
 * @return {number[]}
 */
function buildPatternTable(word) {
  const patternTable = [0];
  let prefixIndex = 0;
  let suffixIndex = 1;
  while (suffixIndex < word.length) {
    if (word[prefixIndex] === word[suffixIndex]) {
      patternTable[suffixIndex] = prefixIndex + 1;
      suffixIndex += 1;
      prefixIndex += 1;
    } else if (prefixIndex === 0) {
      patternTable[suffixIndex] = 0;
      suffixIndex += 1;
    } else {
      prefixIndex = patternTable[prefixIndex - 1];
    }
  }
  return patternTable;
}
```

### The Search

After the pattern table is built, it is time to loop through the string. To loop through the string, a text index and a word index or pointers are initiated. A match will be considered to happen whenever the text char at the text index and the word char at the word index are the same. Then what happens is the following:

- Loop while the text index is less than the text length.
  - If there is a character match, it will work similarly to the naive string search:
    - Check if the word string is completely included in the text by comparing the word index to the word length. If there is, then return the initial index where the match started to happen, or `(textIndex - word.length) + 1`.
    - If there is no complete match of the word but the character matches, both the word and text pointers are increased by 1.
  - If there are no character matches:
    - Check if the word index is higher than 0. This means there were previous matches. This is why the pattern table is important and avoids jumping backwards.
      - If it's higher than 0, then the word index will equal the pattern table's element at word index minus 1, or `patternTable[wordIndex - 1]`, then continue to the next loop. This is to take advantages of suffixes and prefixes in case the next `wordIndex` characters also match the word, because if they do, then there is no need to go back as we know they would not be a match anyway.
      - If it's 0, then simply reset the word index equal to zero and add 1 to the text index to continue the search.
- Return -1 if there are no matches.

```js
/**
 * The KMP algorithm is a simple substring search algorithm and therefore its purpose is to search for the existence
 * of a substring within a string. To do this, it uses information based on previous matches and failures, taking
 * advantage of the information that the word to search itself contains, to determine where the next existence
 * could occur, without having to analyze the text more than once.
 * @param {string} text
 * @param {string} word
 * @return {number}
 */
function knuthMorrisPratt(text, word) {
  if (word.length === 0) {
    return 0;
  }
  let textIndex = 0;
  let wordIndex = 0;
  const patternTable = buildPatternTable(word);
  while (textIndex < text.length) {
    if (text[textIndex] === word[wordIndex]) {
      // We've found a match.
      if (wordIndex === word.length - 1) {
        return (textIndex - word.length) + 1;
      }
      wordIndex += 1;
      textIndex += 1;
    } else if (wordIndex > 0) {
      wordIndex = patternTable[wordIndex - 1];
    } else {
      wordIndex = 0;
      textIndex += 1;
    }
  }
  return -1;
}


const test = 'potential';

const string = `This fact implies that the loop can execute at most 2n times. For, in each iteration, it executes one of the two branches in the loop. The first branch invariably increases i and does not
change m, so that the index m + i of the currently scrutinized character of S is increased. The second
branch adds i - T[i] to m, and as we have seen, this is always a positive number. Thus the location m
of the beginning of the current potential match is increased. Now, the loop ends if m + i = n;
therefore each branch of the loop can be reached at most k times, since they respectively increase
either m + i or m, and m = m + i: if m = n, then certainly m + i = n, so that since it increases by
unit increments at most, we must have had m + i = n at some point in the past, and therefore either
way we would be done.`;

console.log('knuthMorrisPratt(string, test): ', knuthMorrisPratt(string, test)) // 429
```
