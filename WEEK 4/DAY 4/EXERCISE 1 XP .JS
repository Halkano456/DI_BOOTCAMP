function compareToTen(num) {
    return new Promise((resolve, reject) => {
        if (num <= 10) {
            resolve(`${num} is less than or equal to 10. Success!`);
        } else {
            reject(`${num} is greater than 10. Error!`);
        }
    });
}

// Test 1: Should reject
compareToTen(15)
  .then(result => console.log(result))
  .catch(error => console.log(error)); // Output: 15 is greater than 10. Error!

// Test 2: Should resolve
compareToTen(8)
  .then(result => console.log(result))
  .catch(error => console.log(error)); // Output: 8 is less than or equal to 10. Success!

  const delayedPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve("success");
    }, 4000); // 4000 milliseconds = 4 seconds
});

delayedPromise.then(result => console.log(result));

// 1. A promise that resolves immediately with the value 3
const resolvedPromise = Promise.resolve(3);

resolvedPromise.then(value => console.log("Resolved value:", value));


// 2. A promise that rejects immediately with "Boo!"
const rejectedPromise = Promise.reject("Boo!");

rejectedPromise.catch(error => console.log("Rejected value:", error));

