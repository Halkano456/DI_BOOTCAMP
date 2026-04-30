const greet = require('./greeting');

const message = greet('Developer');
console.log(message);

const chalk = require('chalk');

const displayColorfulMessage = () => {
    console.log(chalk.blue.bold('This is a blue bold message!') + ' ' + chalk.red('And some red text.'));
};

module.exports = displayColorfulMessage;
const displayColorfulMessage = require('./colorful-message');

displayColorfulMessage();

const fs = require('fs');
const path = require('path');

const readFileContent = () => {
    const filePath = path.join(__current_dir, 'files', 'file-data.txt');
    // Using synchronous read for simplicity in this challenge
    const data = fs.readFileSync('./files/file-data.txt', 'utf8');
    console.log('File Content:', data);
};

module.exports = readFileContent;
const greet = require('./greeting');
const displayColorfulMessage = require('./colorful-message');
const readFileContent = require('./read-file');

// 1. Greet the user
const welcome = greet('Student');
console.log(welcome);

// 2. Show the colorful message
displayColorfulMessage();

// 3. Read and display the file content
readFileContent();
