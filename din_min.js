/*
 * Din - A JavaScript Double Inheritance Framework
 * by Kambfhase
 * v0.1
 * MIT License
 */
var Class=function(b){var e,h=b.getOwnPropertyNames(function(){});e=function(c){var a=function(){return a.create.apply(a,arguments)},g,f,d=c.parent,i=c["static"],j=c.instance;if(d){c=b.getOwnPropertyNames(d);for(g=c.length;g--;){f=c[g];if(h.indexOf(f)==-1)a=b.defineProperty(a,f,b.getOwnPropertyDescriptor(d,f))}}a=b.defineProperties(a,i);a.prototype=b.create(d&&d.prototype||b.prototype,j);a.prototype=b.defineProperty(a.prototype,"constructor",{value:a,enumerable:false,configurable:true,writable:true}); if(!a.create)a.create=function(){return b.create(this.prototype)};if(!a.is)a.is=function(k){return this.prototype.isPrototypeOf(k)};return a};return e=e({"static":{create:{value:e,enumerable:false,configurable:true,writable:true}}})}(Object);