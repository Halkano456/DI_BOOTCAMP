function displayStudentInfo(objUser) {
    const { first, last } = objUser;
    return `Your full name is ${first} ${last}`;
}

console.log(displayStudentInfo({first: 'Elie', last:'Schoppik'}));

const users = { user1: 18273, user2: 92833, user3: 90315 };

// 1. Convert object to array
const usersArray = Object.entries(users);
console.log(usersArray);

// 2. Modify ID by multiplying by 2
const modifiedUsers = usersArray.map(([user, id]) => [user, id * 2]);
console.log(modifiedUsers);

class Labrador extends Dog {
  constructor(name, size) {
    super(name); // Must call super() to initialize the parent class
    this.size = size;
  }
};

class Animal {
    constructor(name, type, color) {
        this.name = name;
        this.type = type;
        this.color = color;
    }
}

class Mammal extends Animal {
    sound(noise) {
        return `${noise} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;
    }
}

const farmerCow = new Mammal("Lily", "cow", "brown and white");
console.log(farmerCow.sound("Moooo"));

