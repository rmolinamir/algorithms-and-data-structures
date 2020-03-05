const { performance } = require('perf_hooks');

/**
 * Measures the amount of time that it took to run a synchronous callback function.
 * @param {Function} callback - Callback function to be measured.
 */
function measurePerformance(callback) {
  const t1 = performance.now();
  callback();
  const t2 = performance.now();
  console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`);
}

module.exports = measurePerformance;
