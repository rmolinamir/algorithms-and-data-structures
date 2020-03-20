# Graph Traversal

Graph traversal is essentially searching or visiting neighbors in any given node, visiting (or updating, or checking) every single vertex in a graph.
Usually when we talk about real-world applications, you will not visit every node and instead find the closest or most similar neighbors, but a lot of the most advanced algorithms are derived from basic traversal algorithms.

Unlike trees, to traverse anything a starting point is necessary. Graphs really have no starting points, so a starting point is explicitly necessary.

## Graph Traversal Uses

- Peer to peer networking.
- Web crawlers.
- Finding "closest" matches/recommendations (traversing from one vertex to another).
- Shortest path problems
  - GPS Navigation.
  - Solving mazes.
  - Video game path finding.

## Depth First Traversal of a Graph

DF traversal on trees explore as far as possible down one branch before "backtracking", while starting at the root. DF traversals on graphs work similarly, with the difference that a starting point has to be specified, and that a "cache" of visited vertices has to be created in order to not visit the neighbors of the already visited edges, and the cache can be built using a simple hash table.

To recursively traverse through a graph, it starts by receivent a vertex as a parameter. The first thing it does is check if the vertex is empty (no edges), if it is, then return (base case of the recursion).

If it's not empty, then the vertex is added to an aggregated results list so that vertices can be marked as visited. Then, for each neighbor in the vertex, if that neighbor has not been visited, then recursively call the depthFirstTraversal traversal on it.

```js
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  ...

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
}

const graph = new Graph();
graph.addVertex('0');
graph.addVertex('1');
graph.addVertex('2');
graph.addVertex('3');
graph.addEge('0', '1');
graph.addEge('1', '2');
graph.addEge('2', '3');
graph.addEge('2', '0');
graph.addEge('3', '1');

console.log('graph.depthFirstTraversal(\'2\')', graph.depthFirstTraversal('2')); // ['2', '1', '0', '3']
```

## Breadth First Traversal of a Graph

Unlike DF traversals where the traversal visits the neighbors of the neighbors, and so on, until a vertex with no visited neighbors is reached before visiting the parent neighbors, a BF traversal will visit all of the neighbors before going one depth below visiting the neighbors of the neighbors.

BF traversal accepts a starting vertex as a parameter. Then, it creates a queue (FIFO structure) to store the starting vertex and following neighbors as well. The starting vertex will be added to the queue, the neighbors of the starting vertex, then the neighbors of all of the previous vertices, and so on, until all of them have been visited.

Everytime a vertex is visited, it is removed from the queue. A cache is also created to keep track of the already visited nodes. Finally, the algorithm returns a list of visited the vertices.

```js
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  ...

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

const graph = new Graph();
graph.addVertex('0');
graph.addVertex('1');
graph.addVertex('2');
graph.addVertex('3');
graph.addEge('0', '1');
graph.addEge('1', '2');
graph.addEge('2', '3');
graph.addEge('2', '0');
graph.addEge('3', '1');

console.log('graph.breathFirstTraversal(\'2\')', graph.breathFirstTraversal('2')); // ['2', '1', '3', '0']
```
