// #1
function funcOne() {
    let a = 5;
n        a = 3;
    }
    alert(`inside the funcOne function ${a}`);
}
// #1.1 Prediction: alert will show 3. 
// Why: 'a' is initialized as 5, but modified to 3 inside the 'if' block because 5 > 1.

// #1.2 Prediction: Error. 
// Why: If 'a' is a const, you cannot reassign it (a = 3 would throw a TypeError).

//#2
let aGlobal = 0;
function funcTwo() {
    aGlobal = 5;
}

function funcThree() {
    alert(`inside the funcThree function ${aGlobal}`);
}

// #2.1 Prediction: First alert: 0, Second alert: 5.
// Why: funcThree first alerts the global 'a' (0). funcTwo then changes the global 'a' to 5. 
// The next funcThree call alerts the updated value.

// #2.2 Prediction: Error.
// Why: Changing 'a' to 5 in funcTwo would fail because constants cannot be reassigned.

//#3
function funcFour() {
    window.a = "hello";
}

function funcFive() {
    alert(`inside the funcFive function ${a}`);
}

// #3.1 Prediction: alert will show "hello".
// Why: funcFour attaches 'a' to the window (global) object, making it accessible to funcFive.

//#4
let aLocalExample = 1;
function funcSix() {
    let a = "test";
    alert(`inside the funcSix function ${a}`);
}

// #4.1 Prediction: alert will show "test".
// Why: This is "shadowing." The local variable 'a' inside the function overrides the global 'a'.

// #4.2 Prediction: No change (still "test").
// Why: Both are declared in different scopes, so having 'const' doesn't prevent 
// creating a new variable with the same name in a sub-scope.

//#5
let aBlock = 2;
if (true) {
    let a = 5;
    alert(`in the if block ${a}`);
}
alert(`outside of the if block ${aBlock}`);

// #5.1 Prediction: First alert: 5, Second alert: 2.
// Why: 'let' is block-scoped. The 'a' inside the {} is a different variable than the one outside.

// #5.2 Prediction: No change.
// Why: 'const' is also block-scoped, so the behavior remains identical.

const winBattle = () => true;

let experiencePoints = winBattle() ? 10 : 1;

console.log(experiencePoints);
const isString = (value) => typeof value === 'string';

console.log(isString('hello')); // true
console.log(isString([1, 2, 4, 0])); // false


const sum = (a, b) => a + b;

// Function Declaration
function kgToGrams(kg) {
    return kg * 1000;
}
kgToGrams(2);

// Function Expression
const kgToGramsExp = function(kg) {
    return kg * 1000;
};
kgToGramsExp(2);

// Difference: Function declarations are hoisted (can be called before they are defined), 
// whereas function expressions are not.

// Arrow Function
const kgToGramsArrow = (kg) => kg * 1000;
kgToGramsArrow(2);

(function(children, partner, location, job) {
    const sentence = `You will be a ${job} in ${location}, and married to ${partner} with ${children} kids.`;
    document.body.innerHTML += `<p>${sentence}</p>`;
})(3, "Sarah", "Tokyo", "Full Stack Developer");

// HTML: <nav id="navbar"></nav>
(function(username) {
    const nav = document.getElementById('navbar');
    const welcomeDiv = document.createElement('div');
    
    welcomeDiv.innerHTML = `
        <span>Welcome, ${username}</span>
        <img src="https://via.placeholder.com/50" alt="Circular gray placeholder representing a user profile picture in the navigation bar" style="border-radius: 50%;">
    `;
    
    nav.appendChild(welcomeDiv);
})("John");

function makeJuice(size) {
    const ingredients = [];

    function addIngredients(ing1, ing2, ing3) {
        ingredients.push(ing1, ing2, ing3);
    }

    function displayJuice() {
        const sentence = `The client wants a ${size} juice, containing ${ingredients.join(", ")}.`;
        document.body.innerHTML += `<p>${sentence}</p>`;
    }

    addIngredients("apple", "ginger", "lemon");
    addIngredients("carrot", "beetroot", "kale");
    displayJuice();
}

makeJuice("large");

