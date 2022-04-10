"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lowerCase = exports.upperCase = exports.capitalize = exports.concat = void 0;
var concat = function (str1, str2) {
    return str1 + str2;
};
exports.concat = concat;
var capitalize = function (str) {
    var newStr = str.split(' ')
        .map(function (word) { return word[0].toUpperCase() + word.substr(1); })
        .join(' ');
    return newStr;
};
exports.capitalize = capitalize;
var upperCase = function (str) {
    return str.toUpperCase();
};
exports.upperCase = upperCase;
var lowerCase = function (str) {
    return str.toLowerCase();
};
exports.lowerCase = lowerCase;
