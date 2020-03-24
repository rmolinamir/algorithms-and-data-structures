# Dijkstra's Algorithm

Dijkstra's shortest path algorithm is a very famous algorithm, if not the most famous algorithm out there. This algorithm uses a priority queue as part of its implementation. For this section, I will use the priority queue used in section 23, binary heaps.

This algorithm is used to calculte shortest paths between vertices in a graph and it has many, many uses. But, for this algorithm to work, the graphs **must** be weighted.

## Who was Dijkstra and what is his Algorithm

It's used all the time. Often, big tech companies will base a lof of their proprietary algorithms on top of Djikstra's Algorithm.

This algorithm finds the shortest path between two vertices on a graph. If we had a graph of 10000 vertices, what's the shortest way from point A to point B?

Edsger Djikstra was a Dutch programmer, physicist, essayist, he wrote tons of academic papers on programming, mathematics, problem solving, and very influential. He helped advance the field of computer science from a burgeoning art to the righ academic discipline that it is today. He established a lot of the academic rigor that's present in today's computer science, he came up with many papers, most of which are still cited today.

He also created new fields in whitin computer science based on single papers that he wrote, and unlike some other pioneers whose works at the time were very important and led the way for other breakthroughs, then sort of became less relevant in today's world, a lot of Djikstra's works are still in practice today and commonly used, like Dijkstra's Algorithm. He really is known for a lot of things, not just this algorithm.

In today's world this algorithm is still useful for things such as:

- **GPS**: Finding fastest routes.
- **Network Routing**: Finds open shortest path for data.
- **Biology**: Used to model the spread of viruses among humans.
- **Airline Tickets**: Finding the cheapest route to your destination.
- The list goes on.

But as mentioned earlier, big companies add enhancements on top of this algorithm such as Google Maps algorithm not only considering distances but also considering the capacity of roads, turns, traffic, accidents, weather, holidays, time of day, etc. And while it is a lof of enhancements, it all boils down to finding the shortest path.

## Writing a Weighted Graph

Writing a weighted graph is relatively simple. Edges and vertices work the same as a regular graph, with the difference that edges will simply store more value, instead of storing just the connection, they will also store weights. For example:

```js

// Graph
{
  "A": ["B"]
}

// Weighted Graph
{
  "A": [
    {
      node: "B",
      weight: 10,
    },
  ]
}
```

Because of this, it's very easy to implement a Weighted Graph. The only difference in the class methods is that now edges are also handled with connections.

```js
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
}
```

## How it works

This algorithm needs an input of two nodes, then the shortest path between these nodes is returned if they are directly or indirectly connected. This algorithm works by recalculating the distances from the starting node towards the destination node, everytime it visits a new node, as it travels through the graph until it reaches the destination. Then, the calculated shortest path will be returned. A step by step process of this would be:

1. Everytime we look to visit a new node, we pick the node with the smallest known distance to visit first.
2. Once we've moved to the node we're going to visit, we look at each of its neighbors.
3. For each neighboring node, we calculate the distance by summing the total edges that lead to the node we're checking *from the starting node*.
4. If the new total distance to a node is less than the previous total, we store the new shorter distance for that node.

Let's try to find the shortest path from A to E in this graph:

```js
/**
 *            4
 *     A ------------ B
 *  2 /                \ 3
 *   /   2         3    \
 *  C ------- D -------- E
 *  \         |         /
 *   \        |        /
 *    \     1 |       /
 *     \      |      / 1
 *      \     |     /
 *    4  \    |    /
 *        \   |   /
 *         \  |  /
 *          \ | /
 *           \|/
 *            F
 */
```

To initialize the search, we set up a data structure that represents the distances from all vertices to our destination vertex. In this case, from all vertices to A, including from A to A.

At first, the only known distance is from A to A, which is initialized as 0, the rest of the distances are initialized as infinity because we don't know the actual distance.

Because `A` is the currently smallest distance that we know of, we start by picking `A`. So `A` is added to a cache list of the visited nodes, and a cache hash table for the previous shortest paths allowing us to do this process more efficiently.

