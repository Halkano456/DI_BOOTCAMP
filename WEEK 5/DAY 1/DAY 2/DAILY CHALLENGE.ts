function validateUnionType(value: any, allowedTypes: string[]): boolean {
  // Get the runtime type of the value
  const valueType = typeof value;

  // Check if the current type exists within the array of allowed types
  return allowedTypes.includes(valueType);
}

// Define our allowed types for a "Flexible ID" (could be a number or string)
const idTypes = ["string", "number"];

// Define our allowed types for a "Status" (must be a boolean)
const statusTypes = ["boolean"];

// Test Cases
const userId = 101;
const username = "pro_coder_99";
const isActive = true;
const metadata = { date: "2026-04-15" };

console.log(`Is userId valid? ${validateUnionType(userId, idTypes)}`);       // true (number)
console.log(`Is username valid? ${validateUnionType(username, idTypes)}`);   // true (string)
console.log(`Is isActive valid? ${validateUnionType(isActive, statusTypes)}`); // true (boolean)
console.log(`Is metadata valid? ${validateUnionType(metadata, idTypes)}`);   // false (object)