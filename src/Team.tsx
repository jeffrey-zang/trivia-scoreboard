import { useState, FC, Dispatch, SetStateAction } from "react";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { AiOutlineReload } from "react-icons/ai";

interface TeamProps {
    teamNumber: number;
    score: number;
    setScore: Dispatch<SetStateAction<number>>
}

const Team: FC<TeamProps> = ({teamNumber, score, setScore}) => {
    const [teamName, setTeamName] = useState<string>(teamNumber === 1 ? "Team A" : "Team B")
    const [scoreInput, setScoreInput] = useState<string>(score.toString())
    const [focusState, setFocusState] = useState<boolean>(false)

    return (
        <div className="team">
            <input value={teamName} onChange={(e) => setTeamName(e.target.value)} className="teamName" />
            <input value={focusState ? scoreInput : score} onChange={(e) => setScoreInput(e.target.value)} onFocus={() => {
                setFocusState(true)
                setScoreInput(score.toString())
            }} 
            onBlur={() => {
                setFocusState(false)
                setScore(parseInt(scoreInput))
            }} className="score" />
            <div className='buttons'>
                <button onClick={() => setScore(score + 1)}><BsArrowUp/></button>
                <button onClick={() => setScore(score - 1)}><BsArrowDown/></button>
                <button onClick={() => setScore(0)}><AiOutlineReload/></button>
            </div>
        </div>
    )
}

export default Team