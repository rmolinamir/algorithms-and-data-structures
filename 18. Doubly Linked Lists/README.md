# Doubly Linked Lists

## TL;DR

- Doubly Linked Lists are almost identical to Singly Linked Lists, except there is an additional pointer to previous nodes.
- The perfect example for Doubly Linked Lists are the browser history next/previous page buttons, where we easily go forward or back very efficiently.
- However, they do take up more memory considering the extra pointer.

## Doubly

We know what lists are, but **doubly**? They're almost identical to Singly Linked Lists, except every node has **another** pointer to the **previous** node, while as before nodes only had a pointer to the **next** node.

The drawback is that it will take more memory, but having a pointer to the previous node offers more flexibility as well.

## Setting up the Node Class

As mentioned, the only difference is that every node has another pointer to the `previous` node.

```js
/**
 * Nodes for the `SinglyLinkedList` class.
 * @member {Node} val - Piece of data.
 * @member {Node} prev - Referene to the prev `Node`.
 * @member {Node} next - Referene to the next `Node`.
 */
class Node {
  /**
   * Node class constructor.
   * @param {any} val - `Node`'s value.
   */
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
```

## JavaScript Doubly Linked List ES2015 Class Code

**NOTE:** The explanations for all definitions and class methods are below the source code.

### Push

Adds a `Node` to the end of the Doubly Linked List. Creates a new node with the value passed to the function. If the head property is null, then it sets the head to be the newly created node. If not, set the next property on the newly created node to be the tail. Increment the length, then return the list.

```js
/**
 * Adds a `Node` to the end of the Doubly Linked List.
 * @param {any} val - New tail `Node` value.
 * @returns {DoublyLinkedList} - DoublyLinkedList
 */
push() {
  const node = new Node(val);
  if (this.head === null) {
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
  }
  this.length += 1;
  return this;
}
```

### Pop

Removes a `Node` from the end of the Doubly Linked List. If the list is empty, it will return `undefined`. If the head and tail are the same node, it will set both to `null`. Otherwise, it updates the tail to be the previous node, and sets the next value of the new tail to be `null`. Decrements the length, then returns the value of the popped node.

```js
/**
 * Removes a `Node` from the end of the Singly Linked List.
 * @returns {any} - Removed `Node` value.
 */
pop() {
  if (!this.head) {
    return undefined;
  }
  const poppedNode = this.tail;
  if (this.head === this.tail) {
    this.head = null;
    this.tail = null;
  } else {
    this.tail = poppedNode.prev;
    this.tail.next = null;
  }
  this.length -= 1;
  poppedNode.prev = null;
  return poppedNode.val;
}
```

### Shift

Removes a `Node` from the beginning of the Doubly Linked List. If the list is empty, return `undefined`. Store the current head property in a variable, and then if the head is equal to the tail, then set both to `null`. Otherwise, remove the first node, and return the value of the shifted node.

```js
/**
 * Removes a `Node` from the beginning of the Doubly Linked List.
 * @returns {any} - Removed `Node` value.
 */
shift() {
  if (!this.head) {
    return undefined;
  }
  const shiftedNode = this.head; // Removed `Node`.
  if (this.head === this.tail) {
    this.head = null;
    this.tail = null;
  } else {
    this.head = shiftedNode.next;
    this.head.prev = null;
  }
  this.length -= 1;
  shiftedNode.next = null;
  return shiftedNode.val;
}
```

### Unshifting

Adds a `Node` to the beginning of the Doubly Linked List. Same process done for pushing, with the difference that the new node will be placed at the beginning.

```js
/**
 * Adds a `Node` to the beginning of the Singly Linked List.
 * @param {any} val - New head `Node` value.
 * @returns {DoublyLinkedList} - DoublyLinkedList
 */
unshift(val) {
  const node = new Node(val);
  if (this.head === null) {
    this.head = node;
    this.tail = node;
  } else {
    this.head.prev = node;
    node.next = this.head;
    this.head = node;
  }
  this.length += 1;
  return this;
}
```

### Getting

Accessing a node in a Doubly Linked List by its index position. If the indes is less than 0 or greater or equal to the length then return null. If the index is less than or equal to half of the length of the list (closer to the left), then loop starting from the head towards the middle, then return the found node. If the index is greater than half of the length (closer to the tail), loop starting from the tail towards the middle, then return the found node.

