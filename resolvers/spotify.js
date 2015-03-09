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
}('mod', function () {
    var exports = {};

    var SpotifyResolver = function (entity) {
        this.entity = entity;
    }

    SpotifyResolver.prototype.request = function (method, query, headers, data) {
        var xmlHttp = new XMLHttpRequest();
        var url = 'http://api.spotify.com/v1/' + this.entity + '/';
        var querystring = "";
        if (query instanceof String) {
            url += query;
        } else {
            url += "?";
            for (var k in querystring) {
                url += k + "=" + encodeURI(querystring[k]) + "&";
            }
        }
        xmlHttp.open('GET', url, true);
        xmlHttp.send(null);
    };
    exports.SpotifyResolver = SpotifyResolver;
    return exports;
});