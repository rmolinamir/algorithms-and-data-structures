const measure = require('./measurePerformance');

function addUpTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}

measure(() => {
  addUpTo(1000000000); // 1 Billion
});
