// NOTE: This code has not been converted to TypeScript yet
import * as arrays from './utilities/arrays';
import * as numbers from './utilities/numbers.js';
import * as strings from './utilities/strings.js';

const numArr = [3, 4, 5, 6];
const wordArr = ['cat', 'dog', 'rabbit', 'bird'];
const arrSum = arrays.addArr(numArr);
const mixArr = arrays.concatArr(numArr, wordArr);
const myNum = <number>(<unknown>'15') % 2;

// results of function calls
console.log(arrays.cut3(mixArr));
console.log(numbers.sum(arrSum, myNum));
console.log(strings.capitalize('the quick brown fox'));
console.log(numbers.multiply('5' as unknown as number, 8));
// console.log(arrays.lgNum(mixArr));
