import '../styles/App.css'
import Scoreboard from './Scoreboard'
import Game from './Game'
import { useState } from 'react'

function App() {
    const [currentScore, setCurrentScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)

    return(
        <>
        <header>
            <h1>Poker Memory Challenge</h1>
        </header>
        <Scoreboard 
            currentScore={currentScore} 
            bestScore={bestScore}/>
        <Game
            currentScore={currentScore}
            bestScore={bestScore}
            setBestScore={setBestScore}
            setCurrentScore={setCurrentScore}
        />
        </>
    )
}

export default App
