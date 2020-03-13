function rawHash(key, arrayLength) {
  let total = 0;
  for (let char of key) {
    let value = char.charCodeAt(0) - 96;
    total = (total + value) % arrayLength;
  }
  return total;
}

console.log('rawHash: ', rawHash('pink', 10)); // 0;
console.log('rawHash: ', rawHash('crimson', 10)); // 1;
console.log('rawHash: ', rawHash('skyblue', 10)); // 5;
console.log('rawHash: ', rawHash('red', 10)); // 7;
console.log('rawHash: ', rawHash('blue', 10)); // 0;

function refinedHash(key, arrayLength) {
  let total = 0;
  let PRIME_NUMBER = 31;
  for(let i = 0; i < Math.min(key.length, 100); i++) {
    let char = key[i];
    let value = char.charCodeAt(0) - 96;
    total = (total * PRIME_NUMBER + value) % arrayLength;
  }
  return total;
}

console.log('refinedHash: ', refinedHash('pink', 13)); // 5;
console.log('refinedHash: ', refinedHash('crimson', 13)); // 10;
console.log('refinedHash: ', refinedHash('skyblue', 13)); // 6;
console.log('refinedHash: ', refinedHash('red', 13)); // 11;
console.log('refinedHash: ', refinedHash('cyan', 13)); // 5;
