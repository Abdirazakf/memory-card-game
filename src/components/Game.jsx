import '../styles/Game.css'
import { useState,useEffect } from 'react'

async function getDeckID() {
    try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        const data = await response.json()

        return data.deck_id
    } catch(err){
        throw new Error(err)
    }
}

export default function Game() {
    const [deckID, setDeckID] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchDeck() {
            try {
                const id = await getDeckID()
                setDeckID(id)
            } catch(err) {
                setError(err.message)
            }
        }

        fetchDeck()
    }, [])

    console.log(deckID)

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <main>
            <div className="game-container">
                {/* Sample - The Game cards will go here */}
                <div className="card">'card-1'</div>
                <div className="card">'card-2'</div>
                <div className="card">'card-3'</div>
                <div className="card">'card-4'</div>
                <div className="card">'card-5'</div>
                <div className="card">'card-6'</div>
                <div className="card">'card-7'</div>
                <div className="card">'card-8'</div>
                <div className="card">'card-9'</div>
                <div className="card">'card-10'</div>
                <div className="card">'card-11'</div>
                <div className="card">'card-12'</div>
                <div className="card">'card-13'</div>
                <div className="card">'card-14'</div>
                <div className="card">'card-15'</div>
                <div className="card">'card-16'</div>
                <div className="card">'card-17'</div>
                <div className="card">'card-18'</div>
            </div>
        </main>
    )
}