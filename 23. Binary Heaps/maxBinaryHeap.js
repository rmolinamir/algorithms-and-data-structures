class MaxBinaryHeap {
  constructor() {
    this.values = [];
    // Bindings
    this.insert = this.insert.bind(this);
    this.bubbleUp = this.bubbleUp.bind(this);
    this.extractMax = this.extractMax.bind(this);
    this.sinkDown = this.sinkDown.bind(this);
  }

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

  extractMax() {
    const index = this.values.length - 1;
    [this.values[0], this.values[index]] = [this.values[index], this.values[0]];
    const maxValue = this.values.pop();
    this.sinkDown();
    return maxValue;
  }

  sinkDown(index = 0) {
    const element = this.values[index];
    const leftChildIndex = (2 * index) + 1;
    const rightChildIndex = (2 * index) + 2;
    const leftChild = this.values[leftChildIndex];
    const rightChild = this.values[rightChildIndex];
    // If both of them are larger than the element, swap with the larger:
    if (
      leftChildIndex <= this.values.length - 1 &&
      rightChildIndex <= this.values.length - 1 &&
      leftChild > element &&
      rightChild > element
    ) {
      const swappedChild = Math.max(leftChild, rightChild);
      const swappedIndex = swappedChild === leftChild ? leftChildIndex : rightChildIndex;
      [this.values[swappedIndex], this.values[index]] = [this.values[index], this.values[swappedIndex]];
      this.sinkDown(swappedIndex);
    // Else if the left sibling is larger:
    } else if (
      leftChildIndex <= this.values.length - 1 &&
      leftChild > element
    ) {
      [this.values[leftChildIndex], this.values[index]] = [this.values[index], this.values[leftChildIndex]];
      return this.sinkDown(leftChildIndex);
    // Else if the right sibling is larger:
    } else if (
      rightChildIndex <= this.values.length - 1 &&
      rightChild > element
    ) {
      [this.values[rightChildIndex], this.values[index]] = [this.values[index], this.values[rightChildIndex]];
      return this.sinkDown(rightChildIndex);
    }
  }
}

const mbh = new MaxBinaryHeap();

mbh.insert(41);
mbh.insert(39);
mbh.insert(33);
mbh.insert(18);
mbh.insert(27);

//  At this point the tree looks like this: [41, 39, 33, 18, 27]

console.log('mbh.insert(12): ', mbh.insert(12)); // [41, 39, 33, 18, 27, 12]
console.log('mbh.insert(55): ', mbh.insert(55)); // [55, 39, 41, 18, 27, 12, 33]

//  At this point the tree looks like this: [41, 39, 33, 18, 27]

console.log('mbh.extractMax(): ', mbh.extractMax()); // 55
console.log('mbh.values: ', mbh.values); // [41, 39, 33, 18, 27, 12]

console.log('mbh.extractMax(): ', mbh.extractMax()); // 41
console.log('mbh.values: ', mbh.values); // [39, 27, 33, 18, 12]
