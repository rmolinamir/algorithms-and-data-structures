# Trees

## What is a Tree

A data structure that consists of nodes in a parent/child relationship. We basically end up with branches where each node can end up with one or multiple or zero nodes, and each node can keep splitting, so multiple branches can be created.

![tree and its branching nodes](https://github.com/rmolinamir/algorithms-and-data-structures/blob/master/21.%20Trees/images/Tree-and%20its%20branching%20Nodes_tree%20and%20its%20branching%20nodes.png?raw=true "Tree and its branching Nodes")

## Contrast between Trees and Lists

Lists are **linear**. Everything is in a line, in one row. We have a list item, then the next list item, then so on.

In trees, we can expect everything to be **nonlinear**. There are many paths you can take while traversing trees.

**Bear in mind**, that siblings can't point to other children in trees. Children pointing to other children while at the same time following parent/child relationship data structures are known as **graphs**. In a tree, every node is moving away from the root node. Trees also only have **one** entry point.

## Tree Terminology

- **Root**: The top node of a tree.
- **Child**: A node directly connected to another node when moving away from the root.
- **Parent**: Converse node of a child.
- **Siblings**: A group of nodes with the same parent.
- **Leaf**: A node with no children.
- **Edge**: The connection between one node and another.

## Where are Trees used

- HTML DOM. The Document Object Model is a tree like structure. We have elements and inside elements we have nested elements that are children, and they also have more nested elements.
- Network Routing.
- Abstract Syntax Trees.
- Artificial Intelligence.
- Folders in Operating Systems.
- JSON.

![artificial intelligence game decision tree](https://i.imgur.com/XPbr4k8.png "Artificial Intelligence Game Decision Tree")

## Difference between Trees, Binary Trees, Binary Search Trees

There are many types of trees, they all follow the same rules of what makes a data structure a tree, but they all have some sort of extra rule that makes them special. We'll be focusing on:

- Trees
- Binary Trees
- Binary Search Trees

Binary Search Trees are a special type of Binary Trees, which are special types of Trees. BSTs excel at searching because they contain stored data.

Regular Trees have no conditions, each node can have any amount of children, and in any order.

![trees](https://i.imgur.com/zBnZQTn.png "Trees")

Binary Trees have a special condition, each node can only have a maximum of 2 children, so it can have 0, 1, or 2 children at most.

![Binary Trees](https://i.imgur.com/NGbFu31.png "Binary Trees")

Binary Search Trees are used to store data that can be compared, that is sortable. BSTs work based upon a principle in which if you take any node on the tree, all falsy values (e.g. numbers less than the node's value) will be located to the left of it, and every value that is truthy (e.g. numbers greater than the node's value) will be located to the right.

![binary search trees](https://i.imgur.com/269UoAf.png "Binary Search Trees")

## How BSTs work

- Every parent node has at most two children.
- Every node to the left of the parent node is **always less** than the parent.
- Every node to the right of the parent node is **always greater** than the parent.

## Binary Search Trees Operations

BSTs are composed of a `BinarySearchTree` class that will serve as a data store, and a `Node` class which we use to connect all of the values.

```js
class BinarySearchTree {
  constructor() {
    this.root = null;
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
```

### Insert

First, create the new node. Then, starting at the root:

- Check if there is a root, if not then the root now becomes the new node. If there is a root, check if the value of the new node is greater than or less than the value of the root.
  - If it is greater, check to see if there is a node to the right:
    - If there is, move to that node and repeat the process.
    - If not, add that node as the right property.
  - If it is less, check to see if there is a node to the left:
    - If there is, move to that node and repeat these steps.
    - If there is not, add that node as the left property.

```js
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
```

### Search

Very similar to inserting. Then, starting at the root:

- Check if there is a root, if not then return false. If there is a root, check if the value is equal to the value of the root. If not, check if the value is greater than or less than the value of the root.
  - If it is greater, check to see if there is a node to the right:
    - If there is, move to that node and repeat the process.
    - If not, return false.
  - If it is less, check to see if there is a node to the left:
    - If there is, move to that node and repeat these steps.
    - If there is not, return false.

```js
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
```

### Big O of BSTs

Insertion is of `O(log n)`, and searching is of `O(log n)`, but this is **not** guaranteed. Remember these logarithms are of base 2. The reason the time complexity is of `log n` is because on every loop, we cut the amount of possible matches in half.

The reason that the `O(log n)` time complexities might not be guaranteed is because some BTS structures might be compose of a single branch, they might be entirely linear, and if they are, the time complexity goes up to `O(n)`.

There are some solutions for this phenomenon. One of the most common approaches is to restructure the tree by simply picking a new root that is (was) as close as possible to the "middle" of the linear tree.
