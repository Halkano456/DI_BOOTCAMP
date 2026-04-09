const people = ["Greg", "Mary", "Devon", "James"];

// 1. Remove "Greg"
people.shift(); 

// 2. Replace "James" with "Jason"
people[people.indexOf("James")] = "Jason";

// 3. Add your name to the end
people.push("Gemini");

// 4. Console.log Mary's index
console.log(people.indexOf("Mary"));

// 5. Slice the array (Excluding "Mary" and "Gemini")
// Current state: ["Mary", "Devon", "Jason", "Gemini"]
const slicedPeople = people.slice(1, 3); 

// 6. Index of "Foo"
console.log(people.indexOf("Foo")); 
// It returns -1 because "Foo" does not exist in the array.

// 7. Last element variable
const last = people[people.length - 1];

const colors = ["blue", "green", "purple", "black", "silver"];
const suffixes = ["st", "nd", "rd", "th", "th"];

for (let i = 0; i < colors.length; i++) {
    console.log(`My ${i + 1}${suffixes[i]} choice is ${colors[i]}`);
}

let number;

do {
    number = prompt("Please enter a number:");
    number = Number(number); // Convert string to number
} while (isNaN(number) || number < 10);

// Note: A 'do...while' loop is best here because it runs at least once.

const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent:  {
        sarah: [3, 990],
        dan:  [4, 1000],
        david: [1, 500],
    },
}

// 2. Number of floors
console.log(building.numberOfFloors);

// 3. Apartments on floor 1 and 3
console.log(building.numberOfAptByFloor.firstFloor + building.numberOfAptByFloor.thirdFloor);

// 4. Second tenant name and room count
const secondTenant = building.nameOfTenants[1]; // Dan
console.log(`${secondTenant} has ${building.numberOfRoomsAndRent.dan[0]} rooms.`);

// 5. Rent check
const sarahRent = building.numberOfRoomsAndRent.sarah[1];
const davidRent = building.numberOfRoomsAndRent.david[1];
const danRent = building.numberOfRoomsAndRent.dan[1];

if (sarahRent + davidRent > danRent) {
    building.numberOfRoomsAndRent.dan[1] = 1200;
}

const family = {
    surname: "Smith",
    members: 4,
    city: "London"
};

// Keys
for (let key in family) {
    console.log(key);
}

// Values
for (let key in family) {
    console.log(family[key]);
}

const details = {
  my: 'name',
  is: 'Rudolf',
  the: 'reindeer'
}

let sentence = "";
for (let key in details) {
    sentence += `${key} ${details[key]} `;
}
console.log(sentence.trim());

const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

// Get first letter, sort them, then join into a string
const secretName = names
    .map(name => name[0])
    .sort()
    .join("");

console.log(secretName); // "ABJKPS"

