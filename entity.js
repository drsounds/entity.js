/** 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Alexander Forselius <drsounds@gmail.com>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 **/
(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else this[name] = definition();
}('mod', function() {
    //This is the code you would normally have inside define() or add to module.exports
    var exports = {};
    
    /** Observable class 
     * @constructor
     **/
    var Observable = function () {
        this.events = {};
    };


    /** Observable class 
     * @param {String} event The event
     * @this {Observable}
     */
    Observable.prototype.addEventListener = function (event, callback) {
        this.events[event] = callback;
    };

    /** Observable class
     * @param {Event} event The event to emit
     */
    Observable.prototype.dispatchEvent = function (event) {
        if (event.type in this.events)
            this.events[event].call(this, event);
    };
    



    /**
     * Resolver for a particular entity
     * @interface
     * @constructor
     */
    var Resolver = function () {
        this.isLoggedIn = false;
    };

    Resolver.prototype = new Observable();
    Resolver.prototype.constructor = Observable;

    /**
     * Query against the entity
     * @return {Promise} a Promise
     * @constructor
     * @class 
     **/
    Resolver.prototype.request = function (method, query, headers, data) {
        var promise = new Promise(function (resolve, fail) {
            resolve({
                'status': '501',
                'objects': []
            });
        });
        return promise;
    };


    /**
     * Log in to the resolver
     * @this {Resolver}
     * @returns {Promise} 
     */
    Resolver.prototype.login = function () {
        return new Promise(function (resolve, fail) {
            resolve({
                'status': '501'
            });
        })
    };

    /**
     * Represents the entity
     * @class
     * @constructor
     * @param {String} entity The entity
     * @param {Resolver} resolver The resolver if specified
     **/
    var Entity = function (entity, resolver) {
        this.entity = entity;
        if (resolver) {
            this.resolver = resolver;
        } else {
            // Else get resolver from the storage
            this.resolver = Entity.resolver[entity];
        }
    };

    Entity.resolvers = {};

    /**
     * Query against the entity
     * @return {Promise} a Promise
     **/
    Entity.prototype.request = function (method, query, headers, data) {
        return this.resolver.request(method, query, headers, data);
    };

    exports.Entity = Entity;

    exports.Resolver = Resolver;

    exports.Observable = Observable;

    return exports;
}));