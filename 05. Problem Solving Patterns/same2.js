/**
 * Returns `true` if every value in the first array has it's corresponding value squared in the second array.
 * **`O(n)` solution** using frequency counter.
 * @param {[Number]} arr1
 * @param {[Number]} arr2
 */
function same(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  const frequencyCounter = new Map();
  for (const value of arr1) {
    if (!Number.isInteger) return false;
    const storedValue = frequencyCounter.get(value);
    if (Number.isInteger(storedValue)) {
      frequencyCounter.set(value, storedValue + 1);
    } else {
      frequencyCounter.set(value, 1);
    }
  }
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

console.log(same([1, 2, 3], [4, 1, 9])); // true;
console.log(same([1, 2, 3], [1, 9])); // false;
console.log(same([1, 2 ,1], [4, 4, 1])); // false (must be same frequency);
