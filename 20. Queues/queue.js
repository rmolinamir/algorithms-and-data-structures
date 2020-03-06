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
