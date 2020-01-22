/**
 * Takes in an object and finds all of the values which are numbers and converts them to strings.
 * Recursion would be a great way to solve this!
 * @param {Object} obj - Object.
 * @return {Object}
 */
function stringifyNumbers(obj) {
  const copy = Object.assign({}, obj);
  function stringifyIfNumber(pointer, pointerKey) {
    const value = pointer[pointerKey];
    switch (true) {
      case typeof value === 'object' && !Array.isArray(value):
        const keys = Object.keys(value);
        keys.forEach(key => {
          stringifyIfNumber(value, key);
        });
        break;
      case typeof value === 'number':
        pointer[pointerKey] = pointer[pointerKey].toString();
        break;
      default: // Do nothing.
    }
  }
  const keys = Object.keys(copy);
  keys.forEach(key => {
    stringifyIfNumber(copy, key);
  });
  return copy;
}

let obj = {
  num: 1,
  test: [],
  data: {
      val: 4,
      info: {
          isRight: true,
          random: 66
      }
  }
}

console.log(stringifyNumbers(obj));

/*
  PRINTS:
  {
      num: "1",
      test: [],
      data: {
          val: "4",
          info: {
              isRight: true,
              random: "66"
          }
      }
  }
*/
