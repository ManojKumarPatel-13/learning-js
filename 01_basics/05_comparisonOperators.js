// Basic Comparison not a problem

// console.log(2 > 3) // false
// console.log(2 >= 3) // false 
// console.log(2 < 3) // true 
// console.log(2 <= 3) // true
// console.log(2 == 3) // false
// console.log(2 != 3) // true

// Two different datatypes comparison
// console.log("2" > 3) // false
// console.log("02" >= 3) // false
// These type of comparison some types gives unexpected outputs not in this case but gives unexpected output 
// that is one of the reason why we use typescript 


// some not so great comparison we should avoid at all cost 
console.log(null > 0) // false
console.log(null == 0) // false
console.log(null >= 0) // true

console.log(undefined < 0) // false
console.log(undefined == 0) // false
console.log(undefined >= 0) // false

// null >= 0 gives us true because equality check and comparisons operator work differently
// comparison first converts null to number which is zero which gives us null >= 0 as answer true and null < 0 as false 
// because 0 < 0 


// === strict comparison triple equals to 
console.log("2" == 2) // true
console.log("2" === 2) // false

