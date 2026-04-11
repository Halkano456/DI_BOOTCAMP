const usernames = [];

gameInfo.forEach((user) => {
    usernames.push(`${user.username}!`);
});

console.log(usernames); 
// Output: ["john!", "becky!", "susy!", "tyson!"]

const winners = [];

gameInfo.forEach((user) => {
    if (user.score > 5) {
        winners.push(user.username);
    }
});

console.log(winners); 
// Output: ["becky", "susy"]

const totalScore = gameInfo.reduce((accumulator, user) => {
    return accumulator + user.score;
}, 0); // 0 is the initial value of the accumulator

console.log(totalScore); 
// Output: 71

