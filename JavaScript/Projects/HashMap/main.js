const { HashMap } = require('./hashMap');

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log('length after 12 inserts:', test.length());
console.log('capacity after 12 inserts:', test.capacity);
console.log('load after 12 inserts:', (test.length() / test.capacity).toFixed(2));

test.set('banana', 'ripe yellow');
test.set('dog', 'golden brown');
test.set('carrot', 'deep orange');

console.log('overwritten banana:', test.get('banana'));
console.log('overwritten dog:', test.get('dog'));
console.log('length after overwrites:', test.length());
console.log('capacity after overwrites:', test.capacity);

test.set('moon', 'silver');

console.log('length after moon:', test.length());
console.log('capacity after moon:', test.capacity);
console.log('load after moon:', (test.length() / test.capacity).toFixed(2));
console.log('has moon:', test.has('moon'));
console.log('get moon:', test.get('moon'));
console.log('remove moon:', test.remove('moon'));
console.log('has moon after remove:', test.has('moon'));
console.log('keys:', test.keys());
console.log('values:', test.values());
console.log('entries:', test.entries());