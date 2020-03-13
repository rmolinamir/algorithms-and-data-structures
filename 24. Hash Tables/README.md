# Hash Tables

## TL;DR

- Hash tables are collections of key-value pairs.
- Hash tables can find values quickly given a key.
- Can add new key-value pairs quickly.
- Stores data in a large array, and works by hashing the keys.
- A good hash should be fast, distribute keys uniformly, and be deterministic.

## What is a Hash Table

These are used so frequently you are bound to have used them already. They are built-in pretty much every language as a Hash Table or Hash Map. In this section we will be implementing our own version, only to find out how they work, and what hashing is.

These are all over the place. They are used to store key-value pairs. Arrays also store key-value pairs, but the keys are strictly numeric, hash table keys are not. Also, keys are sorted in arrays, whereas in hash tables they are not. Because of their speed, hash tables are very commonly used.

Unlike arrays, hash tables are fast for all of the following operations:

- Finding values.
- Adding new values.
- Removing values.

### Hash Tables in the Wild

- Python has **Dictionaries**.
- JavaScript has **Objets** and **Maps**.
- Java, Go, and Scala have **Maps**.
- Ruby has **hashes**.

Let's pretend for a second that these does not exist and we want to write our own hash tables. Imagine we want to store some colors, we could just use an array or list:

```js
['#FFC0CB', '#DC143C', '#87CEEB']
```

This is not a good way of storing colors if we want quick access to specific colors. It is not very readable either as it would be very hard to distinguish which one is, for example, the pink color. It would be nice if we would use more human readable keys such as `pink`, `crimson`, or `skyblue`, which are much better than `colors[0]`, etc. To implement a hash table, we'll be using an array.

In order to look up values by key, we need a way to **convert keys into valid array indices**, and then we store the data at that number. A function that performs this task is called a *hash function*.

## What is a Hashing Algorithm

Hash functions have uses all over the world over the internet, to protect data, security, authentication, cryptocurrencies, cryptography. There are multi-country teams dedicated to research in this field. It's a very complicated science, so what we will be doing here are very basic hash functions.

There are languages that expose built-in hash functions such as Python, which allows us to pass data, then we get a returned hashed value which is nothing more than an unique numeric identifier related to the passed string.

![hash in python](https://i.imgur.com/uu6d8E3.png "Hash in Python")

In most cases in a hash function we can't work backwards from the hash alone back to the value, so it's meaningless on its own.

## What makes a good Hashing Algorith (excluding security topics)

- It has to be fast, constant time.
- Doesn't cluster outputs at specific indices, but distributes uniformly.
- Deterministic, every time that we pass the same input, it returns the same output.

The goal is to write a `hash` function that accepts two parameters. An identifier that will be mapped to the inserted value, and the length of an array that will store the data.

To guarantee that our numeric identifiers are unique, we can take advantage of the fact that every `utf-16` character has an associated encoded byte to it, for example:

```js
'hello world'.charCodeAt(0)
```

This process will be done for every character of the string in order to accumulate their encoded bytes, while also substracting `96` to every character code so that the letter `a` matches the code char code `1` to match their alphabetical positions for the sake of simplicity. Then, after each time that we accumulate the total, we will use a `modulus` to get the remainded of the division of the total divided by the length of the array that will be used to store the values, then repeat the process for every character.

```js
function hash(key, arrayLength) {
  let total = 0;
  for (let char of key) {
    let value = char.charCodeAt(0) - 96;
    total = (total + value) % arrayLength;
  }
  return total;
}

console.log(hash('pink', 10)); // 0;
console.log(hash('crimson', 10)); // 1;
console.log(hash('skyblue', 10)); // 5;
console.log(hash('red', 10)); // 7;
console.log(hash('blue', 10)); // 0 - This is a problem;
```

There are problems with this approach:

1. Only hashes strings, but this will be ignored.
2. It's not constant time - linear in key length.
3. Could be a more randomized.

Interestingly, we can use prime numbers to solve these problems so that it runs closer to constant time.

```js
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

console.log('refinedHash: ', refinedHash('pink', 10)); // 0;
console.log('refinedHash: ', refinedHash('crimson', 10)); // 1;
console.log('refinedHash: ', refinedHash('skyblue', 10)); // 5;
console.log('refinedHash: ', refinedHash('red', 10)); // 7;
console.log('refinedHash: ', refinedHash('blue', 10)); // 0;
```

Prime numbers are almost always used in hash functions. There is a lot of math involved, and the exact reasoning is quite advanced. However, there are a couple of reasons:

- It reduces collisions, meaning that we don't data stored in the same bucket.
- We want to spreading data out as fast as possible so that it's faster to retrieve.

The number in the hash is helpful in spreading out the keys more uniformly. It's also helpful if the array you're putting values into has a prime length. The idea is to use a table size equal to a prime number so that the number of collisions is reduced.

Note that this hash function is most definitely not a good hash function, but it serves to get the point accross.

## Understand how collisions occur in a Hash Table

When we have a hash function and we have a lot of data, it becomes very likely that collisions will occur. There are many strategies to handle collisions, and these two are among the most common ones:

- Separate Chaining
- Linear Probing

With *separate chaining*, at each index in our array we store values using a more sophisticated data structure (e.g. an array or a linked list). This allows us to store multiple key-value pairs at the same index (think of a nested array at the same index).

![separate chaining](https://i.imgur.com/TuLRgxW.png "Separate Chaining")

With *linear probing*, when a collision occurs, the value is stored at the next empty slot, which avoid having nested structures. The problem with this strategy happens when we run out of space to store values, e.g. if the table size is 8191 (prime number), then it will hold a maximum of 8191 key-value pairs unless combined with other strategies.

![linear probing](https://i.imgur.com/3CyD2GP.png "Linear Probing")

## A Hash Table Class

Next let's create a Hash Table Class that implements separate chaining to set and get values from the nested structures.

```js
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
}
```

### Set

1. Accepts a key and a value.
2. Hashes a key.
3. Stores the key-value pair in the hash table array via separate chaining.

```js
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
```

### Get

1. Accepts the key.
2. Hashes the key.
3. Retrieves the key-value pair in the hash table.
4. If the key isn't found, return `undefined`.

```js
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
```

### Keys

1. Loops through the hash table array and returns and array of keys in the table.

```js
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
```

### Values

1. Loops through the hash table array and returns an arary of values in the table.

```js
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
```

### Big O of Hash Tables

- Insertion: `O(1)` (constant time) on average.
- Deletion: `O(1)` (constant time) on average.
- Access: `O(1)` (constant time) on average.

Pretty much every programming language has an implementation of a hash table that has a constant time hash function. Some hash functions like cryptographic hash functions are different and they need to run for every single bit of data, because the hash function needs to parse every single bit of data to secure it.
