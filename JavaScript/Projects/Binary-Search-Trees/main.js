const { Tree, prettyPrint } = require('./bst');

const randomNumbers = () => {
    const numbers = [];

    while (numbers.length < 15) {
        numbers.push(Math.floor(Math.random() * 100));
    }

    return numbers;
};

const printTraversals = (tree) => {
    const collect = (traversal) => {
        const values = [];
        traversal((value) => values.push(value));
        return values.join(', ');
    };

    console.log('level order:', collect((callback) => tree.levelOrderForEach(callback)));
    console.log('pre order:', collect((callback) => tree.preOrderForEach(callback)));
    console.log('post order:', collect((callback) => tree.postOrderForEach(callback)));
    console.log('in order:', collect((callback) => tree.inOrderForEach(callback)));
};

const tree = new Tree(randomNumbers());

console.log('initial tree:');
prettyPrint(tree.root);
console.log('balanced?', tree.isBalanced());
printTraversals(tree);

[101, 120, 140, 160, 180].forEach((value) => tree.insert(value));

console.log('\nafter adding values above 100:');
prettyPrint(tree.root);
console.log('balanced?', tree.isBalanced());
printTraversals(tree);

tree.rebalance();

console.log('\nafter rebalance:');
prettyPrint(tree.root);
console.log('balanced?', tree.isBalanced());
printTraversals(tree);