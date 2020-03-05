/**
 * Given an array of strings, capitalize the first letter of each string in the array.
 * @param {[String]} arr - Array of strings.
 * @return {[String]}
 */
function capitalizeFirst(arr) {
  function capitalize(str) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  }
  if (arr.length === 1) {
    return [capitalize(arr[0])];
  }
  const res = capitalizeFirst(arr.slice(0, -1));
  res.push(capitalize(arr.slice(arr.length - 1)[0]));
  return res;
}

console.log(capitalizeFirst(['car','taco','banana'])); // ['Car','Taco','Banana']
