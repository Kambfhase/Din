/*
 * Din - A JavaScript Double Inheritance Framework
 * by Kambfhase
 * v0.1.3
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
            enumerable: true,
            configurable: true,
            writable: true
        },
        addSuper: {
            value: function( obj, keyword){
                // adds a super property to all methods.
                var par = obj[ "parent" ],
                    stat = obj[ "static"],
                    inst = obj["instance"],
                    names,name,i,desc, value;
                    
                keyword = keyword || "super";
                
                if( !par){
                    return obj; // quick exit
                }
                
                if( stat){
                    // add supers on static methods
                    names = Object.getOwnPropertyNames( stat);
                    i = names.length;
                    
                    while( i--){
                        name = names[ i];
                        desc = stat[ name];
                        value = desc.value;
                        if( value && typeof value === "function"){
                            // method found
                            // note: no check wether par[name] exists or is a function!
                            // note: type check might fail on edge cases
                            value[ keyword] = par[ name];
                        }
                    }
                }
                
                if( inst){
                    // add supers on instance methods
                    names = Object.getOwnPropertyNames( inst);
                    i = names.length;
                    
                    while( i--){
                        name = names[ i];
                        desc = inst[ name];
                        value = desc.value;
                        if( value && typeof value === "function"){
                            value[ keyword] = par.prototype[ name];
                        }
                    }
                }
                
                return obj;
            },
            enumerable: true,
            configurable: true,
            writable: true
        }
    }
});

})(Object);