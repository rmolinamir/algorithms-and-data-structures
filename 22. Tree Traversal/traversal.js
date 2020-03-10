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
    this.BFS = this.BFS.bind(this);
    this.DFSPreOrder = this.DFSPreOrder.bind(this);
    this.DFSPostOrder = this.DFSPostOrder.bind(this);
    this.DFSInOrder = this.DFSInOrder.bind(this);
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

  //
  // TRAVERSALS
  //

  /**
   * BFS through the tree to gather all of the nodes
   * and return them.
   * @returns {Node[]}
   */
  BFS() {
    const queue = [];
    const data = [];
    queue.push(this.root);
    while (queue.length) {
      const node = queue.shift();
      data.push(node);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    return data;
  }
  
  /**
   * DFS PreOrder traversal through the tree to gather
   * all of the nodes and return them.
   * @returns {Node[]}
   */
  DFSPreOrder() {
    const data = [];
    function traverse(node) {
      data.push(node);
      if (node.left) {
        traverse(node.left);
      }
      if (node.right) {
        traverse(node.right);
      }
    }
    traverse(this.root);
    return data;
  }
  
  /**
   * DFS PostOrder traversal through the tree to gather
   * all of the nodes and return them.
   * @returns {Node[]}
   */
  DFSPostOrder() {
    const data = [];
    function traverse(node) {
      if (node.left) {
        traverse(node.left);
      }
      if (node.right) {
        traverse(node.right);
      }
      data.push(node);
    }
    traverse(this.root);
    return data;
  }
  
  /**
   * DFS InOrder traversal through the tree to gather
   * all of the nodes and return them.
   * @returns {Node[]}
   */
  DFSInOrder() {
    const data = [];
    function traverse(node) {
      if (node.left) {
        traverse(node.left);
      }
      data.push(node);
      if (node.right) {
        traverse(node.right);
      }
    }
    traverse(this.root);
    return data;
  }
}

const bst = new BinarySearchTree();

bst.insert(10);
bst.insert(6);
bst.insert(15);
bst.insert(3);
bst.insert(8);
bst.insert(20);

console.log('bst.BFS(): ', bst.BFS()); // [10, 6, 15, 3, 8, 20]
console.log('bst.DFSPreOrder(): ', bst.DFSPreOrder()); // [10, 6, 3, 8, 15, 20]
console.log('bst.DFSPostOrder(): ', bst.DFSPostOrder()); // [3, 8, 6, 20, 15, 10]
console.log('bst.DFSInOrder(): ', bst.DFSInOrder()); // [3, 6, 8, 10, 15, 20]
