# Selection Sort

Similar to bubble sort, but instead of placing the largest values into a sorted position, it places the smaller values into a sorted position.

![selection sort example](https://i.imgur.com/F3uJnnD.png "Selection Sort Visual Example")

Selection sort consists of the following pattern:

- Store the first element as the smallest value you've seen so far.
- Compare this item to the next item in the array until you find a smaller number.
- If a smaller number is found, designate that smaller number to be the new minimum, and continue until the end of the array.
- If the minimum is not the value (index) you initially began with, swap the two values.
- Repeat this with the next element until the array is sorted.

Every loop we set the minimum value in the desired position, so we apply the same process with the remaining values and thus reducing the "window" of possible unsorted values. We're shrinking the scope of what we're comparing as we loop through.
