# Binary Heaps

## TL;DR

- Binary Heaps are very useful data structures for sorting, and implementing other data structures like priority queues.
- Binary Heaps are either Max Binary Heaps or Min Binary Heaps with parents either being smaller or larger than their children.
- With just a little bit of math, we can represent heaps using arrays!

## What is a Binary Heap

Heaps are tree structures. They're very similar to a Binary Search Tree, with some different rules.

- In a **Max Binary Heap**, parent nodes are always larger than child nodes.
- In a **Min Binary Heap**, parent nodes are always smaller than child noes.

Binary Heaps are as compact as possible. All of the children of each node are as full as they can be, and left children are filled out first. Binary Heaps are used to implement Priority Queues, which are **very** commonly used data structures. They are also used in **graph traversal** algorithms.

## Contrast between Min and Max heaps

In a Max Binary Heap:

- The value of each parent node is always **greater** than its children nodes.
- Each parent has at most two nodes.
- The parent is **greater** than the children, but there are no guarantees between sibling nodes.

In a Min Binary Heap:

- The value of each parent node is always **smaller** than its children nodes.
- Each parent has at most two nodes.
- The parent is **smaller** than the children, but there are no guarantees between sibling nodes.

## Heaps Methods

It's possible to represent Binary Heaps using Arrays by following these rules:

For any index of an array `n`:

- The left child is stored at `2n + 1`.
- The right child is at `2n + 2`.

Thanks to these two simple rules, it's possible to write a few methods for the Binary Heaps, such as Insert, Extract Max, Priority Queue, etc. It's even possible to create them without using the typical nodes of previous sections, and only using JavaScript built-in Arrays.

The reason we're using Arrays is to comply with a rule that was previously mentioned, *Binary Heaps are as compact as possible.*.

Arrays are a good way of keeping Binary Heaps as compact as possible, because we can "bubble up" new values into the Binary Heap up to their respective index.

### Insert

- Push the value into the values property on the heap.
- Bubble the value up to its correct spot:
  - To do this, create a variable called index which is the length of the values property - 1.
  - Create a variable called `parentIndex` which is the floor of `(index - 1) / 2`.
  - Keep looping as long as the value at the `parentIndex` is less than the value at the child index.
    - Swap the value of the values element at the `parentIndex` with the value of the element property at the child index.
    - Set the index to be the `parentIndex`, then start over.

```js
insert(val) {
  this.values.push(val);
  this.bubbleUp();
  return this.values;
}

bubbleUp(index = this.values.length - 1) {
  const parentIndex = Math.floor((index - 1) / 2);
  const element = this.values[index];
  const parentElement = this.values[parentIndex];
  // Swap values if the element is greater than the parent element.
  if (element > parentElement) {
    [this.values[parentIndex], this.values[index]] = [this.values[index], this.values[parentIndex]];
    this.bubbleUp(parentIndex);
  }
}
```

### ExtractMax

Remove the root, which is the maximum value of the Binary Heap, then replace with the most recently added. Then adjust the tree. A.K.A. sink it down.

Sinking down a tree is the procedure for deleting the root from the heap (effectively extracting the maximum element in a max-heap or the minimum element in a min-heap), then restoring the properties. The process of restoring the properties is called *down-heap* (A.K.A. *bubble-down*, *percolate-down*, *sift-down*, *trickle-down*, *heapify-down*, *cascade-down*, and *extract-min/max*).

In details, to extract the max value:

- Swap the first value in the values property with the last one.
- Pop from the values property, to remove the value at the end which is now the former max value.
- Have the new root "sink down" to its correct spot:
  - The parent index starts at 0 (the root).
  - Find the index of the left child at `2 * index + 1`, check that it's not out of the bounds of the array.
  - Find the index of the right child at `2 * index + 2`, check that it's not out of the bounds of the array.
  - **If the left or right child is greater than the element, swap. If both of them are larger, swap with the largest child**.
  - The child index that was swapped to now becomes the new parent index.
  - Keep looping and swapping until neither child is larger than the element.
- Return the old root.

## Priority Queue

A Priority Queue (PQ) is a data structure where each element has a priority. Elements with higher priorities are served before elements with lower priorities. There are different ways of implementing PQ, but Binary Heap is a great data structure to use for PQ implementations.

The way elements are shifted when inserting or removing values from the PQ is very similar to how elements are shifted when modifying a Binary Heap. This is the reason Binary Heaps are so good to build Priority Queues.

The difference is that now each element will have a value, and a priority. So each element will be an instance of a `Node` class with these two properties, and our Binary Heap will use the `priority` property to either bubble up, or sink down the values.

