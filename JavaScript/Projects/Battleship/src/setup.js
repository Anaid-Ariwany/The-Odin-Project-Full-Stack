import Gameboard, { ORIENTATIONS } from './Gameboard.js';

export function randomizeFleet(gameboard, ships) {
  ships.forEach((ship) => {
    const placed = placeShipRandomly(gameboard, ship);

    if (!placed) {
      throw new Error(`Unable to place ${ship.name}.`);
    }
  });

  return gameboard;
}

export function placeShipRandomly(gameboard, ship, maxAttempts = 500) {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const orientation = Math.random() > 0.5 ? ORIENTATIONS.HORIZONTAL : ORIENTATIONS.VERTICAL;
    const row = Math.floor(Math.random() * gameboard.size);
    const col = Math.floor(Math.random() * gameboard.size);

    if (gameboard.canPlaceShip(row, col, ship.length, orientation)) {
      return gameboard.placeShip(ship, row, col, orientation);
    }
  }

  return null;
}

export function createRandomBoard() {
  return randomizeFleet(new Gameboard(), Gameboard.standardFleet());
}
