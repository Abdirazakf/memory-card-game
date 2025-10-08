import '../styles/App.css'
import Scoreboard from './Scoreboard'
import Game from './Game'

function App() {
    let currentScore = 0
    let bestScore = 0
    return(
        <>
        <header>
            <h1>Poker Memory Challenge</h1>
        </header>
        <Scoreboard currentScore={currentScore} bestScore={bestScore}/>
        <Game />
        </>
    )
}

export default App
