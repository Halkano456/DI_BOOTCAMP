let client = "John";

const groceries = {
    fruits : ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice : "20$",
    other : {
        paid : true,
        meansOfPayment : ["cash", "creditCard"]
    }
}

// 1. Display Groceries
const displayGroceries = () => {
    groceries.fruits.forEach(fruit => console.log(fruit));
};

// 2. Clone Groceries and Analysis
const cloneGroceries = () => {
    // --- Part 1: Primitives (Pass by Value) ---
    let user = client; 
    client = "Betty";
    // Question: Will we see "Betty" in the user variable?
    // Answer: No. Strings are primitives. When you assign 'user = client', 
    // JS copies the value. They are now independent.

    // --- Part 2: Objects (Pass by Reference) ---
    let shopping = groceries;
    
    // Changing totalPrice
    groceries.totalPrice = "35$";
    // Question: Will we see this in the shopping object?
    // Answer: Yes. Objects are stored by reference. 'shopping' and 'groceries' 
    // point to the same memory address. Changing one changes both.

    // Changing paid status
    groceries.other.paid = false;
    // Question: Will we see this in the shopping object?
    // Answer: Yes. For the same reason as above. Even nested objects 
    // are part of the same reference chain.

    console.log("Client:", client);
    console.log("User:", user);
    console.log("Shopping Total Price:", shopping.totalPrice);
    console.log("Shopping Paid Status:", shopping.other.paid);
};

// Invoke the functions
displayGroceries();
cloneGroceries();