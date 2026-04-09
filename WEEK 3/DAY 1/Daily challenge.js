// 1. Create the sentence variable
const sentence = "The movie is not that bad, I like it";

// 2. Find the position of "not"
const wordNot = sentence.indexOf("not");

// 3. Find the position of "bad"
const wordBad = sentence.indexOf("bad");

/* 4. Logic: 
  - Check if "not" exists (not -1)
  - Check if "bad" exists (not -1)
  - Check if "bad" comes after "not"
*/

if (wordNot !== -1 && wordBad !== -1 && wordBad > wordNot) {
    // We slice from the start of the sentence to where "not" begins,
    // add "good", and then add everything after where "bad" ends (bad + 3).
    const firstPart = sentence.slice(0, wordNot);
    const lastPart = sentence.slice(wordBad + 3);
    console.log(`${firstPart}good${lastPart}`);
} else {
    // If conditions aren't met, log original
    console.log(sentence);
}