# Tree Traversal

## What is a Tree Traversal

Tree Traversal is the idea of traversing through **any** given tree, be it a Binary Tree, a Binary Search Tree, or any other, by visiting every node once.

There are many, many ways to traverse through a tree. These solutions can be divided into two main categories:

- Breadth First Search.
- Depth First Search.

These simply mean the direction in which the traversal is done. Breadth First Searches are *horizontal*, the traversal is done by *levels*. Depth First Search are *vertical*, but this search can then be split into 3 categories differentiated by the starting point (or node) of the searches: *PreOrder*, *PostOrder*, and *InOrder*.

![breadth first search](https://github.com/rmolinamir/algorithms-and-data-structures/blob/master/21.%20Trees/images/Tree-and%20its%20branching%20Nodes_tree%20and%20its%20branching%20nodes.png?raw=true "Breadth First Search")

### Breadth First Search (BFS)

Different approaches and different strategies all have different impact when it comes to traversing a tree. Let's talk first about how each of these strategies traverse the trees, then talk about the differences and when to use which.

To use BFS, create a queue (FIFO structure, which can be an array), and a variable to store the values of nodes visited.

Place the root node in the queue, then iteratibely loop as long as there is anything in the queue.

- Dequeue a node from the queue and push the value of the node into the variable that stores the nodes.
- If there is a left property on the node dequeued, add it to the queue.
- If there is a right property on the node dequeued, add it to the queue.

```js
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
```

### Depth First Search - PreOrder (DFS-Pre)

DFS algorithms traverse the nodes of the tree vertically down to the end of the tree before visiting sibling nodes. There are multiple orders in which a tree can be traversed, and each other of them have a different impact on the search.

PreOrder simply means that we visit the root node **first**.

To do this recursively, create a variable to store the values of the nodes visited. Store the root of the BST in a variable called `current`.

Create a closure which accepts a node.

- Push the value of the node to the variable that stores the values.
- If the node has a left property, call the helper function with the left property on the node.
- If the node has a right property, call the helper function with the right property on the node.

Because we are recursively calling the closure, all of the closure calls will go into the call stack, which is a LIFO structure. So as we traverse to a tree, it will traverse through the branch and stack the closure calls on top of each other, until there are no more nodes left in that branch, and because of the LIFO principle (Last In First Out). the nodes will be pushed into the variable from the top of the branch to the bottom of it.

Afterwards, the algorithm will then visit the sibling branches until there are no more nodes to be visited.

```js
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
```

### Depth First Search - PostOrder (DFS-Post)

In PreOrder, we start by visiting the root node **first**. In contrast, PostOrder means that we visit the root node **last**.

The algorithm is very similar to the DFS-Post traversal, the difference is that the found node is pushed into the aggregator array *after* we traverse through the branches of nodes. By taking advantage of the LIFO principle of the call stack, the nodes can be pushed *after* we recursively loop through the branches down from the bottom to the top of the tree.

In short:

- If the node has a left property, call the helper function with the left property on the node.
- If the node has a right property, call the helper function with the right property on the node.
- Push the value of the node to the variable that stores the values.

```js
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
```

### Depth First Search - InOrder (DFS-In)

As mentioned before, PreOrder starts by visiting the root node **first**. In contrast, PostOrder starts by visiting the root node **last**. Finally, InOrder will traverse the entire left side first, then visit the node, then we traverse the entire right side.

```js
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
```

### When to use BFS and DFS

It depends on the situation. Let's talk first about BFS in general vs. DFS in general, ignoring the orders. Which one would you use in a given scenario?

First off, the time complexity of the searches are the same. Every node is visited one time. What changes is the space complexity of the algorithms, the memory.

So, obviously it depends on the tree. If you have a wide tree that is fully fleshed out that is wide as it can be, horizontally of course, then BFS are **not** recommended. The reason for this is because the `queue` that is used to loop through the nodes will grow too big in memory in comparison to the size of the call stack of a DFS traversal.

So, in this sort of trees, where they are a lot more wider than they they are deep, DFS are much better in terms of space complexity.

In contrast, deep trees are better traversed with BFS, because the `queue` will be much smaller in memory than the call stack. The amount of siblings almost every level which make the `queue` will likely be smaller than the amount of nodes in a branch which would make the call stack.

### Potential Use Cases

- When you use DFS - InOrder in a BST, if you analyze the data that you get back, you will end up with an ordered list. Pretty good side-effect.
- DFS - PreOrder is returns the root as the first element of the list. This is potentially good in a scenario where you would need duplicate a first. Potentially you could serialize the list, store the list somewhere, then rehydrating it in a different place by looping through said list knowing that the first element will be the root.
- As an example, `React.js` uses DFS to traverse through the virtual DOM during paintings or re-renders.
