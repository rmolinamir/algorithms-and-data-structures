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
