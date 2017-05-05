console.log("\n");

// You can override .toString (like anything else in JS)

// Recap on objects
{
	const obj = {}; // same as = new Object()
	console.log("Has own toString", obj.hasOwnProperty("toString"));
	console.log("obj.toString() =", obj.toString())
}

console.log("\n===========11111111111============\n");

{
	const person = {
		name: 'Alan',
		toString() {
			return `Person { name: '${this.name}' }`;
		}
	}
	console.log("Has own toString", person.hasOwnProperty("toString"));
	console.log("The winner is: " + person);
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
	const personJSON = JSON.stringify(person); 
	console.log("personJSON", personJSON);

	const personParsed = JSON.parse(personJSON);
	console.log("personParsed", personParsed);

	// Adding 'greet' with Object.assign
	personParsed.name = "Brito"; // Sanity check
	const personFull = Object.assign({}, person, personParsed);
	console.log("personFull", personFull);

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
	console.log(personWClass.greet());

	console.log("-----------");

	// Just so we're on the same page
	console.log("Has own greet", personWClass.hasOwnProperty("greet"));
	console.log(personWClass);

	// class Person... is (roughly) the same as
	const Human = function(humanData) {
		this.name = '';
		Object.assign(this, humanData);
	};
	Human.prototype.greet = function() {
		return `Hello ${this.name}`;
	};

	const human = new Human(personParsed);
	console.log(human.greet());
}

console.log("\n===========3333333333============\n");

// To create a "numeric" object just override .valueOf
{
	const myNum = {
		valueOf() {
			return 40;
		}
	};
	console.log(myNum + 2);
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

