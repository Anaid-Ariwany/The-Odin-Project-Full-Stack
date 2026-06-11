const factorial = function (n) {
    // Base case: if n is 0, return 1
    // Recursive case: if n is greater than 0, return n multiplied by the factorial of n - 1
    // If n is negative or not an integer, return undefined
    if (n === 0) {
        return 1;
    } else if (n > 0 && Number.isInteger(n)) {
        return n * factorial(n - 1);
    } else {
        return undefined;
    }
};

// Do not edit below this line
module.exports = factorial;