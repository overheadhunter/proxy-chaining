 /*
 * MIT license (full version in LICENSE file).
 * Copyright 2013 sebastianstenzel.de
 *
 * Minimum requirements: Javascript 1.3
 */
var Proxy = function(target) {
	this.proxyTarget = target;
	this.proxyMethod = null;
	this.proxyMethodArguments = null;
	
	var createProxyMethod = function(method) {
		return function() {
			this.proxyMethod = method;
			this.proxyMethodArguments = arguments;
		};
	};
	
	for (key in target) {
		if (typeof target[key] === 'function') {
			this[key] = createProxyMethod(target[key]);
		}
	}
	
	this.proxyInvoke = function(bind) {
		if (!bind) {
			bind = this.proxyTarget;
		}
		this.proxyMethod.apply(bind, this.proxyMethodArguments);
	}
};