const Deferred = require('./deferred');

const deferred = new Deferred();

deferred
	.then(result => {
		console.log(result);
		console.log(`In first then`);
		const innerDeferred = new Deferred(); 
		setTimeout(() => innerDeferred.resolve('Result from first then'), 1000);
		return innerDeferred;
	})
	.then(result => {
		console.log(result);
		console.log(`In second then`);
		const innerDeferred = new Deferred(); 
		setTimeout(() => innerDeferred.resolve('Result from second then'), 1000);
		return innerDeferred;
	})
	.then(result => {
		console.log(result);
		console.log(`In third then`);
		return 'Result from third then';
	});

deferred.resolve('done');

console.log('after deferred resolve');