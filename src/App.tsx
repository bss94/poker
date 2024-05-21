import './App.css';
import Card from './components/Card/Card.tsx';
import CardDeck from './lib/CardDeck.ts';
import {useState} from 'react';
import card from './lib/Card.ts';
import PokerHand from './lib/PokerHand.ts';


function App() {
    const [hand, setHand] = useState<card[]>([]);
    const [deck, setDeck] = useState<CardDeck>();
    const [checked, setChecked] = useState<boolean[]>(
        new Array(5).fill(false)
    );
    const [canSkip, setCanSkip] = useState<boolean>(true);
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
        setChecked(new Array(5).fill(false));
        setCanSkip(true);
    };
    const reset = () => {
        setDeck(undefined);
        setHand([]);
        setCanSkip(true);
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
    const handleOnChange = (position: number) => {
        const updatedCheckedState: boolean[] = checked.map((item, index): boolean =>
            index === position ? !item : item
        );
        setChecked(updatedCheckedState);
    };
    const getSkipAndDeal = () => {
        const onHand: card[] =[...hand];
        const toChange: boolean[] = [...checked];
        if (deck !== undefined) {
            const newHand: card[] = onHand.map((el, index): card => {
                if (toChange[index]) {
                    const newCard: card[] = deck.getCard();
                    return newCard[0];
                } else {
                    return el;
                }
            });
            setHand(newHand);
            setCanSkip(false);
        }
    };

    return (
        <>
            {!deck ? <button onClick={start}>Start game</button> :
                <>
                    {deck ? <p>Cards on deck: {deck.deck.length}</p> : <p>Deck empty</p>}
                    {deck.deck.length === 0 ? <div>
                            <button onClick={reset}>New game</button>
                            <button onClick={end}>End game</button>
                        </div> :
                        <div>
                            <button onClick={step}>Get cards</button>
                            {canSkip ? (checked.includes(true) ?
                                    <div>
                                        <button onClick={getSkipAndDeal}>Skip and deal</button>
                                    </div> :
                                    <p className={'message-first'}>Click to card if you wanna skip they</p>) :
                                <p className={'message'}>Your card/s skipped,you cant skip before next round
                                    started!</p>
                            }
                        </div>
                    }
                    <p> {poker()} </p>
                    <div className="playingCards faceImages">
                        {hand.map((el: card, index: number) => {
                            if (canSkip) {
                                return <div className={'cards-check'} key={el.rank + el.suit}>
                                    <input type={'checkbox'} id={el.rank + el.suit} className={'checkbox'}
                                           checked={checked[index]}
                                           onChange={() => handleOnChange(index)}/>
                                    <label htmlFor={el.rank + el.suit} className={'check-lbl'}>
                                        <Card rank={el.rank} suit={el.suit}/> </label>
                                </div>;
                            } else {
                                return <Card rank={el.rank} suit={el.suit} key={el.rank + el.suit}/>;
                            }
                        })}
                    </div>
                </>
            }
        </>
    );
}

export default App;
