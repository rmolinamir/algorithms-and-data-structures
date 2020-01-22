# Recursion

A process (e.g. a function) that calls itself. It's used in many places, methods like `JSON.parse` and `JSON.stringify` are often written recursively, `document.getElementById` and DOM traversal algorithms are often recursive.

Object traversal are often written recursively, and complex data structures as well. Recursive approaches are sometimes easier than iterative approaches.

## The Call Stack

In almost all programming languages, there is a built in data structure that manages what happens when functions are invoked. In JavaScript it's called *the call stack*.

- It's a **stack** data structure.
- Any time a function is invoked, it is placed (**pushed**) on the top of the call stack.
- When JavaScript sees the **return** keyword or when the function ends, the compiler will remove (**pop**) the top item from the stack.

Recursive functions function differently:

- Usually functions are being pushed on the call stack and popped off when they are done.
- When we write recursive functions, we keep pushing new functions (the same one) onto the call stack.

## How recursive functions work

- Invoke the same function with a different input until you reach your base case.
- The base case is the condition when the recursion ends. **This is the most important concept to understand.**
- Each time, you want to call the recursive function with a different input.

- Example #1:

```js
function countDown(num) {
  if (num <= 0) {
    console.log('All done!');
  }
  console.log(num);
  countDown(num - 1);
}

// Output:
// countDown(3)
// print 3
// countDown(2)
// print 2
// countDown(1)
// print 1
// countDown(0)
// print "All done!"
```

- Example #2:

```js
function sumRange(num) {
  if (num === 1) return 1;
  return num + sumRange(num - 1);
}

// sumRange(3)
//   return 3 + sumRange(2);
//     return 2 + sumRange(1);
//       return 1;
// -----------------------------
// return 3 + 2 + 1;
// -----------------------------
// return 6;
```

- Example #3:

```js
function factorial(num) {
  if (num === 1) return 1;
  return num * factorial(num - 1);
}
```

## Common Recursion Pitfalls

- No well-defined base case will result in errors like maximum call stack size exceeded (stack overflow) and endless loops.
- Forgetting to return or returning the wrong parameters.
- No returned values in the base case will often result in errors like maximum call stack size exceeded and endless loops.

It's important to keep an eye out for every possible returned value!

## Helper Method Recursion

It's a pattern where we have an outer function that's not recursive which calls an inner function which is recursive. Here's the pattern that helper method recursion functions follow:

```js
function outer(input) {
  const outerScopedVariable = [];

  function helper(helperInput) {
    // modify the outerScopedVariable
    helper(helperInput--)
  }

  helper(input);

  return outerScopedVariable;
}
```

- Example:

Collecting all of the odd values in an array:

```js
function collectOddValues(arr) {
  let result = [];

  function helper(helperInput) {
    if (helperInput.length === 0) {
      return;
    }

    if (helperInput[0] % 2 !== 0) {
      return result.push(helperInput([0]));
    }

    helper(helperInput.slice(1));
  }

  helper(arr);

  return result;
}
```

## Pure Recursion

The function itself is recursive.

- For arrays, use methods like `slice`, the spread operator, and `concat` that makes copies of arrays so you do not mutate them.
- Remember that strings are immutable, so you will need to use methods like `slice`, `substr`, or `substring` to make copies of strings.
- To make copies of objects use `Object.assign` or the spread operator.

- Example:

```js
function collectOddValues(arr) {
  let newArr = [];

  if (arr.length === 0) {
    return newArr;
  }
  if (arr[0] % 2 !== 0) {
    newArr.push(arr[0]);
  }

  newArr = newArr.concat(collectOddValues(arr.slice(1)));
  return newArr;
}
```

Check the examples inside the `extra` directory for more advanced examples.
