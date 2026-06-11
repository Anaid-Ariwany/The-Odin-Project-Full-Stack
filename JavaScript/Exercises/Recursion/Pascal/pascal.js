const pascal = function (n) {
    if (n === 1) {
        return [1];
    }
    const prevRow = pascal(n - 1);
    const newRow = [1];
    for (let i = 1; i < prevRow.length; i++) {
        newRow.push(prevRow[i] + prevRow[i - 1]);
    }
    newRow.push(1);
    return newRow;
};

// Do not edit below this line
module.exports = pascal;