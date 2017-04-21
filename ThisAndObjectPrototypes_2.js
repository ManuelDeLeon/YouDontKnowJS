// *********************************
// Object properties
// *********************************

{
	// Design time
	const obj = {
		a: 'A',
		get b() {
			return "B";
		},
		set b(val) {
			console.log("Discarding", val);
		}
	}

	// Run time
	obj.c = 'C';
	Object.defineProperty(
		obj,	// target
		"d",		// property name
		{
			get() {
				return "D";
			},
			set(val) {
				console.log("Discarding", val);
			}
		}
	);

	// Using the object
	obj.a = "a";
	obj.b = "b";
	obj.c = "c";
	obj.d = "d";
	console.log(obj.a);
	console.log(obj.b);
	console.log(obj.c);
	console.log(obj.d);
}

console.log("======11111111========");

// *********************************
// Mixins
// *********************************


{
	// For information purposes only
	// Use Object.assign instead
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
	const mixin = (targetObj, sourceObj) => {
		for (let key in sourceObj) {
			// only copy if not already present
			if (!(key in targetObj)) {
				targetObj[key] = sourceObj[key];
			}
		}

		return targetObj;
	}

	const walkable = {
		walk() {
			console.log("I'm walking.");
		}
	}
	const runnable = {
		run() {
			console.log("I'm running.");
		}
	}

	const person = {};
	mixin(person, walkable);
	mixin(person, runnable);

	person.walk();
	person.run();

	// Using Object.assign
	const otherPerson = {};
	Object.assign(otherPerson, walkable, runnable);
	
	console.log("Other Person:")
	otherPerson.walk();
	otherPerson.run();
}

console.log("======22222222222========");

// *********************************
// Prototypes
// *********************************

{
	const walkable = {
		walk() {
			console.log("I'm walking.");
		}
	}
	const runnable = {
		run() {
			console.log("I'm running.");
		}
	}

	// Warning: For demonstration purposes only
	runnable.__proto__ = walkable;

	const person = {};
	// Warning: For demonstration purposes only
	person.__proto__ = runnable;
	
	person.walk();
	person.run();
	
	// Let's change the walk
	walkable.walk = function() {
		console.log("Strolling.");
	}

	person.walk();
}

console.log("=====3333333333333=========");

// *********************************
// Using objects as templates
// *********************************

{
	const walkable = {
		walk() {
			console.log("I'm walking.");
		}
	};
	const runnable = Object.create(walkable, {
		run: {
			value: function() {
				console.log("I'm running.");
			}
		}
	});

	const person = Object.create(runnable, {
		name: {
			writable: true,
			value: ''
		},
		sayHello: {
			value: function () {
				console.log(`Hello ${this.name}`);
			}
		}
	});

	const cera = Object.create(person);
	cera.name = "Cera";
	cera.sayHello();
	cera.walk();
	cera.run();
	console.log("Does person implements runnable?", runnable.isPrototypeOf(person));

}

console.log("=======44444444444444=======");

// *********************************
// Classes
// *********************************

// "sooner or later you will face the fact that the classes you have in other languages are not like the "classes" you're faking in JS."
// Favor composition over inheritance.
// Strong personal opinion: Don't use inheritance.

{
	const Person = function(initialName) {
		this.name = initialName;
	}

	// Static properties and methods
	Person.helloCount = 0;
	Person.printCount = function() {
		console.log(`Hello count: ${Person.helloCount}`);
	}

	// Instance properties and methods
	Person.prototype.name = "";
	Person.prototype.sayHello = function() {
		Person.helloCount++;
		console.log(`Hello ${this.name}`);
	}

	const alan = new Person("Alan");
	alan.sayHello();

	const brit = new Person("Brit");
	brit.sayHello();
	const britIsPerson = brit instanceof Person;
	console.log("Brit Is Person", britIsPerson);

	Person.printCount();
}

// Don't define properties and functions in their "constructor"
{
	const Person = function() {
		this.hello = function() {
			// This function will be created for each new object
		}
	}
}

// Define them in the prototype instead
{
	const Person = function () {  }

	Person.prototype.hello = function () {
		// This function will only be created once for all objects
	}
}

