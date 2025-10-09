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
    const [flip, setFlip] = useState(false)
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

    function shuffle(array) {
        const shuffled = [...array]
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        return shuffled
    }

    function handleClick(code) {
        if (gameActive && !flip) {
            if (seenCards.includes(code)) {
                console.log('Game Over')
                setSeenCards([])
                setGameStatus(false)

                if (currentScore > bestScore) {
                    setBestScore(currentScore)
                }

            } else {
                setSeenCards(prev => [...prev, code])
                setCurrentScore(current => current + 1)
                setFlip(true)

                setTimeout(() => {
                    setCards(shuffle(cards))

                    setTimeout(() => {
                        setFlip(false)
                    }, 300)
                }, 600)
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
                    className={flip ? 'card back' : 'card'}
                    style={!flip ? { backgroundImage: `url(${card.image})` } : {}}
                    onClick={() => handleClick(card.code)}
                    ></div>
                ))}
            </div>
        {!gameActive && <button className='reset-button'>Restart Game</button>}
        </main>
        </>
    )
}