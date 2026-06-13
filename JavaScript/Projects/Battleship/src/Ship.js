export default class Ship {
  constructor(length, name = 'Ship') {
    if (!Number.isInteger(length) || length <= 0) {
      throw new Error('Ship length must be a positive integer.');
    }

    this.name = name;
    this.length = length;
    this.hits = 0;
  }

  hit() {
    if (!this.isSunk()) {
      this.hits += 1;
    }

    return this.hits;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}
