const accountId = 12501130;
let accountEmail = "manoj@gmail.com";
var accountPassword = "12345";
accountCity = "Jaipur"; // without any keyword variable can be made but should and must not do it 
let accountState;

// accountId = 2 // Cannot be changed because is a const and const variables cannot be changed

// Modifying the variables 
accountEmail = "manoj123@gmail.com";
accountPassword = "1243";
accountCity = "Mumbai";

console.log(accountId);

/*
Prefer not to use var
because of issue in block scope and functional scope

We should only use let and const in modern js 
*/

console.table([accountId, accountEmail, accountPassword, accountCity, accountState]);

// accountState when logged gives undefined as output because no value is given to the variable 
