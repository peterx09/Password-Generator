// List the variable criteria
var specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var lowerCasedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var upperCasedCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


// function to gather user options

function getPasswordOptions() {

  // get password length

  var length = parseInt(prompt("How many characters do you want in your passsword?"));

  // check to see if what they entered was a number

  if (Number.isNaN(length)) {
    alert("Password length must be provided as a number.");
    return null; // exit the function 
  }

  // check if it's at least 8 chars long

  if (length < 8) { // setting the minimum to 8
    alert("Password length must be at least 8 characters.");
    return null; 
  }

  // less than 128 chars

  if (length > 128) { // setting the max to be 128
    alert("Password length must be less than 128 characters.");
    return null;
  }

  // ask the user for their options 

  var hasSpecialCharacters = confirm("Click OK to confirfm including special characters.");

  var hasNumericCharacters = confirm("Click OK to confirfm including number.");

  var hasLowerCaseCharacters = confirm("Click OK to confirfm including Lowercase characters.");

  var hasUpperCaseCharacters = confirm("Click OK to confirfm including Uppercase characters.");



  // ensure they use 1 option

  if (
    hasSpecialCharacters === false && hasNumericCharacters === false && hasLowerCaseCharacters === false && hasUpperCaseCharacters === false
  ) {
    alert("Please choose something!");
    return null;
  }

  // store the user selection in an object + return it 

  var passwordOptions = {
    length: length,
    hasSpecialCharacters: hasSpecialCharacters,
    hasNumericCharacters: hasNumericCharacters,
    hasLowerCaseCharacters: hasLowerCaseCharacters,
    hasUpperCaseCharacters: hasUpperCaseCharacters
  };

  return passwordOptions;
}


// function for getting a random element from an array

function getRandom(arr) {
  var randIndex = Math.floor(Math.random() * arr.length);
  var randElement = arr[randIndex];

  return randElement;
}


// function to generate the password  with above inputs 
function generatePassword() {

  // grab the user options

  var options = getPasswordOptions();

  // array to store the result

  var result = [];

  // array to store possible characters

  var possibleCharacters = [];

  // array to store guaranteed characters

  var guranteedCharacters = [];

  // check if options exist

  if (!options) return null;

  // add selected char to an arrany of possible characters

  if (options.hasSpecialCharacters) {
    possibleCharacters = possibleCharacters.concat(specialCharacters);
    guranteedCharacters.push(getRandom(specialCharacters));
  }

  if (options.hasNumericCharacters) {
    possibleCharacters = possibleCharacters.concat(numericCharacters);
    guranteedCharacters.push(getRandom(numericCharacters));
  }


  if (options.hasLowerCaseCharacters) {
    possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
    guranteedCharacters.push(getRandom(lowerCasedCharacters));
  }

  if (options.hasUpperCaseCharacters) {
    possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
    guranteedCharacters.push(getRandom(upperCasedCharacters));
  }

  // loop over the password length, selecting random indices from the possible chars and adding theme to result array


  for (var i = 0; i < options.length; i++) {
    var possibleCharacter = getRandom(possibleCharacters);
      result.push(possibleCharacter);
  }

  // mix in at least one of the guaranteed chars in the result

  for (var i = 0; i < guranteedCharacters.length; i++) {
    result[i] = guranteedCharacters[i];
  }

  // transform the result into a string and pass into writePassword 

  return result.join('');

}


// Assignment Code

var generateBtn = document.querySelector("#generate");



// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);