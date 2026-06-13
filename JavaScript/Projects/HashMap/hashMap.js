class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this._size = 0;
        this._buckets = Array.from({ length: this.capacity }, () => []);
    }

    hash(key) {
        if (typeof key !== 'string') {
            throw new TypeError('HashMap keys must be strings');
        }

        let hashCode = 0;
        const primeNumber = 31;

        for (let index = 0; index < key.length; index += 1) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(index)) % this.capacity;
        }

        return hashCode;
    }

    set(key, value) {
        const bucketIndex = this.hash(key);
        const bucket = this._buckets[bucketIndex];
        const existingEntryIndex = bucket.findIndex(([storedKey]) => storedKey === key);

        if (existingEntryIndex !== -1) {
            bucket[existingEntryIndex][1] = value;
            return;
        }

        bucket.push([key, value]);
        this._size += 1;

        if (this._size / this.capacity > this.loadFactor) {
            this._resize(this.capacity * 2);
        }
    }

    get(key) {
        const entry = this._getEntry(key);
        return entry ? entry[1] : null;
    }

    has(key) {
        return this._getEntry(key) !== undefined;
    }

    remove(key) {
        const bucketIndex = this.hash(key);
        const bucket = this._buckets[bucketIndex];
        const entryIndex = bucket.findIndex(([storedKey]) => storedKey === key);

        if (entryIndex === -1) {
            return false;
        }

        bucket.splice(entryIndex, 1);
        this._size -= 1;
        return true;
    }

    length() {
        return this._size;
    }

    clear() {
        this._buckets = Array.from({ length: this.capacity }, () => []);
        this._size = 0;
    }

    keys() {
        const keys = [];

        for (const bucket of this._buckets) {
            for (const [key] of bucket) {
                keys.push(key);
            }
        }

        return keys;
    }

    values() {
        const values = [];

        for (const bucket of this._buckets) {
            for (const [, value] of bucket) {
                values.push(value);
            }
        }

        return values;
    }

    entries() {
        const entries = [];

        for (const bucket of this._buckets) {
            for (const entry of bucket) {
                entries.push([...entry]);
            }
        }

        return entries;
    }

    _getEntry(key) {
        const bucketIndex = this.hash(key);
        const bucket = this._buckets[bucketIndex];
        return bucket.find(([storedKey]) => storedKey === key);
    }

    _resize(newCapacity) {
        const oldEntries = this.entries();
        this.capacity = newCapacity;
        this._buckets = Array.from({ length: this.capacity }, () => []);
        this._size = 0;

        for (const [key, value] of oldEntries) {
            const bucketIndex = this.hash(key);
            this._buckets[bucketIndex].push([key, value]);
            this._size += 1;
        }
    }
}

module.exports = { HashMap };