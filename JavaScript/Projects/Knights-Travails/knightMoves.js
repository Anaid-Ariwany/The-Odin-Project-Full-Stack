const BOARD_SIZE = 8;

const KNIGHT_OFFSETS = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
];

const isOnBoard = ([x, y]) => x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;

const coordinateKey = ([x, y]) => `${x},${y}`;

const formatCoordinate = ([x, y]) => `[${x},${y}]`;

const getKnightMoves = (position) => {
    const [x, y] = position;
    const moves = [];

    for (const [offsetX, offsetY] of KNIGHT_OFFSETS) {
        const nextPosition = [x + offsetX, y + offsetY];

        if (isOnBoard(nextPosition)) {
            moves.push(nextPosition);
        }
    }

    return moves;
};

const knightMoves = (start, end) => {
    if (!isOnBoard(start) || !isOnBoard(end)) {
        throw new RangeError('Knight positions must be on the board');
    }

    const queue = [start];
    const visited = new Set([coordinateKey(start)]);
    const parentMap = new Map();

    while (queue.length > 0) {
        const currentPosition = queue.shift();

        if (coordinateKey(currentPosition) === coordinateKey(end)) {
            break;
        }

        for (const nextPosition of getKnightMoves(currentPosition)) {
            const nextKey = coordinateKey(nextPosition);

            if (!visited.has(nextKey)) {
                visited.add(nextKey);
                parentMap.set(nextKey, currentPosition);
                queue.push(nextPosition);
            }
        }
    }

    const path = [];
    let currentPathNode = end;

    while (currentPathNode !== undefined) {
        path.unshift(currentPathNode);
        currentPathNode = parentMap.get(coordinateKey(currentPathNode));
    }

    return path;
};

const printKnightMoves = (start, end) => {
    const path = knightMoves(start, end);
    const moveCount = Math.max(path.length - 1, 0);

    console.log(`You made it in ${moveCount} moves! Here's your path:`);

    for (const position of path) {
        console.log(`  ${formatCoordinate(position)}`);
    }

    return path;
};

module.exports = { knightMoves, printKnightMoves };