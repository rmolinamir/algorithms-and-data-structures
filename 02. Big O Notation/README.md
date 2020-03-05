# Big O Notation

## Introduction

A system which consists in generalizing code to talk about it, measure its performance, and compare it to other pieces of code. It is very useful for discussing trade-offs between different approaches to solve a problem.

## Meaning of better code

- Faster?
- Less memory-intensive?
- More readable?
- Brevity?

All of these are valid concerns, it depends on the situation. Most people would agree the first too are often more important than something like readability and brevity. Unfortunately, the first too can often come at the expense of readability.

## Add up to `n` functions comparison

Let's calculate the result of adding up every value of a number `n`, including `n`. Here are two ways of doing this:

- By using a loop:

```js
function addUpTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}
```

- By using a formula:

```js
function addUpTo(n) {
  return n * (n + 1) / 2;
}
```

How can we measure which alternative is better?

## The Problem with Time

Consider the following `measurePerformance` function capable of measuring the time duration it takes to run a synchronous callback function:

```js
const { performance } = require('perf_hooks');

/**
 * Measures the amount of time that it took to run a synchronous callback function.
 * @param {Function} callback - Callback function to be measured.
 */
function measurePerformance(callback) {
  const t1 = performance.now();
  callback();
  const t2 = performance.now();
  console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`);
}

