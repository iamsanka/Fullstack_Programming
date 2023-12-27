// Function to get the name
function getName() {
    return "Sanka De Silva";
}
  
// Function to get the location
function getLocation() {
return "Espoo";
}

// Constant for the birthday
const birthday = "04.05.1992";

// Export the functions and constants to make them accessible outside the module
module.exports = {
getName,
getLocation,
birthday,
};