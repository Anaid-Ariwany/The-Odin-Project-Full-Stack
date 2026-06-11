function merge(left, right) {
    const merged = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] <= right[rightIndex]) {
            merged.push(left[leftIndex]);
            leftIndex += 1;
        } else {
            merged.push(right[rightIndex]);
            rightIndex += 1;
        }
    }

    return merged
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));
}

function mergeSort(array) {
    if (!Array.isArray(array)) {
        throw new Error('mergeSort expects an array');
    }

    if (array.length <= 1) return [...array];

    const middle = Math.floor(array.length / 2);
    const leftHalf = mergeSort(array.slice(0, middle));
    const rightHalf = mergeSort(array.slice(middle));

    return merge(leftHalf, rightHalf);
}

if (require.main === module) {
    const examples = [
        [],
        [73],
        [1, 2, 3, 4, 5],
        [3, 2, 1, 13, 8, 5, 0, 1],
        [105, 79, 100, 110],
    ];

    examples.forEach((arr) => {
        console.log(`mergeSort([${arr.join(', ')}]) =>`, mergeSort(arr));
    });
}

module.exports = { mergeSort };
