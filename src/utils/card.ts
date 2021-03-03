class Card {
    private text: string;
    private category: string;

    constructor(text: string, category: string) {
        this.text= text;
        this.category = category
    }

    getText() {
        return this.text;
    }

    getCategory() {
        return this.category;
    }
}

export default Card;