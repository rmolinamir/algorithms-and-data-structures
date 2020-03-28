/**
 * Every number after the first two is the sum of the two preceding ones.
 * @param {Number} n - `n` sequence repetitions.
 */
function fibonacciSequence(n) {
  if (n <= 0) {
    return 0;
  } else if (n <= 2) {
    return 1;
  }
  const fibNums = [0, 1, 1];
  for (const i = 3; i <= n; i++) {
    fibNums[i] =  fibNums[i - 1] + fibNums[i - 2];
  }
  return fibNums[n];
}
