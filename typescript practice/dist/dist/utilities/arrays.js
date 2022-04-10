"use strict";
// Concatenate two arrays
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar)
                    ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cut3 = exports.lgNum = exports.addArr = exports.concatArr = void 0;
var concatArr = function (arr1, arr2) {
    return __spreadArray(__spreadArray([], arr1, true), arr2, true);
};
exports.concatArr = concatArr;
// Add numbers in an array
var addArr = function (arr) {
    var total = 0;
    arr.forEach(function (x) {
        total += x;
    });
    return total;
};
exports.addArr = addArr;
// Find the largest number in an array
var lgNum = function (arr) {
    var largest = 0;
    arr.forEach(function (x) {
        if (x > largest) {
            largest = x;
        }
    });
    return largest;
};
exports.lgNum = lgNum;
// Remove the 3rd item from an array
var cut3 = function (arr) {
    arr.splice(2, 1);
    return arr;
};
exports.cut3 = cut3;
