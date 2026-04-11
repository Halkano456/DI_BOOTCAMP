const makeAllCaps = (words) => {
  return new Promise((resolve, reject) => {
    // Check if every element is a string
    const allStrings = words.every((word) => typeof word === "string");

    if (allStrings) {
      resolve(words.map((word) => word.toUpperCase()));
    } else {
      reject("Error: Not all items in the array are strings!");
    }
  });
};

const sortWords = (uppercasedWords) => {
  return new Promise((resolve, reject) => {
    if (uppercasedWords.length > 4) {
      // .sort() modifies the original array; returning a copy is best practice
      resolve([...uppercasedWords].sort());
    } else {
      reject("Error: Array length is too short (must be > 4)!");
    }
  });
};

// --- Tests ---

// Test 1: Should fail (contains a number)
makeAllCaps([1, "pear", "banana"])
  .then(arr => sortWords(arr))
  .then(result => console.log(result))
  .catch(error => console.log(error));

// Test 2: Should fail (length is only 3)
makeAllCaps(["apple", "pear", "banana"])
  .then(arr => sortWords(arr))
  .then(result => console.log(result))
  .catch(error => console.log(error));

// Test 3: Should succeed
makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
  .then(arr => sortWords(arr))
  .then(result => console.log(result))
  .catch(error => console.log(error));

  const morse = `{ "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.", "a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".", "f": "..-.", "g": "--.", "h": "....", "i": "..", "j": ".---", "k": "-.-", "l": ".-..", "m": "--", "n": "-.", "o": "---", "p": ".--.", "q": "--.-", "r": ".-.", "s": "...", "t": "-", "u": "..-", "v": "...-", "w": ".--", "x": "-..-", "y": "-.--", "z": "--..", ".": ".-.-.-", ",": "--..--", "?": "..--..", "!": "-.-.--", "-": "-....-", "/": "-..-.", "@": ".--.-.", "(": "-.--.", ")": "-.--.-" }`;

// 1. Convert JSON string to JS Object
const toJs = () => {
  return new Promise((resolve, reject) => {
    const morseObj = JSON.parse(morse);
    if (Object.keys(morseObj).length === 0) {
      reject("Error: The Morse object is empty.");
    } else {
      resolve(morseObj);
    }
  });
};

// 2. Convert User Input to Morse Array
const toMorse = (morseJS) => {
  return new Promise((resolve, reject) => {
    const userInput = prompt("Enter a word or sentence:").toLowerCase();
    const translation = [];

    // Remove spaces for simplicity or handle them if needed
    for (const char of userInput) {
        if (char === " ") continue; 
        if (morseJS[char]) {
            translation.push(morseJS[char]);
        } else {
            reject(`Error: Character "${char}" does not exist in Morse code.`);
            return; // Stop the loop
        }
    }
    resolve(translation);
  });
};

// 3. Join and Display on DOM
const joinWords = (morseTranslation) => {
    const container = document.body;
    const p = document.createElement("p");
    // Join with line breaks as requested
    p.innerHTML = morseTranslation.join("<br>");
    container.appendChild(p);
};

// --- Execution (The Chain) ---
toJs()
  .then(morseJS => toMorse(morseJS))
  .then(translation => joinWords(translation))
  .catch(error => console.error(error));

  