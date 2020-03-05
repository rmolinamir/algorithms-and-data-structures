# Singly Linked Lists

## TL;DR

- Excellent alternative ways to arrays when insertion and deletion at the beginning are frequently required.
- Arrays contain a built-in index whereas Linked Lists do not.
- **The idea of a list of data structure that consists of nodes is the foundation for other data structures like Stacks and Queues**.

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

## JavaScript Singly Linked List ES2015 Class Code

**NOTE:** The explanations for all definitions and class methods are below the source code.

```js
/**
 * Nodes for the `SinglyLinkedList` class.
 * @member {Node} val - Piece of data.
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

/**
 * SinglyLinkedList
 * @member {Node} head - SinglyLinkedList head value pointer.
 * @member {Node} tail - SinglyLinkedList tail value pointer.
 * @member {number} length - SinglyLinkedList length.
 */
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    // Bindings
    this.push = this.push.bind(this);
    this.pop = this.pop.bind(this);
    this.shift = this.shift.bind(this);
    this.unshift = this.unshift.bind(this);
    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
    this.insert = this.insert.bind(this);
    this.remove = this.remove.bind(this);
    this.reverse = this.reverse.bind(this);
  }

  /**
   * Adds a `Node` to the end of the Singly Linked List.
   * @param {any} val - New tail `Node` value.
   * @returns {SinglyLinkedList} - SinglyLinkedList
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
    return current.val;
  }

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

  /**
   * Retrieving a `Node` by it's position in the Singly Linked List.
   * @param {Number} index - Position of the `Node`.
   * @returns {Node | null} - Found `Node` if any, else null.
   */
  get(index) {
    if (
      index < 0 ||
      index >= this.length
    ) {
      return null;
    }
    let i = 0;
    let current = this.head;
    while (i !== index) {
      current = current.next;
      i += 1;
    }
    return current;
  }

  /**
   * Changing the value of a `Node` based on the position in the Linked List.
   * @param {Number} index - Position of the Node`.
   * @param {any} val - Value to be set on the found `Node`.
   * @returns {Boolean} - Returns `true` if the `Node` was found, `false` otherwise.
   */
  set(index, val) {
    const node = this.get(index);
    if (node) {
      node.val = val;
      return true;
    }
    return false;
  }

  /**
   * Adding a `Node` to the Singly Linked List at a specific position.
   * @param {Number} index - Position of the Node`.
   * @param {any} val - Value to be set on the found `Node`.
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
      prevNode.next = newNode;
      this.length += 1;
      return true;
    }
    return false;
  }

  /**
   * Removing a `Node` from the Singly Linked List at a specific position.
   * @param {Number} index - Position of the `Node` to be removed.
   * @returns {any | undefined} - Removed `Node` value if valid, otherwise `undefined`.
   */
  remove(index) {
    if (
      index < 0 ||
      index >= this.length
    ) {
      return undefined;
    }
    if (index === this.length - 1) {
      return this.pop();
    }
    if (index === 0) {
      return this.shift();
    }
    const prevNode = this.get(index - 1);
    const removedNode = prevNode.next;
    const nextNode = removedNode.next;
    prevNode.next = nextNode;
    this.length -= 1;
    return removedNode.val;
  }

  /**
   * Reverse the Singly Linked List in place.
   * @returns {SinglyLinkedList} - SinglyLinkedList
   */
  reverse() {
    if (this.length === 0) {
      return this;
    }
    // Reversing the next properties:
    let currentNode = this.head;
    let prevNode = currentNode;
    let nextNode = currentNode.next;
    currentNode.next = null;
    while(nextNode) {
      currentNode = nextNode;
      nextNode = nextNode.next;
      currentNode.next = prevNode;
      prevNode = currentNode;
    };
    // Swap head and tail:
    const newTail = this.head;
    this.head = this.tail;
    this.tail = newTail;
    return this;
  }
}
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
   * @member {Node} val - Piece of data.
   * @member {Node} next - Referene to the next `Node`.
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

### Get

Retrieves a `Node` by it's position in the Singly Linked List. Function that should accept an index. If the index is less than 0 or greater than or equal to the `length` of the list, return `null`. Loop through the list until you reach the index and return the `Node` at that specific index.

