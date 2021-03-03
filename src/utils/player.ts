import type CardDeck from './cardDeck';

class Player {

    private name: string;
    private points: number = 0;

    private deck: CardDeck;

    constructor(name: string) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    addPoints(amount: number) {
        this.points += amount;
    }

    getPoints() {
        return this.points;
    }

    getDeck() {
        return this.deck;
    }
}

export default Player;