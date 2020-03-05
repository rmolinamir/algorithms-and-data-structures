/**
 * Accepts an array of arrays and returns a new array with all values flattened.
 * @param {Array} arr - Array of arrays.
 * @return {Array}
 */
function flatten(arr){
  const flattenedArr = [];
  function flat(array) {
    array.forEach(value => {
      // If the value is an array, loop through that array
      if (Array.isArray(value)) {
        // If the value is an array, loop through that array,
        // Repeat proccess recursively
        return flat(value);
      // Otherwise, if value not an array
      } else {
        // Push value into flattened array
        flattenedArr.push(value);
      }
    });
  }
  flat(arr);
  return flattenedArr;
}

console.log(flatten([1, 2, 3, [4, 5] ])); // [1, 2, 3, 4, 5]
console.log(flatten([1, [2, [3, 4], [[5]]]])); // [1, 2, 3, 4, 5]
console.log(flatten([[1],[2],[3]])); // [1,2,3]
console.log(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]])); // [1,2,3]
