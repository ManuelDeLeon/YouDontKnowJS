// Recap on functions
{
	// named function
	function a() { LogFunctionName(); }; 
	// named function assigned to a variable
	const b = function nameOfB() { LogFunctionName(); }; 
	// anonymous function assigned to a variable
	const c = function () { LogFunctionName(); }; 
	// anonymous function assigned to a variable
	const d = () => { LogFunctionName(); }; 
	
	a(); // "a"
	b(); // "nameOfB"
	c(); // "c" or "" (depending on how you get the name)
	d(); // "d" or "" (depending on how you get the name)

	// The implementation isn't important
	function LogFunctionName() { console.log((new Error()).stack.match(/at (\S+)/g)[1].slice(3)); };
}

// *********************************
// What is hoisting?
// *********************************

// When the compiler moves the var declaration to the top of the function 
// Functions are hoisted first

(function () {
	console.log(foo()); // "foo"
	var foo = "Not a function";
	function foo() {
		return "foo";
	}
}());

// *********************************
// What is closure?
// *********************************

// When a variable retains its lexical scope

{
	let letter = "A";
	setTimeout( // Run the following function on the next cycle
		() => { 
			console.log(letter); // "A"
		}
 );
	letter = "B";
}

// ****************************************
// What's happening in the following block?
// ****************************************

(() => {
	for (var num = 1; num <= 5; num++) {
		setTimeout(() => {
			console.log(num);
		});
	}
})();

// *****************************************************
// How can you create an object with a private variable?
// *****************************************************

// With a factory (a function that returns the object)

{
	function createPerson(personName) {
		let name = personName; // private to the person
		return {
			getName() {
				return name;
			},
			setName(newName) {
				name = newName;
			}
		}
	}

	const person = createPerson("Alan");
	console.log(person.getName()); // "Alan"
	person.setName("Brito")
	console.log(person.getName()); // "Brito"
}