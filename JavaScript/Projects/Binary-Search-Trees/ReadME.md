# Project Binary Search Trees

### Instructions
- You’ll build a balanced BST in this assignment. Do not use duplicate values because they make it more complicated and result in trees that are much harder to balance. Therefore, be sure to always remove duplicate values or check for an existing value before inserting.

    1. Build a `Node` class/factory. It should have an attribute for the data it stores as well as its left and right children.

    2. Build a `Tree` class/factory which accepts an array when initialized. The `Tree` class should have a `root` attribute, which uses the return value of `buildTree()` which you’ll write next.

    3. Write a `buildTree(array)` function that takes an array of numbers (e.g., `[1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]`) and turns it into a balanced binary tree full of `Node` objects appropriately placed (don’t forget to sort and remove duplicates!). The `buildTree()` function should return the level-0 root node. You can make this function private (either through using class syntax privacy features or by not including it in your factory’s return object), and just call it for initializing the value of the `root` node.

    #### Visually representing your tree
    If you would like to visualize your binary search tree, here is a `prettyPrint()` function that will `console.log` your tree in a structured format. This function will expect to receive the root of your tree as the value for the node parameter:
    ```javascript
        const prettyPrint = (node, prefix = '', isLeft = true) => {
            if (node === null || node === undefined) {
                return;
            }

            prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
            console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
            prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    ```

    4. Write an `includes(value)` function that accepts a value and returns `true` if the given value is in the tree. If the value isn’t in the tree, it should return `false`.

    5. Write an `insert(value)` function that accepts a value and inserts a new node with that value into the tree. Be sure to insert in a way that preserves the “binary search” property: for each node, every node to its left must have a lower value, and every node to its right must have a greater value. If the function is called with a value that already exists in the tree, the function should do nothing. If you need additional resources, check out the [Geeks for Geeks article on binary search tree insertion.](https://www.geeksforgeeks.org/insertion-in-binary-search-tree/?ref=lbp)

    #### Avoid using the original input array
    - You may be tempted to implement these methods using the original input array used to build the tree, but it’s important for the efficiency of these operations that you don’t do this. If we refer back to the [Big O Cheatsheet](https://www.bigocheatsheet.com/), we’ll see that binary search trees can insert/delete in `O(log n)` time, which is a significant performance boost over arrays for the same operations. To get this added efficiency, your implementation of these methods should traverse the tree and manipulate the nodes and their connections.

    6. Write a `deleteItem(value)` function that accepts a value and removes it from the tree. You’ll have to deal with multiple cases for this based on how many children the targeted node has. If the given value doesn’t exist in the tree, the function should do nothing. If you need additional resources, check out the [Geeks for Geeks article on deleting in a binary search tree.](https://www.geeksforgeeks.org/binary-search-tree-set-2-delete/?ref=lbp)

    7. Write a `levelOrderForEach(callback)` function that accepts a callback function as its parameter. `levelOrderForEach()` should traverse the tree in breadth-first level order and call the callback on each value as it traverses, passing each value (not the nodes) as an argument, similarly to how `Array.prototype.forEach()` might work for arrays. `levelOrderForEach()` may be implemented using either iteration or recursion (try implementing both!). If no callback function is provided, [throw an Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw) reporting that a callback is required.

    #### Using a queue
    - You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list. If you need a visualization, [watch mycodeschool’s video on level order traversal.](https://www.youtube.com/watch?v=86g8jAQug04)

    8. Write `inOrderForEach(callback)`, `preOrderForEach(callback)`, and `postOrderForEach(callback)` functions that also accept a callback as a parameter. Each of these functions should traverse the tree in their respective depth-first order and pass each value to the provided callback. The functions should throw an Error if no callback is given as an argument, like with `levelOrderForEach()`. If you need a resource for how the different traversals work, watch [mycodeschool’s video on Binary Tree Traversal: Preorder, Inorder, Postorder.](https://www.youtube.com/watch?v=gm8DUJJhmY4)

    9. Write a `height(value)` function that returns the height of the node containing the given value. Height is defined as the number of edges in the longest path from that node to a leaf node. If the value is not found in the tree, the function should return `undefined`.

    10. Write a `depth(value)` function that returns the depth of the node containing the given value. Depth is defined as the number of edges in the path from that node to the root node. If the value is not found in the tree, the function should return `undefined`.

    11. Write an `isBalanced()` function that checks if the tree is balanced. A binary tree is considered balanced if, for every node in the tree, the height difference between its left and right subtrees is no more than 1, and both the left and right subtrees are also balanced.

    #### Pitfall with checking balance
    - A common mistake is only checking the height difference between the root’s left and right children. That is not enough — you must check the balance condition for every node.

    12. Write a `rebalance()` function that rebalances an unbalanced tree. You’ll want to use a traversal method to provide a new array to the `buildTree()` function.


### Tie it all together
- Write a driver script that does the following:

1. Create a binary search tree from an array of random numbers with each element having a value less than 100. You can create a function that returns an array of random numbers every time you call it if you wish.

2. Confirm that the tree is balanced by calling `isBalanced()`.

3. Print out all elements in level, pre, post, and in order.

4. Unbalance the tree by adding several numbers whose value is more than 100.
5. Confirm that the tree is unbalanced by calling `isBalanced()`.

6. Balance the tree by calling `rebalance()`.
7. Confirm that the tree is balanced by calling `isBalanced()`.

8. Print out all elements in level, pre, post, and in order.