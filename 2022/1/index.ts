import { readFileSync } from 'fs';
const file = readFileSync('./2022/1/input.txt', 'utf-8');
var elfsBelongings: number[] = [];
var currentElfCalorieCount = 0;
file.split(/\r?\n/).forEach(line => {
    if(!line) {
        elfsBelongings.push(currentElfCalorieCount);
        currentElfCalorieCount = 0;
    } else {
        currentElfCalorieCount += Number(line);
    }
});
console.log('Part 1 answer = ', Math.max(...elfsBelongings));
elfsBelongings.sort((a, b) => { return b-a; }).splice(3);
console.log('Part 2 answer = ', elfsBelongings.reduce((partialSum, currentValue) => partialSum + currentValue, 0));