```js
class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}
```

The priority queue that we will write will be based on a **Min Binary Heap**.

- Each node has a `val` and `priority`. The `priority` property will be used to build the heap.
- **Enqueue** method that accepts values and a priority, makes a new node, and puts it in the correct spot based off its priority.
- **Dequeue** method that removes the root element, rearranges the heap, then returns the removed element.

```js
class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
    // Bindings
    this.enqueue = this.enqueue.bind(this);
    this.bubbleUp = this.bubbleUp.bind(this);
    this.dequeue = this.dequeue.bind(this);
    this.sinkDown = this.sinkDown.bind(this);
  }

  enqueue(val, priority) {
    const node = new Node(val, priority)
    this.values.push(node);
    this.bubbleUp();
    return this.values;
  }

  bubbleUp(index = this.values.length - 1) {
    const parentIndex = Math.ceil((index - 1) / 2);
    const element = this.values[index].priority;
    const parentElement = this.values[parentIndex] && this.values[parentIndex].priority;
    // Swap values if the element is greater than the parent element.
    if (element < parentElement) {
      [this.values[parentIndex], this.values[index]] = [this.values[index], this.values[parentIndex]];
      this.bubbleUp(parentIndex);
    }
  }

  dequeue() {
    const index = this.values.length - 1;
    [this.values[0], this.values[index]] = [this.values[index], this.values[0]];
    const minValue = this.values.pop();
    this.sinkDown();
    return minValue;
  }

  sinkDown(index = 0) {
    const element = this.values[index] && this.values[index].priority;
    const leftChildIndex = (2 * index) + 1;
    const rightChildIndex = (2 * index) + 2;
    const leftChild = this.values[leftChildIndex] && this.values[leftChildIndex].priority;
    const rightChild = this.values[rightChildIndex] && this.values[rightChildIndex].priority;
    // console.log('element priority: ', element);
    // If both priorities are larger than the element's priority,
    // swap with the largest priority:
    if (
      leftChildIndex <= this.values.length - 1 &&
      rightChildIndex <= this.values.length - 1 &&
      leftChild < element &&
      rightChild < element
    ) {
      const swappedChild = Math.min(leftChild, rightChild);
      const swappedIndex = swappedChild === leftChild ? leftChildIndex : rightChildIndex;
      [this.values[swappedIndex], this.values[index]] = [this.values[index], this.values[swappedIndex]];
      this.sinkDown(swappedIndex);
    // Else if the left sibling's priority is larger:
    } else if (
      leftChildIndex <= this.values.length - 1 &&
      leftChild < element
    ) {
      [this.values[leftChildIndex], this.values[index]] = [this.values[index], this.values[leftChildIndex]];
      return this.sinkDown(leftChildIndex);
    // Else if the right sibling's priority is larger:
    } else if (
      rightChildIndex <= this.values.length - 1 &&
      rightChild < element
    ) {
      [this.values[rightChildIndex], this.values[index]] = [this.values[index], this.values[rightChildIndex]];
      return this.sinkDown(rightChildIndex);
    }
  }
}

const ER = new PriorityQueue();

ER.enqueue('common cold', 5);
ER.enqueue('gunshot wound', 1);
ER.enqueue('high fever', 4);
ER.enqueue('broken arm', 2);
ER.enqueue('glass in foot', 3);

console.log('ER.values: ', ER.values);
/**
  [
    { val: 'common cold', priority: 1 },
    { val: 'gunshot wound', priority: 2 },
    { val: 'high fever', priority: 3 },
    { val: 'broken arm', priority: 4 },
    { val: 'glass in foot', priority: 5 }
  ]
  Priority Queue:
          1
      2       3
    4   5
 */

console.log('ER.dequeue(): ', ER.dequeue()); // { val: 'gunshot wound', priority: 5 }

console.log('ER.values: ', ER.values);
/**
  [
    { val: 'broken arm', priority: 2 },
    { val: 'high fever', priority: 4 },
    { val: 'glass in foot', priority: 3 },
    { val: 'common cold', priority: 5 }
  ]
  Priority Queue:
          2
      4       3
    5
 */
```

## Big O of Binary Heaps

- Insertion: `O(log n)`.
- Removal: `O(log n)`.
- Search: `O(n)`.

- As before, the reason that the time complexities of both insertion and removal is of `log n`, is because each time we go down a step in a binary structure, the number of comparisons are cut down by half. In other words, every time we double the number of nodes, the amount of operations only increase by 1.
- Search is `O(n)` because it visits every node because there is no guaranteed order when we search through the siblings.