```js
/**
 * Retrieving a `Node` by it's position in the Singly Linked List.
 * @param {Number} index - Position of the `Node`.
 * @returns {Node | null} - Found `Node` if any, else null.
 */
get(index) {
  if (
    index < 0 ||
    index >= this.length
  ) {
    return null;
  }
  let i = 0;
  let current = this.head;
  while (i !== index) {
    current = current.next;
    i += 1;
  }
  return current;
}
```

### Set

Changes the **value** of a `Node` based on the position in the Linked List. This function should accept a value and an index. It uses the `get` function to find the specific node. If the node is not found, it returns `false`. If the node is found, it updates its value and then returns `true`.

```js
/**
 * Changing the value of a `Node` based on the position in the Linked List.
 * @param {Number} index - Position of the Node`.
 * @param {any} val - Value to be set on the found `Node`.
 * @returns {Boolean} - Returns `true` if the `Node` was found, `false` otherwise.
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

Adds a `Node` to the Linked List at a **specific** position. If the index is less than zero or greater than the length, return `false`. If the index is same as the length, push a new `Node` to the end of the list. If the index is equal to 0, unshift a new `Node` to the start of the list. Then return `true`.

```js
/**
 * Adding a `Node` to the Singly Linked List at a specific position.
 * @param {Number} index - Position of the Node`.
 * @param {any} val - Value to be set on the found `Node`.
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
    prevNode.next = newNode;
    this.length += 1;
    return true;
  }
  return false;
}
```

### Remove

Removes a `Node` from the Singly Linked List at a **specific** position. If the index is less than zero, or greater than the `length` of the list, return `undefined`. If the index is zero, then `shift` will be returned. If the index is the same as the `length`, then `pop` will be returned. Otherwise, with the `get` method, the `Node` at `index - 1` will be accessed, and it will be wired to the `Node` that is ahead of the soon-to-be removed `Node` at position index (`index + 1`). After, it decrements the `length`, then the value of the removed `Node` is returned.

```js
/**
 * Removing a `Node` from the Singly Linked List at a specific position.
 * @param {Number} index - Position of the `Node` to be removed.
 * @returns {any | undefined} - Removed `Node` value if valid, otherwise `undefined`.
 */
remove(index) {
  if (
    index < 0 ||
    index >= this.length
  ) {
    return undefined;
  }
  if (index === this.length - 1) {
    return this.pop();
  }
  if (index === 0) {
    return this.shift();
  }
  const prevNode = this.get(index - 1);
  const removedNode = prevNode.next;
  const nextNode = removedNode.next;
  prevNode.next = nextNode;
  this.length -= 1;
  return removedNode.val;
}
```

### Reverse

Reverse the Singly Linked List **in place**. Swap the `head` and `tail`. Create two variables to store the next and previous nodes. Create a variable for the current node and initialize it to the `head`. Then, set next pointer to be the `next` property on whatever node it is, set the node's `next` property to be the pointer of the previous node, then... You know what? Just read the code. Trust me, it'll be easier to understand.

```js
/**
 * Reverse the Singly Linked List in place.
 * @returns {SinglyLinkedList} - SinglyLinkedList
 */
reverse() {
  if (this.length === 0) {
    return this;
  }
  // Reversing the next properties:
  let currentNode = this.head;
  let prevNode = currentNode;
  let nextNode = currentNode.next;
  currentNode.next = null;
  while(nextNode) {
    currentNode = nextNode;
    nextNode = nextNode.next;
    currentNode.next = prevNode;
    prevNode = currentNode;
  };
  // Swap head and tail:
  const newTail = this.head;
  this.head = this.tail;
  this.tail = newTail;
  return this;
}
```

### Singly Linked Lists Big O Notation

Inserting new nodes to a list is `O(1)` because we have easy access to each ends of the list and there is no need for re-indexing.

Removal depends on the `index` because we would have to traverse for an `index` amount of times until we reach our node. At best it's `O(1)`, at worse it's `O(n)`.

Searching is `O(n)` at worst case when we're looking for a value. We start from the first node searching for a matching value, up until the last node.

Access is the same as removal. It depends on the `index` because we would have to traverse for an `index` amount of times until we reach the desired node to be accessed. At best it's `O(1)`, at worse it's `O(n)`.

![singly linked lists big o notation](https://github.com/rmolinamir/algorithms-and-data-structures/blob/master/17.%20Singly%20Linked%20Lists/images/Singly-Linked%20Lists%20Big%20O%20Notation_singly%20linked%20lists%20big%20o%20notation.png?raw=true "Singly Linked Lists Big O Notation")
