import './App.css';
import Card from './components/Card/Card.tsx';
import CardDeck from './lib/CardDeck.ts';
import {useState} from 'react';
import card from './lib/Card.ts';


function App() {
    const [state, setState] = useState<card[]>([]);
    const [deck, setDeck] = useState<CardDeck>();
    console.log(state);


    const start = () => {
        const cards = new CardDeck();
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
    };

    return (
        <>
            {!deck ? <button onClick={start}>start game</button> :
                <>
                    {deck ? <p>{deck.deck.length}</p> : <p>0</p>}
                    {deck.deck.length === 0 ? <button onClick={reset}>reset</button> :
                        <button onClick={step}>get cards</button>}
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
