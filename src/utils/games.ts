import type Game from './game';

class Games {
    private games: Game[] = [];

    addGame(game: Game) {
        this.games.push(game);
    }

    removeGame(pin: string) {
        this.games = this.games.filter((game) => game.getPin() !== pin);
    }

    getGame(pin: string) {
        return this.games.filter((game) => game.getPin() === pin)[0]
    }
}

const instance = new Games();
Object.freeze(instance);

export default instance;