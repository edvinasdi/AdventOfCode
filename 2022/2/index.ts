import { readFileSync } from 'fs';
/*
    A and X - rock
    B and Y - paper
    C and Z - scissors
*/

const signAwards: SignAward[] = [
    { sign: 'rock', points: 1 },
    { sign: 'papper', points: 2 },
    { sign: 'scissors', points: 3 },
];

const victoryConditions: VictoryCondition[] = [
    { playerSign: 'rock', opponentSign: 'rock', pointsForPlayer: 3 },
    { playerSign: 'rock', opponentSign: 'papper', pointsForPlayer: 0 },
    { playerSign: 'rock', opponentSign: 'scissors', pointsForPlayer: 6 },

    { playerSign: 'papper', opponentSign: 'rock', pointsForPlayer: 6 },
    { playerSign: 'papper', opponentSign: 'papper', pointsForPlayer: 3 },
    { playerSign: 'papper', opponentSign: 'scissors', pointsForPlayer: 0 },
    
    { playerSign: 'scissors', opponentSign: 'rock', pointsForPlayer: 0 },
    { playerSign: 'scissors', opponentSign: 'papper', pointsForPlayer: 6 },
    { playerSign: 'scissors', opponentSign: 'scissors', pointsForPlayer: 3 },
];

const getSignFromSymbol = (symbol: String): Sign => {
    switch(symbol) {
        case 'A':
        case 'X':
            return 'rock';
        case 'B':
        case 'Y':
            return 'papper';
        case 'C':
        case 'Z':
            return 'scissors';
    }

    throw Error(`Could not find sign for symbol ${symbol}`);
};

const getSignForPartTwo = (symbol: string, opponentSign: Sign): Sign => {
    let result;
    switch (symbol) {
        case 'X':
            result = victoryConditions.find(condition => condition.pointsForPlayer === 0 && condition.opponentSign === opponentSign)?.playerSign;
            break;
        case 'Y':
            result = victoryConditions.find(condition => condition.pointsForPlayer === 3 && condition.opponentSign === opponentSign)?.playerSign;
            break;
        case 'Z':
            result = victoryConditions.find(condition => condition.pointsForPlayer === 6 && condition.opponentSign === opponentSign)?.playerSign;
            break;
    }

    if(!result) {
        throw Error(`No condition found for symbol ${symbol} with opponent sign being ${opponentSign}`);
    }

    return result;
}

const main = (file: string): number => {
    let totalPoints = 0;

    const lines = file.split(/\r?\n/);
    for(let i = 0; i < lines.length; i++) {
        if(!lines[i]) {
            continue;
        }

        const symbols = lines[i].split(' ');

        console.log(lines[i]);
        const opponentSign = getSignFromSymbol(symbols[0]);
        //const playerSign = getSignFromSymbol(symbols[1]);
        const playerSign = getSignForPartTwo(symbols[1], opponentSign);

        console.log(opponentSign, playerSign);

        const victoryPoints = victoryConditions.find(condition => condition.playerSign === playerSign && condition.opponentSign === opponentSign)?.pointsForPlayer ?? 0;
        const signPoints = signAwards.find(s => s.sign === playerSign)?.points ?? 0;

        totalPoints += victoryPoints + signPoints;
        // Part one result: 8392
    }

    return totalPoints;
}

const file = readFileSync('./2022/2/input.txt', 'utf-8');
console.log(main(file));

