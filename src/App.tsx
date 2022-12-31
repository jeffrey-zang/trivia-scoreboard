import React, {useState} from 'react';
import Team from './Team'
import Timer from './Timer'
import Help from './Help'

import { BsArrowUp, BsArrowDown } from "react-icons/bs";

function App() {

  const [scoreOne, setScoreOne] = useState<number>(0)
  const [scoreTwo, setScoreTwo] = useState<number>(0)
  const [running, setRunning] = useState<boolean>(false);
  const [time, setTime] = useState(5000);

  const [theme, setTheme] = useState<string>("orphans")
  const [themeAmount, setThemeAmount] = useState<string>("4")
  const [showTheme, setShowTheme] = useState<boolean>(false)

  return (
    <div className="App" tabIndex={0} onKeyDown={(e) => {
      const target = e.target as HTMLElement;
      if( target.nodeName == "INPUT" || target.nodeName == "TEXTAREA" ) return;
      if (e.key === "1"){
        setScoreOne(scoreOne + 1)
      } else if (e.key === "2") {
        setScoreTwo(scoreTwo + 1)
      } else if (e.key === ' ') {
        setRunning(!running)
      } else if (e.key === 'r') {
        setTime(5000)
      } else if (e.key === 't') {
        setShowTheme(!showTheme)
      }
  }}>
      <h1>Trivia Scoreboard</h1>
      
      <Timer {...{running, setRunning, time, setTime}}></Timer>
      <div id='wrapper'>
        <Team teamNumber={1} score={scoreOne} setScore={setScoreOne}/>
        <Team teamNumber={2} score={scoreTwo} setScore={setScoreTwo}/>
      </div>
      <div id='theme' style={{display: (showTheme) ? 'block' : "none"}}>
        <h1>
          <button onClick={(e) => {
            var amount = Number(themeAmount)
            let newamount = amount - 1;
            setThemeAmount(newamount.toString())
          }}><BsArrowDown/></button>
          The next <input value={themeAmount} onChange={(e) => setThemeAmount(e.target.value)} className='themeinput'/> 
          <br/>questions deal with 
          <br/><input value={theme} onChange={(e) => setTheme(e.target.value)} className='themeinput'/></h1>
      </div>
      <Help/>
    </div>
  );
}

export default App;
