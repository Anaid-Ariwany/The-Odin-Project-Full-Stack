import Ship from './Ship.js';

export const BOARD_SIZE = 10;
export const ORIENTATIONS = Object.freeze({
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
});

const SHIP_DEFINITIONS = Object.freeze([
  { name: 'Carrier', length: 5 },
  { name: 'Battleship', length: 4 },
  { name: 'Destroyer', length: 3 },
  { name: 'Submarine', length: 3 },
  { name: 'Patrol Boat', length: 2 },
]);

export function getShipDefinitions() {
  return SHIP_DEFINITIONS.map((ship) => ({ ...ship }));
}

export function coordinateKey(row, col) {
  return `${row},${col}`;
}

export function parseCoordinateKey(key) {
  const [row, col] = key.split(',').map(Number);
  return { row, col };
}

export default class Gameboard {
  constructor(size = BOARD_SIZE) {
    if (!Number.isInteger(size) || size <= 0) {
      throw new Error('Board size must be a positive integer.');
    }

    this.size = size;
    this.ships = [];
    this.occupied = new Map();
    this.missedAttacks = new Set();
    this.successfulAttacks = new Set();
    this.attackedCoordinates = new Set();
  }

  static standardFleet() {
    return getShipDefinitions().map(({ name, length }) => new Ship(length, name));
  }

  isWithinBounds(row, col) {
    return (
      Number.isInteger(row)
      && Number.isInteger(col)
      && row >= 0
      && row < this.size
      && col >= 0
      && col < this.size
    );
  }

  getCoordinatesForShip(row, col, length, orientation) {
    if (![ORIENTATIONS.HORIZONTAL, ORIENTATIONS.VERTICAL].includes(orientation)) {
      throw new Error('Orientation must be horizontal or vertical.');
    }

    return Array.from({ length }, (_, index) => ({
      row: orientation === ORIENTATIONS.VERTICAL ? row + index : row,
      col: orientation === ORIENTATIONS.HORIZONTAL ? col + index : col,
    }));
  }

  canPlaceShip(row, col, length, orientation) {
    if (!Number.isInteger(length) || length <= 0) {
      return false;
    }

    return this.getCoordinatesForShip(row, col, length, orientation).every((coordinate) => (
      this.isWithinBounds(coordinate.row, coordinate.col)
      && !this.occupied.has(coordinateKey(coordinate.row, coordinate.col))
    ));
  }

  placeShip(ship, row, col, orientation = ORIENTATIONS.HORIZONTAL) {
    if (!(ship instanceof Ship)) {
      throw new Error('placeShip expects a Ship instance.');
    }

    if (!this.canPlaceShip(row, col, ship.length, orientation)) {
      throw new Error('Ship cannot be placed at those coordinates.');
    }

    const coordinates = this.getCoordinatesForShip(row, col, ship.length, orientation);
    const placedShip = {
      ship,
      coordinates,
    };

    this.ships.push(placedShip);
    coordinates.forEach((coordinate) => {
      this.occupied.set(coordinateKey(coordinate.row, coordinate.col), placedShip);
    });

    return placedShip;
  }

  receiveAttack(row, col) {
    if (!this.isWithinBounds(row, col)) {
      throw new Error('Attack coordinates are outside the board.');
    }

    const key = coordinateKey(row, col);
    if (this.attackedCoordinates.has(key)) {
      return {
        legal: false,
        hit: false,
        sunk: false,
        message: 'That coordinate has already been attacked.',
      };
    }

    this.attackedCoordinates.add(key);
    const placedShip = this.occupied.get(key);

    if (!placedShip) {
      this.missedAttacks.add(key);
      return { legal: true, hit: false, sunk: false, coordinate: { row, col } };
    }

    placedShip.ship.hit();
    this.successfulAttacks.add(key);

    return {
      legal: true,
      hit: true,
      sunk: placedShip.ship.isSunk(),
      ship: placedShip.ship,
      coordinate: { row, col },
    };
  }

  allShipsSunk() {
    return this.ships.length > 0 && this.ships.every(({ ship }) => ship.isSunk());
  }

  getCell(row, col) {
    const key = coordinateKey(row, col);
    const placedShip = this.occupied.get(key);

    return {
      row,
      col,
      hasShip: Boolean(placedShip),
      ship: placedShip?.ship ?? null,
      isMiss: this.missedAttacks.has(key),
      isHit: this.successfulAttacks.has(key),
      wasAttacked: this.attackedCoordinates.has(key),
    };
  }

  getAvailableAttackCoordinates() {
    const coordinates = [];

    for (let row = 0; row < this.size; row += 1) {
      for (let col = 0; col < this.size; col += 1) {
        if (!this.attackedCoordinates.has(coordinateKey(row, col))) {
          coordinates.push({ row, col });
        }
      }
    }

    return coordinates;
  }
}
