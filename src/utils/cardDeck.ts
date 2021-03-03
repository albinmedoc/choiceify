import type Card from './card';

class CardDeck {
    private cards: {[key: string] : Card[]};

    popCard(category: string) {
        return this.cards[category].pop();
    }

    addCard(card: Card) {
        this.cards[card.getCategory()].push(card);
    }

    getCards(category?: string){
        return !!category ? this.cards[category] : this.cards;
    }

    removeCard(category: string, text: string){
        this.cards[category] = this.cards[category].filter((card) => card.getText() !== text);
    }
}

export default CardDeck;