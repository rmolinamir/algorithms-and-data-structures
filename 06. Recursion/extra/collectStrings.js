/**
 * Accepts an object and returns an array of all the values in the object that have a typeof string.
 * @param {Object} obj - Object.
 * @return {[String]} - Array of collected strings.
 */
function collectStrings(obj) {
  const arrayOfStrings = [];
  function pushIfString(pointer, pointerKey) {
    const value = pointer[pointerKey];
    switch (true) {
      case typeof value === 'object' && !Array.isArray(value):
        const keys = Object.keys(value);
        keys.forEach(key => {
          pushIfString(value, key);
        });
        break;
      case typeof value === 'string':
        arrayOfStrings.push(value);
        break;
      default: // Do nothing.
    }
  }
  const keys = Object.keys(obj);
  keys.forEach(key => {
    pushIfString(obj, key);
  });
  return arrayOfStrings;
}

const obj = {
  stuff: "foo",
  data: {
      val: {
          thing: {
              info: "bar",
              moreInfo: {
                  evenMoreInfo: {
                      weMadeIt: "baz"
                  }
              }
          }
      }
  }
}

console.log(collectStrings(obj)); // ["foo", "bar", "baz"])
