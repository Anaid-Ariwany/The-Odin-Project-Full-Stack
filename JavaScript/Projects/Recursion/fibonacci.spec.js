const { fibs, fibsRec } = require('./fibonacci');

describe('fibs (iterative)', () => {
    test('returns an empty array for 0', () => {
        expect(fibs(0)).toEqual([]);
    });

    test('returns [0] for 1', () => {
        expect(fibs(1)).toEqual([0]);
    });

    test('returns first 8 fibonacci numbers for input 8', () => {
        expect(fibs(8)).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
    });

    test('throws for negative numbers', () => {
        expect(() => fibs(-1)).toThrow('count must be a non-negative integer');
    });

    test('throws for non-integers', () => {
        expect(() => fibs(2.5)).toThrow('count must be a non-negative integer');
    });

    test('throws for non-number input', () => {
        expect(() => fibs('8')).toThrow('count must be a non-negative integer');
    });
});

describe('fibsRec (recursive)', () => {
    test('returns an empty array for 0', () => {
        expect(fibsRec(0)).toEqual([]);
    });

    test('returns [0] for 1', () => {
        expect(fibsRec(1)).toEqual([0]);
    });

    test('returns [0, 1] for 2', () => {
        expect(fibsRec(2)).toEqual([0, 1]);
    });

    test('returns first 8 fibonacci numbers for input 8', () => {
        expect(fibsRec(8)).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
    });

    test('throws for negative numbers', () => {
        expect(() => fibsRec(-1)).toThrow('count must be a non-negative integer');
    });

    test('throws for non-integers', () => {
        expect(() => fibsRec(2.5)).toThrow('count must be a non-negative integer');
    });

    test('throws for non-number input', () => {
        expect(() => fibsRec(null)).toThrow('count must be a non-negative integer');
    });
});

describe('fibs and fibsRec consistency', () => {
    test('both implementations return the same sequence for sample lengths', () => {
        [0, 1, 2, 5, 8, 10].forEach((n) => {
            expect(fibsRec(n)).toEqual(fibs(n));
        });
    });
});
