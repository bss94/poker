import "./App.css";
import Card from "./components/Card.tsx";

function App() {

    return (
        <div className="playingCards faceImages">
            <Card rank = 'k' suit='diams'/>
            <Card rank = 'q' suit='spades'/>
            <Card rank = '2' suit='hearts'/>
            <Card rank = 'j' suit='clubs'/>
        </div>
    );
}
export default App;