module.exports = measurePerformance;
```

If we use this function to measure the previous two alternatives, we get the following results:

- By using a loop:

Measurement 1: `Time Elapsed: 0.7303971990048885 seconds.`.
Measurement 2: `Time Elapsed: 0.7355084000006318 seconds.`.
Measurement 3: `Time Elapsed: 0.7392646009996533 seconds.`.

- By using a formula:

Measurement 1: `Time Elapsed: 0.00003980100154876709 seconds.`.
Measurement 2: `Time Elapsed: 0.00002409899979829788 seconds.`.
Measurement 3: `Time Elapsed: 0.00002479999512434006 seconds.`.

As it's shown, alternative #2 is vastly superior. But there are problems with this approach:

- Different machines will record different times.
- The same machine will record different times.
- For fast algorithms, speed measurements may not precise enough.

**If not time, then what?**

Rather than counting seconds, which is imprecise, we can measure the number of simple operations the computer has to perform.

## Counting Operations

- Alternative #2:

```js
function addUpTo(n) {
  return n * (n + 1) / 2;
}
```

- 1 multiplication.
- 1 addition.
- 1 division.

3 operations regardless of the size of `n`.

- Alternative #1:

```js
function addUpTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}
```

- 1 assignment (`let total = 0`).
- 1 assignment (`let i = 1`).
- `n` additions and `n` assignments (`i++`).
- `n` comparisons (`i <= n;`).
- 1 addition, inside a loop (`total += i`).
- 1 assignment, inside a loop (`total += i`).

Counting the amount of operations can be tricky, depending on what is counted, the number can be as low from `2n` or as high as `5n + 2`.

Regardless of the exact number, the number of operations grows roughly proportionally with `n`, while the first alternative will always be limited to 3 operations. These comparisons and analysis of the oprations & time is known as *time complexity*.

![alternative 1 alternative 2 measurement](https://github.com/rmolinamir/algorithms-and-data-structures/blob/master/02.%20Big%20O%20Notation/images/Alternative-%231%20vs.%20Alternative%20%232_alternative%201%20alternative%202%20measurement.png?raw=true "Alternative #1 vs. Alternative #2")

## Definition

Allows us to talk formally about how the runtime of an algorithm grows as the inputs grow. We say an algorithm is `O(f(n))` if the number of simple operations the computer has to do is eventually less than a constant times `f(n)`, as `n` increases.

In other words:

- `f(n)` could be linear `(f(n) = n)`.
- `f(n)` could be quadratic `(f(n) = n^2)`.
- `f(n)` could be constant `(f(n) = 1)`.
- `f(n)` could be many other things.

For example:

- Alternative #2:

```js
function addUpTo(n) {
  return n * (n + 1) / 2;
}
```

Always 3 operations:

- **`O(1)`**.

- Alternative #1:

```js
function addUpTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}
```

Number of operations is (eventually) bound by a multiple on `n` (say, `10n`). The coefficient of `n` doesn't matter in this context, what's important is to notice that it scales proportionally with `n`, so we simplify it to:

- **`O(n)`**.

## Simplifying Big 0 Expressions

There are certain expressions that can be simplified, because their different are meaningless in the "big picture view".

- Constants don't matter.
  - O(2n) does not matter, simplify to O(n).
  - O(500) does not matter, simplify to O(1).
  - O(13n^2) does not matter, simplify to O(n^2).
- Smaller terms don't matter.
  - O(n + 10) does not matter, simplify to O(n).
  - O(1000n + 50) does not matter, simplify to O(n).
  - O(n^2 + 5n +8) does not matter, simplify to O(n^2).
- Analyzing complexity with big O can get complicated. The following rules won't **ALWAYS** work, but are helpful:
  - Arithmetic operations are constant.
  - Variable assignment is constant.
  - Accessing elements in an array (by index) or object (by key) is constant.
  - In a loop, the complexity is the length of the loop times the complexity of whatever happens inside of the loop (potential n^2 run times).

- Example #1:

```js
function logAtLeast5(n) {
  for (let i = 1; i <= Math.max(5, n); i++) {
    console.log(i);
  }
}
```

This function in its most simplified expression is a `O(n)` operation because the operations scale proportionally to `n`.

- Example #2:

```js
function logAtMost5() {
  for (let i = 1; i <= Math.min(5, n); i++) {
    console.log(i);
  }
}
```

This function in its most simplified expression is a `O(1)` operation because it's constant, at most it will **always** do 5 operations.

Below is an image comparing the complexity of different Big O notations:

![different big O complexities comparison](https://github.com/rmolinamir/algorithms-and-data-structures/blob/master/02.%20Big%20O%20Notation/images/Alternative-%231%20vs.%20Alternative%20%232_alternative%201%20alternative%202%20measurement.png?raw=true "Comparison of the different types of Big O complexities")

## Space Complexity

So far, we've been focusing on **time complexity**: how can we analyze the *runtime* of an algorithm as the size of the inputs increases?

We can also use big O notation to analyze **space complexity**: how much additional *memory* do we need to allocate in order to run the code in our algorithm?

- What about the inputs?

**Auxiliary space complexity** refers to the space required by the algorithm, not including space taken up by the inputs.

- Most primitives (`booleans`, `numbers`, `undefined`, `null`) are constant space `O(1)`.
- Strings require `O(n)` space (where `n` is the string length).
- Reference types are generally `O(n)`, where `n` is the length (for arrays) or the number of keys (for objects).

- Example #1:

```js
function sum() {
  let total = 0;
  for (let i = 1; i <= arr.length; i++) {
    total += arr[i];
  }
  return total;
}
```

No matter the array length and operations, only `total` and `i` take space.

`O(1)` space!

- Example #2:

```js
function double(arr) {
  let newArr = [];
  for (let i = 1; i <= arr.length; i++) {
    newArr.push(2 * arr[i]);
  }
  return newArr;
}
```

No matter the array length and operations, only `newArr` and `i` take space. But `newArr` is a reference type, which means it has a space complexity of at least `O(n)`. `newArr` will always be an array of numbers (`O(1)`), so the space complexity remains at `O(n)`.

## Logarithms

Sometimes big O expressions involve more complex mathematical expressions. One that appears often is is the logarithm. A logarithm is the inverse of exponentiation.

Which number to the power of 3 gives us 8?

![logarithm example](https://github.com/rmolinamir/algorithms-and-data-structures/blob/master/02.%20Big%20O%20Notation/images/Which-number%20to%20the%20power%20of%203%20gives%20us%208_logarithm%20example.png?raw=true "Which number to the power of 3 gives us 8?")

The most common are the binary logarithms (`log 2 (n)`), base 10 logarithms (`log 10 (n)`), and natural logarithms (`log e (n)` or sometimes written as `ln(n)`). In programming, usually only the binary logarithm is involved.

In other words, the binary logarithm of a number roughly measures the number of times you can *divide* that number by 2 **before you get a value that's less than or equal to none**.

- Logarithmic time complexity is great! (It's between `O(1)` and `O(n)`).
- Certain searching algorithms have logarithmic time complexity.
- Efficient sorting algorithms involve logarithms.
- Recursion sometimes involve logarithmic space complexity.

## TL;DR

- To analyze the performance of an algorithm, we use Big O Notation.
- Big O Notation can give us a high level understanding of the time or space complexity of an algorithm.
- Big O Notation doesn't care about precision, only about general trends (linear, quadratic, constant, et al).
- The time or space complexity (as measured by Big O) depends only on the algorithm, nto the hardware used to run the algorithm.
