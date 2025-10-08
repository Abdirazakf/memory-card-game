import '../styles/Game.css'
import { useState,useEffect } from 'react'

async function getDeckID() {
    try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        const data = await response.json()

        return data.deck_id
    } catch(err) {
        throw new Error(err)
    }
}

async function getCards() {
    try {
        const id = await getDeckID()
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=18`)
        const data = await response.json()

        return data.cards
    } catch(err) {
        throw new Error(err)
    }
}

export default function Game() {
    const [cards, setCards] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchCards() {
            try {
                const deck = await getCards()
                setCards(deck)
            } catch(err) {
                setError(err.message)
            }
        }

        fetchCards()
    }, [])

    console.log(cards)

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <main>
            <div className="game-container">
                {cards.map(card => (
                    <div 
                        key={card.code} 
                        className='card' 
                        style={{ backgroundImage: `url(${card.image})`}}    
                    ></div>
                ))}
            </div>
        </main>
    )
}