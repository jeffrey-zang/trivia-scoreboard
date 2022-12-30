import React, {useState} from 'react';
import Team from './Team'
import Timer from './Timer'

function App() {

  const [scoreOne, setScoreOne] = useState<number>(0)
  const [scoreTwo, setScoreTwo] = useState<number>(0)
  const [running, setRunning] = useState<boolean>(false);

  return (
    <div className="App" tabIndex={0} onKeyDown={(e) => {
      if (e.key === "1"){
        setScoreOne(scoreOne + 1)
      } else if (e.key === "2") {
        setScoreTwo(scoreTwo + 1)
      } else if (e.key === ' ') {
        setRunning(!running)
      }
  }}>
      <h1>Trivia Scoreboard</h1>
      
      <Timer {...{running, setRunning}}></Timer>
      <div id='wrapper'>
        <Team teamNumber={1} score={scoreOne} setScore={setScoreOne}/>
        <Team teamNumber={2} score={scoreTwo} setScore={setScoreTwo}/>
      </div>
    </div>
  );
}

export default App;
