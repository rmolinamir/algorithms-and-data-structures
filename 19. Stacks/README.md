# Stacks

## TL;DR

- Stacks are **LIFO** data structures where the last value in is always the first value out.
- Stacks are used to handle function invocations (the call stack), for operations like undo/redo, and for routing (remember pages you have visited and go back/forward), etc.
- Not a built-in data structure in JavaScript but easy to implement.

## What is a Stack

They're an abstract data structure that needs to abide by a LIFO principle. LIFO stands for Last In, First Out. This principle means that the last element added to the stack will be the first element removed from the stack.

The most obvious example of a stack would probably be the JavaScript Call Stack, where the last function coming in is the one that will be executed at the earliest, and the first function will be the last to be removed, following the LIFO principle.

## Where are Stacks used

- Managing function invocations.
- Undo/redo features in applications like Microsoft Word.
- Routing (the history object) is treated like a stack.

## Implementing a Stack using JavaScript built-in Arrays

There is more than one way of implementing a stack. A stack is just a concept that follows the LIFO principle, basically a specification. In JavaScript we can use built-in arrays to create a stack using the `push` and `pop` methods (or `unshift` and `shit` albeit less efficiently):

```js
const stack = [];

// Actions
stack.push('create new file');
stack.push('resized file');
stack.push('cloned out image');

// Undo
stack.pop() // 'cloned out image' is gone, LIFO
```

## Implementing a Stack similar to a Singly Linked List

Using an array to build a stack is completely fine, but it comes with more methods and properties than we actually need. Ideally using a stack should work like this:

```js
const stack = new Stack();

stack.push('create new file'); // output: 1
stack.push('resized file'); // output: 2
stack.push('cloned out image'); // output: 3
stack.pop(); // output: "cloned out image"
stack.pop(); // output: "resized file"
stack.pop(); // output: "create new file"
stack.pop(); // output: null
```

To achieve this, a `Stack` class is needed capable of pushing and popping values in and out, along with a `Node` class to point or link the values maintaining the LIFO principle.

```js
class Stack {
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

### Pushing

The function should accept a value, it creates a new node with that value. If there are no nodes in the stack, it sets the first and last properties to be the newly created node. If there is at least 1 node, create a variable that stores the current first property on the stack. Reset the first property to be the newly created node, then set the next property to be the previously created variable. Then increase the size by 1.

```js
/**
 * Inserts a new node into the stack.
 * @param {any} val - Value of the newly created node.
 */
push(val) {
  const node = new Node(val);
  if (this.size === 0) {
    this.first = node;
    this.last = node;
  } else {
    const oldFirst = this.first;
    this.first = node;
    this.first.next = oldFirst;
  }
  this.size += 1;
  return this.size;
}
```

### Popping

If there are no nodes in the stack, return null. If there's only 1 node, set first and last properties to null. If there is more than one node, set the first property to be the next property on the current first. Decrement the size by 1 then return the value of the removed node.

```js
/**
 * Removes a node from the stack.
 */
pop() {
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

### Stack Class

```js
/**
 * Nodes for the `Stack` class.
 * @member {Node} val - Piece of data.
 * @member {Node} next - Referene to the next `Node`.
 */
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    // Bindings
    this.push = this.push.bind(this);
    this.pop = this.pop.bind(this);
  }
}

/**
 * Stack class.
 * @member {Node} first - Stack first value pointer.
 * @member {Node} last - Stack last value pointer.
 * @member {number} size - Stack size.
 */
class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /**
   * Inserts a new node into the stack.
   * @param {any} val - Value of the newly created node.
   */
  push(val) {
    const node = new Node(val);
    if (this.size === 0) {
      this.first = node;
      this.last = node;
    } else {
      const oldFirst = this.first;
      this.first = node;
      this.first.next = oldFirst;
    }
    this.size += 1;
    return this.size;
  }

  /**
   * Removes a node from the stack.
   */
  pop() {
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

## Big O of Stacks

Insertion and removal are `O(1)` operations. Searching and access are `O(n)` operations, but these operations generally aren't important at all when it comes to stacks, and if they are, then a stack is probably not the best choice for that specific use-case scenario.
