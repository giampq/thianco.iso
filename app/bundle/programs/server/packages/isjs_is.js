(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/isjs_is/packages/isjs_is.js                              //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/isjs:is/is.js                                                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
// is.js 0.7.3                                                                                                        // 1
// Author: Aras Atasaygin                                                                                             // 2
                                                                                                                      // 3
// AMD with global, Node, or global                                                                                   // 4
;(function(root, factory) {                                                                                           // 5
    if(typeof define === 'function' && define.amd) {                                                                  // 6
        // AMD. Register as an anonymous module.                                                                      // 7
        define(['is'], function(is) {                                                                                 // 8
            // Also create a global in case some scripts                                                              // 9
            // that are loaded still are looking for                                                                  // 10
            // a global even when an AMD loader is in use.                                                            // 11
            return (root.is = factory(is));                                                                           // 12
        });                                                                                                           // 13
    } else if(typeof exports === 'object') {                                                                          // 14
        // Node. Does not work with strict CommonJS, but                                                              // 15
        // only CommonJS-like enviroments that support module.exports,                                                // 16
        // like Node.                                                                                                 // 17
        module.exports = factory(require('is_js'));                                                                   // 18
    } else {                                                                                                          // 19
        // Browser globals (root is window)                                                                           // 20
        root.is = factory(root.is);                                                                                   // 21
    }                                                                                                                 // 22
} (this, function(is) {                                                                                               // 23
                                                                                                                      // 24
    // Baseline                                                                                                       // 25
    /* -------------------------------------------------------------------------- */                                  // 26
                                                                                                                      // 27
    var root = this || global;                                                                                        // 28
    var previousIs = root.is;                                                                                         // 29
                                                                                                                      // 30
    // define 'is' object and current version                                                                         // 31
    is = {};                                                                                                          // 32
    is.VERSION = '0.7.3';                                                                                             // 33
                                                                                                                      // 34
    // define interfaces                                                                                              // 35
    is.not = {};                                                                                                      // 36
    is.all = {};                                                                                                      // 37
    is.any = {};                                                                                                      // 38
                                                                                                                      // 39
    // cache some methods to call later on                                                                            // 40
    var toString = Object.prototype.toString;                                                                         // 41
    var arraySlice = Array.prototype.slice;                                                                           // 42
    var hasOwnProperty = Object.prototype.hasOwnProperty;                                                             // 43
                                                                                                                      // 44
    // helper function which reverses the sense of predicate result                                                   // 45
    function not(func) {                                                                                              // 46
        return function() {                                                                                           // 47
            return !func.apply(null, arraySlice.call(arguments));                                                     // 48
        };                                                                                                            // 49
    }                                                                                                                 // 50
                                                                                                                      // 51
    // helper function which call predicate function per parameter and return true if all pass                        // 52
    function all(func) {                                                                                              // 53
        return function() {                                                                                           // 54
            var parameters = arraySlice.call(arguments);                                                              // 55
            var length = parameters.length;                                                                           // 56
            if(length === 1 && is.array(parameters[0])) {    // support array                                         // 57
                parameters = parameters[0];                                                                           // 58
                length = parameters.length;                                                                           // 59
            }                                                                                                         // 60
            for (var i = 0; i < length; i++) {                                                                        // 61
                if (!func.call(null, parameters[i])) {                                                                // 62
                    return false;                                                                                     // 63
                }                                                                                                     // 64
            }                                                                                                         // 65
            return true;                                                                                              // 66
        };                                                                                                            // 67
    }                                                                                                                 // 68
                                                                                                                      // 69
    // helper function which call predicate function per parameter and return true if any pass                        // 70
    function any(func) {                                                                                              // 71
        return function() {                                                                                           // 72
            var parameters = arraySlice.call(arguments);                                                              // 73
            var length = parameters.length;                                                                           // 74
            if(length === 1 && is.array(parameters[0])) {    // support array                                         // 75
                parameters = parameters[0];                                                                           // 76
                length = parameters.length;                                                                           // 77
            }                                                                                                         // 78
            for (var i = 0; i < length; i++) {                                                                        // 79
                if (func.call(null, parameters[i])) {                                                                 // 80
                    return true;                                                                                      // 81
                }                                                                                                     // 82
            }                                                                                                         // 83
            return false;                                                                                             // 84
        };                                                                                                            // 85
    }                                                                                                                 // 86
                                                                                                                      // 87
    // Type checks                                                                                                    // 88
    /* -------------------------------------------------------------------------- */                                  // 89
                                                                                                                      // 90
    // is a given value Arguments?                                                                                    // 91
    is.arguments = function(value) {    // fallback check is for IE                                                   // 92
        return is.not.null(value) && (toString.call(value) === '[object Arguments]' || (typeof value === 'object' && 'callee' in value));
    };                                                                                                                // 94
                                                                                                                      // 95
    // is a given value Array?                                                                                        // 96
    is.array = Array.isArray || function(value) {    // check native isArray first                                    // 97
        return toString.call(value) === '[object Array]';                                                             // 98
    };                                                                                                                // 99
                                                                                                                      // 100
    // is a given value Boolean?                                                                                      // 101
    is.boolean = function(value) {                                                                                    // 102
        return value === true || value === false || toString.call(value) === '[object Boolean]';                      // 103
    };                                                                                                                // 104
                                                                                                                      // 105
    // is a given value Date Object?                                                                                  // 106
    is.date = function(value) {                                                                                       // 107
        return toString.call(value) === '[object Date]';                                                              // 108
    };                                                                                                                // 109
                                                                                                                      // 110
    // is a given value Error object?                                                                                 // 111
    is.error = function(value) {                                                                                      // 112
        return toString.call(value) === '[object Error]';                                                             // 113
    };                                                                                                                // 114
                                                                                                                      // 115
    // is a given value function?                                                                                     // 116
    is.function = function(value) {    // fallback check is for IE                                                    // 117
        return toString.call(value) === '[object Function]' || typeof value === 'function';                           // 118
    };                                                                                                                // 119
                                                                                                                      // 120
    // is a given value NaN?                                                                                          // 121
    is.nan = function(value) {    // NaN is number :) Also it is the only value which does not equal itself           // 122
        return value !== value;                                                                                       // 123
    };                                                                                                                // 124
                                                                                                                      // 125
    // is a given value null?                                                                                         // 126
    is.null = function(value) {                                                                                       // 127
        return value === null || toString.call(value) === '[object Null]';                                            // 128
    };                                                                                                                // 129
                                                                                                                      // 130
    // is a given value number?                                                                                       // 131
    is.number = function(value) {                                                                                     // 132
        return is.not.nan(value) && toString.call(value) === '[object Number]';                                       // 133
    };                                                                                                                // 134
                                                                                                                      // 135
    // is a given value object?                                                                                       // 136
    is.object = function(value) {                                                                                     // 137
        var type = typeof value;                                                                                      // 138
        return type === 'function' || type === 'object' && !!value;                                                   // 139
    };                                                                                                                // 140
                                                                                                                      // 141
    // is given value a pure JSON object?                                                                             // 142
    is.json = function(value) {                                                                                       // 143
        return toString.call(value) === '[object Object]';                                                            // 144
    };                                                                                                                // 145
                                                                                                                      // 146
    // is a given value RegExp?                                                                                       // 147
    is.regexp = function(value) {                                                                                     // 148
        return toString.call(value) === '[object RegExp]';                                                            // 149
    };                                                                                                                // 150
                                                                                                                      // 151
    // are given values same type?                                                                                    // 152
    // prevent NaN, Number same type check                                                                            // 153
    is.sameType = function(value1, value2) {                                                                          // 154
        if(is.nan(value1) || is.nan(value2)) {                                                                        // 155
            return is.nan(value1) === is.nan(value2);                                                                 // 156
        }                                                                                                             // 157
        return toString.call(value1) === toString.call(value2);                                                       // 158
    };                                                                                                                // 159
    // sameType method does not support 'all' and 'any' interfaces                                                    // 160
    is.sameType.api = ['not'];                                                                                        // 161
                                                                                                                      // 162
    // is a given value String?                                                                                       // 163
    is.string = function(value) {                                                                                     // 164
        return toString.call(value) === '[object String]';                                                            // 165
    };                                                                                                                // 166
                                                                                                                      // 167
    // is a given value Char?                                                                                         // 168
    is.char = function(value) {                                                                                       // 169
        return is.string(value) && value.length === 1;                                                                // 170
    };                                                                                                                // 171
                                                                                                                      // 172
    // is a given value undefined?                                                                                    // 173
    is.undefined = function(value) {                                                                                  // 174
        return value === void 0;                                                                                      // 175
    };                                                                                                                // 176
                                                                                                                      // 177
    // Presence checks                                                                                                // 178
    /* -------------------------------------------------------------------------- */                                  // 179
                                                                                                                      // 180
    //is a given value empty? Objects, arrays, strings                                                                // 181
    is.empty = function(value) {                                                                                      // 182
        if(is.object(value)){                                                                                         // 183
            var num = Object.getOwnPropertyNames(value).length;                                                       // 184
            if(num === 0 || (num === 1 && is.array(value)) || (num === 2 && is.arguments(value))){                    // 185
                return true;                                                                                          // 186
            }                                                                                                         // 187
            return false;                                                                                             // 188
        } else {                                                                                                      // 189
            return value === '';                                                                                      // 190
        }                                                                                                             // 191
    };                                                                                                                // 192
                                                                                                                      // 193
    // is a given value existy?                                                                                       // 194
    is.existy = function(value) {                                                                                     // 195
        return value !== null && value !== undefined;                                                                 // 196
    };                                                                                                                // 197
                                                                                                                      // 198
    // is a given value truthy?                                                                                       // 199
    is.truthy = function(value) {                                                                                     // 200
        return is.existy(value) && value !== false && is.not.nan(value) && value !== "" && value !== 0;               // 201
    };                                                                                                                // 202
                                                                                                                      // 203
    // is a given value falsy?                                                                                        // 204
    is.falsy = not(is.truthy);                                                                                        // 205
                                                                                                                      // 206
    // is a given value space?                                                                                        // 207
    // horizantal tab: 9, line feed: 10, vertical tab: 11, form feed: 12, carriage return: 13, space: 32              // 208
    is.space =  function(value) {                                                                                     // 209
        if(is.char(value)) {                                                                                          // 210
            var characterCode = value.charCodeAt(0);                                                                  // 211
            return (characterCode >  8 && characterCode < 14) || characterCode === 32;                                // 212
        } else {                                                                                                      // 213
            return false;                                                                                             // 214
        }                                                                                                             // 215
    };                                                                                                                // 216
                                                                                                                      // 217
    // Arithmetic checks                                                                                              // 218
    /* -------------------------------------------------------------------------- */                                  // 219
                                                                                                                      // 220
    // are given values equal? supports numbers, strings, regexps, booleans                                           // 221
    // TODO: Add object and array support                                                                             // 222
    is.equal = function(value1, value2) {                                                                             // 223
        // check 0 and -0 equity with Infinity and -Infinity                                                          // 224
        if(is.all.number(value1, value2)) {                                                                           // 225
            return value1 === value2 && 1 / value1 === 1 / value2;                                                    // 226
        }                                                                                                             // 227
        // check regexps as strings too                                                                               // 228
        if(is.all.string(value1, value2) || is.all.regexp(value1, value2)) {                                          // 229
            return '' + value1 === '' + value2;                                                                       // 230
        }                                                                                                             // 231
        if(is.all.boolean(value1, value2)) {                                                                          // 232
            return value1 === value2;                                                                                 // 233
        }                                                                                                             // 234
        return false;                                                                                                 // 235
    };                                                                                                                // 236
    // equal method does not support 'all' and 'any' interfaces                                                       // 237
    is.equal.api = ['not'];                                                                                           // 238
                                                                                                                      // 239
    // is a given number even?                                                                                        // 240
    is.even = function(numb) {                                                                                        // 241
        return is.number(numb) && numb % 2 === 0;                                                                     // 242
    };                                                                                                                // 243
                                                                                                                      // 244
    // is a given number odd?                                                                                         // 245
    is.odd = function(numb) {                                                                                         // 246
        return is.number(numb) && numb % 2 !== 0;                                                                     // 247
    };                                                                                                                // 248
                                                                                                                      // 249
    // is a given number positive?                                                                                    // 250
    is.positive = function(numb) {                                                                                    // 251
        return is.number(numb) && numb > 0;                                                                           // 252
    };                                                                                                                // 253
                                                                                                                      // 254
    // is a given number negative?                                                                                    // 255
    is.negative = function(numb) {                                                                                    // 256
        return is.number(numb) && numb < 0;                                                                           // 257
    };                                                                                                                // 258
                                                                                                                      // 259
    // is a given number above minimum parameter?                                                                     // 260
    is.above = function(numb, min) {                                                                                  // 261
        return is.all.number(numb, min) && numb > min;                                                                // 262
    };                                                                                                                // 263
    // above method does not support 'all' and 'any' interfaces                                                       // 264
    is.above.api = ['not'];                                                                                           // 265
                                                                                                                      // 266
    // is a given number above maximum parameter?                                                                     // 267
    is.under = function(numb, max) {                                                                                  // 268
        return is.all.number(numb, max) && numb < max;                                                                // 269
    };                                                                                                                // 270
    // least method does not support 'all' and 'any' interfaces                                                       // 271
    is.under.api = ['not'];                                                                                           // 272
                                                                                                                      // 273
    // is a given number within minimum and maximum parameters?                                                       // 274
    is.within = function(numb, min, max) {                                                                            // 275
        return is.all.number(numb, min, max) && numb > min && numb < max;                                             // 276
    };                                                                                                                // 277
    // within method does not support 'all' and 'any' interfaces                                                      // 278
    is.within.api = ['not'];                                                                                          // 279
                                                                                                                      // 280
    // is a given number decimal?                                                                                     // 281
    is.decimal = function(numb) {                                                                                     // 282
        return is.number(numb) && numb % 1 !== 0;                                                                     // 283
    };                                                                                                                // 284
                                                                                                                      // 285
    // is a given number integer?                                                                                     // 286
    is.integer = function(numb) {                                                                                     // 287
        return is.number(numb) && numb % 1 === 0;                                                                     // 288
    };                                                                                                                // 289
                                                                                                                      // 290
    // is a given number finite?                                                                                      // 291
    is.finite = isFinite || function(numb) {                                                                          // 292
        return numb !== Infinity && numb !== -Infinity && is.not.nan(numb);                                           // 293
    };                                                                                                                // 294
                                                                                                                      // 295
    // is a given number infinite?                                                                                    // 296
    is.infinite = not(is.finite);                                                                                     // 297
                                                                                                                      // 298
    // Regexp checks                                                                                                  // 299
    /* -------------------------------------------------------------------------- */                                  // 300
    // Steven Levithan, Jan Goyvaerts: Regular Expressions Cookbook                                                   // 301
    // Scott Gonzalez: Email address validation                                                                       // 302
                                                                                                                      // 303
    // eppPhone match extensible provisioning protocol format                                                         // 304
    // nanpPhone match north american number plan format                                                              // 305
    // dateString match m/d/yy and mm/dd/yyyy, allowing any combination of one or two digits for the day and month, and two or four digits for the year
    // time match hours, minutes, and seconds, 24-hour clock                                                          // 307
    var regexps = {                                                                                                   // 308
        url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,                                        // 309
        email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
        creditCard: /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
        alphaNumeric: /^[A-Za-z0-9]+$/,                                                                               // 312
        timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,                                              // 313
        dateString: /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/,                           // 314
        usZipCode: /^[0-9]{5}(?:-[0-9]{4})?$/,                                                                        // 315
        caPostalCode: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\s?[0-9][A-Z][0-9]$/,                                          // 316
        ukPostCode: /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/,                // 317
        nanpPhone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,                                              // 318
        eppPhone: /^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/,                                                              // 319
        socialSecurityNumber: /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/,                           // 320
        affirmative: /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/,                                                          // 321
        hexadecimal: /^[0-9a-fA-F]+$/,                                                                                // 322
        hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,                                                              // 323
        ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,              // 324
        ipv6: /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
        ip: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
    };                                                                                                                // 327
                                                                                                                      // 328
    // create regexp checks methods from 'regexp' object                                                              // 329
    for(var regexp in regexps) {                                                                                      // 330
        if(regexps.hasOwnProperty(regexp)) {                                                                          // 331
            regexpCheck(regexp, regexps);                                                                             // 332
        }                                                                                                             // 333
    }                                                                                                                 // 334
                                                                                                                      // 335
    function regexpCheck(regexp, regexps) {                                                                           // 336
        is[regexp] = function(value) {                                                                                // 337
            return regexps[regexp].test(value);                                                                       // 338
        };                                                                                                            // 339
    }                                                                                                                 // 340
                                                                                                                      // 341
    // String checks                                                                                                  // 342
    /* -------------------------------------------------------------------------- */                                  // 343
                                                                                                                      // 344
    // is a given string include parameter substring?                                                                 // 345
    is.include = function(str, substr) {                                                                              // 346
        return str.indexOf(substr) > -1;                                                                              // 347
    };                                                                                                                // 348
    // include method does not support 'all' and 'any' interfaces                                                     // 349
    is.include.api = ['not'];                                                                                         // 350
                                                                                                                      // 351
    // is a given string all uppercase?                                                                               // 352
    is.upperCase = function(str) {                                                                                    // 353
        return is.string(str) && str === str.toUpperCase();                                                           // 354
    };                                                                                                                // 355
                                                                                                                      // 356
    // is a given string all lowercase?                                                                               // 357
    is.lowerCase = function(str) {                                                                                    // 358
        return is.string(str) && str === str.toLowerCase();                                                           // 359
    };                                                                                                                // 360
                                                                                                                      // 361
    // is string start with a given startWith parameter?                                                              // 362
    is.startWith = function(str, startWith) {                                                                         // 363
        return is.string(str) && str.indexOf(startWith) === 0;                                                        // 364
    };                                                                                                                // 365
    // startWith method does not support 'all' and 'any' interfaces                                                   // 366
    is.startWith.api = ['not'];                                                                                       // 367
                                                                                                                      // 368
    // is string end with a given endWith parameter?                                                                  // 369
    is.endWith = function(str, endWith) {                                                                             // 370
        return is.string(str) && str.indexOf(endWith) > -1 && str.indexOf(endWith) === str.length -  endWith.length;  // 371
    };                                                                                                                // 372
    // endWith method does not support 'all' and 'any' interfaces                                                     // 373
    is.endWith.api = ['not'];                                                                                         // 374
                                                                                                                      // 375
    // is a given string or sentence capitalized?                                                                     // 376
    is.capitalized = function(str) {                                                                                  // 377
        if(is.not.string(str)) {                                                                                      // 378
            return false;                                                                                             // 379
        }                                                                                                             // 380
        var words = str.split(' ');                                                                                   // 381
        var capitalized = [];                                                                                         // 382
        for(var i = 0; i < words.length; i++) {                                                                       // 383
            capitalized.push(words[i][0] === words[i][0].toUpperCase());                                              // 384
        }                                                                                                             // 385
        return is.all.truthy.apply(null, capitalized);                                                                // 386
    };                                                                                                                // 387
                                                                                                                      // 388
    // is a given string palindrome?                                                                                  // 389
    is.palindrome = function(str) {                                                                                   // 390
        return is.string(str) && str == str.split('').reverse().join('');                                             // 391
    };                                                                                                                // 392
                                                                                                                      // 393
    // Time checks                                                                                                    // 394
    /* -------------------------------------------------------------------------- */                                  // 395
                                                                                                                      // 396
    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];                        // 397
    var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
                                                                                                                      // 399
    // is a given date indicate today?                                                                                // 400
    is.today = function(obj) {                                                                                        // 401
        var now = new Date();                                                                                         // 402
        var todayString = now.toDateString();                                                                         // 403
        return is.date(obj) && obj.toDateString() === todayString;                                                    // 404
    };                                                                                                                // 405
                                                                                                                      // 406
    // is a given date indicate yesterday?                                                                            // 407
    is.yesterday = function(obj) {                                                                                    // 408
        var now = new Date();                                                                                         // 409
        var yesterdayString = new Date(now.setDate(now.getDate() - 1)).toDateString();                                // 410
        return is.date(obj) && obj.toDateString() === yesterdayString;                                                // 411
    };                                                                                                                // 412
                                                                                                                      // 413
    // is a given date indicate tomorrow?                                                                             // 414
    is.tomorrow = function(obj) {                                                                                     // 415
        var now = new Date();                                                                                         // 416
        var tomorrowString = new Date(now.setDate(now.getDate() + 1)).toDateString();                                 // 417
        return is.date(obj) && obj.toDateString() === tomorrowString;                                                 // 418
    };                                                                                                                // 419
                                                                                                                      // 420
    // is a given date past?                                                                                          // 421
    is.past = function(obj) {                                                                                         // 422
        var now = new Date();                                                                                         // 423
        return is.date(obj) && obj.getTime() < now.getTime();                                                         // 424
    };                                                                                                                // 425
                                                                                                                      // 426
    // is a given date future?                                                                                        // 427
    is.future = not(is.past);                                                                                         // 428
                                                                                                                      // 429
    // is a given dates day equal given dayString parameter?                                                          // 430
    is.day = function(obj, dayString) {                                                                               // 431
        return is.date(obj) && dayString.toLowerCase() === days[obj.getDay()];                                        // 432
    };                                                                                                                // 433
    // day method does not support 'all' and 'any' interfaces                                                         // 434
    is.day.api = ['not'];                                                                                             // 435
                                                                                                                      // 436
    // is a given dates month equal given monthString parameter?                                                      // 437
    is.month = function(obj, monthString) {                                                                           // 438
        return is.date(obj) && monthString.toLowerCase() === months[obj.getMonth()];                                  // 439
    };                                                                                                                // 440
    // month method does not support 'all' and 'any' interfaces                                                       // 441
    is.month.api = ['not'];                                                                                           // 442
                                                                                                                      // 443
    // is a given dates year equal given year parameter?                                                              // 444
    is.year = function(obj, year) {                                                                                   // 445
        return is.date(obj) && is.number(year) && year === obj.getFullYear();                                         // 446
    };                                                                                                                // 447
    // year method does not support 'all' and 'any' interfaces                                                        // 448
    is.year.api = ['not'];                                                                                            // 449
                                                                                                                      // 450
    // is the given year a leap year?                                                                                 // 451
    is.leapYear = function(year) {                                                                                    // 452
        return is.number(year) && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);                         // 453
    };                                                                                                                // 454
                                                                                                                      // 455
    // is a given date weekend?                                                                                       // 456
    // 6: Saturday, 0: Sunday                                                                                         // 457
    is.weekend = function(obj) {                                                                                      // 458
        return is.date(obj) && (obj.getDay() === 6 || obj.getDay() === 0);                                            // 459
    };                                                                                                                // 460
                                                                                                                      // 461
    // is a given date weekday?                                                                                       // 462
    is.weekday = not(is.weekend);                                                                                     // 463
                                                                                                                      // 464
    // is date within given range?                                                                                    // 465
    is.inDateRange = function(obj, startObj, endObj) {                                                                // 466
        if(is.not.date(obj) || is.not.date(startObj) || is.not.date(endObj)) {                                        // 467
            return false;                                                                                             // 468
        }                                                                                                             // 469
        var givenDate = obj.getTime();                                                                                // 470
        var start = startObj.getTime();                                                                               // 471
        var end = endObj.getTime();                                                                                   // 472
        return givenDate > start && givenDate < end;                                                                  // 473
    };                                                                                                                // 474
    // inDateRange method does not support 'all' and 'any' interfaces                                                 // 475
    is.inDateRange.api = ['not'];                                                                                     // 476
                                                                                                                      // 477
    // is a given date in last week range?                                                                            // 478
    is.inLastWeek = function(obj) {                                                                                   // 479
        return is.inDateRange(obj, new Date(new Date().setDate(new Date().getDate() - 7)), new Date());               // 480
    };                                                                                                                // 481
                                                                                                                      // 482
    // is a given date in last month range?                                                                           // 483
    is.inLastMonth = function(obj) {                                                                                  // 484
        return is.inDateRange(obj, new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date());             // 485
    };                                                                                                                // 486
                                                                                                                      // 487
    // is a given date in last year range?                                                                            // 488
    is.inLastYear = function(obj) {                                                                                   // 489
        return is.inDateRange(obj, new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date());       // 490
    };                                                                                                                // 491
                                                                                                                      // 492
    // is a given date in next week range?                                                                            // 493
    is.inNextWeek = function(obj) {                                                                                   // 494
        return is.inDateRange(obj, new Date(), new Date(new Date().setDate(new Date().getDate() + 7)));               // 495
    };                                                                                                                // 496
                                                                                                                      // 497
    // is a given date in next month range?                                                                           // 498
    is.inNextMonth = function(obj) {                                                                                  // 499
        return is.inDateRange(obj, new Date(), new Date(new Date().setMonth(new Date().getMonth() + 1)));             // 500
    };                                                                                                                // 501
                                                                                                                      // 502
    // is a given date in next year range?                                                                            // 503
    is.inNextYear = function(obj) {                                                                                   // 504
        return is.inDateRange(obj, new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)));       // 505
    };                                                                                                                // 506
                                                                                                                      // 507
    // is a given date in the parameter quarter?                                                                      // 508
    is.quarterOfYear = function(obj, quarterNumber) {                                                                 // 509
        return is.date(obj) && is.number(quarterNumber) && quarterNumber === Math.floor((obj.getMonth() + 3) / 3);    // 510
    };                                                                                                                // 511
    // quarterOfYear method does not support 'all' and 'any' interfaces                                               // 512
    is.quarterOfYear.api = ['not'];                                                                                   // 513
                                                                                                                      // 514
    // is a given date in daylight saving time?                                                                       // 515
    is.dayLightSavingTime = function(obj) {                                                                           // 516
        var january = new Date(obj.getFullYear(), 0, 1);                                                              // 517
        var july = new Date(obj.getFullYear(), 6, 1);                                                                 // 518
        var stdTimezoneOffset = Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());                      // 519
        return obj.getTimezoneOffset() < stdTimezoneOffset;                                                           // 520
    };                                                                                                                // 521
                                                                                                                      // 522
    // Environment checks                                                                                             // 523
    /* -------------------------------------------------------------------------- */                                  // 524
                                                                                                                      // 525
    // check if library is used as a Node.js module                                                                   // 526
    if(typeof window !== 'undefined') {                                                                               // 527
                                                                                                                      // 528
        // store navigator properties to use later                                                                    // 529
        var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || ''; // 530
        var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';          // 531
        var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';
                                                                                                                      // 533
        // is current browser chrome?                                                                                 // 534
        is.chrome = function() {                                                                                      // 535
            return /chrome|chromium/i.test(userAgent) && /google inc/.test(vendor);                                   // 536
        };                                                                                                            // 537
        // chrome method does not support 'all' and 'any' interfaces                                                  // 538
        is.chrome.api = ['not'];                                                                                      // 539
                                                                                                                      // 540
        // is current browser firefox?                                                                                // 541
        is.firefox = function() {                                                                                     // 542
            return /firefox/i.test(userAgent);                                                                        // 543
        };                                                                                                            // 544
        // firefox method does not support 'all' and 'any' interfaces                                                 // 545
        is.firefox.api = ['not'];                                                                                     // 546
                                                                                                                      // 547
        // is current browser internet explorer?                                                                      // 548
        // parameter is optional                                                                                      // 549
        is.ie = function(version) {                                                                                   // 550
            if(!version) {                                                                                            // 551
                return /msie/i.test(userAgent) || "ActiveXObject" in window;                                          // 552
            }                                                                                                         // 553
            if(version >= 11) {                                                                                       // 554
                return "ActiveXObject" in window;                                                                     // 555
            }                                                                                                         // 556
            return new RegExp('msie ' + version).test(userAgent);                                                     // 557
        };                                                                                                            // 558
        // ie method does not support 'all' and 'any' interfaces                                                      // 559
        is.ie.api = ['not'];                                                                                          // 560
                                                                                                                      // 561
        // is current browser opera?                                                                                  // 562
        is.opera = function() {                                                                                       // 563
            return /^Opera\//.test(userAgent) || // Opera 12 and older versions                                       // 564
                /\x20OPR\//.test(userAgent); // Opera 15+                                                             // 565
        };                                                                                                            // 566
        // opera method does not support 'all' and 'any' interfaces                                                   // 567
        is.opera.api = ['not'];                                                                                       // 568
                                                                                                                      // 569
        // is current browser safari?                                                                                 // 570
        is.safari = function() {                                                                                      // 571
            return /safari/i.test(userAgent) && /apple computer/i.test(vendor);                                       // 572
        };                                                                                                            // 573
        // safari method does not support 'all' and 'any' interfaces                                                  // 574
        is.safari.api = ['not'];                                                                                      // 575
                                                                                                                      // 576
        // is current device ios?                                                                                     // 577
        is.ios = function() {                                                                                         // 578
            return is.iphone() || is.ipad() || is.ipod();                                                             // 579
        };                                                                                                            // 580
        // ios method does not support 'all' and 'any' interfaces                                                     // 581
        is.ios.api = ['not'];                                                                                         // 582
                                                                                                                      // 583
        // is current device iphone?                                                                                  // 584
        is.iphone = function() {                                                                                      // 585
            return /iphone/i.test(userAgent);                                                                         // 586
        };                                                                                                            // 587
        // iphone method does not support 'all' and 'any' interfaces                                                  // 588
        is.iphone.api = ['not'];                                                                                      // 589
                                                                                                                      // 590
        // is current device ipad?                                                                                    // 591
        is.ipad = function() {                                                                                        // 592
            return /ipad/i.test(userAgent);                                                                           // 593
        };                                                                                                            // 594
        // ipad method does not support 'all' and 'any' interfaces                                                    // 595
        is.ipad.api = ['not'];                                                                                        // 596
                                                                                                                      // 597
        // is current device ipod?                                                                                    // 598
        is.ipod = function() {                                                                                        // 599
            return /ipod/i.test(userAgent);                                                                           // 600
        };                                                                                                            // 601
        // ipod method does not support 'all' and 'any' interfaces                                                    // 602
        is.ipod.api = ['not'];                                                                                        // 603
                                                                                                                      // 604
        // is current device android?                                                                                 // 605
        is.android = function() {                                                                                     // 606
            return /android/i.test(userAgent);                                                                        // 607
        };                                                                                                            // 608
        // android method does not support 'all' and 'any' interfaces                                                 // 609
        is.android.api = ['not'];                                                                                     // 610
                                                                                                                      // 611
        // is current device android phone?                                                                           // 612
        is.androidPhone = function() {                                                                                // 613
            return /android/i.test(userAgent) && /mobile/i.test(userAgent);                                           // 614
        };                                                                                                            // 615
        // androidPhone method does not support 'all' and 'any' interfaces                                            // 616
        is.androidPhone.api = ['not'];                                                                                // 617
                                                                                                                      // 618
        // is current device android tablet?                                                                          // 619
        is.androidTablet = function() {                                                                               // 620
            return /android/i.test(userAgent) && !/mobile/i.test(userAgent);                                          // 621
        };                                                                                                            // 622
        // androidTablet method does not support 'all' and 'any' interfaces                                           // 623
        is.androidTablet.api = ['not'];                                                                               // 624
                                                                                                                      // 625
        // is current device blackberry?                                                                              // 626
        is.blackberry = function() {                                                                                  // 627
            return /blackberry/i.test(userAgent) || /BB10/i.test(userAgent);                                          // 628
        };                                                                                                            // 629
        // blackberry method does not support 'all' and 'any' interfaces                                              // 630
        is.blackberry.api = ['not'];                                                                                  // 631
                                                                                                                      // 632
        // is current device desktop?                                                                                 // 633
        is.desktop = function() {                                                                                     // 634
            return is.not.mobile() && is.not.tablet();                                                                // 635
        };                                                                                                            // 636
        // desktop method does not support 'all' and 'any' interfaces                                                 // 637
        is.desktop.api = ['not'];                                                                                     // 638
                                                                                                                      // 639
        // is current operating system linux?                                                                         // 640
        is.linux = function() {                                                                                       // 641
            return /linux/i.test(appVersion);                                                                         // 642
        };                                                                                                            // 643
        // linux method does not support 'all' and 'any' interfaces                                                   // 644
        is.linux.api = ['not'];                                                                                       // 645
                                                                                                                      // 646
        // is current operating system mac?                                                                           // 647
        is.mac = function() {                                                                                         // 648
            return /mac/i.test(appVersion);                                                                           // 649
        };                                                                                                            // 650
        // mac method does not support 'all' and 'any' interfaces                                                     // 651
        is.mac.api = ['not'];                                                                                         // 652
                                                                                                                      // 653
        // is current operating system windows?                                                                       // 654
        is.windows = function() {                                                                                     // 655
            return /win/i.test(appVersion);                                                                           // 656
        };                                                                                                            // 657
        // windows method does not support 'all' and 'any' interfaces                                                 // 658
        is.windows.api = ['not'];                                                                                     // 659
                                                                                                                      // 660
        // is current device windows phone?                                                                           // 661
        is.windowsPhone = function() {                                                                                // 662
            return is.windows() && /phone/i.test(userAgent);                                                          // 663
        };                                                                                                            // 664
        // windowsPhone method does not support 'all' and 'any' interfaces                                            // 665
        is.windowsPhone.api = ['not'];                                                                                // 666
                                                                                                                      // 667
        // is current device windows tablet?                                                                          // 668
        is.windowsTablet = function() {                                                                               // 669
            return is.windows() && is.not.windowsPhone() && /touch/i.test(userAgent);                                 // 670
        };                                                                                                            // 671
        // windowsTablet method does not support 'all' and 'any' interfaces                                           // 672
        is.windowsTablet.api = ['not'];                                                                               // 673
                                                                                                                      // 674
        // is current device mobile?                                                                                  // 675
        is.mobile = function() {                                                                                      // 676
            return is.iphone() || is.ipod() || is.androidPhone() || is.blackberry() || is.windowsPhone();             // 677
        };                                                                                                            // 678
        // mobile method does not support 'all' and 'any' interfaces                                                  // 679
        is.mobile.api = ['not'];                                                                                      // 680
                                                                                                                      // 681
        // is current device tablet?                                                                                  // 682
        is.tablet = function() {                                                                                      // 683
            return is.ipad() || is.androidTablet() || is.windowsTablet();                                             // 684
        };                                                                                                            // 685
        // tablet method does not support 'all' and 'any' interfaces                                                  // 686
        is.tablet.api = ['not'];                                                                                      // 687
                                                                                                                      // 688
        // is current state online?                                                                                   // 689
        is.online = function() {                                                                                      // 690
            return navigator.onLine;                                                                                  // 691
        };                                                                                                            // 692
        // online method does not support 'all' and 'any' interfaces                                                  // 693
        is.online.api = ['not'];                                                                                      // 694
                                                                                                                      // 695
        // is current state offline?                                                                                  // 696
        is.offline = not(is.online);                                                                                  // 697
        // offline method does not support 'all' and 'any' interfaces                                                 // 698
        is.offline.api = ['not'];                                                                                     // 699
                                                                                                                      // 700
        // is current device supports touch?                                                                          // 701
        is.touchDevice = function() {                                                                                 // 702
            return 'ontouchstart' in window ||'DocumentTouch' in window && document instanceof DocumentTouch;         // 703
        };                                                                                                            // 704
        // touchDevice method does not support 'all' and 'any' interfaces                                             // 705
        is.touchDevice.api = ['not'];                                                                                 // 706
    }                                                                                                                 // 707
                                                                                                                      // 708
    // Object checks                                                                                                  // 709
    /* -------------------------------------------------------------------------- */                                  // 710
                                                                                                                      // 711
    // has a given object got parameterized count property?                                                           // 712
    is.propertyCount = function(obj, count) {                                                                         // 713
        if(!is.object(obj) || !is.number(count)) {                                                                    // 714
            return false;                                                                                             // 715
        }                                                                                                             // 716
        if(Object.keys) {                                                                                             // 717
            return Object.keys(obj).length === count;                                                                 // 718
        }                                                                                                             // 719
        var properties = [],                                                                                          // 720
            property;                                                                                                 // 721
        for(property in obj) {                                                                                        // 722
            if (hasOwnProperty.call(obj, property)) {                                                                 // 723
                properties.push(property);                                                                            // 724
            }                                                                                                         // 725
        }                                                                                                             // 726
        return properties.length === count;                                                                           // 727
    };                                                                                                                // 728
    // propertyCount method does not support 'all' and 'any' interfaces                                               // 729
    is.propertyCount.api = ['not'];                                                                                   // 730
                                                                                                                      // 731
    // is given object has parameterized property?                                                                    // 732
    is.propertyDefined = function(obj, property) {                                                                    // 733
        return is.object(obj) && is.string(property) && property in obj;                                              // 734
    };                                                                                                                // 735
    // propertyDefined method does not support 'all' and 'any' interfaces                                             // 736
    is.propertyDefined.api = ['not'];                                                                                 // 737
                                                                                                                      // 738
    // is a given object window?                                                                                      // 739
    // setInterval method is only available for window object                                                         // 740
    is.windowObject = function(obj) {                                                                                 // 741
        return typeof obj === 'object' && 'setInterval' in obj;                                                       // 742
    };                                                                                                                // 743
                                                                                                                      // 744
    // is a given object a DOM node?                                                                                  // 745
    is.domNode = function(obj) {                                                                                      // 746
        return is.object(obj) && obj.nodeType > 0;                                                                    // 747
    };                                                                                                                // 748
                                                                                                                      // 749
    // Array checks                                                                                                   // 750
    /* -------------------------------------------------------------------------- */                                  // 751
                                                                                                                      // 752
    // is a given item in an array?                                                                                   // 753
    is.inArray = function(val, arr){                                                                                  // 754
        if(is.not.array(arr)) {                                                                                       // 755
            return false;                                                                                             // 756
        }                                                                                                             // 757
        for(var i = 0; i < arr.length; i++) {                                                                         // 758
            if (arr[i] === val) return true;                                                                          // 759
        }                                                                                                             // 760
        return false;                                                                                                 // 761
    };                                                                                                                // 762
    // inArray method does not support 'all' and 'any' interfaces                                                     // 763
    is.inArray.api = ['not'];                                                                                         // 764
                                                                                                                      // 765
    // is a given array sorted?                                                                                       // 766
    is.sorted = function(arr) {                                                                                       // 767
        if(is.not.array(arr)) {                                                                                       // 768
            return false;                                                                                             // 769
        }                                                                                                             // 770
        for(var i = 0; i < arr.length; i++) {                                                                         // 771
            if(arr[i] > arr[i + 1]) return false;                                                                     // 772
        }                                                                                                             // 773
        return true;                                                                                                  // 774
    };                                                                                                                // 775
                                                                                                                      // 776
    // API                                                                                                            // 777
    // Set 'not', 'all' and 'any' interfaces to methods based on their api property                                   // 778
    /* -------------------------------------------------------------------------- */                                  // 779
                                                                                                                      // 780
    function setInterfaces() {                                                                                        // 781
        var options = is;                                                                                             // 782
        for(var option in options) {                                                                                  // 783
            if(hasOwnProperty.call(options, option) && is.function(options[option])) {                                // 784
                var interfaces = options[option].api || ['not', 'all', 'any'];                                        // 785
                for (var i = 0; i < interfaces.length; i++) {                                                         // 786
                    if(interfaces[i] === 'not') {                                                                     // 787
                        is.not[option] = not(is[option]);                                                             // 788
                    }                                                                                                 // 789
                    if(interfaces[i] === 'all') {                                                                     // 790
                        is.all[option] = all(is[option]);                                                             // 791
                    }                                                                                                 // 792
                    if(interfaces[i] === 'any') {                                                                     // 793
                        is.any[option] = any(is[option]);                                                             // 794
                    }                                                                                                 // 795
                }                                                                                                     // 796
            }                                                                                                         // 797
        }                                                                                                             // 798
    }                                                                                                                 // 799
    setInterfaces();                                                                                                  // 800
                                                                                                                      // 801
    // Configuration methods                                                                                          // 802
    // Intentionally added after setInterfaces function                                                               // 803
    /* -------------------------------------------------------------------------- */                                  // 804
                                                                                                                      // 805
    // set optional regexps to methods if you think they suck                                                         // 806
    is.setRegexp = function(regexp, regexpName) {                                                                     // 807
        for(var r in regexps) {                                                                                       // 808
            if(hasOwnProperty.call(regexps, r) && (regexpName === r)) {                                               // 809
                regexps[r] = regexp;                                                                                  // 810
            }                                                                                                         // 811
        }                                                                                                             // 812
    };                                                                                                                // 813
                                                                                                                      // 814
    // change namespace of library to prevent name collisions                                                         // 815
    // var preferredName = is.setNamespace();                                                                         // 816
    // preferredName.odd(3);                                                                                          // 817
    // => true                                                                                                        // 818
    is.setNamespace = function() {                                                                                    // 819
        root.is = previousIs;                                                                                         // 820
        return this;                                                                                                  // 821
    };                                                                                                                // 822
                                                                                                                      // 823
    return is;                                                                                                        // 824
}));                                                                                                                  // 825
                                                                                                                      // 826
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("isjs:is");

})();
