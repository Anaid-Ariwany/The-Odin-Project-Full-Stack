class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array = []) {
        this.root = this._buildTree(array);
    }

    _buildTree(array) {
        const uniqueSortedValues = [...new Set(array)].sort((left, right) => left - right);

        const build = (values) => {
            if (values.length === 0) {
                return null;
            }

            const middleIndex = Math.floor(values.length / 2);
            const node = new Node(values[middleIndex]);
            node.left = build(values.slice(0, middleIndex));
            node.right = build(values.slice(middleIndex + 1));
            return node;
        };

        return build(uniqueSortedValues);
    }

    includes(value) {
        let currentNode = this.root;

        while (currentNode !== null) {
            if (value === currentNode.data) {
                return true;
            }

            currentNode = value < currentNode.data ? currentNode.left : currentNode.right;
        }

        return false;
    }

    insert(value) {
        const newNode = new Node(value);

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let currentNode = this.root;

        while (currentNode !== null) {
            if (value === currentNode.data) {
                return;
            }

            if (value < currentNode.data) {
                if (currentNode.left === null) {
                    currentNode.left = newNode;
                    return;
                }

                currentNode = currentNode.left;
            } else {
                if (currentNode.right === null) {
                    currentNode.right = newNode;
                    return;
                }

                currentNode = currentNode.right;
            }
        }
    }

    deleteItem(value) {
        const deleteNode = (node, targetValue) => {
            if (node === null) {
                return null;
            }

            if (targetValue < node.data) {
                node.left = deleteNode(node.left, targetValue);
                return node;
            }

            if (targetValue > node.data) {
                node.right = deleteNode(node.right, targetValue);
                return node;
            }

            if (node.left === null) {
                return node.right;
            }

            if (node.right === null) {
                return node.left;
            }

            let successorParent = node;
            let successor = node.right;

            while (successor.left !== null) {
                successorParent = successor;
                successor = successor.left;
            }

            if (successorParent !== node) {
                successorParent.left = successor.right;
                successor.right = node.right;
            }

            successor.left = node.left;
            return successor;
        };

        this.root = deleteNode(this.root, value);
    }

    levelOrderForEach(callback) {
        this._assertCallback(callback);

        if (this.root === null) {
            return;
        }

        const queue = [this.root];

        while (queue.length > 0) {
            const currentNode = queue.shift();
            callback(currentNode.data);

            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }

            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }
    }

    inOrderForEach(callback) {
        this._assertCallback(callback);

        const traverse = (node) => {
            if (node === null) {
                return;
            }

            traverse(node.left);
            callback(node.data);
            traverse(node.right);
        };

        traverse(this.root);
    }

    preOrderForEach(callback) {
        this._assertCallback(callback);

        const traverse = (node) => {
            if (node === null) {
                return;
            }

            callback(node.data);
            traverse(node.left);
            traverse(node.right);
        };

        traverse(this.root);
    }

    postOrderForEach(callback) {
        this._assertCallback(callback);

        const traverse = (node) => {
            if (node === null) {
                return;
            }

            traverse(node.left);
            traverse(node.right);
            callback(node.data);
        };

        traverse(this.root);
    }

    height(value) {
        const node = this._findNode(this.root, value);

        if (node === null) {
            return undefined;
        }

        const calculateHeight = (currentNode) => {
            if (currentNode === null) {
                return -1;
            }

            return 1 + Math.max(calculateHeight(currentNode.left), calculateHeight(currentNode.right));
        };

        return calculateHeight(node);
    }

    depth(value) {
        let currentNode = this.root;
        let depth = 0;

        while (currentNode !== null) {
            if (value === currentNode.data) {
                return depth;
            }

            currentNode = value < currentNode.data ? currentNode.left : currentNode.right;
            depth += 1;
        }

        return undefined;
    }

    isBalanced() {
        const checkBalance = (node) => {
            if (node === null) {
                return { balanced: true, height: -1 };
            }

            const left = checkBalance(node.left);
            if (!left.balanced) {
                return { balanced: false, height: 0 };
            }

            const right = checkBalance(node.right);
            if (!right.balanced) {
                return { balanced: false, height: 0 };
            }

            const balanced = Math.abs(left.height - right.height) <= 1;
            return {
                balanced,
                height: 1 + Math.max(left.height, right.height),
            };
        };

        return checkBalance(this.root).balanced;
    }

    rebalance() {
        const values = [];
        this.inOrderForEach((value) => values.push(value));
        this.root = this._buildTree(values);
    }

    _assertCallback(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is required');
        }
    }

    _findNode(node, value) {
        let currentNode = node;

        while (currentNode !== null) {
            if (value === currentNode.data) {
                return currentNode;
            }

            currentNode = value < currentNode.data ? currentNode.left : currentNode.right;
        }

        return null;
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) {
        return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
};

module.exports = { Node, Tree, prettyPrint };