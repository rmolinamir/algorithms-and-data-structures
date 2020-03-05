/**
 * Return the sum of all even numbers in an object which may contain nested objects.
 * @param {Object | Array | String | Number} arg - Argument.
 * @return {Number} - Sum of all even numbers.
 */
function nestedEvenSum(arg) {
  let sum = 0;
  function sumIfEvenNumber(param) {
    switch (true) {
      case Array.isArray(param):
        return param.forEach(value => sumIfEvenNumber(value));
      case typeof param === 'object':
        return sumIfEvenNumber(Object.values(param));
      case typeof param ==='number' && param % 2 === 0:
        return sum += param;
      default:
        return sum;
    }
  }
  sumIfEvenNumber(arg);
  return sum;
}

const obj1 = {
  outer: 2,
  obj: {
    inner: 2,
    otherObj: {
      superInner: 2,
      notANumber: true,
      alsoNotANumber: "yup"
    }
  }
}

const obj2 = {
  a: 2,
  b: {b: 2, bb: {b: 3, bb: {b: 2}}},
  c: {c: {c: 2}, cc: 'ball', ccc: 5},
  d: 1,
  e: {e: {e: 2}, ee: 'car'}
};

console.log(nestedEvenSum(obj1)); // 6
console.log(nestedEvenSum(obj2)); // 10
