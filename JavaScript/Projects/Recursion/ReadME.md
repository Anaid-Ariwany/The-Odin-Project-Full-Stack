# Recursion

### Instructions

#### Fibonacci Sequence
- First up create a file and tackle the fibonacci sequence:

1. Using iteration, write a function `fibs` which takes a number and returns an array containing that many numbers from the Fibonacci sequence. Using an example input of `8`, this function should return the array `[0, 1, 1, 2, 3, 5, 8, 13]`.

2. Now write another function `fibsRec` which solves the same problem recursively.

3. Test both versions of your functions by passing in various lengths as arguments.


- Hopefully you were able to solve the problem with recursion! If you need some help understanding what’s going on with this function, the “Test it out” section below will help.

#### Merge Sort
- Once you have a firm grasp on solving Fibonacci with recursion, create a new file and work on a merge sort:

1. Build a function `mergeSort` that takes in an array and returns a sorted array, using a recursive merge sort methodology.

- Test Examples:
```JavaScript
    - mergeSort([]) → []
    - mergeSort([73]) → [73]
    - mergeSort([1, 2, 3, 4, 5]) → [1, 2, 3, 4, 5]
    - mergeSort([3, 2, 1, 13, 8, 5, 0, 1]) → [0, 1, 1, 2, 3, 5, 8, 13]
    - mergeSort([105, 79, 100, 110]) → [79, 100, 105, 110]
```

### Tips:
- Think about what the base case is and what behavior is happening again and again and can actually be delegated to someone else (e.g. that same function!).

- It may be helpful to check out the background videos again if you don’t quite understand what should be going on.

- You will need a way to run the scripts you create for this project. Because there is no GUI component to this project it should be run in the command line rather than the browser.

- JavaScript files can be run directly from the command line using the node command installed with nodejs. You can learn about the common ways to do this by reading the [documentation for the Node CLI](https://github.com/nodejs/nodejs.dev/blob/aa4239e87a5adc992fdb709c20aebb5f6da77f86/content/learn/command-line/node-run-cli.en.md).

### Test it out
- To showcase the recursive effect implemented in your Fibonacci function, do the following:

1. Add the following to the start of the function:
```javascript
    console.log("This was printed recursively");
```

2. Call the function with 8 as the argument.

3. If the function is implemented correctly, you should see that sentence printed around 8 times (keep in mind that, depending on the way you implemented the function, you may see 7 instead of 8. This isn’t a bug! It simply depends on how many times the function is actually repeated).