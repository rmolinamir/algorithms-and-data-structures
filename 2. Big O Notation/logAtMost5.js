const measure = require('./measurePerformance');

// O(n)
function logAtLeast5(n) {
  for (let i = 1; i <= Math.min(5, n); i++) {
    console.log(i);
  }
}

measure(() => {
  logAtLeast5(12500000000);
});
