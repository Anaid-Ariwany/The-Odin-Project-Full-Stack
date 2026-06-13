import Gameboard, { ORIENTATIONS } from '../src/Gameboard.js';
import Ship from '../src/Ship.js';

describe('Gameboard', () => {
  test('places ships at coordinates', () => {
    const board = new Gameboard();
    const ship = new Ship(3, 'Destroyer');

    board.placeShip(ship, 1, 2, ORIENTATIONS.HORIZONTAL);

    expect(board.getCell(1, 2).ship).toBe(ship);
    expect(board.getCell(1, 3).ship).toBe(ship);
    expect(board.getCell(1, 4).ship).toBe(ship);
  });

  test('prevents out-of-bounds and overlapping placements', () => {
    const board = new Gameboard();

    board.placeShip(new Ship(3), 0, 0, ORIENTATIONS.VERTICAL);

    expect(board.canPlaceShip(8, 0, 3, ORIENTATIONS.VERTICAL)).toBe(false);
    expect(board.canPlaceShip(0, 0, 2, ORIENTATIONS.HORIZONTAL)).toBe(false);
    expect(() => board.placeShip(new Ship(2), 0, 0)).toThrow('cannot be placed');
  });

  test('records hits and misses', () => {
    const board = new Gameboard();
    const ship = new Ship(2, 'Patrol Boat');

    board.placeShip(ship, 4, 4, ORIENTATIONS.HORIZONTAL);

    expect(board.receiveAttack(4, 4)).toMatchObject({ legal: true, hit: true, sunk: false });
    expect(board.receiveAttack(0, 0)).toMatchObject({ legal: true, hit: false });
    expect(board.getCell(4, 4).isHit).toBe(true);
    expect(board.getCell(0, 0).isMiss).toBe(true);
  });

  test('does not allow duplicate attacks', () => {
    const board = new Gameboard();

    board.receiveAttack(2, 2);

    expect(board.receiveAttack(2, 2)).toMatchObject({ legal: false });
  });

  test('reports when all ships are sunk', () => {
    const board = new Gameboard();

    board.placeShip(new Ship(1), 0, 0);
    expect(board.allShipsSunk()).toBe(false);

    board.receiveAttack(0, 0);
    expect(board.allShipsSunk()).toBe(true);
  });
});
