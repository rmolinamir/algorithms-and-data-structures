# Singly Linked Lists

## Topics

- What a Singly Linked List is.
- Compare and contrast Linked Lists with Arrays.
- Implement insertion, removal, and traversal methods on Singly Linked Lists.

## What is a Linked List

It's a data structure that stores whatever sorted data you want. And it's ordered just like an array. But there's a really big distinction:

- In an array, each item is indexed with a number, so you can get the 5th and 6th item at east, and at anytime you add something it gets an index that is mapped to that value.

In a linked list, you have a bunch of elements with no indeces who are just pointing to the next element. But there is no index to access values - you have to start at the first one then move to the next until you reach the desired value.

Linked lists contain a head, a tail and a length property. They consists of nodes, and each node has a value and a pointer to the next node or null.

## Comparisons with Arrays

### Lists

- Do not have indexes.
- Connected via nodes with a `next` pointer.
- Random access is not allowed (to about re-indexing).

### Arrays

- Indexed in order.
- Insertion and deletion can be expensive.
- Can quickly be accessed at a specific index.

## JavaScript Singly Linked List ES2015 Class

```js
```

### Node Class

Describes the Nodes for the `SinglyLinkedList`.

```js
/**
 * Nodes for the `SinglyLinkedList` class.
 */
class Node {
  /**
   * Node class constructor.
   * @param {any} val - Node's value.
   */
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
```

### Push

This function should accept a value. It creates a new `Node` using the value passed to the function. If there is no `head` property on the list, set the `head` and the `tail` to be the
newly created `Node`. Otherwise, set the next property on the `tail` to be the new `Node` and set the `tail` property on the list to be the newly created `Node`. Increment `length` by `1`. Return the Singly Linked List.

```js
/**
 * Adds a `Node` to the end of the Singly Linked List.
 * @param {any} val - New tail `Node` value.
 */
push(val) {
  const node = new Node(val);
  if (this.head === null) {
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;
    this.tail = node;
  }
  this.length += 1;
  return this;
}
```

### Pop

Removes a `Node` from the end of the Singly Linked List. If there are no nodes left in the list, return `undefined`. Otherwise, loop through the list until you reach the tail. Set the `next` property of the 2nd to last `Node` to be `null`. Decrement the `length` of the list by 1, then returns the value of the removed `Node`.

```js
/**
 * Removes a `Node` from the end of the Singly Linked List.
 * @returns {any} - Removed `Node` value.
 */
pop() {
  if (this.length === 0) {
    return undefined;
  }
  let newTail;
  let current = this.head;
  while (current) {
    if (current.next) {
      newTail = current;
    }
    current = current.next;
  }
  current = this.tail; // Removed `Node`.
  this.length -= 1;
  if (this.length === 0) {
    this.head = null;
    this.tail = null;
  } else {
    this.tail = newTail;
    this.tail.next = null;
  }
  return current;
}
```

### Shifting

Removing a `Node` from the beginning of the Singly Linked List. If there are no nodes, return `undefined`. Store the current `head` property in a variable. Set the `head` property to be the current head's `next` property. Decrement the `length` by 1 then return the value of the removed `Node`.

```js
/**
 * Removes a `Node` from the beginning of the Singly Linked List.
 * @returns {any} - Removed `Node` value.
 */
shift() {
  if (this.length === 0) {
    return undefined;
  }
  const previousHead = this.head; // Removed `Node`.
  this.length -= 1;
  if (this.length === 0) {
    this.head = null;
    this.tail = null;
  } else {
    this.head = this.head.next;
  }
  return previousHead.val;
}
```

### Unshifting

Adds a `Node` to the beginning of the Singly Linked List. This function should accept a value. Create a new `Node` using the value passed to the function. If there is no `head` property on the list, set the `head` and `tail` to be the newly created `Node`. Otherwise, set the newly created node's next property to be the current `head` property on the list. Set the `head` property on the list to be that newly created `Node`. Increment the `length` of the list by 1. Return the Singly Linked List.

```js
/**
 * Adds a `Node` to the beginning of the Singly Linked List.
 * @param {any} val - New head `Node` value.
 * @returns {SinglyLinkedList} - SinglyLinkedList
 */
unshift(val) {
  const node = new Node(val);
  if (this.length === 0) {
    this.head = node;
    this.tail = node;
  } else {
    node.next = this.head;
    this.head = node;
  }
  this.length += 1;
  return this;
}
```
