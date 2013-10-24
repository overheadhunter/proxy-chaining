 /*
 * MIT license (full version in LICENSE file).
 * Copyright 2013 sebastianstenzel.de
 *
 * Minimum requirements: Javascript 1.4
 */
 
 Object.prototype.getInvocationProxy = function() {
	if (!(this.invocationProxy instanceof Proxy)) {
		this.invocationProxy = new Proxy(this);
	}
	return this.invocationProxy;
};
 
var Proxy = function(proxyTarget) {
	this.proxyMethodNameQueue = [];
	this.proxyArgumentsQueue = [];
	
	var createProxyMethod = function(key) {
		return function() {
			console.log("[SCHEDULE] " + proxyTarget + "." + key + "()");
			this.proxyMethodNameQueue.push(key);
			this.proxyArgumentsQueue.push(arguments);
			return this;
		};
	};
	
	this.proxyInvoke = function() {
		if (this.proxyMethodNameQueue.length == 0) {
			throw "proxyQueueEmptyError";
		}
		var methodName = this.proxyMethodNameQueue.shift();
		var args = this.proxyArgumentsQueue.shift();
		var method = proxyTarget[methodName];
		
		console.log("[INVOKE] " + proxyTarget + "." + methodName + "()");
		
		method.apply(proxyTarget, args);
	}
	
	var reservedNames = ["proxyMethodQueue", "proxyArgumentsQueue", "proxyInvoke"];
	for (key in proxyTarget) {
		if (typeof proxyTarget[key] === 'function' && reservedNames.indexOf(key) === -1) {
			this[key] = createProxyMethod(key);
		}
	}
};

// MSIE:
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(obj, start) {
		 for (var i = (start || 0), j = this.length; i < j; i++) {
			 if (this[i] === obj) { return i; }
		 }
		 return -1;
	}
}
