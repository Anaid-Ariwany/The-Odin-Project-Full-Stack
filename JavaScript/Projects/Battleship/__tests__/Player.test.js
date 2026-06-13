import Gameboard from '../src/Gameboard.js';
import Player, { PLAYER_TYPES } from '../src/Player.js';

describe('Player', () => {
  test('owns a gameboard', () => {
    const player = new Player('Computer', PLAYER_TYPES.COMPUTER);

    expect(player.gameboard).toBeInstanceOf(Gameboard);
    expect(player.type).toBe(PLAYER_TYPES.COMPUTER);
  });

  test('chooses only legal attacks', () => {
    const opponentBoard = new Gameboard(2);
    const player = new Player('Computer', PLAYER_TYPES.COMPUTER);

    opponentBoard.receiveAttack(0, 0);
    opponentBoard.receiveAttack(0, 1);
    opponentBoard.receiveAttack(1, 0);

    expect(player.chooseAttack(opponentBoard)).toEqual({ row: 1, col: 1 });
  });

  test('prefers remembered adjacent targets when legal', () => {
    const opponentBoard = new Gameboard(3);
    const player = new Player('Computer', PLAYER_TYPES.COMPUTER);

    player.pendingTargets = [{ row: 1, col: 1 }];

    expect(player.chooseAttack(opponentBoard)).toEqual({ row: 1, col: 1 });
  });
});
