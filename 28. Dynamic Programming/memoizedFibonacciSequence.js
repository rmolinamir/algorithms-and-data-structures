/**
 * Every number after the first two is the sum of the two preceding ones.
 * @param {Number} n - `n` sequence repetitions.
 */
function fibonacciSequence(n, cache = []) {
  if (cache[n] !== undefined) {
    return cache[n];
  }
  if (n <= 0) {
    return 0;
  } else if (n <= 2) {
    return 1;
  }
  const sum = fibonacciSequence(n - 1) + fibonacciSequence(n - 2);
  cache[n] = sum;
  return sum;
}
