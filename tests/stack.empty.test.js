const stack = require('../src/stack.js');

describe('Ett stack test: hanterar tomma pops', () => {
    test('poppar från tom stacks borde returnera undefined', () => {
        expect(stack.pop()).toBeUndefined();
    });
});