# Algorithms and Problem Solving Patterns

When you're faced with a tough challenge, a problem you have to solve and you don't know how to do it right off the bat, there are some steps that you can take to make it solvable. It falls into two categories:

- The basic approach to solving a problem you don't know how to solve.
- Specific blueprints or strategies to keep in your back pocket that help solve a lot of problems, more code specific.

## Algorithm

A process or set of steps to accomplish a certain task. Almost everything in programming involves some kind of algorithm. It's the foundation for being a successful progrem solver and developer... also, interviews.

## How to improve

1. Devise a plan for solving problems.
2. Master common problem solving patterns.

## Problem Solving Strategies

1. Understand the problem.
2. Explore concrete examples.
3. Break it down.
4. Solve/Simplify.
5. Look back and refactor.

Let's break it down:

## #1 Understand the problem

Before you start typing, whiteboarding, or anything else, it's really important to take a step back and just make sure you understand the task ahead of you. There are some very deliberate questions you can ask which can really help simplify things.

1. Can I restate the problem in my own words?
2. What are the inputs that go into the problem?
3. What are the outputs that should come from the solution to the problem?
4. Can the outputs be determined from the inputs? In other words, do I have enough information to solve the problem?
5. How should I label the important pieces of data that are part of the problem?

- Example:

**Write a function which takes two numbers and returns their sum.**

1. Can I restate the problem in my own words?
  -Implement addition.

2. What are the inputs that go into the problem?
  -Integers?
  -Floats?
  -What about string for large numbers?

3. What are the outputs that should come from the solution to the problem?
  -Integer? Float? String?

4. Can the outputs be determined from the inputs? In other words, do I have enough information to solve the problem?
  -Most of the time, the answer to this question lies in external sources.

5. How should I label the important pieces of data that are part of the problem?
  -Inputs: `num1`, `num2`.
  -Output: `sum` returned result.

**Note: this is simple, but it is a very useful first step for solving complicated problems.**

## #2 Exploring concrete examples

Coming up with examples can hlep you understand the problem better. Examples also provide sanity checks that your eventual solution works how it should.

- Start with simple examples.
- Progress to more complex examples.
- Explore examples with empty inputs.
- Explore examples with invalid inputs.

- Example:

**Write a function which takes two numbers and returns their sum.**

- Start with simple examples:

```js
chartCount("aaa"); // { a: 3 }
chartCount("hello"); // { h: 4, e: 1, l: 2, o: 1 }
```

- Progress to more complex examples:

```js
"my phone number is 182763"; // Does the spaces count?
"Hello hi"; // How about the uppercase?
```

- Explore examples with empty inputs or invalid inputs:

```js
chartCount(""); // What to do in these edge cases?
chartCount(null); // What to do in these edge cases?
```

## #3 Break it down

Explicitly write out the steps you need to take, especially when you're dealing with a long task.

This forces you to think about the code you'll write before you write it, very similar to unit tests and test-driven development or red-green cycles. It helps catch any lingering conceptual issues or misunderstandings before you dive in and have to worry about details as well.

- Example:

**Write a function which takes two numbers and returns their sum.**

```js
function chartCount(str) {
  // Do something
  // Return an object with keys that are lowercase alphanumeric characters in the string;
  // values should be the count for the characters in the string.
}
```

```js
function chartCount(str) {
  // Make object to return at end
  // Loop over every character in the string
  // Return object at end
}
```

```js
function chartCount(str) {
  // Make object to return at end
  // Loop over every character in the string
    // If the char is a number/letter AND a key in object, add one to count
    // Else if the char is a number/letter, add the lowercase char and set value to 1
    // Else, do nothing
  // Return object at end
}
```

## #4 Solve/Simplify

At this point, it should be viable to start solving the problem. If not possible, solve a simpler similar problem (e.g. ignore a part of the problem, and try to partially solve it), something might click into place!

- Find the core difficulty in what you're trying to do.
- Temporarily ignore that difficulty.
- Write a simplified solution.
- Then incorporate that difficulty back in.

- Example:

**Write a function which takes two numbers and returns their sum.**

```js
function chartCount(str) {
  // Make object to return at end
  const result = {};
  // Loop over every character in the string
  for (let i = 0; i < str.length; i++) {
    // TODO: transform char into a lowercase alphanumeric character
    const char = str[i];
    // If the char is a number/letter AND a key in object, add one to count
    // TODO: check if char is alphanumeric
    if (result[char] > 0) {
      result[char]++;
    // Else if the char is a number/letter, add the lowercase char and set value to 1
    } else {
      result[char] = 1;
    }
    // Else, do nothing
  }
  // Return object at end
  return result;
}
```

```js
function chartCount(str) {
  // Make object to return at end
  const result = {};
  // Loop over every character in the string
  for (let i = 0; i < str.length; i++) {
    const char = str[i.toLowerCase()];
    // If the char is a number/letter AND a key in object, add one to count
    // TODO: check if char is alphanumeric **(still pending)**
    if (result[char] > 0) {
      result[char]++;
    // Else if the char is a number/letter, add the lowercase char and set value to 1
    } else {
      result[char] = 1;
    }
    // Else, do nothing
  }
  // Return object at end
  return result;
}
```

## #5 Look Back & Refactor

Not done yet! It's often beneficial to ask these questions before refactoring:

- Can you check the result?
- Can you derive the result differently?
- Can you or other people understand it at a glance?
- Can you use the result or method for some other problem?
- Can you improve the performance of your solution?
- Can you think of other ways to refactor?
- How have other people solved this problem?

```js
function chartCount(str) {
  const result = {};
  for (let char of str) {
    char = char.toLowerCase();
    // Regex to check if character is alphanumeric and lowercase.
    // charCodeAt method could also work keeping in mind the character code ranges of the character.
    if (/[a-z0-9]/.test(char)) {
      // If truthy, add a count to the value, else init as 1.
      result[char] = ++ obj[char] || 1
    }
  }
  return result;
}
```

## TL;DR

1. Understand the problem.
    - Clarify the problem and make sure you understand it.
2. Explore concrete examples.
    - Understand the inputs, the outputs, understand the edge cases, how to handle errors, invalid inputs, etc.
3. Break it down.
    - Lay out a game plan for the code to implement, before doing any actual code.
4. Solve/Simplify.
    - Solve a similar problem if you can. Try to solve something that can be reintroduced into the original problem.
5. Look back and refactor.
    - Look back, and see if there's room for refactor. Figure out if anything could've been done better.
