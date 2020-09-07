class Graph {
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
  addEdge(firstVertexKey, secondVertexKey) {
    // Checking if the vertices exist in the list.
    const shouldAddEdge = (
      this.adjacencyList[firstVertexKey] &&
      this.adjacencyList[secondVertexKey]
    );
    // Checking if the edges already exist should also be done,
    // but let's for learning purposes.
    if (shouldAddEdge) {
      this.adjacencyList[firstVertexKey].push(secondVertexKey);
      this.adjacencyList[secondVertexKey].push(firstVertexKey);
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
        .filter(key => key !== secondVertexKey);
      this.adjacencyList[secondVertexKey] = this.adjacencyList[secondVertexKey]
        .filter(key => key !== firstVertexKey);
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
          .filter(vertexKey => vertexKey !== firstVertexKey);
      });
      delete this.adjacencyList[key];
    }
  }

  /**
   * Depth First Recursive Traversal of the graph. Returns every
   * vertex that is connected (directly or indirectly) to the starting
   * vertex.
   * @param {String} key - Vertex identifier.
   */
  depthFirstTraversal(key) {
    const vertices = [];
    const resultsCache = {}; // Cache hash table.
    const traverse = (vertex) => {
      const edges = this.adjacencyList[vertex];
      vertices.push(vertex);
      if (!edges || edges.length === 0) {
        return;
      }
      resultsCache[vertex] = null;
      edges.forEach(connectedVertexKey => {
        // If the connected vertex is not in the results list (not visited)
        if (!(connectedVertexKey in resultsCache)) {
          traverse(connectedVertexKey);
        }
      });
    }
    traverse(key);
    return vertices;
  }

  /**
   * Breath First Recursive Traversal of the graph. Returns every
   * vertex that is connected (directly or indirectly) to the starting
   * vertex.
   * @param {String} key - Vertex identifier.
   */
  breathFirstTraversal(key) {
    const vertices = [];
    const resultsCache = {}; // Cache hash table.
    const queue = [key];
    resultsCache[key] = null; // Caching the first vertex as visited.
    while (queue.length) {
      const vertex = queue.shift();
      vertices.push(vertex);
      const edges = this.adjacencyList[vertex];
      if (edges && edges.length) {
        edges.forEach(connectedVertexKey => {
          // If the connected vertex is not in the results list (not visited)
          if (!(connectedVertexKey in resultsCache)) {
            resultsCache[connectedVertexKey] = null; // Caching the neighbors as visited.
            queue.push(connectedVertexKey);
          }
        });
      }
    }
    return vertices;
  }
}
