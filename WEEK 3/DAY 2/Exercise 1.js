function displayNumbersDivisible(divisor = 23) {
    let sum = 0;
    let outcomes = [];

    for (let i = 0; i <= 500; i++) {
        if (i % divisor === 0) {
            outcomes.push(i);
            sum += i;
        }
    }

    console.log("Outcome:", outcomes.join(" "));
    console.log("Sum:", sum);
}

// Call the function
displayNumbersDivisible(); 
// Bonus calls:
// displayNumbersDivisible(3);
// displayNumbersDivisible(45);

const stock = { "banana": 6, "apple": 0, "pear": 12, "orange": 32, "blueberry": 1 };
const prices = { "banana": 4, "apple": 2, "pear": 1, "orange": 1.5, "blueberry": 10 };

const shoppingList = ["banana", "orange", "apple"];

function myBill() {
    let totalPrice = 0;

    for (const item of shoppingList) {
        if (item in stock && stock[item] > 0) {
            totalPrice += prices[item];
            stock[item]--; // Bonus: decrease stock
        }
    }
    return totalPrice;
}

console.log("Total Bill:", myBill());

function changeEnough(itemPrice, amountOfChange) {
    const quarters = amountOfChange[0] * 0.25;
    const dimes = amountOfChange[1] * 0.10;
    const nickels = amountOfChange[2] * 0.05;
    const pennies = amountOfChange[3] * 0.01;

    const totalWallet = quarters + dimes + nickels + pennies;

    return totalWallet >= itemPrice;
}

// Tests
console.log(changeEnough(4.25, [25, 20, 5, 0])); // true
console.log(changeEnough(14.11, [2, 100, 0, 0])); // false

function hotelCost() {
    let nights;
    while (isNaN(nights) || nights <= 0) {
        nights = prompt("How many nights would you like to stay?");
    }
    return nights * 140;
}

function planeRideCost() {
    let destination = "";
    while (destination === "" || !isNaN(destination)) {
        destination = prompt("Where are you going?");
    }
    destination = destination.toLowerCase();
    if (destination === "london") return 183;
    if (destination === "paris") return 220;
    return 300;
}

function rentalCarCost() {
    let days;
    while (isNaN(days) || days <= 0) {
        days = prompt("How many days for the car?");
    }
    let cost = days * 40;
    if (days > 10) cost *= 0.95; // 5% discount
    return cost;
}

function totalVacationCost() {
    const hotel = hotelCost();
    const plane = planeRideCost();
    const car = rentalCarCost();

    console.log(`The car cost: $${car}, the hotel cost: $${hotel}, the plane tickets cost: $${plane}.`);
    return hotel + plane + car;
}

totalVacationCost();

// Part 1: Basic Selections
const container = document.getElementById('container');
console.log(container);

const lists = document.querySelectorAll('.list');
lists[0].children[1].textContent = "Richard"; // Pete to Richard

lists[1].children[1].remove(); // Delete David (second li of second ul)

lists.forEach(list => {
    list.firstElementChild.textContent = "YourName"; // Loop change names
});

// Part 2: Classes
lists.forEach(list => list.classList.add('student_list'));
lists[0].classList.add('university', 'attendance');

// Part 3: Styling
container.style.backgroundColor = "lightblue";
container.style.padding = "10px";

// Hide Dan
const allLis = document.querySelectorAll('li');
allLis.forEach(li => {
    if (li.textContent === "Dan") li.style.display = "none";
    if (li.textContent === "Richard") li.style.border = "1px solid black";
});

document.body.style.fontSize = "18px";

// Bonus
if (container.style.backgroundColor === "lightblue") {
    alert(`Hello ${lists[0].firstElementChild.textContent} and ${lists[0].children[1].textContent}`);
}

const nav = document.getElementById('navBar');
nav.setAttribute('id', 'socialNetworkNavigation');

const ul = nav.querySelector('ul');
const newLi = document.createElement('li');
const logoutText = document.createTextNode('Logout');

newLi.appendChild(logoutText);
ul.appendChild(newLi);

console.log("First:", ul.firstElementChild.textContent);
console.log("Last:", ul.lastElementChild.textContent);

const allBooks = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        image: "https://example.com/hobbit.jpg",
        alreadyRead: true
    },
    {
        title: "1984",
        author: "George Orwell",
        image: "https://example.com/1984.jpg",
        alreadyRead: false
    }
];

const section = document.querySelector('.listBooks');

allBooks.forEach(book => {
    const div = document.createElement('div');
    const p = document.createElement('p');
    const img = document.createElement('img');

    p.textContent = `${book.title} written by ${book.author}`;
    img.src = book.image;
    img.style.width = "100px";

    if (book.alreadyRead) {
        p.style.color = "red";
    }

    div.appendChild(p);
    div.appendChild(img);
    section.appendChild(div);
});

