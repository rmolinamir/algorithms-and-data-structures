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
  this.head = null;
  this.tail = null;
  this.length = 0;
  // Bindings
  this.push = this.push.bind(this);
  this.pop = this.pop.bind(this);
  this.shift = this.shift.bind(this);
  this.unshift = this.unshift.bind(this);
  // this.get = this.get.bind(this);
  // this.set = this.set.bind(this);
  // this.insert = this.insert.bind(this);
  // this.remove = this.remove.bind(this);
  // this.reverse = this.reverse.bind(this);

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
}
