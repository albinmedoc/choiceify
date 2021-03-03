import Player from './player';
import Question from './question';
import CardDeck from './cardDeck';
import Card from './card';

class Game {
    private pin: string;

    private players: Player[] = [];

    private questions: Question[] = [];
    private deck: CardDeck = new CardDeck();

    constructor(questions: string[], cards: { [key: string]: string[] }) {

        // Generate pin, this method need to be changed, there is a small chance
        // games will get the same pin
        this.pin = (Math.floor(Math.random() * 90000) + 10000).toString();

        // Shuffle questions
        questions.sort(() => Math.random() - 0.5);

        // Loop every question
        questions.forEach((question) => {
            // Add the question to the game
            this.questions.push(new Question(question));
        });

        // Loop every category
        for (const [category, _cards] of Object.entries(cards)) {

            // Shuffle cards
            _cards.sort(() => Math.random() - 0.5);

            // Loop every card
            _cards.forEach((text) => {
                // Add the card to the deck
                this.deck.addCard(new Card(text, category));
            });
        }
    }

    getPin() {
        return this.pin;
    }

    addPlayer(name: string) {
        const player = new Player(name);
        this.players.push(player);
    }

    getPlayers() {
        return this.players;
    }

    popQuestion() {
        return this.questions.pop();
    }

    distributeCards() {
        // Loop every player
        this.players.forEach((player) => {
            // Get the player´s deck
            const deck = player.getDeck();

            // Loop every category in game
            for (const [category] of Object.entries(this.deck)) {

                // Get how many cards the player is missing for the category
                let missing = 4 - (deck.getCards(category) as [Card]).length;

                // Add the missing cards to the player´s deck
                while (missing > 0) {
                    deck.addCard(this.deck.popCard(category));
                    missing--;
                }
            }
        });
    }
}

export default Game;