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
