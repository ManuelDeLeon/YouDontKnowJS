// JS reputation is well deserved

// Never let JS do an implicit cast for you (except for the simplest of cases)
// That means always use ===
// Testing for truthy/falsy values is okay

{
	const foo = (value) => {
		if (value) {
			// Do something with value
		}
	}
}

// Only use the new keyword for your classes and RegExp, Date, and Error
{
	const falsy = new Boolean(false);
	if (falsy) {
		console.log("Why The Face?");
	}
}

// If a function doesn't have a value to return then return null instead of undefined
// We've adopted the convention that:
// undefined = the variable hasn't been assigned a value yet
// null = we don't have a value to assign the variable
{
	const findPerson = (id) => {
		if ("can find it in DB") {
			return "person data";
		} else {
			return null;
		}
	};
}

// Prototypes as defaults are a terrible idea
// Use default parameters, not ||

// Don't
{
	const createMicrobrewery = (name) => {
		const breweryName = name || 'Hipster Brew Co.';
		// ...
	}
}

// Do
{
	const createMicrobrewery = (breweryName = 'Hipster Brew Co.') => {
		// ...
	}
}

// More often than not it's better to let the caller take care of the default value
// This is because we use TypeScript's strict null check
{
	// const createMicrobrewery = (breweryName: string) => {
	// 	// breweryName isn't null or undefined
	// }
}