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
