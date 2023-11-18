import generateSuperhero from "superheroes";
import generateNeme from "sillyname";
var sillyName = generateNeme();
console.log(`My name is ${sillyName}`);


var superhero = generateSuperhero.random();
console.log(`My Super Hero name is ${superhero}`);