// Recap on objects
{
	const obj = {}; // same as = new Object()
	console.log("Has own toString", obj.hasOwnProperty("toString")); // false
	console.log("obj.toString() =", obj.toString()); // [object Object]
}

console.log("\n===========11111111111============\n");

// You can override .toString (like anything else in JS)
{
	const person = {
		name: 'Alan',
		toString() {
			return `Person { name: '${this.name}' }`;
		}
	}
	console.log("Has own toString", person.hasOwnProperty("toString")); // true
	console.log("The winner is: " + person); // The winner is: Person { name: 'Alan' }
}

console.log("\n===========22222222222============\n");

// JSON FTW!

{
	const person = {
		name: 'Alan',
		greet() {
			return `Hello ${this.name}`;
		}
	};

	// Get a string representation of the object
	const personJSON = JSON.stringify(person); // `{"name":"Alan"}`
	console.log("personJSON", personJSON);

	// Doesn't have the 'greet' function
	const personParsed = JSON.parse(personJSON);
	console.log("personParsed", personParsed); // { name: 'Alan' }

	// Adding 'greet' with Object.assign
	personParsed.name = "Brito"; // Sanity check
	const personFull = Object.assign({}, person, personParsed);
	console.log("personFull", personFull); // { name: 'Brito', greet: [Function: greet] }

	// Using a class
	class Person {
		constructor(personData){
			this.name = '';
			Object.assign(this, personData);
		}
		greet() {
			return `Hello ${this.name}`;
		}
	}
	const personWClass = new Person(personParsed);
	console.log(personWClass.greet()); // Hello Brito

	console.log("-----------");

	// Just so we're on the same page,
	// the instance doesn't have the greet function
	console.log("Has own greet", personWClass.hasOwnProperty("greet")); // false
	console.log(personWClass); // Person { name: 'Brito' }

	// class Person... is (roughly) the same as
	const Human = function(humanData) {
		this.name = '';
		Object.assign(this, humanData);
	};
	Human.prototype.greet = function() {
		return `Hello ${this.name}`;
	};
	// Human.prototype is the one that has greet,
	// not the actual instance of Human

	const human = new Human(personParsed);
	console.log(human.greet()); // Hello Brito
}

console.log("\n===========3333333333============\n");

// To create a "numeric" object just override .valueOf
{
	const myNum = {
		valueOf() {
			return 40;
		}
	};
	// Look Ma! I'm adding objects!
	console.log(myNum + 2); // 42 
}

console.log("\n===========4444444444============\n");

{
	// The following are falsy values.
	// Everything else is truthy.
	
	// undefined
	// null
	// false
	// + 0, -0, and NaN
	// ""

	// Super useful for checking objects:
	// if (obj) { doSomething(); }

	// !! is a shortcut for casting to boolean
	// Sometimes you need a true boolean value, not just a truthy one.
	// Best example is when converting an object to JSON
	const isTruthy = !!undefined;

	// ~ is the "bitwise not" operator
	// Most commonly used with .indexOf
	const arr = [ 1, 2, 3 ];
	if ( ~arr.indexOf(2) ) {
		console.log("Has #2");
	}
	// No longer a fan, but not opposed either.
	// I prefer the following (less mental overhead)
	if ( arr.indexOf(3) >= 0 ) {
		console.log("Has #3");
	}

	console.log("-----------");
	// && and || return values (not booleans)
	console.log( 0 && "A" ); // 0
	console.log( "A" && undefined); // undefined

	console.log(0 || "A"); // "A"
	console.log("A" || undefined); // "A"

	// Very useful with objects:
	const person = undefined;
	const name = person && person.getName();

	// And default values:
	const candidate = person || {};

	console.log("-----------");

	// You can combine them in the pattern:
	// a && b || c

	const getRates = () => {
		// May not return the rates
	};
	const rates = getRates();
	const selected = "premium";
	const rateToUse = rates && rates[selected] || "default rate";
	
}

// Please read about object destructuring on the MDN:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

