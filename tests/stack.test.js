const stack = require('../src/stack.js');

beforeEach(() => {
    // Detta kommer manuellt rensa alla stackar som inte är Undefined
    while (stack.pop() !== undefined) { }
});

describe('vad stacken ska göra när det är tomma', () => {
    test('peek on empty stack returns undefined', () => {
        expect(stack.peek()).toBeUndefined();
    });

    test('poppar från tom stacks borde returnera undefined', () => {
        expect(stack.pop()).toBeUndefined();
    });
});

describe('vad stacken ska göra med elementen', () => {
    test('peek on stack with one element returns that element', () => {
        stack.push(1);
        expect(stack.peek()).toBeDefined();
        expect(stack.peek()).toBe(1);
    });

    test('peek on stack with two or more elements returns the top element', () => {
        stack.push(1);
        stack.push("wow");
        stack.push(42);
        expect(stack.peek()).toBeDefined();
        expect(stack.peek()).toBe(42);
    });
});