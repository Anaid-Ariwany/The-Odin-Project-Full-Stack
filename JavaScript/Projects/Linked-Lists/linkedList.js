class Node {
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}

class LinkedList {
    constructor() {
        this._head = null;
    }

    append(value) {
        const newNode = new Node(value);

        if (this._head === null) {
            this._head = newNode;
            return;
        }

        let currentNode = this._head;

        while (currentNode.nextNode !== null) {
            currentNode = currentNode.nextNode;
        }

        currentNode.nextNode = newNode;
    }

    prepend(value) {
        const newNode = new Node(value, this._head);
        this._head = newNode;
    }

    size() {
        let count = 0;
        let currentNode = this._head;

        while (currentNode !== null) {
            count += 1;
            currentNode = currentNode.nextNode;
        }

        return count;
    }

    head() {
        return this._head?.value;
    }

    tail() {
        if (this._head === null) {
            return undefined;
        }

        let currentNode = this._head;

        while (currentNode.nextNode !== null) {
            currentNode = currentNode.nextNode;
        }

        return currentNode.value;
    }

    at(index) {
        if (index < 0) {
            return undefined;
        }

        let currentNode = this._head;
        let currentIndex = 0;

        while (currentNode !== null && currentIndex < index) {
            currentNode = currentNode.nextNode;
            currentIndex += 1;
        }

        return currentNode?.value;
    }

    pop() {
        if (this._head === null) {
            return undefined;
        }

        const removedValue = this._head.value;
        this._head = this._head.nextNode;
        return removedValue;
    }

    contains(value) {
        let currentNode = this._head;

        while (currentNode !== null) {
            if (currentNode.value === value) {
                return true;
            }

            currentNode = currentNode.nextNode;
        }

        return false;
    }

    findIndex(value) {
        let currentNode = this._head;
        let currentIndex = 0;

        while (currentNode !== null) {
            if (currentNode.value === value) {
                return currentIndex;
            }

            currentNode = currentNode.nextNode;
            currentIndex += 1;
        }

        return -1;
    }

    toString() {
        if (this._head === null) {
            return '';
        }

        const parts = [];
        let currentNode = this._head;

        while (currentNode !== null) {
            parts.push(`( ${currentNode.value} )`);
            currentNode = currentNode.nextNode;
        }

        parts.push('null');
        return parts.join(' -> ');
    }

    insertAt(index, ...values) {
        if (index < 0 || index > this.size()) {
            throw new RangeError('Index out of bounds');
        }

        if (values.length === 0) {
            return;
        }

        if (index === 0) {
            for (let valueIndex = values.length - 1; valueIndex >= 0; valueIndex -= 1) {
                this.prepend(values[valueIndex]);
            }

            return;
        }

        let currentNode = this._head;
        let currentIndex = 0;

        while (currentNode !== null && currentIndex < index - 1) {
            currentNode = currentNode.nextNode;
            currentIndex += 1;
        }

        const nextNode = currentNode.nextNode;

        for (const value of values) {
            const newNode = new Node(value);
            currentNode.nextNode = newNode;
            currentNode = newNode;
        }

        currentNode.nextNode = nextNode;
    }

    removeAt(index) {
        if (index < 0 || index >= this.size()) {
            throw new RangeError('Index out of bounds');
        }

        if (index === 0) {
            return this.pop();
        }

        let currentNode = this._head;
        let currentIndex = 0;

        while (currentNode !== null && currentIndex < index - 1) {
            currentNode = currentNode.nextNode;
            currentIndex += 1;
        }

        const removedNode = currentNode.nextNode;
        currentNode.nextNode = removedNode?.nextNode ?? null;
        return removedNode?.value;
    }
}

module.exports = { LinkedList, Node };