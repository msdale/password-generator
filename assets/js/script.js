// START - generate password
/** Generate a password.
 * Can generate a password with some choices.
 * In particular:
 *    Do you want to include lower case characters?
 *    Do you want to include upper case characters?
 *    How about numeric characters?
 *    And what about special characters?
 * This password generator will limit the character pool
 * depending on the choices you make.
 * There is one required restriction in the process...
 * The password length must be greater than 8 and less then
 * 128.  Within that rule, you still can choose the length.
 */
var generatePassword = function () {

  // START - password length
  var pwdLen = prompt("Enter desired length of the password...\n" +
    "    Must be 8 to 128 characters in length.");
  // if not cancelled...eliminate any whitespace
  if (pwdLen) { 
    pwdLen = pwdLen.split(/\s+/).join('').toLowerCase();
  }

  // verify the password length entered
  if (pwdLen != null                  // not null
    && pwdLen != ""                   // not empty
    && pwdLen >= 8                    // 8 or more
    && pwdLen <= 128)                 // 128 or less
  {
    if (!confirm("Please confirm the password length of: " + pwdLen)) {
      alert("Password length was not confirmed...no password will be generated.");
      throw "Password Length Not Confirmed";
    }
  }
  else if (pwdLen === null || pwdLen === "") // cancelled or OK'd empty
  {
    alert("No password length was entered...no password will be generated.");
    throw "No Password Length Entered";
  } else if (typeof pwdLen != "number") // entered a non-numeric value
  {
    alert("The password length value must be a number >= 8 and <= 128...no password will be generated.");
    throw "Password Length Entered Is A Non-numeric Value";
  } else if (pwdLen < 8 || pwdLen > 128) // entered a value outside the proper range
  {
    alert("The password length value must be a number >= 8 and <= 128...no password will be generated.");
    throw "Password Length Entered Is A Value Out-Of-Range";
  }
  // END - password length

  // START - character types
  var charTypes = prompt("Enter desired character types. Options are:\n\n" +
    " (l)ower case   " +
    " (u)pper case   " +
    " (n)umeric   " +
    " (s)pecial   " +
    " (a)ll\n\n" +
    "Type first character abbr for each type, for example:\n\n" +
    " 'lu' (for lower and upper)  or  'a' (for all types)\n");

  // if not cancelled...eliminate any white space
  if (charTypes) {
    charTypes = charTypes.split(/\s+/).join('').toLowerCase();
  }

  // if cancelled or only whitespace entered...
  if (charTypes === null || charTypes === "") { // terminate process
    alert("No character types were entered...no password will be generated.");
    throw "No Character Types Entered";
  }

  // preserve only allowed character types in a "clean" character type string
  var allowedCharTypes = "lunsa";
  var cleanCT = "";
  for (var i = 0; i < allowedCharTypes.length; i++) {
    if (charTypes.includes(allowedCharTypes[i])) {
      if (allowedCharTypes[i] === 'a') {
        cleanCT = "luns";
        break;
      }
      cleanCT += allowedCharTypes[i];
    }
  }

  // if no allowed character types found...
  // just terminate...
  // no recursion to guard against "stack smashing"
  var confirmationInfo = "";
  if (cleanCT.length === 0) { // no allowed character types entered
    alert("NO allowed character types ('l','u','n','s') where recorded in your request...no password will be generated.");
    throw "No Character Types Recorded";
  } else { // confirm password length (again) and allowed character types only
    var confirmationStmt = "Confirm your choices...\n\n";
    confirmationInfo += "Password Length: " + pwdLen + "\n";
    confirmationInfo += "Character Types:\n";
    for (var i = 0; i < cleanCT.length; i++) {
      switch (cleanCT[i]) {
        case 'l':
          confirmationInfo += "  • lowercase characters\n";
          break;
        case 'u':
          confirmationInfo += "  • uppercase characters\n";
          break;
        case 'n':
          confirmationInfo += "  • numeric characters\n";
          break;
        case 's':
          confirmationInfo += "  • special characters\n";
          break;
        default:
          alert("some alien character slipped by the clean up...here is the character types abbr string [" + cleanCT[i] + "]...YIKES\n");
          throw "Alien Character Slipped In...WATCH OUT!";
      }
    }
    // final confirmation
    if (!confirm(confirmationStmt + confirmationInfo)) {
      alert("This password generation configuration is NOT confirmed...no password will be generated.\n\n" + confirmationInfo + "\n");
      throw "Password Generation Configuration Not Confirmed";
    } else { // security alert
      alert("Your password will appear in the box...\nCopy it and secure it, then terminate this page");
    }
  }
  // END - character types

  // START - generate password according to configuration entered
  // construct full string of all choices of character types
  var fullStr = "";
  if (cleanCT.includes('l')) {
    // add all lowercase characters to the full string
    fullStr += "abcdefghijklmnopqrstuvwxyz";
  }
  if (cleanCT.includes('u')) {
    // add all uppercase characters to the full string
    fullStr += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (cleanCT.includes('n')) {
    // add all numeric characters to the full string
    fullStr += "0123456789";
  }
  if (cleanCT.includes('s')) {
    // add all special characters to the full string
    fullStr += "!#$%&'\"()*+,-./:;<=>?@[\]^_`{|}~";
  }

  // randomly select the chosen # of characters from the full string of choices
  var PWD = "";
  for (var i = 0; i < pwdLen; i++) {
    PWD += fullStr.charAt(Math.floor(Math.random() * fullStr.length));
  }
  // END - generate password according to configuration entered

  return PWD; // and there's the password
};
// END - generate password

// START - write password
/** Write password to the #password input */
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
};
// END - write password

// START global scope
// Get references to the #generate element
var generateBtn = document.querySelector("#generate");


// Add event listener to generate button and add writePassword()
generateBtn.addEventListener("click", writePassword);
// END - global scope
