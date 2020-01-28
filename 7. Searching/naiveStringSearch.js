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
