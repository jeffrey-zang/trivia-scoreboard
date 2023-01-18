import { useState, useEffect } from "react";
import { useShortcutEventListener } from "../utils";

import { BsArrowUp } from "react-icons/bs";

const JohnCounter = () => {
  const [show, setShow] = useState<boolean>(false);
  const [johns, addJohn] = useState<number>(0);

  const eventListener = useShortcutEventListener("j", [show], () => {
    setShow(!show);
  });

  useEffect(() => {
    document.addEventListener("keydown", eventListener);

    return () => {
      document.removeEventListener("keydown", eventListener);
    };
  }, [eventListener]);

  return (
    <div id="johncounter" style={{display: show ? "block" : "none"}}>
        <h1>
            {johns} johns
            <button onClick={() => addJohn(johns + 1)} style={{marginLeft: 'auto', marginRight: 'auto'}}><BsArrowUp/></button>
        </h1>
    </div>
  );
};

export default JohnCounter;
