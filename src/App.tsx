import './App.css';
import Card from './components/Card/Card.tsx';
import CardDeck from './lib/CardDeck.ts';
import {useState} from 'react';
import card from './lib/Card.ts';
import PokerHand from './lib/PokerHand.ts';
import cardDeck from './lib/CardDeck.ts';


function App() {
    const [state, setState] = useState<card[]>([]);
    const [deck, setDeck] = useState<CardDeck>();

    const start = () => {
        const cards: cardDeck = new CardDeck();
        setState(cards.getCards(5));
        setDeck(cards);
    };
    const step = () => {
        if (deck !== undefined) {
            if (deck.deck.length >= 5) {
                setState(deck.getCards(5));
            } else {
                setState(deck.getCards(deck.deck.length));
            }
        }
    };
    const reset = () => {
        setDeck(undefined);
        setState([]);
        //start();
    };
    const end = () => {
        setDeck(undefined);
        setState([]);
    };
    const poker = () => {
        const poker = new PokerHand(state);
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
                        {state.map((el) => {
                            return <Card rank={el.rank} suit={el.suit} key={el.rank + el.suit}/>;
                        })}

                    </div>
                </>

            }
        </>

    );
}

export default App;
