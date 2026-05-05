// Factory for players
const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return { getName, getMark };
};

// Singleton Gameboard module
const Gameboard = (() => {
    const SIZE = 9;
    let board = Array(SIZE).fill(null);

    const getBoard = () => board.slice();

    const reset = () => {
        board = Array(SIZE).fill(null);
    };

    const isInBounds = (index) => Number.isInteger(index) && index >= 0 && index < SIZE;

    const setMark = (index, mark) => {
        if (!isInBounds(index)) return false;
        if (board[index] !== null) return false;
        board[index] = mark;
        return true;
    };

    const getMark = (index) => (isInBounds(index) ? board[index] : null);

    return { getBoard, reset, setMark, getMark };
})();

// Singleton game controller module
const Game = (() => {
    const LINES = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    let players = [Player("Player 1", "X"), Player("Player 2", "O")];
    let current = 0;
    let started = false;
    let over = false;
    let winner = null;
    let winningLine = null;

    const start = (p1Name, p2Name) => {
        const safe = (value, fallback) => {
            const trimmed = String(value ?? "").trim();
            return trimmed.length ? trimmed : fallback;
        };

        players = [Player(safe(p1Name, "Player 1"), "X"), Player(safe(p2Name, "Player 2"), "O")];
        Gameboard.reset();
        current = 0;
        started = true;
        over = false;
        winner = null;
        winningLine = null;
        return getState();
    };

    const restart = () => {
        const p1 = players[0]?.getName?.() ?? "Player 1";
        const p2 = players[1]?.getName?.() ?? "Player 2";
        return start(p1, p2);
    };

    const getCurrentPlayer = () => players[current];

    const isTie = () => {
        const b = Gameboard.getBoard();
        return b.every((cell) => cell !== null);
    };

    const computeWinner = () => {
        const b = Gameboard.getBoard();
        for (const line of LINES) {
            const [a, c, d] = line;
            const m = b[a];
            if (m && m === b[c] && m === b[d]) {
                return { mark: m, line };
            }
        }
        return null;
    };

    const play = (index) => {
        if (!started || over) return { ok: false, reason: "not-playable", state: getState() };

        const mark = getCurrentPlayer().getMark();
        const placed = Gameboard.setMark(index, mark);
        if (!placed) return { ok: false, reason: "taken-or-invalid", state: getState() };

        const win = computeWinner();
        if (win) {
            over = true;
            winningLine = win.line;
            winner = players.find((p) => p.getMark() === win.mark) ?? null;
            return { ok: true, state: getState() };
        }

        if (isTie()) {
            over = true;
            return { ok: true, state: getState() };
        }

        current = current === 0 ? 1 : 0;
        return { ok: true, state: getState() };
    };

    const getState = () => ({
        started,
        over,
        board: Gameboard.getBoard(),
        currentPlayer: getCurrentPlayer(),
        players,
        winner,
        winningLine,
        tie: over && winner === null && isTie(),
    });

    return { start, restart, play, getState };
})();

// DOM / display controller singleton module
const DisplayController = (() => {
    const boardEl = document.getElementById("board");
    const statusTextEl = document.getElementById("status-text");
    const setupForm = document.getElementById("setup-form");
    const restartBtn = document.getElementById("restart-btn");
    const playerOneInput = document.getElementById("player-one");
    const playerTwoInput = document.getElementById("player-two");

    const renderBoard = (state) => {
        boardEl.innerHTML = "";

        state.board.forEach((cell, index) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "cell";
            btn.setAttribute("role", "gridcell");
            btn.setAttribute("aria-label", `Square ${index + 1}`);
            btn.dataset.index = String(index);

            if (cell) {
                btn.textContent = cell;
                btn.dataset.mark = cell;
                btn.classList.add("cell--blocked");
            } else if (!state.started || state.over) {
                btn.classList.add("cell--blocked");
            }

            if (state.over && Array.isArray(state.winningLine) && state.winningLine.includes(index)) {
                btn.classList.add("cell--win");
            }

            btn.disabled = !state.started || state.over || Boolean(cell);
            boardEl.appendChild(btn);
        });
    };

    const setStatus = (state) => {
        if (!state.started) {
            statusTextEl.textContent = "Enter names and start a game.";
            return;
        }

        if (state.over) {
            if (state.winner) {
                statusTextEl.textContent = `${state.winner.getName()} wins!`;
                return;
            }
            if (state.tie) {
                statusTextEl.textContent = "It’s a tie.";
                return;
            }
            statusTextEl.textContent = "Game over.";
            return;
        }

        statusTextEl.textContent = `${state.currentPlayer.getName()}’s turn (${state.currentPlayer.getMark()}).`;
    };

    const syncNameInputs = (state) => {
        if (!state.started) return;
        playerOneInput.value = state.players[0].getName();
        playerTwoInput.value = state.players[1].getName();
    };

    const update = (state) => {
        renderBoard(state);
        setStatus(state);
        restartBtn.disabled = !state.started;
    };

    const handleStart = (event) => {
        event.preventDefault();
        const p1 = playerOneInput.value;
        const p2 = playerTwoInput.value;
        const state = Game.start(p1, p2);
        syncNameInputs(state);
        update(state);
    };

    const handleRestart = () => {
        const state = Game.restart();
        syncNameInputs(state);
        update(state);
    };

    const handleBoardClick = (event) => {
        const target = event.target;
        if (!(target instanceof HTMLButtonElement)) return;
        if (!target.classList.contains("cell")) return;
        const index = Number.parseInt(target.dataset.index ?? "", 10);
        const result = Game.play(index);
        update(result.state);
    };

    const init = () => {
        setupForm.addEventListener("submit", handleStart);
        restartBtn.addEventListener("click", handleRestart);
        boardEl.addEventListener("click", handleBoardClick);

        update(Game.getState());
    };

    return { init };
})();

DisplayController.init();