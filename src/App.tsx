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
  const [clueAmount, setClueAmount] = useState<number>(4);
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

  useEffect(() => {
    document.addEventListener("keydown", eventListener);
    document.addEventListener("keydown", eventListener2);
    document.addEventListener("keydown", decrementListener);

    return () => {
      document.removeEventListener("keydown", eventListener);
      document.removeEventListener("keydown", eventListener2);
      document.removeEventListener("keydown", decrementListener);
    };
  }, [eventListener, eventListener2]);

  return (
    <div className="App">
      <h1>Trivia Scoreboard</h1>

      <Timer />
      <div id="wrapper">
        <Team teamNumber={1} />
        <Team teamNumber={2} />
      </div>
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
      <a
        id="github"
        href="https://github.com/jeffrey-zang/trivia-scorekeeper"
        target="_blank"
        rel="noreferrer"
      >
        <button>
          <BsGithub />
        </button>
      </a>
      <Gander/>
    </div>
  );
}

export default App;