| **Vertex** | **Shortest Distance from A** |
|------------|------------------------------|
| A          | 0                            |
| B          | Infinity                     |
| C          | Infinity                     |
| D          | Infinity                     |
| E          | Infinity                     |
| F          | Infinity                     |

Visited:

```js
[A]
```

Previous:

```js
{
  A: null,
  B: Infinity,
  C: Infinity,
  D: Infinity,
  E: Infinity,
  F: Infinity,
}
```

---

### Visitting vertex A neighbors

The next step would be to visit its neighbors. The reason we visit its neighbors is to check the weight of its edges to these neigbors to update the table's distance values from `A`.

| **Vertex** | **Shortest Distance from A** |
|------------|------------------------------|
| ~~A~~      | 0                            |
| B          | ~~Infinity~~, 4              |
| C          | ~~Infinity~~, 2              |
| D          | Infinity                     |
| E          | Infinity                     |
| F          | Infinity                     |

Visited:

```js
[A]
```

Previous:

```js
{
  A: null,
  B: A,
  C: A,
  D: Infinity,
  E: Infinity,
  F: Infinity,
}
```

---

### Visitting vertex C neighbors

Now, we repeat the process by picking the smallest known value from A that we haven't visited. In this case it would be `C`, as it is the smallest known distance.

We've already done A to C, and we know this thanks to the previous cache hash table, so it's not going to be done. This only leaves us with `D` and `F`. To calculate the new value to D, the edges' weight are accumulated *from the starting node* `A`, in this case `2 + 2`.

| **Vertex** | **Shortest Distance from A** |
|------------|------------------------------|
| ~~A~~      | 0                            |
| B          | ~~Infinity~~, 4              |
| ~~C~~      | ~~Infinity~~, 2              |
| D          | ~~Infinity~~, 4              |
| E          | Infinity                     |
| F          | Infinity                     |

Visited:

```js
[A, C]
```

Previous:

```js
{
  A: null,
  B: A,
  C: A,
  D: C,
  E: Infinity,
  F: Infinity,
}
```

Next is `F`, the last neighbor of `C` as we just analyzed `D`. Same process.

| **Vertex** | **Shortest Distance from A** |
|------------|------------------------------|
| ~~A~~      | 0                            |
| B          | ~~Infinity~~, 4              |
| ~~C~~      | ~~Infinity~~, 2              |
| D          | ~~Infinity~~, 4              |
| E          | Infinity                     |
| F          | ~~Infinity~~, 6              |

Visited:

```js
[A, C]
```

Previous:

```js
{
  A: null,
  B: A,
  C: A,
  D: C,
  E: Infinity,
  F: C,
}
```

---

### Visitting vertex B neighbors

Next is `B` as it is the shortest node from `A` **that has not been visited**, it actually is tied with `D` since they are both `4`, but let's assume `B` is visited first.

`B` neighbors are `A` and `E`. `A` is not checked because we've already visited it, so only `E` is analyzed.

| **Vertex** | **Shortest Distance from A** |
|------------|------------------------------|
| ~~A~~      | 0                            |
| ~~B~~      | ~~Infinity~~, 4              |
| ~~C~~      | ~~Infinity~~, 2              |
| D          | ~~Infinity~~, 4              |
| E          | ~~Infinity~~, 7              |
| F          | ~~Infinity~~, 6              |

Visited:

```js
[A, C, B]
```

Previous:

```js
{
  A: null,
  B: A,
  C: A,
  D: C,
  E: Infinity,
  F: C,
}
```

---

### Visitting vertex D neighbors

Now we only have `D`, `E`, and `F`, and `D` being the lowest. The total distance from `A`, to `E` through `D` is 7. We know this because of our previous cache hash table, where `A` visits `C`, then `C` visits `D`.

Because the distance from `A` to `B` to `E` is 7, we can simply ignore this edge of `D` connecting to `E`, or we can simply update it to 7. In this case, we will ignore it.

| **Vertex** | **Shortest Distance from A** |
|------------|------------------------------|
| ~~A~~      | 0                            |
| ~~B~~      | ~~Infinity~~, 4              |
| ~~C~~      | ~~Infinity~~, 2              |
| ~~D~~      | ~~Infinity~~, 4              |
| E          | ~~Infinity~~, 7              |
| F          | ~~Infinity~~, 6              |

