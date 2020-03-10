class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}


class BinarySearchTree {
  constructor() {
    this.root = null;
    // Bindings
    this.add = this.add.bind(this);
    this.insert = this.insert.bind(this);
    this.search = this.search.bind(this);
    this.find = this.find.bind(this);
  }

  /**
   * Recursively adds a node starting at a specific node,
   * defaulting to the root.
   * @param {Node} newNode - New node to be added.
   * @param {Node} startingNode - Starting node to be added.
   */
  add(newNode, startingNode = this.root) {
    if (newNode.val === startingNode.val) {
      return undefined;
    }
    if (newNode.val > startingNode.val) {
      if (startingNode.right) {
        return this.add(newNode, startingNode.right);
      }
      startingNode.right = newNode;
      return this;
    }
    if (startingNode.left) {
      return this.add(newNode, startingNode.left);
    }
    startingNode.left = newNode;
    return this;
  }

  /**
   * Adds a new node to the BST.
   * @param {any} val - The new node's value.
   */
  insert(val) {
    const node = new Node(val);
    if (!this.root) {
      this.root = node;
      return this;
    }
    return this.add(node);
  }

  /**
   * Recursively searches for node starting at a specific node,
   * defaulting to the root.
   * @param {any} val - Node's value.
   * @param {Node} startingNode - Starting node to be added.
   */
  search(val, startingNode = this.root) {
    if (val === startingNode.val) {
      return true;
    }
    if (val > startingNode.val) {
      if (startingNode.right) {
        return this.search(val, startingNode.right);
      }
      return false;
    }
    if (startingNode.left) {
      return this.search(val, startingNode.left);
    }
    return false;
  }

  /**
   * Finds a node base on a value.
   * @param {any} val - The value of the node we want to find.
   */
  find(val) {
    if (!this.root) {
      return false;
    }
    return this.search(val);
  }
}
