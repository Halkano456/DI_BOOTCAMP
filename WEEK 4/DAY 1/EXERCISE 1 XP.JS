const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];

// 1. Display colors with their choice number
colors.forEach((color, index) => {
    console.log(`${index + 1}# choice is ${color}.`);
});

// 2. Check for "Violet"
const hasViolet = colors.includes("Violet");
console.log(hasViolet ? "Yeah" : "No...");

const ordinal = ["th", "st", "nd", "rd"];

colors.forEach((color, index) => {
    const num = index + 1;
    // Use the ordinal array for 1, 2, 3; otherwise default to "th"
    const suffix = (num <= 3) ? ordinal[num] : ordinal[0];
    console.log(`${num}${suffix} choice is ${color}.`);
});

const users = [
    { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
    { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
    { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
    { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
    { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
    { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
    { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}
];

// 1. Welcome Messages
const welcomeStudents = users.map(user => `Hello ${user.firstName}`);
console.log(welcomeStudents);

// 2. Filter Full Stack Residents
const fullStackResidents = users.filter(user => user.role === 'Full Stack Resident');
console.log(fullStackResidents);

// 3. Bonus: Chaining filter and map
const lastNames = users
    .filter(user => user.role === 'Full Stack Resident')
    .map(user => user.lastName);
console.log(lastNames);

const epic = ['a', 'long', 'time', 'ago', 'in a', 'galaxy', 'far far', 'away'];

const sentence = epic.reduce((accumulator, currentValue) => {
    return `${accumulator} ${currentValue}`;
});

console.log(sentence); 
// Output: "a long time ago in a galaxy far far away"

const students = [
    {name: "Ray", course: "Computer Science", isPassed: true}, 
    {name: "Liam", course: "Computer Science", isPassed: false}, 
    {name: "Jenner", course: "Information Technology", isPassed: true}, 
    {name: "Marco", course: "Robotics", isPassed: true}, 
    {name: "Kimberly", course: "Artificial Intelligence", isPassed: false}, 
    {name: "Jamie", course: "Big Data", isPassed: false}
];

// 1. Filter students who passed
const passedStudents = students.filter(student => student.isPassed);
console.log(passedStudents);

// 2. Bonus: Chaining filter and forEach
students
    .filter(student => student.isPassed)
    .forEach(student => {
        console.log(`Good job ${student.name}, you passed the course in ${student.course}`);
    });