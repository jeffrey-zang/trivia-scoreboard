import React, {useState} from 'react';
import Team from './Team'
import Timer from './Timer'
import Help from './Help'

function App() {

  const [scoreOne, setScoreOne] = useState<number>(0)
  const [scoreTwo, setScoreTwo] = useState<number>(0)
  const [running, setRunning] = useState<boolean>(false);
  const [time, setTime] = useState(5000);

  return (
    <div className="App" tabIndex={0} onKeyDown={(e) => {
      if (e.key === "1"){
        setScoreOne(scoreOne + 1)
      } else if (e.key === "2") {
        setScoreTwo(scoreTwo + 1)
      } else if (e.key === ' ') {
        setRunning(!running)
      } else if (e.key === 'r') {
        setTime(5000)
      }
  }}>
      <h1>Trivia Scoreboard</h1>
      
      <Timer {...{running, setRunning, time, setTime}}></Timer>
      <div id='wrapper'>
        <Team teamNumber={1} score={scoreOne} setScore={setScoreOne}/>
        <Team teamNumber={2} score={scoreTwo} setScore={setScoreTwo}/>
      </div>
      <div>
        <h1>The next 10 questions deal with orphans</h1>
      </div>
      <Help/>
    </div>
  );
}

export default App;