```js
/**
 * Accessing a node in a Doubly Linked List by its index.
 * @param {Number} index - Index of desired node.
 * @returns {Node | null} - Found Node or null.
 */
get(index) {
  if (
    index < 0 ||
    index >= this.length
  ) {
    return null;
  }
  let node;
  // Closer to the left:
  if (index <= Math.ceil(this.length / 2)) {
    let position = 0;
    node = this.head;
    while (position !== index) {
      node = node.next;
      position += 1;
    }
  // Closer to the right:
  } else {
    let position = this.length - 1;
    node = this.tail;
    while (position !== index) {
      node = node.prev;
      position -= 1;
    }
  }
  return node;
}
```

### Set

Replacing the value of a node in a Doubly Linked List. Creates a variable which is the result of the `get` method at the index passed to the function. If the `get` method returns a valid node, update its value with the value parameter, then return `true`. Otherwise, return `false`.

```js
/**
 * Replacing the value of a node in a Doubly Linked List.
 * @param {Number} index - Position of the node.
 * @param {any} val - Value to be set on the found node.
 * @returns {Boolean} - Returns `true` if the node was found, `false` otherwise.
 */
set(index, val) {
  const node = this.get(index);
  if (node) {
    node.val = val;
    return true;
  }
  return false;
}
```

### Insert

Adding a node in a Doubly Linked List at a certain position. If the index is 0, then `unshift`. If the index is the same as the length of the list, then `push`. If not, then it creates a variable which is the result of the `get` method at the `index - 1` position passed to the function. If the `get` method returns a valid node, insert a new node with the value parameter by setting the `next` and `prev` properties on the correct nodes to correctly link the list, increment the length, then return `true`. Otherwise, return `false`.

```js
/**
 * Adding a node to the Doubly Linked List at a specific position.
 * @param {Number} index - Position of the node.
 * @param {any} val - Value to be set on the found node.
 * @returns {Boolean} - Returns `true` if the index is valid, `false` otherwise.
 */
insert(index, val) {
  if (index === this.length) {
    this.push(val);
    return true;
  }
  if (index === 0) {
    this.unshift(val);
    return true;
  }
  const prevNode = this.get(index - 1);
  if (prevNode) {
    const newNode = new Node(val);
    newNode.next = prevNode.next;
    newNode.prev = prevNode;
    prevNode.next = newNode;
    newNode.next.prev = newNode;
    this.length += 1;
    return true;
  }
  return false;
}
```

### Remove

Removing a node in a Doubly Linked List by a certain position. Repeats the process done in `insert`, but instead of setting a new value, this function rewires the nodes in a correct way by removing the found node by `get`. If the index is 0, then `shift`. If the index is the same as the length of the list minus 1, then `pop`. If not, then fix the links after removing the found node. Returns the removed node value if successful.

```js
/**
 * Removing a node from the Singly Linked List at a specific position.
 * @param {Number} index - Position of the node to be removed.
 * @returns {any | undefined} - Removed node value if valid, otherwise `undefined`.
 */
remove(index) {
  if (
    index < 0 ||
    index >= this.length
  ) {
    return undefined;
  }
  if (index === 0) {
    return this.shift();
  }
  if (index === this.length - 1) {
    return this.pop();
  }
  const prevNode = this.get(index - 1);
  const removedNode = prevNode.next;
  prevNode.next = removedNode.next;
  removedNode.next.prev = removedNode.prev;
  this.length -= 1;
  return removedNode.val;
}
```

### Doubly Linked Lists Big O Notation

Inserting new nodes to a list is `O(1)` because we have easy access to each ends of the list and there is no need for re-indexing.

Removal depends on the `index` because we would have to traverse for an `index` amount of times until we reach our node. At best it's `O(1)`, and at worse it's `O(n)`, but it's more efficient than Singly Linked Lists.

Searching is `O(n)` at worst cases when we're looking for a value. We start from the first node searching for a matching value, up until the last node.

Access is the same as removal. It depends on the `index` because we would have to traverse for an `index` amount of times until we reach the desired node to be accessed. At best it's `O(1)`, at worse it's `O(n)`.
