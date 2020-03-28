# Introduction

In computer science, a data structure is a particular way of organizing data on a computer so that it can be used efficiently. Different types of data structures are suitable for different types of applications, and some are highly specialized for specific tasks.

Data structures are a means of handling large amounts of data efficiently for uses such as large databases and Internet indexing services. Efficient data structures are generally key to designing efficient algorithms. Some formal design methods and programming languages ​​highlight data structures, rather than algorithms, as the key organizing factor in software design.

This document intends to serve as a guide for the study of algorithms and basic data structures for the composition of algorithm-based computational solutions on imperative languages.

## Examples

There are numerous types of data structures, generally built on top of simpler ones:

- A vector is a series of elements in a specific order, usually all of the same type (although the elements can be of almost any type). Elements are accessed using an integer as an index to specify the element that is required. Typical implementations allocate contiguous memory words to **array** elements (although this is not always the case). The arrangements can be resized or have a fixed length.
- An associative vector (also called a dictionary or map) is a more flexible variant than an **array**, in which name-value pairs can be freely added and removed. A **hash table** is a common implementation of an associative **array**.
- A record (also called a tuple or structure) is an aggregated data structure. **A record is a value that contains other values**, typically in a fixed number and sequence, and **usually a named index**. The elements of the records are generally called fields or cells.
- A union is a data structure that specifies which of a series of allowed data types can be stored in its instances, for example float or long integer. In contrast to a register, which could be defined to contain a float and a long integer, in a union, there is only one value at a time. Sufficient space is allocated to contain the data type of any of the members.
- A variant type (also called a variant record or discriminated union) contains an additional field that indicates its current type.
- A set is an abstract data type that can store specific values, in no particular order, and without duplicate values.
- A multiset is an abstract data type that can store specific values, in no particular order. Unlike sets, multi-sets support repetitions.
- A graph is a connected data structure made up of nodes. Each node contains a value and one or more references to other nodes. Graphs can be used to represent networks, since nodes can reference each other. Connections between nodes can have an address, that is, a starting node and an arriving node.
- A tree is a particular case of a directed graph in which cycles are not supported and there is a path from a node called root to each of the other nodes. A collection of trees is called a forest.
- A class is a template for creating data objects based on a predefined model. Classes are used as an abstract representation of concepts, they include fields like registers and operations that can query the value of the fields or change their values.
- And there are many, many others.
