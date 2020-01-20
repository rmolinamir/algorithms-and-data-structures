/**
 * Accepts a variable number of arguments, and checkes whether there are any duplicates among the
 * arguments passed in.
 * @param {[Number] | [String]} values - Array of numbers or array of strings.
 */
function areThereDuplicates(...values) {
  const uniqueValues = {};
  for (let i = 0; i < values.length; i++) {
    const currentValue = values[i];
    uniqueValues[currentValue] = (uniqueValues[currentValue] + 1) || 1;
    const uniqueValueCount = uniqueValues[currentValue];
    if (uniqueValueCount > 1) {
      return true;
    }
  }
  return false;
}

console.log(areThereDuplicates(1, 2, 3)); // false
console.log(areThereDuplicates(1, 2, 2)); // true
console.log(areThereDuplicates('a', 'b', 'c', 'a')); // true

// One-liner
function areThereDuplicates(...values) {
  return new Set(values).size !== values.length;
}

console.log(areThereDuplicates(1, 2, 3)); // false
console.log(areThereDuplicates(1, 2, 2)); // true
console.log(areThereDuplicates('a', 'b', 'c', 'a')); // true
