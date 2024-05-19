import Card from './Card.ts';

class CardDeck {
    private ranks: string[];
    private suits: string[];
    public deck: Card[];

    constructor() {
        this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];
        this.suits = ['diams', 'spades', 'clubs', 'hearts'];
        this.deck = [];
        for (let i = 0; i < this.suits.length; i++) {
            for (let j = 0; j < this.ranks.length; j++) {
                this.deck.push(new Card(`${this.ranks[j]}`, `${this.suits[i]}`));
            }
        }
    }

    getCard(): Card[] {
        const cardNum: number = Math.floor(Math.random() * this.deck.length);
        return this.deck.splice(cardNum, 1);
    }

    getCards(howMany: number): Card[] {
        const arr: Card[] = [];
        for (let i = 0; i < howMany; i++) {
            arr.push(this.getCard()[0]);
        }
        return arr;
    }
}

export default CardDeck;