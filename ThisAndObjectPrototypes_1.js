// *********************************
// What is "this"?
// *********************************

// The "this" keyword refers to the context in which the 
// fuction is running on.

// It works almost like C# extension methods.

// It typically means the object the object is attached to:

{
	 const printName = function() { 
		console.log(this.name);
	 };

	 const alan = {
		 name: "Alan",
		 print: printName
	 }

	 alan.print();
}

// Is immune to closures

{
	const person = {
		kind: 'Person',
		runFunction: function(fn) {
			console.log("2:", this.kind); // Person
			fn();
		}
	}
	const animal = {
		kind: 'Animal',
		foo: function () {
			console.log("1:", this.kind); // Animal
			person.runFunction(function() {
				console.log("3:", this.kind); // undefined
			})
		}
	}

	animal.foo();
}

// You can specify the context with .call/apply/bind

{
	const printName = function () {
		console.log(this.name);
	};

	printName.call({ name: "Brito" });
	printName.apply({ name: "Cordon" });
	
	const printDaniel = printName.bind({ name: "Daniel" }); 
	printDaniel();
}

// MDN is your friend. When googling for JS stuff use: mdn <keyword>
// e.g. mdn bind

// The "new" keyword creates a copy of a function:

{
	const f1 = function() { };
	const f2 = new f1();
	console.log("f1 === f2?", f1 === f2);
}

// The "new" keyword is typically used to mimic classes

{
	const Person = function(name) {
		this.name = name;
		this.printName = function() {
			console.log(this.name);
		}
		// Implicitly returns itself (the new instance of the function)
	}
	const edgar = new Person("Edgar");
	edgar.printName();

	// But only with new:
	const who = Person("Who");
	console.log(who); // undefined
}

// You can be explicit about what a function retuns (even with new):

{
	const Person = function (name) {
		return {
			name: name,
			printName: function () {
				console.log(this.name);
			}
		}
	}
	const finn = new Person("Finn");
	finn.printName();

	// In this case it works even without the "new" keyword
	const gary = Person("Gary");
	gary.printName();
}

// *********************************
// Objects
// *********************************

// Objects in JS are essentially dictionaries:

{
	const person = {
		name: "Helen",
		[1 + 2]: "Three"
	};
	person.age = 25;
	person["address"] = "123 Main St.";
	for(var petNum in [1,2,3]) {
		person["Pet " + petNum] = petNum;
	}
	person["Any string you want"] = "works."
	console.log(person);
}