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
  var pwdLen = prompt("Enter desired length of the password...\n" +
    "    Must be 8 to 128 characters in length.");
  // if not null...eliminate any whitespace
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
      alert("password length was not confirmed");
      throw "Password Length Not Confirmed";
    }
  }
  else if (pwdLen === null || pwdLen === "") // cancelled or OK'd empty
  {
    alert("No password length was entered...no password will be generated.");
    throw "No Password Length Entered";
  } else if (typeof pwdLen != "number") // entered a non-numeric value
  {
    alert("The password length value must be a number >= 8 and <= 128");
    throw "Password Length Entered Is A Non-numeric Value";
  } else if (pwdLen < 8 || pwdLen > 128) // entered a value outside the proper range
  {
    alert("The password length value must be a number >= 8 and <= 128");
    throw "Password Length Entered Is A Value Out-Of-Range";
  }

  var charTypes = prompt("Enter desired character types...\n" +
    "(default='a' for all character types)\n\n" +
    "Options are:\n" +
    " (l)ower case\n" +
    " (u)pper case\n" +
    " (n)umeric\n" +
    " (s)pecial\n" +
    "Type first character abbr for each type\n" +
    " some examples:\n" +
    " 'lu' (lower and upper)\n" +
    " 'ls' (lower and special)\n" +
    " 'luns', '', or 'a'(default) for all types");

  // clean up any white space in the character types string
  var cleanCT = charTypes.split(/\s+/).join('').toLowerCase();

  // set the default (all character types) if necessary
  cleanCT = cleanCT || 'a';

  var allowedCharTypes = "lunsa";

  // peserve only allowed character types
  var newCT = "";
  for (var i = 0; i < allowedCharTypes.length; i++) {
    if (cleanCT.includes(allowedCharTypes[i])) {
      if (allowedCharTypes[i] === 'a') {
        newCT = "luns";
        break;
      }
      newCT += allowedCharTypes[i];
    }
  }

  // return NULL if no allowed character types found...
  // no recursion to guard against "stack smashing"
  var confirmationInfo = "";
  if (newCT.length === 0) {
    alert("NO allowed character types ('l','u','n','s') where recorded in your request");
    throw "No Character Types Recorded";
  } else {
    var confirmationStmt = "Confirm that this is the password length, and character types you are requesting...\n\n";
    confirmationInfo += "Password Length: " + pwdLen + "\n";
    confirmationInfo += "Character Types:\n";
    for (var i = 0; i < newCT.length; i++) {
      switch (newCT[i]) {
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
          alert("some alien character slipped by the clean up...here is the character types abbr string [" + newCT[i] + "]\n");
          throw "Alien Character Slipped In...WATCH OUT!";
      }
    }
    if (!confirm(confirmationStmt + confirmationInfo)) {
      alert("This password generation configuration is NOT confirmed...\n\n" + confirmationInfo);
      throw "Password Generation Configuration Not Confirmed";
    } else {
      alert("Your password will appear in the box...\nCopy it and secure it, then terminate this page");
    }
  }

  // construct full string of all choices of character types
  var fullStr = "";
  if (newCT.includes('l')) {
    // add all lowercase characters to the full string
    fullStr += "abcdefghijklmnopqrstuvwxyz";
  }
  if (newCT.includes('u')) {
    // add all uppercase characters to the full string
    fullStr += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (newCT.includes('n')) {
    // add all numeric characters to the full string
    fullStr += "0123456789";
  }
  if (newCT.includes('s')) {
    // add all special characters to the full string
    fullStr += "!#$%&'\"()*+,-./:;<=>?@[\]^_`{|}~";
  }

  // randomly select the chosen # of characters from the full string of choices
  var PWD = "";
  for (var i = 0; i < pwdLen; i++) {
    PWD += fullStr.charAt(Math.floor(Math.random() * fullStr.length));
  }
  return PWD;
};

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

/** Write password to the #password input */
function writePassword() {
  var password = generatePassword();

  // if null password...this should never happen
  if (!password) {
    alert("Try again")
    throw "Try again";
  }

  var passwordText = document.querySelector("#password");

  passwordText.value = password;
};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
