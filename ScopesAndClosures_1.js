// *********************************
// What's an IIFE? (Immediately Invoked Function Expression)
// *********************************

// A function that you run immediately.

( // Open IIFE block
	() => { /* code */ }
)(); // Execute IIFE

// *********************************
// Why not just run the /* code */ ?
// *********************************

// 1) To scope variables to the IIFE.
(() => { let foo; })();
(() => { let foo; })();

// 2) To close over variables.
//   - More in chapter 5


// *********************************
// What's the difference between var, let, and const?
// *********************************

// =================================
// var
// =================================

// Scopes to function
(()=>{
	if (true) {
		var foo = 1;
	}
	// foo is available here
	console.log(foo); // 1
})();

// Can re-declare
(() => {
	var foo = 1;
	var foo = 2; // No problem
})();

// Can re-assign
(() => {
	let foo = 1;
	foo = 2; // No problem
})();

// Hoists 
//   - Declaring anywhere in a function is the same as declaring it at the top.
//   - A variable can be used before it's declared.
(() => {
	console.log(foo); // undefined
	var foo = 1;
})();

// =================================
// let
// =================================

// Scopes to block
(() => {
	{
		let foo = 1;
	}
	// foo is NOT available here
	// console.log(foo); // ReferenceError: foo is not defined
})();

// Can't re-declare
(() => {
	let foo = 1;
	// let foo = 2; // SyntaxError: Identifier 'foo' has already been declared
})();

// Can re-assign

// Doesn't hoist
//   - A variable can't be used before it's declared.
(() => {
	//console.log(foo); // ReferenceError: foo is not defined
	let foo = 1;
})();

// =================================
// const
// =================================

// Scopes to block

// Can't re-declare

// Can't re-assign
(() => {
	const foo = 1;
	// foo = 2; // TypeError: Assignment to constant variable.
})();

// Doesn't hoist
//   - A variable can't be used before it's declared.

// NOT immutable
//   - Can change object properties
(() => {
	const foo = {};
	foo.name = "new"; // No problem

	const array = [ 1, 2, 3 ];
	array.push(4); // No problem
})();

// =================================
// What to use?
// =================================

// const > let 
//   - immutable > mutable

// var must die