// Piece of data - val
// Reference to next node - next

/**
 * Nodes for the `SinglyLinkedList` class.
 * @member {Node} val - `Node` value.
 * @member {Node} next - Next `Node`.
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
}

const singlyLinkedList = new SinglyLinkedList();
