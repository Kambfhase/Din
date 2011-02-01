/*
 * Din - A JavaScript Double Inheritance Framework
 * by Kambfhase
 * v0.1
 * MIT License
 */
var Class=function(a){"use strict";var b,c=a.getOwnPropertyNames(function(){});b=function(b){var d=function(){return d.create.apply(d,arguments)},e,f,g,h=b.parent,i=b["static"],j=b.instance;if(h){e=a.getOwnPropertyNames(h),f=e.length;while(f--)g=e[f],c.indexOf(g)==-1&&(d=a.defineProperty(d,g,a.getOwnPropertyDescriptor(h,g)))}i&&(d=a.defineProperties(d,i)),d.prototype=a.create(h&&h.prototype||a.prototype,j),d.prototype=a.defineProperty(d.prototype,"constructor",{value:d,enumerable:!1,configurable:!0,writable:!0}),d.create||(d.create=function(){return a.create(this.prototype)}),d.is||(d.is=function(a){return this.prototype.isPrototypeOf(a)});return d},b=b({"static":{create:{value:b,enumerable:!1,configurable:!0,writable:!0}}});return b}(Object);