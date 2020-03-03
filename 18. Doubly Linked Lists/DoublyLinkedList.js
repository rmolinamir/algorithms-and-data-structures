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
    this.prev = null;
    this.next = null;
  }
}

/**
 * @class DoublyLinkedList
 * @member {Node} head - SinglyLinkedList head value pointer.
 * @member {Node} tail - SinglyLinkedList tail value pointer.
 * @member {number} length - SinglyLinkedList length.
 */
class DoublyLinkedList {
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
    // this.remove = this.remove.bind(this);
    // this.reverse = this.reverse.bind(this);
  }

  /**
   * Adds a `Node` to the end of the Doubly Linked List.
   * @param {any} val - New tail `Node` value.
   * @returns {DoublyLinkedList} - DoublyLinkedList
   */
  push(val) {
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

  /**
   * Reverse the Doubly Linked List in place.
    * @returns {DoublyLinkedList} - DoublyLinkedList
   */
  reverse() {
    if (this.length === 0) {
      return this;
    }
    // Reversing the values:
    const newTailValue = this.head.val;
    this.head.val = this.tail.val;
    this.tail.val = newTailValue;
    return this;
  }
}
