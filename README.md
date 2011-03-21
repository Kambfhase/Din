# Din - JavaScript Double Inheritance

## Intro

I have looked at a lot of JavaScript inheritance frameworks in past. Some were plain simple, some huge, others had cool ideas and a few were just plain stupid. A list of links is at the bottom. But first things first.

**What's a class?**

Most people see a class as an abstract group of object with similar properties. Or as wikipedia defines it:

> In object-oriented programming, a class is a construct that is used as a blueprint (or template) to create objects of that class.

I think a class is a bit more than that. There is also some functionality on the class that does not belong to the instances. In Java these methods are called `static`. These methods are simply beeing ignored by most JavaScript inheritance frameworks. I think that they should be inherited, too.

**requirements**

So I wrote down the requirements I have for a JavaScript inheritance framework. I looked at a lot of the frameworks ot there and none would fit the needs. Since its just JavaScript I wrote my own.

## ECMAScript 5

My inheritance framework should be ES5 compliant. That means it should both run in strict mode as well as support property descriptors.

## new Operator

Some like `new` some not. I think it should be optional. Also the capital first letter for constructors should be possible. If you want to be JSLint compliant, you can.

## Namespace

The framework should be able to run in any environment. There is no need for it, nor the classes to be on the global object. creating local variables is just fine.

## API

`Class.create( obj)` returns a new class with the properties specified by obj:  
` obj.parent` (optional) a reference to the parent class.  
` obj.static` (optional) property descriptor map to be added to the resulting class constructor.  
` obj.instance` (optional) property descriptor map added to the classes prototype.  
`Class( obj)` forwards to `Class.create( obj)`.  

let Klass be a class create via `Class.create( obj)` ( you see what I did there?!).  
`Klass.create( args)` default: creates a new object inheriting from Klass.prototype.  
`Klass( args)` forwards to `Klass.create( args)`.  
`Klass.is( obj)` default: returns true if obj inherits from Klass.prototype.  
`Klass.prototype` the classes prototype object.  
`Klass.prototype.constructor` points to `Klass`.  


## Usage

So, lets go with the usual Person example:

    var Person = Class({  
        "static": {  
            "create": {  
                 value: function( name){  
                     var that = Object.create( this.prototype);  
                     that.name = name;  
                     return that;  
                 }  
            }  
        },  
        "instance": {  
            "greet":{  
                value: function(){  
                    return "Hi, I am "+this.name+".";  
                },  
                enumerable: false,  
                configurable: true,  
                writable: true  
            }  
        }  
    });  
      
    var Frank = Person("Frank");  
      
    Frank.greet() // "Hi, I am Frank."

Yes, i do know, that `"static"` and `"instance"` are horrible names, but I can't think of something better. But these might change in a future version.

    var Pirate = Class.create({
        "parent": Person,
        "instance": {
            "greet": {
                value: function(){
                    return "Arrrrrrrrrrr, I am "+ this.name+"!";
                }
            }
        }
    });
    
    Pirate.is( Pirate.create("Blackbeard")) // true

Class comes with a few extras: `Class()` is a shortcut for `Class.create()`, which does also apply for every new class like Pirate. Class also adds a static `is` method which returns true if the passed object is an instance. A `constructor` property is also added the prototype so that `instanceof` works, too.

## Conclusion

So, this is basically it. There might be more features in a future version.

MfG Hase

## Links

http://code.google.com/p/es-lab/wiki/Traits  
http://webreflection.blogspot.com/2010/01/es5-es5-classes-as-descriptor-objects.html
http://javascript.crockford.com/prototypal.html  
http://jsclass.jcoglan.com/  
http://ejohn.org/blog/simple-javascript-inheritance/  
http://github.com/tobeytailor/def.js  
http://mootools.net/docs/core/Class/Class  
http://github.com/polvero/klass  
http://github.com/Joose/Joose  
http://github.com/BonsaiDen/neko.js  
http://github.com/pmuellr/scooj  
http://github.com/maxpert/oorja  
http://github.com/creationix/pattern  