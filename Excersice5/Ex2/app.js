// Import the user module
const userModule = require('./userModule');

// Get the name and location from the module
const name = userModule.getName();
const location = userModule.getLocation();
const birthday = userModule.birthday;

// Print the information to the console
console.log(`${name} lives in ${location} and was born on ${birthday}.`);