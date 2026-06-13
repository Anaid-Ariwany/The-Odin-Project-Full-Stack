import { BOARD_SIZE, coordinateKey } from './Gameboard.js';

const columnLabels = 'ABCDEFGHIJ'.split('');

export function getElements() {
  return {
    app: document.querySelector('#app'),
    setupScreen: document.querySelector('#setup-screen'),
    battleScreen: document.querySelector('#battle-screen'),
    playerBoard: document.querySelector('#player-board'),
    enemyBoard: document.querySelector('#enemy-board'),
    setupBoard: document.querySelector('#setup-board'),
    shipQueue: document.querySelector('#ship-queue'),
    rotateButton: document.querySelector('#rotate-button'),
    randomizeButton: document.querySelector('#randomize-button'),
    clearButton: document.querySelector('#clear-button'),
    startButton: document.querySelector('#start-button'),
    newGameButton: document.querySelector('#new-game-button'),
    status: document.querySelector('#status'),
    setupStatus: document.querySelector('#setup-status'),
    fleetHealth: document.querySelector('#fleet-health'),
    enemyHealth: document.querySelector('#enemy-health'),
  };
}

export function renderBoard(container, gameboard, options = {}) {
  const {
    revealShips = false,
    interactive = false,
    mode = 'battle',
    preview = [],
    disabled = false,
  } = options;

  container.replaceChildren();
  container.style.setProperty('--board-size', gameboard.size || BOARD_SIZE);
  container.setAttribute('role', 'grid');
  container.setAttribute('aria-disabled', String(disabled));

  for (let row = 0; row < gameboard.size; row += 1) {
    for (let col = 0; col < gameboard.size; col += 1) {
      const cell = gameboard.getCell(row, col);
      const button = document.createElement('button');
      const key = coordinateKey(row, col);
      const isPreview = preview.some((coordinate) => coordinateKey(coordinate.row, coordinate.col) === key);

      button.type = 'button';
      button.className = 'board-cell';
      button.dataset.row = String(row);
      button.dataset.col = String(col);
      button.setAttribute('role', 'gridcell');
      button.setAttribute('aria-label', `${columnLabels[col]}${row + 1}`);

      if (cell.hasShip && revealShips) button.classList.add('has-ship');
      if (cell.isHit) button.classList.add('hit');
      if (cell.isMiss) button.classList.add('miss');
      if (isPreview) button.classList.add('preview');
      if (cell.wasAttacked || disabled || (!interactive && mode !== 'placement')) button.disabled = true;

      if (mode === 'placement') {
        button.disabled = disabled;
      }

      container.append(button);
    }
  }
}

export function renderShipQueue(container, ships, activeIndex) {
  container.replaceChildren();

  ships.forEach((ship, index) => {
    const item = document.createElement('li');
    item.className = 'ship-queue-item';
    if (index < activeIndex) item.classList.add('placed');
    if (index === activeIndex) item.classList.add('active');

    item.innerHTML = `
      <span>${ship.name}</span>
      <span>${ship.length} cells</span>
    `;

    container.append(item);
  });
}

export function renderFleetHealth(container, player) {
  container.replaceChildren();

  player.gameboard.ships.forEach(({ ship }) => {
    const item = document.createElement('li');
    item.className = 'health-item';

    const status = ship.isSunk() ? 'Sunk' : `${ship.length - ship.hits} afloat`;
    item.innerHTML = `
      <span>${ship.name}</span>
      <strong>${status}</strong>
    `;

    container.append(item);
  });
}

export function setStatus(element, message, tone = 'neutral') {
  element.textContent = message;
  element.dataset.tone = tone;
}
