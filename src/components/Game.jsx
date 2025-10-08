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

export default function Game({ currentScore, bestScore, setCurrentScore, setBestScore }) {
    const [cards, setCards] = useState([])
    const [error, setError] = useState(null)
    const [seenCards, setSeenCards] = useState([])
    const [gameActive, setGameStatus] = useState(true)

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

    if (error) {
        return <div>Error: {error}</div>
    }

    function handleClick(code) {
        if (gameActive) {
            if (seenCards.includes(code)) {
                console.log('Game Over')
                setSeenCards([])
                setGameStatus(false)

                if (currentScore > bestScore) {
                    setBestScore(currentScore)
                }

            } else {
                setSeenCards(prev => [...prev, code])
                console.log(`Card Added: ${code}`)
                setCurrentScore(current => current + 1)
            }
        }
    }

    return (
        <>
        <main>
            <div className="game-container">
                {cards.map(card => (
                    <div 
                    key={card.code} 
                    className='card' 
                    style={{ backgroundImage: `url(${card.image})`}}
                    onClick={() => handleClick(card.code)}
                    ></div>
                ))}
            </div>
        </main>
        </>
    )
}