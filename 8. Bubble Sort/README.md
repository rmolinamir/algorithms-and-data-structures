# Bubble Sort

Sorting is the process of rearranging the items in a collection (e.g. an array) so that the items are in some kind of order.

- Sorting numbers from smallest to largest.
- Sorting names alphabetically.
- Sorting movies based on release year.
- Sorting movies based on revenue.

Sorting is an incredibly common task, good to know how it works. There are many ways of sorting things, and different techniques have their own advantages and disadvantages.

## Built-in JavaScript sorting

JavaScript has a sort method, but it does not always work the way you'd expect. The default sort order is according to string Unicode code point values.

## Telling JavaScript how to sort

The built-in sort method accepts an optional comparator function. You can use this comparator function to tell JavaScript how you want it to sort. The comparator looks at pairs of elements (`a` and `b`), and determines their sort order based on the return value.

- If it returns a negative number, `a` should come before `b`.
- If it returns a positve number, `a` should come after `b`.
- If it returns 0, `a` and `b` are the same as far as the sort is concerned.

- Example:

```js
function numberCompare(num1, num2) {
  return num1 - num2;
}

[6,4,15,10].sort(numberCompare); // [4, 6, 10, 15]

function compareByLength(str1, str2) {
  return str1.length - str2.length;
}

['Normalish', 'Short', 'Kinda Long', 'Super Long String'].sort(compareByLength); // ['Short', 'Normalish', 'Kinda Long', 'Super Long String']
```

## Bubble Sort Algorithm

It's a sorting algorithm where the largest values "bubble" (more accurately, move, or swap) up to the top. It's not that efficient or commonly used except in one use case where it does excel, but generally it's not a life changing algorithm to know.

![bubble sort illustration](https://i.imgur.com/EYqnrMu.png "Bubble Sort Illustration")

Bubble sort consists of the following pattern:

- Start looping with a variable called `i` from the end of the array towards the beginning.
- Start an inner loop with a variable called `j` from the beginning until `i - 1`.
- If `arr[j]` is greater than `arr[j + 1]`, swap those two values.

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

```
