class Employee {
    // Declaring properties with various modifiers
    private name: string;
    private salary: number;
    public position: string;
    protected department: string;

    constructor(name: string, salary: number, position: string, department: string) {
        this.name = name;
        this.salary = salary;
        this.position = position;
        this.department = department;
    }

    // Public method accessing private properties internally
    public getEmployeeInfo(): string {
        return `Employee: ${this.name}, Position: ${this.position}`;
    }
}

// Verification:
const emp = new Employee("Alice", 85000, "Software Engineer", "Engineering");
console.log(emp.getEmployeeInfo()); // Output: Employee: Alice, Position: Software Engineer

// console.log(emp.name); //  Error: Property 'name' is private and only accessible within class 'Employee'
class Product {
    public readonly id: number; // Immutable after initialization
    public name: string;
    public price: number;

    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public getProductInfo(): string {
        return `Product: ${this.name}, Price: $${this.price}`;
    }
}

// Verification:
const laptop = new Product(101, "MacBook Pro", 1999);
console.log(laptop.getProductInfo()); // Output: Product: MacBook Pro, Price: $1999

// Attempting to modify the readonly property:
// laptop.id = 102; // Cannot assign to 'id' because it is a read-only property.
class Animal {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    public makeSound(): string {
        return `${this.name} makes a generic sound.`;
    }
}

// Subclass inheriting from Animal
class Dog extends Animal {
    constructor(name: string) {
        super(name); // Pass the name parameter to the parent class constructor
    }

    // Overriding the parent's makeSound method
    public override makeSound(): string {
        return `${this.name} barks: Woof! Woof!`;
    }
}

// Verification:
const myDog = new Dog("Buddy");
console.log(myDog.makeSound()); // Output: Buddy barks: Woof! Woof!
class Calculator {
    // Static method for addition
    static add(a: number, b: number): number {
        return a + b;
    }

    // Static method for subtraction
    static subtract(a: number, b: number): number {
        return a - b;
    }
}

// Verification (Called directly on the class name, no 'new' keyword used):
const sum = Calculator.add(15, 5);
const difference = Calculator.subtract(15, 5);

console.log(`Sum: ${sum}`);          // Output: Sum: 20
console.log(`Difference: ${difference}`); // Output: Difference: 10

interface User {
    readonly id: number; // Cannot be modified after object creation
    name: string;
    email: string;
}

// Extending the User interface
interface PremiumUser extends User {
    membershipLevel?: string; // Optional property (can be string or undefined)
}

// Function that accepts a PremiumUser object
function printUserDetails(user: PremiumUser): void {
    console.log(`User ID: ${user.id}`);
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
    
    if (user.membershipLevel) {
        console.log(`Membership Level: ${user.membershipLevel}`);
    } else {
        console.log("Membership Level: Standard (None)");
    }
}

// Verification:
const vipUser: PremiumUser = {
    id: 99,
    name: "John Doe",
    email: "john@example.com",
    membershipLevel: "Gold" // Valid optional property
};

printUserDetails(vipUser);
// vipUser.id = 100; // 'id' because it is a read-only property.
