# Doubly Linked Lists

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
