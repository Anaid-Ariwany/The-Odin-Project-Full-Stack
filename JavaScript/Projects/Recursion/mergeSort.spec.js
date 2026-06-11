const { mergeSort } = require('./mergeSort');

describe('mergeSort', () => {
    test('returns empty array for empty input', () => {
        expect(mergeSort([])).toEqual([]);
    });

    test('returns same single-item array', () => {
        expect(mergeSort([73])).toEqual([73]);
    });

    test('returns sorted array when input is already sorted', () => {
        expect(mergeSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test('sorts unsorted array (README example)', () => {
        expect(mergeSort([3, 2, 1, 13, 8, 5, 0, 1])).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
    });

    test('sorts another unsorted array (README example)', () => {
        expect(mergeSort([105, 79, 100, 110])).toEqual([79, 100, 105, 110]);
    });

    test('sorts with negative numbers and duplicates', () => {
        expect(mergeSort([4, -2, 7, 4, 0, -2])).toEqual([-2, -2, 0, 4, 4, 7]);
    });

    test('does not mutate original array', () => {
        const original = [5, 3, 1, 4, 2];
        const copy = [...original];

        const sorted = mergeSort(original);

        expect(original).toEqual(copy);
        expect(sorted).toEqual([1, 2, 3, 4, 5]);
    });

    test('throws for non-array input', () => {
        expect(() => mergeSort('not-an-array')).toThrow('mergeSort expects an array');
    });
});
