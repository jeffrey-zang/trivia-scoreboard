import { useState, FC, useCallback, useEffect } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { AiOutlineReload } from "react-icons/ai";
import { useShortcutEventListener, useAudio } from "../utils";
// import { useReward } from "react-rewards";

interface TeamProps {
    teamNumber: number;
}

const Team: FC<TeamProps> = ({ teamNumber }) => {
    let choice = Math.floor(Math.random() * 3);
    console.log(choice);
    // const { reward, isAnimating } = useReward(`reward${teamNumber}`, (choice === 0) ? "balloons" : "confetti", {
    //   lifetime: 175,
    //   elementCount: 20,
    //   spread: 60,
    // });
    const [teamName, setTeamName] = useState<string>(
        teamNumber === 1 ? "Team A" : "Team B"
    );
    const [score, setScore] = useState<number>(0);
    const [scoreInput, setScoreInput] = useState<string>(score.toString());
    const [focusState, setFocusState] = useState<boolean>(false);
    const [playing, togglePlaying, audio] = useAudio("/Assets/ding.mp3");

    const incrementScore = useCallback(() => {
        setScore((s) => s + 10);
        try {
            audio.play();
        } catch {}
        // reward();
    }, [audio]);

    const eventListener = useShortcutEventListener(
        teamNumber.toString(),
        [score, togglePlaying],
        () => {
            new Audio("/Assets/ding.mp3").play();
            setScore(score + 10);
            // reward();
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

    const handleTeamClick = useCallback(
        (e: ReactMouseEvent<HTMLDivElement>) => {
            const target = e.target as HTMLElement;
            // Ignore clicks that originate from inputs or buttons
            if (target.closest("input, button, textarea")) return;
            incrementScore();
        },
        [incrementScore]
    );

    return (
        <div className="team" onClick={handleTeamClick} role="button" aria-label={`Increment score for ${teamName}`}>
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
                    const parsed = parseInt(scoreInput);
                    setScore(isNaN(parsed) ? 0 : parsed);
                }}
                className="score"
            />
            <div className="buttons">
                <button
                    onClick={() => {
                        setScore(score + 10);
                        audio.play();
                        // reward();
                    }}
                >
                    <span id={`reward${teamNumber}`}>
                        <BsArrowUp />
                    </span>
                </button>
                <button onClick={() => setScore(score - 10)}>
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
