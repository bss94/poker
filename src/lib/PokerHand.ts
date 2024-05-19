import card from './Card.ts';


class PokerHand {
    private result: string;

    constructor(hand: card[]) {
        const handSuits: string[] = hand.map((el: card) => {
            return el.suit;
        });
        const handRanks: string[] = hand.map((el: card): string => {
            if (el.rank !== 'a' && el.rank !== 'k' && el.rank !== 'q' && el.rank !== 'j') {
                return el.rank;
            } else {
                switch (el.rank) {
                    case 'j':
                        return '11';
                    case 'q':
                        return '12';
                    case 'k':
                        return '13';
                    case 'a':
                        return '14';
                }
            }
        });
        handRanks.sort((a: string, b: string) => {
            return parseInt(a) - parseInt(b);
        });
        handSuits.sort();

        let flash: boolean = false;
        if (handSuits[0] === handSuits[handSuits.length - 1]) {
            flash = true;
        }

        let street: boolean = true;
        for (let i: number = 0; i < handRanks.length; i++) {
            if (i < handRanks.length - 1) {
                if (parseInt(handRanks[i + 1]) !== parseInt(handRanks[i]) + 1 && street) {
                    street = false;
                    break;
                }
            }
        }

        this.result = '';
        if (street && flash) {
            if (handRanks[handRanks.length - 1] === '14') {
                this.result = 'Royal Flash';
            }
            this.result = 'Street Flash';
        } else if (!street && flash) {
            this.result = 'Flash';
        } else if (street && !flash) {
            this.result = 'Street';
        }
        if (this.result === '') {
            const duplicates:string[] = handRanks.filter((number, index, numbers) => {
                return numbers.indexOf(number) !== index;
            });
            if (duplicates.length === 3 && duplicates[0] !== duplicates[duplicates.length - 1]) {
                this.result = 'Full House';

            } else if (duplicates.length === 3 && duplicates[0] === duplicates[duplicates.length - 1]) {
                this.result = 'Square';
            } else if (duplicates.length > 0 && duplicates.length < 3) {
                const result:number[] = duplicates.map((el:string) => {
                    let count:number = 0;
                    for (let i:number = 0; i < handRanks.length; i++) {
                        if (el === handRanks[i]) {
                            count++;
                        }
                    }
                    return count;
                });
                if (result.length === 1) {
                    this.result = 'One pair';
                } else if (result.length === 2 && result[0] === 2) {
                    this.result = 'Two pair';
                } else {
                    this.result = 'Set';
                }
            }
        }
        if (this.result === '') {
            let hightCard:string = '0';
            for (let i = 0; i < handRanks.length; i++) {
                if (parseInt(handRanks[i]) > parseInt(hightCard)) {
                    hightCard = handRanks[i];
                }
            }
            switch (hightCard) {
                case '11':
                    hightCard = 'j';
                    break;
                case '12':
                    hightCard = 'q';
                    break;
                case '13':
                    hightCard = 'k';
                    break;
                case '14':
                    hightCard = 'a';
                    break;
            }
            this.result = 'Bigger card : ' + hightCard.toUpperCase();
        }
    }

    getOutcome():string {
        return this.result;
    }
}

export default PokerHand;