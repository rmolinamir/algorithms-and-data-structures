const measure = require('./measurePerformance');

function addUpTo(n) {
  return n * (n + 1) / 2;
}

measure(() => {
  addUpTo(1000000000); // 1 Billion
});
