/*
 * Din - A JavaScript Double Inheritance Framework
 * by Kambfhase
 * v0.1.2
 * MIT License
 */

var Class = (function( Object){
"use strict";

var skip = Object.getOwnPropertyNames(function(){}).concat(["prototype"]),

Class = function( obj){
    var klass = function self(){
            return self.create.apply( self, arguments);
        }, props, i, prop,
        par = obj[ "parent" ],
        stat = obj[ "static"],
        inst = obj["instance"];

    if( par){
        props = Object.getOwnPropertyNames( par);
        i= props.length;
        while( i--){
            prop = props[ i];
            if( !~ skip.indexOf( prop)){
                 Object.defineProperty( klass, prop, Object.getOwnPropertyDescriptor( par, prop));
            }
        }
    }
    
    if( stat){
        Object.defineProperties( klass, stat);
    }
    klass.prototype = Object.create( (par && par.prototype || Object.prototype), inst);
    Object.defineProperty( klass.prototype, "constructor", {
        value: klass,
        enumerable: false,
        configurable: true,
        writable: true
    });
    if( !klass.create){
        klass.create = function(){ return Object.create( this.prototype);};
    }
    if( !klass.is ){
        klass.is = function( obj){ return this.prototype.isPrototypeOf( obj);};
    }
    

    return klass;
};

return Class({
    "static": {
        create: {
            value: Class,
            enumerable: false,
            configurable: true,
            writable: true
        },
        toPropertyDescriptorMap: {
            value: function( obj){
                // takes a regular object as param and returns its property descriptor map.
                var desc = {}, name,
                    names = Object.getOwnPropertyNames( obj),
                    i = names.length;
                
                while( i--){
                    name = names[i];
                    desc[ name] = Object.getOwnPropertyDescriptor( obj, name);
                }
                return desc;
            },
            enumerable: false,
            configurable: true,
            writable: true
        }
    }
});

})(Object);