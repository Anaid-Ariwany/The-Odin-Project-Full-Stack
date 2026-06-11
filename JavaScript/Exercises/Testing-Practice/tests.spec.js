const { capitalize, reverseString, calculator, caesarCipher, analyzeArray } = require('./tests.js');

//1. A capitalize function test that takes a string and returns it with the first character capitalized.
test('capitalize', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('world')).toBe('World');
    expect(capitalize('javaScript')).toBe('JavaScript');
});

//2. A reverseString function test that takes a string and returns it reversed.
test('reverseString', () => {
    expect(reverseString('hello')).toBe('olleh');
    expect(reverseString('world')).toBe('dlrow');
    expect(reverseString('javaScript')).toBe('tpircSavaj');
});

//3. A calculator object test that contains functions for the basic operations: add, subtract, divide, and multiply. Each of these functions should take two numbers and return the correct calculation.
test('calculator', () => {
    expect(calculator.add(2, 3)).toBe(5);
    expect(calculator.subtract(5, 2)).toBe(3);
    expect(calculator.multiply(4, 3)).toBe(12);
    expect(calculator.divide(10, 2)).toBe(5);
});

//4. A caesarCipher function test that takes a string and a shift factor and returns it with each character “shifted”. Read more about how a Caesar cipher works.
test('caesarCipher', () => {
    expect(caesarCipher('hello', 3)).toBe('khoor');
    expect(caesarCipher('world', 3)).toBe('zruog');
    expect(caesarCipher('javaScript', 3)).toBe('mdydVfulsw');
    expect(caesarCipher('xyz', 3)).toBe('abc');
    expect(caesarCipher('HeLLo', 3)).toBe('KhOOr');
    expect(caesarCipher('Hello, World!', 3)).toBe('Khoor, Zruog!');
});

//5. An analyzeArray function test that takes an array of numbers and returns an object with the following properties: average, min, max, and length.
test('analyzeArray', () => {
    expect(analyzeArray([1, 8, 3, 4, 2, 6])).toEqual({
        average: 4,
        min: 1,
        max: 8,
        length: 6
    });
    expect(analyzeArray([5, 10, 15])).toEqual({
        average: 10,
        min: 5,
        max: 15,
        length: 3
    });
    expect(analyzeArray([0, 0, 0])).toEqual({
        average: 0,
        min: 0,
        max: 0,
        length: 3
    });
});

