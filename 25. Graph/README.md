# Graph

Graphs are used in many social networks, any time users are modelled, recommendation engines, or advertisements based off on data, graphs are used.

## What is a Graph

> [A graph data structure consists of a finite (and possibly mutable) set of vertices (also called nodes or points), together with a set of unordered pairs of these vertices for an undirected graph or a set of ordered pairs for a directed graph. These pairs are known as edges (also called links or lines), and for a directed graph are also known as arrows. The vertices may be part of the graph structure, or may be external entities represented by integer indices or references](https://en.wikipedia.org/wiki/Graph_(abstract_data_type)).

**What?**

In simpler terms, a graph is a collection of nodes. A set of nodes together with a set of pairs of these vertices.

![graph](https://i.imgur.com/pCyYDFD.png "Graph")

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

## Compare and contrast of different types of graphs and their use cases in the real world

## Graph traversal using BFS and DFS

## Compare and contrast graph traversal algorithms
