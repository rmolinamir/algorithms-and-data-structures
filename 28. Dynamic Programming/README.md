# Dynamic Programming

This is one of the most complicated topics in programming due to its abstract nature. Dynamic Progamming algorithms are used to solve complex problems by breaking it down into a collection of simpler subproblems, solving each of those subproblems **just once**, and storing their solutions.

It can't be used everywhere, but where and when it can be used it can really speed up the code. The name of Dynamic Programming comes from Richard Bellman and it has its origins from military schedule optimizations.

It only works on problem with:

- **Overlapping subproblems:** A problem is said to have overlapping subproblems if it can be broken down into subproblems which are reused several times.
- **Optimal substructures**: A problem is said to have optimal substructure if an optimal solution can be constructed from optimal solutions of its subproblems.

## Overlapping Subproblems

> Every number after the first two is the sum of the two preceding ones.

- Fibonacci sequence.

The fibonacci sequence is a perfect example for overlapping problems. You take the two digits that come before and add them together to get the next digit. Imagine that you want to find the 100th number in the sequence, there's going to be a ton of repetition. Lots of subproblems that are repeating, i.e. overlapping subproblems.

## Optimal Substructure

> Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. For a given source node in the graph, the algorithm finds the shortest path between that node and every other. It can also be used for finding the shortest paths from a single node to a single destination node by stopping the algorithm once the shortest path to the destination node has been determined.

- Dijkstra's Algorithm.

A problem is said to have an optimal substructure if the optimal solution for a bigger problem can be constructed from the optimal solutions for its subproblems.

An example to illustrate this principle is the calculation of the shortest path algorithm between two nodes:

![shortest path](https://i.imgur.com/XVFJyje.png "Shortest Path")

We want to find the shortest path from A to D, which is A -> B -> C -> D. The shortest path from A to D can be broken down into its substructures. Such as:

- A to C: A -> B -> C
- A to B: A -> B

## Recursive Fibonacci Sequence

Let's solve the fibonacci sequence with a recursive algorithm first, then solve it using dynamic programming to compare both methods and their time complexities.

The fibonacci sequence is a function that depends on `n` and meets these requirements:

- `f(n) = f(n-1) + f(n-2)`
- `f(2) = 1`
- `f(1) = 1`

```js
/**
 * Every number after the first two is the sum of the two preceding ones.
 * @param {Number} n - `n` sequence repetitions.
 */
function fibonacciSequence(n) {
  if (n <= 0) {
    return 0;
  } else if (n <= 2) {
    return 1;
  }
  return fibonacciSequence(n - 1) + fibonacciSequence(n - 2);
}
```

The time complexity of this solution is very slow. Because this algorithm breaks the sums of `n` into two each time that it adds up the total, the amount of operations are exponential to `n`, approximately `O(2^n)`, note that this is much worse than `O(n^2)`.

## Memoized Fibonacci Sequence

> In computing, memoization or memoisation is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

Memoization is storing the results of expensive function calls and returning the cached result when the same inputs occur again.

The idea of memoization is to never do anything twice. For example, if the algorithm already calculated the value of the fibonacci sequence of `5`, then the value is cached. Then, the next time the algorithm needs the value of the fibonacci sequence of `5` it will return the cached value instead of recalculating and breaking down the sequence.

```js
/**
 * Every number after the first two is the sum of the two preceding ones.
 * @param {Number} n - `n` sequence repetitions.
 */
function fibonacciSequence(n, cache = []) {
  if (cache[n] !== undefined) {
    return cache[n];
  }
  if (n <= 0) {
    return 0;
  } else if (n <= 2) {
    return 1;
  }
  const sum = fibonacciSequence(n - 1) + fibonacciSequence(n - 2);
  cache[n] = sum;
  return sum;
}
```

The time complexity of the memoized version is approximately `O(n)`, because as the algorithm is breaking down the fibonacci sequence, it will only calculate each value of `n` once, so it grows linearly. This is a huge improvement from `O(2^n)`.

## Tabulated Fibonacci Sequence

The whole idea of dynamic programming is breaking down a big problem into smaller problems and solving these subproblem at most one time. One way of doing this is with memoization as shown previously, which is a top-down method. But there is another way called tabulation which is bottom-up.

Tabulation stores the result of a previous result in a table (e.g. an array). It's usually done with iteration, and better space complexity can be achieved using tabulation.

```js
/**
 * Every number after the first two is the sum of the two preceding ones.
 * @param {Number} n - `n` sequence repetitions.
 */
function fibonacciSequence(n) {
  if (n <= 0) {
    return 0;
  } else if (n <= 2) {
    return 1;
  }
  const fibNums = [0, 1, 1];
  for (const i = 3; i <= n; i++) {
    fibNums[i] =  fibNums[i - 1] + fibNums[i - 2];
  }
  return fibNums[n];
}
```
