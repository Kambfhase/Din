/*
 * Din - A JavaScript Double Inheritance Framework
 * by Kambfhase
 * v0.1.4
 * MIT License
 */

var Class = (function (Object) {
    "use strict";

    function isFunction(fn) {
        return typeof fn == "function";
    }
    
    function iterateOwnProperties(obj, callback, thisArg) {
        //  iterates over an objects own keys. skips weird properties on functions
        var names = Object.getOwnPropertyNames(obj),
            i = names.length,
            name, isFn = isFunction(obj),
            skip = iterateOwnProperties.skip;

        while (i--) {
            name = names[i];
            if (!(isFn && ~skip.indexOf(name))) {
                callback.call(thisArg, obj[name], name, obj);
            }
        }
    }
    
    iterateOwnProperties.skip = Object.getOwnPropertyNames(function () {}).concat(["prototype"]);

    var objClass = {
        create: function (obj) {
            var klass = function self() {
                    return self.create.apply(self, arguments);
                },
                par = obj["parent"],
                stat = obj["static"],
                inst = obj["instance"];

            if (par) {
                iterateOwnProperties(par, function (prop, name) {
                    Object.defineProperty(klass, name, Object.getOwnPropertyDescriptor(par, name));
                });
            }

            if (stat) {
                Object.defineProperties(klass, stat);
            }
            klass.prototype = Object.create((par && par.prototype || Object.prototype), inst);
            Object.defineProperty(klass.prototype, "constructor", {
                value: klass,
                enumerable: false,
                configurable: true,
                writable: true
            });
            if (!klass.create) {
                klass.create = function () {
                    return Object.create(this.prototype);
                };
            }
            if (!klass.is) {
                klass.is = function (obj) {
                    return this.prototype.isPrototypeOf(obj);
                };
            }


            return klass;
        },
        toPropertyDescriptorMap : function (obj) {
            // takes a regular object as param and returns its property descriptor map.
            var desc = {};

            iterateOwnProperties(obj, function (prop, name) {
                desc[name] = Object.getOwnPropertyDescriptor(obj, name);
            });

            return desc;
        },
        addSuper : function (obj, keyword) {
            // adds a super property to all methods.
            var par = obj["parent"],
                stat = obj["static"],
                inst = obj["instance"];

            keyword = keyword || "super";

            if (!par) {
                return obj; // quick exit
            }

            if (stat) {
                iterateOwnProperties(stat, function (prop, name) {
                    var value = prop.value;
                    if (value && isFunction(value)) {
                        value[keyword] = par[name];
                    }
                });
            }

            if (inst) {
                iterateOwnProperties(inst, function (prop, name) {
                    var value = prop.value;
                    if (value && isFunction(value)) {
                        value[keyword] = par.prototype[name];
                    }
                });
            }

            return obj;
        }
    };
    
    
    return objClass.create({
        "static": objClass.toPropertyDescriptorMap(objClass)
    });

})(Object);