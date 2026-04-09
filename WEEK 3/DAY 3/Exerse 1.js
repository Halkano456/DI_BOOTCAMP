// 1. Retrieve the h1
const h1 = document.querySelector('h1');
console.log(h1);

// 2. Remove the last paragraph
const article = document.querySelector('article');
article.lastElementChild.remove();

// 3. Click h2 to turn background red
const h2 = document.querySelector('h2');
h2.addEventListener('click', () => {
    h2.style.backgroundColor = 'red';
});

// 4. Click h3 to hide it
const h3 = document.querySelector('h3');
h3.addEventListener('click', () => {
    h3.style.display = 'none';
});

// 5. Button to make paragraphs bold
const boldBtn = document.createElement('button');
boldBtn.textContent = "Make Bold";
document.body.appendChild(boldBtn);

boldBtn.addEventListener('click', () => {
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => p.style.fontWeight = 'bold');
});

// BONUS: Random font size on h1 hover
h1.addEventListener('mouseover', () => {
    const randomSize = Math.floor(Math.random() * 101);
    h1.style.fontSize = `${randomSize}px`;
});

// BONUS: Fade out 2nd paragraph (Using CSS Transition)
const secondP = document.querySelectorAll('p')[1];
secondP.style.transition = "opacity 1s";
secondP.addEventListener('mouseover', () => {
    secondP.style.opacity = '0';
});

// 1. Retrieve form
const form = document.querySelector('form');
console.log(form);

// 2. Retrieve by ID
const fnameInput = document.getElementById('fname');
const lnameInput = document.getElementById('lname');
console.log(fnameInput, lnameInput);

// 3. Retrieve by Name
const fnameByName = document.getElementsByName('firstname')[0];
const lnameByName = document.getElementsByName('lastname')[0];
console.log(fnameByName, lnameByName);

// 4. Submit Event
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const val1 = fnameInput.value.trim();
    const val2 = lnameInput.value.trim();

    if (val1 !== "" && val2 !== "") {
        const ul = document.querySelector('.usersAnswer');
        ul.innerHTML = `<li>${val1}</li><li>${val2}</li>`;
    }
});

let allBoldItems;

function getBoldItems() {
    allBoldItems = document.querySelectorAll('strong');
}

function highlight() {
    getBoldItems(); // Ensure items are collected
    allBoldItems.forEach(item => item.style.color = 'blue');
}

function returnItemsToDefault() {
    allBoldItems.forEach(item => item.style.color = 'black');
}

const paragraph = document.querySelector('p');
paragraph.addEventListener('mouseover', highlight);
paragraph.addEventListener('mouseout', returnItemsToDefault);

const sphereForm = document.getElementById('MyForm');

sphereForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const radius = parseFloat(document.getElementById('radius').value);
    const volumeField = document.getElementById('volume');

    if (!isNaN(radius)) {
        // Calculation: (4/3) * PI * r^3
        const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
        volumeField.value = volume.toFixed(2); // Round to 2 decimal places
    } else {
        alert("Please enter a valid number for the radius.");
    }
});

