import React, { useState, useEffect } from "react";
import Team from "./components/Team";
import Timer from "./components/Timer";
import Help from "./components/Help";
import Announce from "./components/Announce";
import Gander from "./components/Gander";
import JohnCounter from "./components/JohnCounter";
import { useShortcutEventListener } from "./utils";

import { BsArrowDown, BsGithub } from "react-icons/bs";

function App() {
  const [theme, setTheme] = useState<string>("orphans");
  const [themeAmount, setThemeAmount] = useState<string>("4");
  const [showTheme, setShowTheme] = useState<boolean>(false);

  const [showClues, setShowClues] = useState<boolean>(false);
  const [packetType, setPacketType] = useState<boolean>(true); // intermediate: true; senior: false
  const [clueAmount, setClueAmount] = useState<number>(4);
  const [round, setRound] = useState<number>(1);
  const clues = ["D", "C", "B", "A"];

  const eventListener = useShortcutEventListener("t", [showTheme], () => {
    setShowTheme(!showTheme);
    setThemeAmount("4");
  });
  const eventListener2 = useShortcutEventListener("c", [showClues], () => {
    setShowClues(!showClues);
    setClueAmount(4);
  });

  const decrementListener = useShortcutEventListener(
    "ArrowDown",
    [clueAmount, themeAmount],
    () => {
      setThemeAmount((Number(themeAmount) - 1).toString());
      setClueAmount(clueAmount - 1);
    }
  );

  const resetEventListener = useShortcutEventListener("0", [packetType, round], () => {
    setRound(1);
    setPacketType(true)
  });

  useEffect(() => {
    document.addEventListener("keydown", eventListener);
    document.addEventListener("keydown", eventListener2);
    document.addEventListener("keydown", decrementListener);
    document.addEventListener("keydown", resetEventListener);

    return () => {
      document.removeEventListener("keydown", eventListener);
      document.removeEventListener("keydown", eventListener2);
      document.removeEventListener("keydown", decrementListener);
      document.removeEventListener("keydown", resetEventListener);
    };
  }, [eventListener, eventListener2]);

  return (
    <div className="App">
      <h1>Trivia Scoreboard</h1>
      <div id='packetinfo' onClick={() => setPacketType(!packetType)}>Packet type: {(packetType) ? "Intermediate" : "Senior"}</div>
      <div id='roundinfo' onClick={() => setRound(round + 1)}>Round {round}</div>

      <div id="wrapper">
        <Team teamNumber={1} />
        <Team teamNumber={2} />
      </div>
      <Timer />
      <div id="theme" style={{ display: showTheme ? "block" : "none" }}>
        <h1>
          <button
            onClick={(e) => {
              var amount = Number(themeAmount);
              let newamount = amount - 1;
              setThemeAmount(newamount.toString());
            }}
          >
            <BsArrowDown />
          </button>
          The next{" "}
          <input
            value={themeAmount}
            onChange={(e) => setThemeAmount(e.target.value)}
            className="themeinput"
            autoFocus
          />
          <br />
          questions deal with
          <br />
          <input
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="themeinput"
          />
        </h1>
      </div>
      <div id="clues" style={{ display: showClues ? "block" : "none" }}>
        <h1>
          <button
            onClick={(e) => {
              setClueAmount(clueAmount - 1);
            }}
          >
            <BsArrowDown />
          </button>
          Who am I question
          <br />
          Clue {clues[Number(clueAmount) - 1]}
          <br />
          {clueAmount} points
        </h1>
      </div>
      <JohnCounter/>
      <Help />
      <Announce />
      <Gander/>
    </div>
  );
}

export default App;
