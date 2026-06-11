//1. A capitalize function that takes a string and returns it with the first character capitalized.
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

//2. A reverseString function that takes a string and returns it reversed.
const reverseString = (str) => {
    return str.split('').reverse().join('');
};

//3. A calculator object that contains functions for the basic operations: add, subtract, divide, and multiply.
const calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b
};

//4. A caesarCipher function that takes a string and a shift factor and returns it with each character “shifted”.
const caesarCipher = (str, shift) => {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char >= 'a' && char <= 'z') {
            const code = char.charCodeAt(0) - 97;
            const shifted = (code + shift) % 26;
            result += String.fromCharCode(shifted + 97);
        } else if (char >= 'A' && char <= 'Z') {
            const code = char.charCodeAt(0) - 65;
            const shifted = (code + shift) % 26;
            result += String.fromCharCode(shifted + 65);
        } else {
            result += char;
        }
    }
    return result;
};

//5. An analyzeArray function that takes an array of numbers and returns an object with the following properties: average, min, max, and length.
const analyzeArray = (arr) => {
    const sum = arr.reduce((acc, val) => acc + val, 0);
    const average = sum / arr.length;
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    return { average, min, max, length: arr.length };
};

module.exports = { capitalize, reverseString, calculator, caesarCipher, analyzeArray };