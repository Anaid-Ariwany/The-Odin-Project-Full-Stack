import Gameboard, { ORIENTATIONS } from './Gameboard.js';
import Player, { PLAYER_TYPES } from './Player.js';
import { createRandomBoard, randomizeFleet } from './setup.js';
import {
  getElements,
  renderBoard,
  renderFleetHealth,
  renderShipQueue,
  setStatus,
} from './dom.js';

class BattleshipApp {
  constructor() {
    this.elements = getElements();
    this.orientation = ORIENTATIONS.HORIZONTAL;
    this.setupBoard = new Gameboard();
    this.setupShips = Gameboard.standardFleet();
    this.currentShipIndex = 0;
    this.isPlayerTurn = true;
    this.isGameOver = false;

    this.bindEvents();
    this.renderSetup();
  }

  bindEvents() {
    this.elements.rotateButton.addEventListener('click', () => this.toggleOrientation());
    this.elements.randomizeButton.addEventListener('click', () => this.randomizePlayerFleet());
    this.elements.clearButton.addEventListener('click', () => this.resetSetup());
    this.elements.startButton.addEventListener('click', () => this.startGame());
    this.elements.newGameButton.addEventListener('click', () => this.resetGame());

    this.elements.setupBoard.addEventListener('click', (event) => {
      const cell = event.target.closest('.board-cell');
      if (!cell) return;
      this.placeCurrentShip(Number(cell.dataset.row), Number(cell.dataset.col));
    });

    this.elements.setupBoard.addEventListener('mouseover', (event) => {
      const cell = event.target.closest('.board-cell');
      if (!cell) return;
      this.renderSetupPreview(Number(cell.dataset.row), Number(cell.dataset.col));
    });

    this.elements.setupBoard.addEventListener('mouseleave', () => this.renderSetup());

    this.elements.enemyBoard.addEventListener('click', (event) => {
      const cell = event.target.closest('.board-cell');
      if (!cell || !this.isPlayerTurn || this.isGameOver) return;
      this.playerAttack(Number(cell.dataset.row), Number(cell.dataset.col));
    });
  }

  resetSetup() {
    this.setupBoard = new Gameboard();
    this.setupShips = Gameboard.standardFleet();
    this.currentShipIndex = 0;
    this.renderSetup();
  }

  resetGame() {
    this.isGameOver = false;
    this.elements.battleScreen.hidden = true;
    this.elements.setupScreen.hidden = false;
    this.resetSetup();
  }

  toggleOrientation() {
    this.orientation = this.orientation === ORIENTATIONS.HORIZONTAL
      ? ORIENTATIONS.VERTICAL
      : ORIENTATIONS.HORIZONTAL;
    this.elements.rotateButton.textContent = this.orientation === ORIENTATIONS.HORIZONTAL
      ? 'Horizontal'
      : 'Vertical';
    this.renderSetup();
  }

  getCurrentShip() {
    return this.setupShips[this.currentShipIndex] ?? null;
  }

  placeCurrentShip(row, col) {
    const ship = this.getCurrentShip();
    if (!ship) return;

    if (!this.setupBoard.canPlaceShip(row, col, ship.length, this.orientation)) {
      setStatus(this.elements.setupStatus, `${ship.name} does not fit there.`, 'warning');
      return;
    }

    this.setupBoard.placeShip(ship, row, col, this.orientation);
    this.currentShipIndex += 1;
    this.renderSetup();

    if (!this.getCurrentShip()) {
      setStatus(this.elements.setupStatus, 'Fleet ready. Start the battle when you are.', 'success');
    }
  }

  randomizePlayerFleet() {
    this.setupBoard = new Gameboard();
    this.setupShips = Gameboard.standardFleet();
    randomizeFleet(this.setupBoard, this.setupShips);
    this.currentShipIndex = this.setupShips.length;
    this.renderSetup();
    setStatus(this.elements.setupStatus, 'Fleet randomized and ready.', 'success');
  }

