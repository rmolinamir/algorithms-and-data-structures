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