Visited:

```js
[A, C, B, D]
```

Previous:

```js
{
  A: null,
  B: A,
  C: A,
  D: C,
  E: Infinity,
  F: C,
}
```

Now we visit `F`, the final neighbor of `D`. Our new total to get to `F` from `A` is 5 while previously it was 6, so we update the shortest distance to 5.

| **Vertex** | **Shortest Distance from A** |
|------------|------------------------------|
| ~~A~~      | 0                            |
| ~~B~~      | ~~Infinity~~, 4              |
| ~~C~~      | ~~Infinity~~, 2              |
| ~~D~~      | ~~Infinity~~, 4              |
| E          | ~~Infinity~~, 7              |
| F          | ~~Infinity~~, 5              |

Visited:

```js
[A, C, B, D]
```

Previous:

```js
{
  A: null,
  B: A,
  C: A,
  D: C,
  E: B,
  F: D,
}
```

---

### Visitting vertex F neighbors

Next is `F` because its distance is the lowest, it being 5, and we only have one option, which is the edge to `E` as the previous have been done already. And, the shortest path to get to `E` from `A` through `F` is 6, so we update the table.

| **Vertex** | **Shortest Distance from A** |
|------------|------------------------------|
| ~~A~~      | 0                            |
| ~~B~~      | ~~Infinity~~, 4              |
| ~~C~~      | ~~Infinity~~, 2              |
| ~~D~~      | ~~Infinity~~, 4              |
| E          | ~~Infinity~~, ~~7~~, 6       |
| ~~F~~      | ~~Infinity~~, 5              |

Visited:

```js
[A, C, B, D, F]
```

Previous:

```js
{
  A: null,
  B: A,
  C: A,
  D: C,
  E: F,
  F: D,
}
```

And it is at this point where the algorithm has nowhere else to go besides `E`, so we found the shortest path, it being `A`, to `C`, to `D`, to `F`, and to `E`. To determine this, we simply look at the previous shortest paths hash table starting from `E` until we reach a node referencing `A`.

  > `E` > `F` > `D` > `C` > `A`

At the end, the way this algorithm works is that not only we determine the shortest path from `A` to `E`, we determine the shortest path from `A` to every node, which can be useful.

## Simple Priority Queue

A priority queue is used in Dijkstra's Algorithm to ask for the smallest distance from `A` when we are visiting the nodes. To do this, we will use this simple Priority Queue (PQ) class:

```js
class PriorityQueue {
  constructor(){
    this.values = [];
  }
  enqueue(val, priority) {
    this.values.push({val, priority});
    this.sort();
  };
  dequeue() {
    return this.values.shift();
  };
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  };
}
```

Note that this class is less efficient than the previously written PQ, and that is because the PQ is using an Array as its underlying data structure to handle the FIFO principle, so inserting items causes the Array to re-index its elements when pushing, and the sorting is also slower.

In reality, you'd want to use a Binary Heap, just like it was done in the previous sections to avoid re-indexing an Array.

## Dijkstra's Pseudo-Code

- The function should accept a starting and ending vertex as input.
- It initializes by creating an object (e.g. called `distances`) and sets each key to be every vertex in the adjacency list with a value of infinitym excepts for the starting vertex which should be a value of 0.
- After setting a value in the `distances` object, add each vertex with a priority of `Infinity` to the priority queue, except the starting vertex, which should have a priority of 0 because that's where we begin.
- Create another object (e.g. called `previous`) and set each key to be every vertex in the adjacency list with a value of `null` to cache the previous shortest visited paths.
- Start looping as long as there is anything in the priority queue:
  - Dequeue a vertex from the priority queue.
  - If that vertex is the same as the ending vertex, we are done.
  - Otherwise, loop through each value in the adjacency list at that vertex:
    - Calculate the distance to that vertex from the starting vertex.
    - If the distance is less than what is currently stored in our distances object:
      - Update the distances object with new lower distance.
      - Update the previous object to contain that vertex.
      - Enqueue the vertex with the total distance from the start node.

## Implementing Dijkstra's Algorithm

## Upgrading the Priority Queue
