# Queues

## TL;DR

- Queues are **FIFO** data structures, all elements are first in first out.
- Queues are useful for processing tasks and are foundational for more complex data structures.
- Insertion and Removal can be done `O(1)`.

## What is a Queue

It's very similar to a Stack in the sense that you add data in and you remove data out, and those are the only two operations, but the order at which data goes out is different. Queues follow the FIFO principle, First In First Out.

## Where are Queues used

Most relevant examples are video games where you're waiting to join a game, such as in the login screen, there's usually some queue structure keeping track of who's been waiting the longest and who's going to get added into the game first.

Background tasks, uploading resources, often are handled with queues. Printing/Task processing where one page at a time is processed, following a FIFO principle.

## Implementing a Stack using JavaScript built-in Arrays

As with stacks, creating a queue with built-in arrays is very easy, but not the most efficient option because of all of the memory garbage that we get along that will not be used. This is just one way of many:

```js
const queue = [];

queue.unshift('First');
queue.unshift('Second');
queue.unshift('Third');

console.log('queue', queue); // ["Third", "Second", "First"]

queue.pop(); // "First"
queue.pop(); // "Second"
queue.pop(); // "Third"
```

Unlike stacks, creating queues with built-in arrays leads to performance issues if the queues ever get to hold thousands of items, because when we `unshift`, or `shift` if using the opposite methods, we end up with `O(n)` operations due to re-indexing of multiple items. Regardless, this is still a queue.

## Implementing a Queue similar to a Singly Linked List

To achieve this, a `Queue` class is needed capable of pushing and popping values in and out just like with a Stack, along with a `Node` class to point or link the values to maintain a FIFO principle.

```js
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  ...
}
```

```js
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
```

### Enqueue

Inserts a new value into the queue, similarly to a stack's `push`.

```js
/**
 * Inserts a new node into the queue.
 * @param {any} val - Value of the newly created node.
 */
enqueue(val) {
  const node = new Node(val);
  if (this.size === 0) {
    this.first = node;
    this.last = node;
  } else {
    this.last.next = node;
    this.last = node;
  }
  this.size += 1;
  return this.size;
}
```

### Dequeue

Removes the first node from the queue, similarly to a stack's `pop`.

```js
/**
 * Removes the first node from the queue.
 */
dequeue() {
  if (this.size <= 0) {
    return null;
  }
  const temp = this.first;
  if (this.size === 1) {
    this.first = null;
    this.last = null;
  } else {
    this.first = this.first.next;
  }
  this.size -= 1;
  return temp.val;
}
```

### Queue Class

```js
/**
 * Nodes for the `Queue` class.
 * @member {Node} val - Piece of data.
 * @member {Node} next - Referene to the next `Node`.
 */
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/**
 * Queue class.
 * @member {Node} first - Queue first value pointer.
 * @member {Node} last - Queue last value pointer.
 * @member {number} size - Queue size.
 */
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /**
   * Inserts a new node into the queue.
   * @param {any} val - Value of the newly created node.
   */
  enqueue(val) {
    const node = new Node(val);
    if (this.size === 0) {
      this.first = node;
      this.last = node;
    } else {
      this.last.next = node;
      this.last = node;
    }
    this.size += 1;
    return this.size;
  }

  /**
   * Removes the first node from the queue.
   */
  dequeue() {
    if (this.size <= 0) {
      return null;
    }
    const temp = this.first;
    if (this.size === 1) {
      this.first = null;
      this.last = null;
    } else {
      this.first = this.first.next;
    }
    this.size -= 1;
    return temp.val;
  }
}
```

## Big O of Queues

Just like the Stack class, insertion and removal are `O(1)` operations. Searching and access are `O(n)` operations, but as before, these operations generally aren't important at all when it comes to queues, and if they are, then a queue is probably not the best choice for that specific use-case scenario.
