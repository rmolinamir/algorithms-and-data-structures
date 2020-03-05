/**
 * Nodes for the `Stack` class.
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
