import '../styles/Scoreboard.css'

export default function Scoreboard() {
    return(
        <div className="scoreboard">
            <div className="score-container">        
                <h4>CURRENT SCORE</h4>
                <div className="score-box">
                    15
                </div>
            </div>
            <div className="score-container">  
                <h4>BEST SCORE</h4>
                <div className="score-box">
                    22
                </div>
            </div>
        </div>
    )
}