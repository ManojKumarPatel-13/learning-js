// array

const myArr = [0, 1, 2, 3, 4, 5]
const myHeroes = ["ShaktiMan", "NagRaj"]

const myArr2 = new Array(1, 2, 3, 4)
console.log(myArr[1]);


// Array Methods

myArr.push(6)
myArr.push(7)
console.log(myArr)

myArr.pop()
console.log(myArr)

myArr.unshift(9) // numbers add on index 0
console.log(myArr)

myArr.shift()
console.log(myArr)

console.log(myArr.includes(9)) // false returns wether the argument exist on the array or not
console.log(myArr.indexOf(5)); // 5

const newArr = myArr.join() // adds all the element of array in string format 

console.log(myArr)
console.log(newArr) // 0,1,2,3,4,5,6
console.log(typeof newArr); // strings


// slice, splice

console.log("************Slice and Splice*****************");

console.log("A", myArr);

const myNewArray1 = myArr.slice(1, 3) // it will add element at index 1 and 2 not 3 ( add elements from 1 to 3) to myNewArray1

console.log(myNewArray1)
console.log("B", myArr);

const myNewArray2 = myArr.splice(1, 3)
console.log(myNewArray2)
console.log("C", myArr)

// Splice method cuts out the elements from index 1 to 3 inclusive of both 1 and 3 and adds it to myNewArray2 means
// the elements at index 1,2and 3 will no longer be a part of myArr (initial array) 
// when asked in interviews about difference b/w splice and slice we will mention both that splice includes the 
// last index as well also it cuts the element out from the original source 