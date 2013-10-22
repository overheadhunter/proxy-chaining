proxy-stacking
==============

Using the proxy design pattern for method invocation redirection. Useful for asynchronous calls, interceptors, ...

Proxy stacking allows you to return [proxies](http://en.wikipedia.org/wiki/Proxy_pattern), which consume the next method invocation and forward it to the _real subject_ when you want it to.

The goal of this project is to provide this pattern for multiple languages capable of accessing arguments of a method and implementing methods at runtime. 

## Javascript example
``` javascript
myObject.delay(3000).performMethod();
myObject.loadAjax("/example/resource").doStuff();
```

## Further languages will follow.