  renderSetupPreview(row, col) {
    const ship = this.getCurrentShip();
    const preview = ship
      ? this.setupBoard.getCoordinatesForShip(row, col, ship.length, this.orientation)
      : [];
    this.renderSetup(preview);
  }

  renderSetup(preview = []) {
    const currentShip = this.getCurrentShip();

    renderBoard(this.elements.setupBoard, this.setupBoard, {
      revealShips: true,
      interactive: true,
      mode: 'placement',
      preview,
    });
    renderShipQueue(this.elements.shipQueue, this.setupShips, this.currentShipIndex);

    this.elements.startButton.disabled = Boolean(currentShip);
    if (currentShip) {
      setStatus(
        this.elements.setupStatus,
        `Place your ${currentShip.name} (${currentShip.length} cells).`,
      );
    }
  }

  startGame() {
    if (this.getCurrentShip()) {
      setStatus(this.elements.setupStatus, 'Place every ship before starting.', 'warning');
      return;
    }

    this.player = new Player('You', PLAYER_TYPES.HUMAN, this.setupBoard);
    this.computer = new Player('Computer', PLAYER_TYPES.COMPUTER, createRandomBoard());
    this.isPlayerTurn = true;
    this.isGameOver = false;

    this.elements.setupScreen.hidden = true;
    this.elements.battleScreen.hidden = false;
    setStatus(this.elements.status, 'Your turn. Fire on the enemy grid.');
    this.renderBattle();
  }

  playerAttack(row, col) {
    const result = this.player.attack(this.computer.gameboard, row, col);
    if (!result.legal) {
      setStatus(this.elements.status, result.message, 'warning');
      return;
    }

    this.renderBattle();
    if (this.checkForWinner()) return;

    const message = result.hit
      ? `Hit${result.sunk ? ` and sunk the ${result.ship.name}` : ''}. Computer is responding.`
      : 'Miss. Computer is responding.';
    setStatus(this.elements.status, message, result.hit ? 'success' : 'neutral');

    this.isPlayerTurn = false;
    this.renderBattle();
    window.setTimeout(() => this.computerAttack(), 650);
  }

  computerAttack() {
    if (this.isGameOver) return;

    const target = this.computer.chooseAttack(this.player.gameboard);
    if (!target) return;

    const result = this.computer.attack(this.player.gameboard, target.row, target.col);
    if (result.hit && !result.sunk) {
      this.computer.rememberHit(target.row, target.col, this.player.gameboard.size);
    }

    this.renderBattle();
    if (this.checkForWinner()) return;

    const coordinate = `${String.fromCharCode(65 + target.col)}${target.row + 1}`;
    const message = result.hit
      ? `Computer hit ${coordinate}${result.sunk ? ` and sunk your ${result.ship.name}` : ''}.`
      : `Computer missed ${coordinate}.`;

    setStatus(this.elements.status, `${message} Your turn.`, result.hit ? 'warning' : 'success');
    this.isPlayerTurn = true;
    this.renderBattle();
  }

  checkForWinner() {
    if (this.computer.gameboard.allShipsSunk()) {
      this.endGame('You destroyed the enemy fleet. Victory!', 'success');
      return true;
    }

    if (this.player.gameboard.allShipsSunk()) {
      this.endGame('Your fleet has been sunk. The computer wins.', 'warning');
      return true;
    }

    return false;
  }

  endGame(message, tone) {
    this.isGameOver = true;
    this.isPlayerTurn = false;
    setStatus(this.elements.status, message, tone);
    this.renderBattle(true);
  }

  renderBattle(forceRevealEnemy = false) {
    renderBoard(this.elements.playerBoard, this.player.gameboard, {
      revealShips: true,
      disabled: true,
    });
    renderBoard(this.elements.enemyBoard, this.computer.gameboard, {
      revealShips: forceRevealEnemy || this.isGameOver,
      interactive: this.isPlayerTurn && !this.isGameOver,
      disabled: !this.isPlayerTurn || this.isGameOver,
    });
    renderFleetHealth(this.elements.fleetHealth, this.player);
    renderFleetHealth(this.elements.enemyHealth, this.computer);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new BattleshipApp();
});
