import './App.css';
import Card from './components/Card/Card.tsx';
import CardDeck from './lib/CardDeck.ts';


function App() {
    const cardDeck = new CardDeck();

    const hand = cardDeck.getCards(5);
    console.log(cardDeck);
    return (
        <div className="playingCards faceImages">
            {/*<Card rank={cardDeck.deck[1].rank} suit={cardDeck.deck[1].suit}/>*/}
            {/*<Card rank={ccc.rank} suit={ccc.suit}/>*/}
            {/*<Card rank="a" suit="hearts"/>*/}
            {/*<Card rank="j" suit="clubs"/>*/}
            {/*<Card rank="10" suit="clubs"/>*/}
            {hand.map((el) => {
                return <Card rank={el.rank} suit={el.suit} key={el.rank + el.suit}/>;
            })}
        </div>
    );
}

export default App;
