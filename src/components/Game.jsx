import '../styles/Game.css'
import { useState,useEffect } from 'react'
import shootConfetti from './confetti'

async function getDeckID() {
    try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        const data = await response.json()

        return data.deck_id
    } catch(err) {
        throw new Error(err)
    }
}

async function getCards(id) {
    try {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=18`)
        const data = await response.json()

        return data.cards
    } catch(err) {
        throw new Error(err)
    }
}

export default function Game({ currentScore, bestScore, setCurrentScore, setBestScore }) {
    const [deckID, setDeckID] = useState(null)
    const [cards, setCards] = useState([])
    const [error, setError] = useState(null)
    const [seenCards, setSeenCards] = useState([])
    const [totalCardsFound, setCardsFound] = useState(0)
    const [flip, setFlip] = useState(false)
    const [gameActive, setGameStatus] = useState(true)

    useEffect(() => {
        async function intializeGame() {
            const id = await getDeckID()
            setDeckID(id)
            const initialCards = await getCards(id)
            setCards(initialCards)
        }

        intializeGame()
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

    async function loadNextRound() {
        setFlip(true)
        setTimeout(async () => {
            const newCards = await getCards(deckID)
            setCards(newCards)
            setSeenCards([])
            setFlip(false)
        }, 600)
    }

    function handleClick(code) {
        if (gameActive && !flip) {
            if (seenCards.includes(code)) {
                setSeenCards([])
                setGameStatus(false)

                if (currentScore > bestScore) {
                    setBestScore(currentScore)
                    shootConfetti()
                }

            } else {
                setSeenCards(prev => [...prev, code])
                setCurrentScore(current => current + 1)
                setFlip(true)

                const newTotal = totalCardsFound + 1
                setCardsFound(newTotal)
                
                if (seenCards.length + 1 === 18) {
                    if (newTotal >= 52) {
                        alert('WINNER, you found all the cards!')
                    } else {
                        loadNextRound()
                    }
                }

                setTimeout(() => {
                    setCards(shuffle(cards))

                    setTimeout(() => {
                        setFlip(false)
                    }, 300)
                }, 600)
            }
        }
    }

    function handleRestart () {
        async function getNewCards() {
            try {
                const id = await getDeckID()
                const deck = await getCards(id)
                setCards(deck)
            } catch(err) {
                setError(err.message)
            }
        }

        setCurrentScore(0)
        getNewCards()
        setGameStatus(true)
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
        {!gameActive && <button className='reset-button' onClick={handleRestart}>Restart Game</button>}
        </main>
        </>
    )
}