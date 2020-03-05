const measure = require('./measurePerformance');

// O(n)
function logAtLeast5(n) {
  for (let i = 1; i <= Math.max(5, n); i++) {
    console.log(i);
  }
}

measure(() => {
  logAtLeast5(8);
});
