 /*
 * MIT license (full version in LICENSE file).
 * Copyright 2013 sebastianstenzel.de
 *
 * Minimum requirements: Javascript 1.4
 */
var Proxy = function(proxyTarget) {
	this.proxyTarget = proxyTarget;
	this.proxyMethod = null;
	this.proxyMethodArguments = null;
	this.proxyChain = false;
	this.proxyChainShouldInvoke = false;
	
	var createProxyMethod = function(method) {
		return function() {
			this.proxyMethod = method;
			this.proxyMethodArguments = arguments;
		};
	};
	
	for (key in proxyTarget) {
		if (typeof proxyTarget[key] === 'function' && this[key] === undefined) {
			this[key] = createProxyMethod(proxyTarget[key]);
		}
	}
	
	this.proxyInvoke = function(bind) {
		if (!bind) {
			bind = this.proxyTarget;
		}
		if (this.proxyMethod == null && this.proxyChain) {
			this.proxyChainShouldInvoke = true;
		} else {
			this.proxyMethod.apply(bind, this.proxyMethodArguments);
		}
		if (bind instanceof Proxy && bind.proxyChainShouldInvoke) {
			bind.proxyInvoke();
		}
	}
	
	if (proxyTarget instanceof Proxy) {
		proxyTarget.proxyChain = true;
	}
};