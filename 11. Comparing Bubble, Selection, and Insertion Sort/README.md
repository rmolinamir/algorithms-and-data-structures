# 11. Comparing Bubble, Selection, and Insertion Sort

## TL;DR

- Sorting is *fundamental*!
- Bubble Sort, Selection Sort, and Insertion Sort are all roughly equivalent in the grand scheme of things.
- All have average time complexities that are quadratic.
- We can do better, but we need more complex algorithms.

![big O of sorting algorithms](https://github.com/rmolinamir/algorithms-and-data-structures/blob/master/11.%20Comparing%20Bubble,%20Selection,%20and%20Insertion%20Sort/images/Big-O%20of%20Sorting%20Algorithms_big%20O%20of%20sorting%20algorithms.png?raw=true "Big O of Sorting Algorithms")

In worst-case scenarios, all of these algorithms have time complexities of `O(n^2)`.
In all scenarios, all of these algorithms have space complexities of `O(1)`.

The fact that these algorithms perform slowly in their worst scenarios doesn't mean they're inherently bad, there are some scenarios in which these algorithms are very good. For example:

- For nearly sorted data, Insertion Sort is a really good algorithm with `O(n)` time complexity. Bubble Sort is also very good (albeit not as good as the former) with an `O(n)` time complexity as well.
- If you're in a scenario where you have to keep real-time data continuously sorted, then the Insertion Sort is a very good algorithm because of the way it works in which the algorithm keeps the latter part of the data already sorted, so it is only a matter of looping through it until it finds the right position for the newest value.
