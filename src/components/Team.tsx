import { useState, FC, useCallback, useEffect } from "react";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { AiOutlineReload } from "react-icons/ai";
import { useShortcutEventListener, useAudio } from "../utils";
import { useReward } from "react-rewards";

interface TeamProps {
  teamNumber: number;
}

const Team: FC<TeamProps> = ({ teamNumber }) => {
  const { reward, isAnimating } = useReward(`reward${teamNumber}`, "confetti", {
    lifetime: 175,
    elementCount: 40,
    spread: 60,
  });
  const [teamName, setTeamName] = useState<string>(
    teamNumber === 1 ? "Team A" : "Team B"
  );
  const [score, setScore] = useState<number>(0);
  const [scoreInput, setScoreInput] = useState<string>(score.toString());
  const [focusState, setFocusState] = useState<boolean>(false);
  const [playing, togglePlaying, audio] = useAudio("/Assets/ding.mp3");

  const eventListener = useShortcutEventListener(
    teamNumber.toString(),
    [score, togglePlaying],
    () => {
      audio.play();
      setScore(score + 1);
      reward();
    }
  );

  const resetEventListener = useShortcutEventListener("0", [score], () => {
    setScore(0);
  });

  useEffect(() => {
    document.addEventListener("keydown", eventListener);
    document.addEventListener("keydown", resetEventListener);

    return () => {
      document.removeEventListener("keydown", eventListener);
      document.removeEventListener("keydown", resetEventListener);
    };
  }, [score, togglePlaying, eventListener, resetEventListener]);

  return (
    <div className="team">
      <input
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        className="teamName"
      />
      <input
        value={focusState ? scoreInput : score}
        onChange={(e) => setScoreInput(e.target.value)}
        onFocus={() => {
          setFocusState(true);
          setScoreInput(score.toString());
        }}
        onBlur={() => {
          setFocusState(false);
          setScore(parseInt(scoreInput));
        }}
        className="score"
      />
      <div className="buttons">
        <button
          onClick={() => {
            setScore(score + 1);
            audio.play();
            reward();
          }}
        >
          <span id={`reward${teamNumber}`}>
            <BsArrowUp />
          </span>
        </button>
        <button onClick={() => setScore(score - 1)}>
          <BsArrowDown />
        </button>
        <button onClick={() => setScore(0)}>
          <AiOutlineReload />
        </button>
      </div>
    </div>
  );
};

export default Team;
