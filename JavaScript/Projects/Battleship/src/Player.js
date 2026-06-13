import Gameboard, { coordinateKey } from './Gameboard.js';

export const PLAYER_TYPES = Object.freeze({
  HUMAN: 'human',
  COMPUTER: 'computer',
});

export default class Player {
  constructor(name, type = PLAYER_TYPES.HUMAN, gameboard = new Gameboard()) {
    if (!name || typeof name !== 'string') {
      throw new Error('Player name is required.');
    }

    if (![PLAYER_TYPES.HUMAN, PLAYER_TYPES.COMPUTER].includes(type)) {
      throw new Error('Unknown player type.');
    }

    this.name = name;
    this.type = type;
    this.gameboard = gameboard;
    this.pendingTargets = [];
  }

  attack(opponentGameboard, row, col) {
    return opponentGameboard.receiveAttack(row, col);
  }

  chooseAttack(opponentGameboard) {
    const legalTargets = new Set(
      opponentGameboard.getAvailableAttackCoordinates().map(({ row, col }) => coordinateKey(row, col)),
    );

    while (this.pendingTargets.length > 0) {
      const target = this.pendingTargets.shift();
      if (legalTargets.has(coordinateKey(target.row, target.col))) {
        return target;
      }
    }

    const available = opponentGameboard.getAvailableAttackCoordinates();
    if (available.length === 0) {
      return null;
    }

    return available[Math.floor(Math.random() * available.length)];
  }

  rememberHit(row, col, boardSize) {
    const adjacent = [
      { row: row - 1, col },
      { row: row + 1, col },
      { row, col: col - 1 },
      { row, col: col + 1 },
    ].filter((target) => (
      target.row >= 0
      && target.row < boardSize
      && target.col >= 0
      && target.col < boardSize
    ));

    this.pendingTargets.push(...adjacent.sort(() => Math.random() - 0.5));
  }
}
