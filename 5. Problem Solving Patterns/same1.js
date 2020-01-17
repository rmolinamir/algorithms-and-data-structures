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

console.log(same([1, 2, 3], [4, 1, 9])); // true;
console.log(same([1, 2, 3], [1, 9])); // false;
console.log(same([1, 2 ,1], [4, 4, 1])); // false (must be same frequency);
