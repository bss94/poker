import './App.css';
import Card from './components/Card/Card.tsx';
import CardDeck from './lib/CardDeck.ts';
import {useState} from 'react';
import card from './lib/Card.ts';
import PokerHand from './lib/PokerHand.ts';


function App() {
    const [hand, setHand] = useState<card[]>([]);
    const [deck, setDeck] = useState<CardDeck>();

    const start = () => {
        const cards: CardDeck = new CardDeck();
        setHand(cards.getCards(5));
        setDeck(cards);
    };
    const step = () => {
        if (deck !== undefined) {
            if (deck.deck.length >= 5) {
                setHand(deck.getCards(5));
            } else {
                setHand(deck.getCards(deck.deck.length));
            }
        }
    };
    const reset = () => {
        setDeck(undefined);
        setHand([]);
        //start();
    };
    const end = () => {
        setDeck(undefined);
        setHand([]);
    };
    const poker = () => {
        const poker = new PokerHand(hand);
        return poker.getOutcome();
    };

    return (
        <>
            {!deck ? <button onClick={start}>Start game</button> :
                <>
                    {deck ? <p>{deck.deck.length}</p> : <p>0</p>}
                    {deck.deck.length === 0 ? <div>
                            <button onClick={reset}>Reset</button>
                            <button onClick={end}>End</button>
                        </div> :
                        <button onClick={step}>Get cards</button>}
                        <p> {poker()} </p>
                        <div className="playingCards faceImages">
                            {hand.map((el) => {
                                return <Card rank={el.rank} suit={el.suit} key={el.rank + el.suit}/>;
                            })}

                        </div>
                </>

            }
        </>

    );
}

export default App;
