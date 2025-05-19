import * as stack from './stack.js';

window.onload = function () {
    console.log("done");

    var pop = document.getElementById('pop');
    var push = document.getElementById('push');
    var peek = document.getElementById('peek');
    var display = document.getElementById('top_of_stack');

    pop.addEventListener("click", function () {
        var textRemoved = stack.pop();
        alert("Tog bort " + textRemoved);
        display.innerHTML = stack.peek() ?? "n/a";
    });

    push.addEventListener("click", function () {
        var x = prompt("Vad ska vi lägga på stacken?");
        stack.push(x);
        display.innerHTML = x;
    });

    peek.addEventListener("click", function () {
        display.innerHTML = stack.peek();
    });
};