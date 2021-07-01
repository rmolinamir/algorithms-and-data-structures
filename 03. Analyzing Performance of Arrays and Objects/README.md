# Analyzing Performance of Arrays and Objects in JavaScript

- How do objects and arrays work through the lens of Big O?
- Why adding elements to the beginning of an array is costly?
- Compare and contrast the runtime for arrays and objects, as well as built-in methods.

## Objects

Unordered data structures store in key/value pairs.

- Works well when you don't need order.
- When you need fast access/insertion and removal.

## Big O of Objects

- Insertion - O(1)
- Removal - O(1)
- Searching - O(n)
- Access - O(1)

When you don't need any ordering, objects are an excellent choice.

```js
let person = {
  name: 'Robert',
  age: 25,
  favoriteNumbers: [1,2,3,4],
}
```

## Big O of Objects Methods

- Object.keys - O(n)
- Object.values - O(n)
- Object.entries - O(n)
- hasOwnProperty - O(1)

As the object grows, so does the number of operations of the `keys`, `values`, and `entries` methods.

## Arrays

Ordered lists. Often very useful if we need order, but comes at the cost of some operations. Each element comes with an index that corresponds to it.

- Good when you need order.
- When you need fast acces/insertion and removal (kinda).
  - Insertion - **It depends...**
  - Removal - **It depends...**
    - Searching - **O(n)**
      - Access - **O(1)**

Consider the following array

```js
let names = ['Michael', 'Melissa', 'Andrea'];

//            Michael     Melissa     Andrea
//               0           1           2
```

- Meaning of accessing an element:

When we directly access an element, JavaScript will not go through every element and then get to the one referred, so long as we have the index. If the size of the array does not matter, then the operation is `O(1)`.

```js
names[0];
```

- Meaning of inserting an element:

Pushing an element into the end array is constant time (`O(1)`). The problem comes when we try to insert at the beginning of the array.

```js
let names = ['Michael', 'Melissa', 'Andrea', 'Raj'];

//            Michael     Melissa     Andrea    Raj
//               0           1           2       3
```

When we insert an element at the beginning of an array, we have to re-index every single element in the array, we're talking `O(n)` time, the same goes to removing from the beginning.

```js
let names = ['Raj', 'Michael', 'Melissa', 'Andrea'];

//            Raj    Michael    Melissa    Andrea
//             0        1          2          3
```

In short:

- Inserting or removing at the beginning of an array: `O(n)`.
- Inserting or removing at the end of an array: `O(1)`.
- Accessing is always constant: `O(1)`.
- Searching operations are proportional to the length of the array. As the number of items grows in an array, so does the time that it potentially takes to find an element: `O(n)`.

## Big O of Array Methods

- push - `O(1)`
- pop - `O(1)`
- shift - `O(n)`
- unshift - `O(n)`
- concat - `O(n)`
- slice - `O(n)`
- splice - `O(n)`
- sort - `O(n * log n)`
- forEach/map/filter/reduce/etc. - `O(n)`

- `push` and `pop` is constant time, since they both insert or remove elements at the end of an array.
- `shift` and `unshift` are proportional to the length of the array, because we have to re-index every element of the array when we insert or remove elements at its beginning (hence the term `shift`).
- `concat` merges two or more arrays, the number of operations scale in proportion to the total size of the new array.
- `slice` returns a copy of part of an array into a new array, and it scales proportionally with how large of a copy or how many elements we are trying to copy.
- `splice` removes, replaces, or adds new elements at specific indexes. Since re-indexing is involved, it scales proportionally to the number of elements that we have to re-index.
- `sort` is much more complicated than other methods and its the slower than other methods. It does not loops through the array just once because comparisons are done and we have to move elements around.
- `forEach`/`map`/`filter`/`reduce`/etc. These methods simply loop through every element of the array, it just involves acting on every element, so as the size of the array increases so does the number of operations scales proportionally.

## TL;DR

- Objects are fast at pretty much everything but there's no order.
- Arrays are great when you need order.
  - It's better to add and remove from the end.
  - If possible, avoid to add and remove from the beginning (or at the middle).
