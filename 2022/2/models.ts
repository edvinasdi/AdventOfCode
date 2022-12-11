type Sign = 'rock' | 'papper' | 'scissors'
interface VictoryCondition {
    playerSign: Sign,
    opponentSign: Sign,
    pointsForPlayer: number,
}

interface SignAward {
    sign: Sign,
    points: number,
}