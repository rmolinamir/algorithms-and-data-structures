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

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  /**
   * Adds a key to the adjacency list with the name of the vertex
   * and set its value to be an empty array.
   * @param {String} key - Vertex identifier.
   */
  addVertex(key) {
    if (!this.adjacencyList[key]) {
      this.adjacencyList[key] = [];
    }
  }

  /**
   * Draw a connection between two vertices.
   * @param {String} firstVertexKey  - First Vertex identifier.
   * @param {String} secondVertexKey  - Second Vertex identifier.
   */
  addEge(firstVertexKey, secondVertexKey, weight) {
    // Checking if the vertices exist in the list.
    const shouldAddEdge = (
      this.adjacencyList[firstVertexKey] &&
      this.adjacencyList[secondVertexKey]
    );
    // Checking if the edges already exist should also be done,
    // but let's for learning purposes.
    if (shouldAddEdge) {
      this.adjacencyList[firstVertexKey].push({ node: secondVertexKey, weight });
      this.adjacencyList[secondVertexKey].push({ node: firstVertexKey, weight });
    }
  }

  /**
   * Remove a connection between two vertices.
   * @param {String} firstVertexKey  - First Vertex identifier.
   * @param {String} secondVertexKey  - Second Vertex identifier.
   */
  removeEdge(firstVertexKey, secondVertexKey) {
    // Checking if the vertices exist in the list.
    const shouldAddEdge = (
      this.adjacencyList[firstVertexKey] &&
      this.adjacencyList[secondVertexKey]
    );
    // Checking if the edges already exist should also be done,
    // but let's for learning purposes.
    if (shouldAddEdge) {
      this.adjacencyList[firstVertexKey] = this.adjacencyList[firstVertexKey]
        .filter(({ node: key }) => key !== secondVertexKey);
      this.adjacencyList[secondVertexKey] = this.adjacencyList[secondVertexKey]
        .filter(({ node: key }) => key !== firstVertexKey);
    }
  }

  /**
   * This function removes a vertex and all edges connecting
   * to this vertex.
   * @param {String} key - Vertex identifier.
   */
  removeVertex(key) {
    if (this.adjacencyList[key]) {
      this.adjacencyList[key].forEach(connectedVertexKey => {
        this.adjacencyList[connectedVertexKey] = this.adjacencyList[connectedVertexKey]
          .filter(({ node: vertexKey }) => vertexKey !== key);
      });
      delete this.adjacencyList[key];
    }
  }

  /**
   * Dijkstra's Algorithm to find the shortest path between the
   * starting node and the finish node.
   * @param {string} start - Start node identifier.
   * @param {string} finish - End node identifier.
   */
  dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    // Initializing PQ, and distances and previous caches.
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }
    // As long as there are nodes in the queue:
    let path = [];
    let smallest;
    while (nodes.values.length) {
      smallest = nodes.dequeue().val;
      if (smallest === finish) {
        while(previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        // For all neighbors in the smallest node from the PQ
        for (let neighbor in this.adjacencyList[smallest]) {
          // Find neighbor node
          let nextNode = this.adjacencyList[smallest][neighbor];
          // Calculate new distance to neighboring node
          let candidate = distances[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.node;
          if (candidate < distances[nextNeighbor]) {
            // Updating new smallest distance to neighbor
            distances[nextNeighbor] = candidate;
            // Updating previous - How we got to neighbor
            previous[nextNeighbor] = smallest;
            // Enqueue in PQ with new priority
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
    return path.concat(smallest).reverse();
  }
}

const graph = new WeightedGraph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');

graph.addEge('A', 'B', 4);
graph.addEge('A', 'C', 2);
graph.addEge('B', 'E', 3);
graph.addEge('C', 'D', 2);
graph.addEge('C', 'F', 4);
graph.addEge('D', 'E', 3);
graph.addEge('D', 'F', 1);
graph.addEge('E', 'F', 1);

console.log('dijkstra: ', graph.dijkstra('A', 'E'));
