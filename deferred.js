class Deferred {
	constructor () {
		this._callbacksData = [];
	}

	then (callback) {
		const deferred = new Deferred();
		this._callbacksData.push({ callback, deferred });
		return deferred;
	}
	
	resolve (result) {
		this._callbacksData.forEach(callbackData => this.executeCallback(callbackData, result));
	}
	
	executeCallback (callbackData, info) {
		setTimeout(() => {
			const result = callbackData.callback(info);
			result instanceof Deferred
				? callbackData.deferred.bind(result)
				: callbackData.deferred.resolve(result); 
		}, 0);
	}

	bind (deferred) {
		deferred.then(result => this.resolve(result));
	}
}

module.exports = Deferred;