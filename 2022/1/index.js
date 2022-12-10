"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const file = (0, fs_1.readFileSync)('./2022/1/input.txt', 'utf-8');
var elfsBelongings = [];
var currentElfCalorieCount = 0;
file.split(/\r?\n/).forEach(line => {
    if (!line) {
        elfsBelongings.push(currentElfCalorieCount);
        currentElfCalorieCount = 0;
    }
    else {
        currentElfCalorieCount += Number(line);
    }
});
console.log('Part 1 answer = ', Math.max(...elfsBelongings));
elfsBelongings.sort((a, b) => { return b - a; }).splice(3);
console.log('Part 2 answer = ', elfsBelongings.reduce((partialSum, currentValue) => partialSum + currentValue, 0));
