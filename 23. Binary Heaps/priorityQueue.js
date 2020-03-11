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
