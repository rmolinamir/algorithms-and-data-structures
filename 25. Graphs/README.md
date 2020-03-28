# Graphs

Graphs are used in many social networks, any time users are modelled, recommendation engines, or advertisements based off on data, graphs are used.

## What is a Graph

> [A graph data structure consists of a finite (and possibly mutable) set of vertices (also called nodes or points), together with a set of unordered pairs of these vertices for an undirected graph or a set of ordered pairs for a directed graph. These pairs are known as edges (also called links or lines), and for a directed graph are also known as arrows. The vertices may be part of the graph structure, or may be external entities represented by integer indices or references](https://en.wikipedia.org/wiki/Graph_(abstract_data_type)).

**What?**

In simpler terms, a graph is a collection of nodes. A set of nodes together with a set of pairs of these connections.

![graph](https://github.com/rmolinamir/algorithms-and-data-structures/blob/master/25.%20Graphs/images/Graph_graph.png?raw=true "Graph")

Graphs are used in social networks, locations and mapping (GPS), routing algorithms, visual hierarchy, file system optimizations, **everywhere**.

For example, recommendation engines where any of the following are displayed:

- "People also watched"
- "You might also like..."
- "People you might know"
- "Frequently bought with"

Graphs are used for data that needs to be highly connected.

## Graph terms

- **Vertex**: A node.
- **Edge**: Connection between nodes.
- **Weighted/Unweighted**: Values assigned to distances between vertices.
- **Directed/Undirected**: Directions assigned to distanced between vertices.

A tree is a graph in which any two vertices are connected from any one path. Meaning that to go from, for example, *vertex A* to *vertex B* there's only *one path*. Contrast that to a graph as shown in the illustration above, to go from D to E, there are multiple paths.

### Undirected and Directed Graphs

Undirected Graphs feature no directions associated to the edges. That's useful depending on your modeling. Facebook, for example, requires users to accept each other in order to become friends, so that content can be shared between them. So in a directed graph, the direction of the edge will dictate if the users can see other's content, whether it is one directional or not.

## Wighted or Unweighted Graphs

In maps, edges (directions) between vertices (locations) have weights (distances) which are used to calculate distances between each vertices. Some edges might also have describe directions with one way streets, which would affect the calculations.

## Storing and Representing a Graph

Storing graphs is not easy. But if we break it down, what we really need to store a graph are nodes (for the vertices), and a way of storing the connections. We need some sort of structure capable of storing any number of edges (connections) between vertices (nodes). There are many approaches, but among these there are two very commonly used approaches called Adjacency Matrix and Adjacency List.

### Adjacency Matrix

A matrix is a two dimensional structure usually implemented with nested arrays, but not always, where information is basically stored in rows and columns. Graph connections can actually be represented using a matrix, like this:

![adjacency matrix](https://github.com/rmolinamir/algorithms-and-data-structures/blob/master/25.%20Graphs/images/Adjacency-Matrix_adjacency%20matrix.png?raw=true "Adjacency Matrix")

The way it is read, is that binary value between any two vertices respective to a row and column represents if there is a connection. The value `1` represents that there is a connection, while the value `0` represents that there isn't. Also note that as it is, this matrix is storing undirected graph edges, but it is also possible to store directed graph edges by storing tuples of binary values instead of raw binary values, e.g. `[1, 0]` where the row would have a connection, but the column wouldn't.

### Adjacency List

Adjacency Lists are stored differently and are commonly used to store undirected graphs. The way they work is that the vertices are stored in a list or in a hash table (depending on the value of the vertices) with nested arrays that represent the edges from the respective vertices. If the vertices are numbers, they can be stored in an array so that their value will match the index in which they are stored in the array, as shown below. Every element inside the array is also a nested array composed of more numbers which are indexes representing the connections from the "parent" index of the vertex.

![adjacency list of numbers](https://github.com/rmolinamir/algorithms-and-data-structures/blob/master/25.%20Graphs/images/Adjacency-List%20of%20Numbers_adjacency%20list%20of%20numbers.png?raw=true "Adjacency List of Numbers")

However, sometimes the values might be too far apart, or they might not be numbers, so in order to store them, hash tables can be used, as shown below:

![adjacency list](https://github.com/rmolinamir/algorithms-and-data-structures/blob/master/25.%20Graphs/images/Adjacency-List_adjacency%20list.png?raw=true "Adjacency List")

## Comparing and Contrasting Graph Traversal Algorithms

| **OPERATION**     | **ADJACENCY LIST** | **ADJACENCY MATRIX** |
|-------------------|--------------------|----------------------|
| Add Vertex        | O(1)               | O(V^2)               |
| Add Edge          | O(1)               | O(1)                 |
| Remove Vertex     | O(V + E)           | O(V^2)               |
| Remove Edge       | O(E)               | O(1)                 |
| Query             | O(V + E)           | O(1)                 |
| Storage           | O(V + E)           | O(V^2)               |

Where:

- `V`: Number of vertices.
- `E`: Number of edges.

In terms of storage, if you look at an adjacency matrix, the storage is of `O(V^2)` where `V` is the number of vertices. This is because if you add a new vertex, not only you add one slot in, but you have to add an entire row and column to the matrix. Compared to an adjacency list, it only grows at the rate of the number of vertices and edges.

**Adjacency Lists** are faster to iterate over all edges, but can be slower to lookup specific edges, while a **Adjacency Matrix** will iterate at a slower rate over all edges, but will have a faster edge lookup time complexity.

### Which one to use

Most of the data in the real world tends to be sparce where usually they're not all connected, which works much better with Adjacency Lists. An Adjacency Matrix structure works well when the data is dense and connected.

## Graph Class (Undirected)

The `Graph` class should be able to add a vertex, add an edge, remove an edge, and remove a vertex.

```js
class Graph {
  constructor() {
    this.adjacencyList = {};
  }
}
```

### Add a Vertex

Adds a key to the adjacency list with the name of the vertex and set its value to be an empty array.

```js
graph.addVertex('Tokyo');

// Adjacency List
{
  'Tokyo': [],
}
```

```js
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
```

### Add an Edge

Draw a connection between two vertices. This function accepts two vertex identifiers, then the function should find the stored vertices in the adjacency list, then push each other's identifiers into their edges array.

```js
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
  // but let's for learning purposes.
  if (shouldAddEdge) {
    this.adjacencyList[firstVertexKey].push(secondVertexKey);
    this.adjacencyList[secondVertexKey].push(firstVertexKey);
  }
}
```

### Removing an Edge

This function should accept two vertices. The function then reassigns the key of the first vertex to be an array that does not contain the key of the second vertex, and vice versa.

```js
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
```

### Removing a Vertex

This function removes a vertex and all edges connecting to this vertex. It will loop as long as there are any other vertices in the adjacency list of that vertex, and for each one of those vertices, remove the vertex that will be removed. After all edges are gone, the vertex can then be removed safely.

```js
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
```

## Graph Traversal using BFS and DFS

## Compare and Contrast Graph Traversal Algorithms
