// Assignment code here


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");


// Generator Functions
// All the functions that are responsible to return a random value thatt we will use to create password.
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};
function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};
function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};
function getRandomSymbol() {
	const symbols = '~!@#$%^&*()_+{}":?><;.,';
	return symbols[Math.floor(Math.random() * symbols.length)];
};

// object containing result of all random functions
let randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol,
}

// function for series of prompts that determined characters to include
function promptSeries() {
  // prompt for character types to include
  let charTypes = ["Lower Case Letters", "Upper Case Letters", "Numbers", "Special Characters"]
  // capture selection
  let charSeletion = [];
  // loop through each prompt
  for(i =0; i < charTypes.length; i++){
    charSeletion.push(confirm(`Do you want to include ${charTypes[i]} in your password?`));
  };
  console.log(charSeletion);

  // accessing the results in vairables

  let hasLower = charSeletion[0]
  let hasUpper = charSeletion[1]
  let hasNumber = charSeletion[2]
  let hasSymbol = charSeletion[3]
  console.log(hasLower, hasUpper, hasNumber, hasSymbol)
  

  // validate a least one character type is selected
  console.log(charSeletion.some( x => x === true)) 

  if(charSeletion.some( x => x === true) != true){
    console.log("false");
    alert("Please choose at least one character type");
    promptSeries()
  } else {
    console.log("true");
  }
// TODOOO how do I access this outside of this function?? 
// https://codepen.io/dev_loop/pen/vYYxvbz?editors=0010
  return charSeletion

}



// function to generate the password
function generatePassword( lower, upper, number, symbol) {
  let generatedPassword = "";
  // series of prompts for password criteria
    // prompt for length of password between 8 - 128 characters
    let pLength = prompt("Please enter a character length between 8 and 128")
    // validate character is within range
    if (pLength > 7 &&  pLength < 128){
      console.log(pLength)
    } else {
      alert("Please enter a valid entry");
      generatePassword();
    } 
    let selectedChar = promptSeries();
    // password is generated from selection
    console.log(selectedChar);

    // function to check if selectedChar == true then add it to options 
    let typesArr = []
    if(selectedChar[0] === true){
      typesArr.push(randomFunc.lower); 
    }
    if(selectedChar[1] === true){
      typesArr.push(randomFunc.upper);
    }
    if(selectedChar[2] === true){
      typesArr.push(randomFunc.number);
    }
    if(selectedChar[3] === true){
      typesArr.push(randomFunc.symbol);
    }

    // something to use the typesArr to randomly generate a char and add all the results together
    let password = "";
  	for (let i = 0; i < pLength; i++) {
	  	let characterIndex = Math.floor(Math.random() * typesArr.length);
       password += typesArr[characterIndex]();
  	}
    console.log(password);

    return password;
}
  

// Write password to the #password input
function writePassword() {
  // pass in generatePassword
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
