const message: string = "Hello, World!";
console.log(message);

let age: number = 25;
let userName: string = "Alice";

console.log(`Name: ${userName}, Age: ${age}`);

function checkNumber(num: number): string {
    if (num > 0) {
        return "positive";
    } else if (num < 0) {
        return "negative";
    } else {
        return "zero";
    }
}

console.log(checkNumber(10)); // Output: positive

function getDetails(name: string, age: number): [string, number, string] {
    const greeting = `Hello, ${name}! You are ${age} years old.`;
    return [name, age, greeting];
}

const details = getDetails("Alice", 25);
console.log(details);

// Define the shape (could also use an 'interface')
type Person = {
    name: string;
    age: number;
};

function createPerson(name: string, age: number): Person {
    return {
        name: name,
        age: age
    };
}

const newPerson = createPerson("Bob", 30);
console.log(newPerson);

// We use 'as' to tell TS we are sure this is an HTMLInputElement
const inputElement = document.getElementById("user-input") as HTMLInputElement;

if (inputElement) {
    inputElement.value = "TypeScript is awesome!";
}

function getAction(role: string): string {
    switch (role) {
        case "admin":
            return "Manage users and settings";
        case "editor":
            return "Edit content";
        case "viewer":
            return "View content";
        case "guest":
            return "Limited access";
        default:
            return "Invalid role";
    }
}

console.log(getAction("admin"));

// Overload signatures
function greet(): string;
function greet(name: string): string;

// Implementation
function greet(name: string = "Guest"): string {
    return `Hello, ${name}!`;
}

console.log(greet());        // Output: Hello, Guest!
console.log(greet("John"));  // Output: Hello, John!

