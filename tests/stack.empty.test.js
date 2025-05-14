const stack = require('../src/stack');

describe('A Custom stack test: handles empty pop', () => {
    test('popping from empty stack should return undefined', () => {
        expect(stack.pop()).toBeUndefined();
    });
});