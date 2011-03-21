/*
 * Din - A JavaScript Double Inheritance Framework
 * by Kambfhase
 * v0.1.1
 * MIT License
 */
var Class=function(a){"use strict";var b=a.getOwnPropertyNames(function(){}),c=function(c){var d=function k(){return k.create.apply(k,arguments)},e,f,g,h=c.parent,i=c["static"],j=c.instance;if(h){e=a.getOwnPropertyNames(h),f=e.length;while(f--)g=e[f],~b.indexOf(g)||a.defineProperty(d,g,a.getOwnPropertyDescriptor(h,g))}i&&a.defineProperties(d,i),d.prototype=a.create(h&&h.prototype||a.prototype,j),a.defineProperty(d.prototype,"constructor",{value:d,enumerable:!1,configurable:!0,writable:!0}),d.create||(d.create=function(){return a.create(this.prototype)}),d.is||(d.is=function(a){return this.prototype.isPrototypeOf(a)});return d};return c({"static":{create:{value:c,enumerable:!1,configurable:!0,writable:!0}}})}(Object);