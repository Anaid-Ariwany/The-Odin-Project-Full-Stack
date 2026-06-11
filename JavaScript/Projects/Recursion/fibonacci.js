function fibs(count) {
    if (!Number.isInteger(count) || count < 0) {
        throw new Error('count must be a non-negative integer');
    }

    if (count === 0) return [];
    if (count === 1) return [0];

    const sequence = [0, 1];

    for (let i = 2; i < count; i += 1) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }

    return sequence;
}

function fibsRec(count) {
    if (!Number.isInteger(count) || count < 0) {
        throw new Error('count must be a non-negative integer');
    }

    if (count === 0) return [];
    if (count === 1) return [0];
    if (count === 2) return [0, 1];

    const previous = fibsRec(count - 1);
    const nextValue = previous[previous.length - 1] + previous[previous.length - 2];

    return [...previous, nextValue];
}

if (require.main === module) {
    const sampleLengths = [0, 1, 2, 5, 8];

    console.log('Iterative Fibonacci:');
    sampleLengths.forEach((n) => {
        console.log(`fibs(${n}) =>`, fibs(n));
    });

    console.log('\nRecursive Fibonacci:');
    sampleLengths.forEach((n) => {
        console.log(`fibsRec(${n}) =>`, fibsRec(n));
    });

    console.log('\nRecursive trace demo (8 calls expected around this amount):');
    function fibsRecWithTrace(n) {
        console.log('This was printed recursively');
        if (n <= 0) return [];
        if (n === 1) return [0];
        if (n === 2) return [0, 1];

        const prev = fibsRecWithTrace(n - 1);
        return [...prev, prev[prev.length - 1] + prev[prev.length - 2]];
    }

    console.log('fibsRecWithTrace(8) =>', fibsRecWithTrace(8));
}

module.exports = { fibs, fibsRec };
