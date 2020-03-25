# Dynamic Programming

This is one of the most complicated topics in programming due to its abstract nature. Dynamic Progamming algorithms are used to solve complex problems by breaking it down into a collection of simpler subproblems, solving each of those subproblems **just once**, and storing their solutions.

It can't be used everywhere, but where and when it can be used it can really speed up the code. The name of Dynamic Programming comes from Richard Bellman and it has its origins from military schedule optimizations.

It only works on problem with:

- **Overlapping subproblems:** A problem is said to have overlapping subproblems if it can be broken down into subproblems which are reused several times.
- Optimal substructures.

## Overlapping Subproblems

> Every number after the first two is the sum of the two preceding ones.

- Fibonacci sequence.

The fibonacci sequence is a perfect example for overlapping problems. You take the two digits that come before and add them together to get the next digit. Imagine that you want to find the 100th number in the sequence, there's going to be a ton of repetition. Lots of subproblems that are repeating, i.e. overlapping subproblems.
