const marvelHeroes = ["Thor", "IronMan", "SpiderMan"]
const dcHeroes = ["SuperMan", "Flash", "BatMan"]

marvelHeroes.push(dcHeroes)

console.log(marvelHeroes); // we expected that both the arrays will get merged whereas 
// in reality the dcHeroes array will become the 3rd indexed element of marvelHeroes array 
// [ 'Thor', 'IronMan', 'SpiderMan', [ 'SuperMan', 'Flash', 'BatMan' ] ]
// and to access them we can use indexing like marvelHeroes[3][0]

console.log(marvelHeroes[3][0]);

const allHeroes = marvelHeroes.concat(dcHeroes) // concat method merges both the array and it not do changes in any of 
// the array it returns us the merged array and we need to save it somewhere
console.log(marvelHeroes);
console.log(allHeroes);


// spread operator
const allNewHeroes = [...marvelHeroes, ...dcHeroes]
console.log(allNewHeroes);
// mostly spread operator is used because we can merge as many element as possible whereas in concat it is limited to just 2


const anotherArray = [1, 2, 3, [4, 5, 6,], 7, [6, 7, [4, 5]]]

const usableAnotherArray = anotherArray.flat(2) // this will open up the array and put all the elements in the new array made

console.log(anotherArray);
console.log(usableAnotherArray);


// isArray method

console.log(Array.isArray("Manoj"));
console.log(Array.from("Manoj")); // will make a array and store the string Manoj in it like it will store it 
// in single character form [ 'M', 'a', 'n', 'o', 'j' ]
console.log(Array.from({name: "Manoj"})); // interesting case because it gives us empty array because it is not able to 
// make the give argument a array we need to define that we have to make the keys or value a array will discuss it in
//  further topics -> output:  []


let score1 = 100
let score2 = 200
let score3 = 300

console.log(Array.of(score1,score2,score3)) // returns a new array from a set of elements. 