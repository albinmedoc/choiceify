class Games {
    games = {};

    addGame(game_data: any){
        const pin = (Math.floor(Math.random()*90000) + 10000).toString();
        this.games[pin] = game_data;
        return pin;
    }

    removeGame(pin: string) {
        delete this.games[pin];
    }

    getGame(pin: string) {
        if(!(pin in this.games))
            return false;
        return this.games[pin];
    }
}

export default Games;