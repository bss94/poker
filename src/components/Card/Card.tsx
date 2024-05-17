import React from 'react';

interface Props {
    rank: string;
    suit: string;
}

interface Suit {
    key: string;
    symbol: string;
}

const Card: React.FC<Props> = ({rank, suit}) => {
    const suitCase: Suit[] = [
        {key: 'diams', symbol: '♦'},
        {key: 'hearts', symbol: '♥'},
        {key: 'clubs', symbol: '♣'},
        {key: 'spades', symbol: '♠'}
    ];

    return (
        <span className={`card rank-${rank} ${suit}`}>
            <span className="rank">{rank.toUpperCase()}</span>
            <span className="suit">
                {suitCase.map((el: Suit) => {
                    if (el.key === suit) {
                        return el.symbol;
                    }
                })}
            </span>
        </span>
    );
};

export default Card;