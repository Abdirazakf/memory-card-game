import '../styles/Scoreboard.css'

export default function Scoreboard({ bestScore, currentScore}) {
    return(
        <div className="scoreboard">
            <div className="score-container">        
                <h4>CURRENT SCORE</h4>
                <div className="score-box">
                    {currentScore}
                </div>
            </div>
            <div className="score-container">  
                <h4>BEST SCORE</h4>
                <div className="score-box">
                    {bestScore}
                </div>
            </div>
        </div>
    )
}