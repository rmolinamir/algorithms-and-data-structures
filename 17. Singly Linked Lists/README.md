# Singly Linked Lists

## Topics

- What a Singly Linked List is.
- Compare and contrast Linked Lists with Arrays.
- Implement insertion, removal, and traversal methods on Singly Linked Lists.

## What is a Linked List

It's a data structure that stores whatever sorted data you want. And it's ordered just like an array. But there's a really big distinction:

- In an array, each item is indexed with a number, so you can get the 5th and 6th item at east, and at anytime you add something it gets an index that is mapped to that value.

In a linked list, you have a bunch of elements with no indeces who are just pointing to the next element. But there is no index to access values - you have to start at the first one then move to the next until you reach the desired value.

Linked lists contain a head, a tail and a length property. They consists of nodes, and each node has a value and a pointer to the next node or null.

## Comparisons with Arrays

### Lists

- Do not have indexes.
- Connected via nodes with a `next` pointer.
- Random access is not allowed (to about re-indexing).

### Arrays

- Indexed in order.
- Insertion and deletion can be expensive.
- Can quickly be accessed at a specific index.

## JavaScript Singly Linked List ES2015 Class
