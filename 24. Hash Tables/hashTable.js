class HashTable {
  /**
   * @param {Number} size - Table size, defaults to a prime number equal to 53.
   */
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    let PRIME_NUMBER = 31;
    for(let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * PRIME_NUMBER + value) % this.keyMap.length;
    }
    return total;
  }

  /**
   * Sets a new key-value pair in our key map.
   * @param {String} key - Unique identifier for the key-value pair.
   * @param {*} value - Stored value.
   */
  set(key, value) {
    const hashedKey = this._hash(key);
    if (Array.isArray(this.keyMap[hashedKey])) {
      let keyValuePairExists = false;
      // Check if we're overwriting an existing key-value pair:
      for (let i = 0; i < this.keyMap[hashedKey].length; i+= 1) {
        const [storedKey] = this.keyMap[hashedKey][i];
        if (storedKey === key) {
          this.keyMap[hashedKey][i] = [key, value];
          keyValuePairExists = true;
          break;
        }
      }
      // Otherwise push the new value:
      if (!keyValuePairExists) {
        this.keyMap[hashedKey].push([key, value]);
      }
    // Initiate nested store:
    } else {
      this.keyMap[hashedKey] = [[key, value]];
    }
  }

  /**
   * Gets a stored key-value pair from our key map.
   * @param {String} key - Unique identifier for the key-value pair.
   */
  get(key) {
    const hashedKey = this._hash(key);
    if (Array.isArray(this.keyMap[hashedKey])) {
      for (const [storedKey, storedValue] of this.keyMap[hashedKey]) {
        if (storedKey === key) {
          return storedValue;
        }
      }
    }
    return undefined;
  }

  keys() {
    const keys = [];
    for (const nestedStore of this.keyMap) {
      if (Array.isArray(nestedStore)) {
        for (const [key] of nestedStore) {
          keys.push(key);
        }
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (const nestedStore of this.keyMap) {
      if (Array.isArray(nestedStore)) {
        for (const [,value] of nestedStore) {
          values.push(value);
        }
      }
    }
    return values;
  }
}

const hashTable = new HashTable();

console.log('hashTable.keyMap: ', hashTable.keyMap); // [ <53 empty items> ]

hashTable.set('hello', 'world'); // hashed key: 40
console.log("hashTable.get('hello'): ", hashTable.get('hello')); // world

hashTable.set('ping', 'pong'); // hashed key: 1
hashTable.set('bar', 'foo'); // hashed key: 10
hashTable.set('hello', 'not longer world'); // hashed key: 40
console.log("hashTable.get('hello'): ", hashTable.get('hello')); // not longer world

hashTable.set('foo', 'bar'); // hashed key: 45
hashTable.set('mauve', '#E0B0FF'); // hashed key: 45
hashTable.set('maroon', '#800000'); // hashed key: 5

console.log('hashTable.keyMap: ', hashTable.keyMap);
/**
[
  <1 empty item>,
  [ [ 'ping', 'pong' ] ],
  <8 empty items>,
  [ [ 'bar', 'foo' ] ],
  <1 empty item>,
  [ [ 'maroon', '#800000' ] ],
  <27 empty items>,
  [ [ 'hello', 'not longer world' ] ],
  <4 empty items>,
  [ [ 'foo', 'bar' ], [ 'mauve', '#E0B0FF' ] ],
  <7 empty items>
]
 */

console.log("hashTable.get('ping'): ", hashTable.get('ping')); // pong
console.log("hashTable.get('pong'): ", hashTable.get('pong')); // undefined

console.log('hashTable.keys(): ', hashTable.keys()); // [ 'ping', 'bar', 'maroon', 'hello', 'foo', 'mauve' ]
console.log('hashTable.values(): ', hashTable.values()); // [ 'pong', 'foo', '#800000', 'not longer world', 'bar', '#E0B0FF' ]
