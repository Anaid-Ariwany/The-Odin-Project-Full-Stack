import Ship from '../src/Ship.js';

describe('Ship', () => {
  test('tracks length, hits, and sunk state', () => {
    const ship = new Ship(2, 'Patrol Boat');

    expect(ship.length).toBe(2);
    expect(ship.hits).toBe(0);
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    expect(ship.hits).toBe(1);
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    expect(ship.hits).toBe(2);
    expect(ship.isSunk()).toBe(true);
  });

  test('rejects invalid lengths', () => {
    expect(() => new Ship(0)).toThrow('positive integer');
    expect(() => new Ship(2.5)).toThrow('positive integer');
  });
});
