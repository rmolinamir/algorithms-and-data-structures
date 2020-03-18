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
  addEge(firstVertexKey, secondVertexKey) {
    // Checking if the vertices exist in the list.
    const shouldAddEdge = (
      this.adjacencyList[firstVertexKey] &&
      this.adjacencyList[secondVertexKey]
    );
    // Checking if the edges already exist should also be done,
    // but let's ignore it for now.
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
    // but let's ignore it for now.
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
}
