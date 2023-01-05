import { useState, useEffect } from "react";
import { AiOutlineQuestion } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useShortcutEventListener } from "./utils";

const Help = () => {
  const [show, setShow] = useState<boolean>(false);

  const eventListener = useShortcutEventListener("/", [show], () => {
    setShow(!show);
  });

  useEffect(() => {
    document.addEventListener("keydown", eventListener);

    return () => {
      document.removeEventListener("keydown", eventListener);
    };
  }, [eventListener]);

  return (
    <div id="help">
      <div id="helppopup" style={{ display: show ? "block" : "none" }}>
        <h2>Keyboard Shortcuts</h2>
        <table>
          <tr>
            <th>Key</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Give team 1 a point</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Give team 2 a point</td>
          </tr>
          <tr>
            <td>0</td>
            <td>Reset both teams' points</td>
          </tr>
          <tr>
            <td>space</td>
            <td>Start the timer</td>
          </tr>
          <tr>
            <td>r</td>
            <td>Reset the timer</td>
          </tr>
          <tr>
            <td>t</td>
            <td>Show theme tab</td>
          </tr>
          <tr>
            <td>c</td>
            <td>Show clues for Who Am I questions</td>
          </tr>
          <tr>
            <td>/</td>
            <td>halp</td>
          </tr>
          <button id="x" onClick={() => setShow(!show)}>
            <RxCross1 />
          </button>
        </table>
      </div>
      <button
        id="helpbutton"
        onClick={() => {
          setShow(!show);
        }}
      >
        <AiOutlineQuestion />
      </button>
    </div>
  );
};

export default Help;
