import { useState, useEffect } from "react";
import { AiOutlineQuestion, AiOutlineArrowDown } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useShortcutEventListener } from "../utils";

const Announce = () => {
  const [show, setShow] = useState<boolean>(false);
  const [announcement, setAnnouncement] = useState<string>("this text box isn't centered lol");

  const eventListener = useShortcutEventListener("a", [show], () => {
    setShow(!show);
  });

  useEffect(() => {
    document.addEventListener("keydown", eventListener);

    return () => {
      document.removeEventListener("keydown", eventListener);
    };
  }, [eventListener]);

  return (
    <div id="announce" style={{display: (show) ? "flex" : "none"}}>
      <h2>Announcement</h2>
      <input
        value={announcement}
        onChange={(e) => setAnnouncement(e.target.value)}
        autoFocus
        />
      <h2 style={{marginTop: '3rem'}}>Presets</h2>
      <button onClick={() => setAnnouncement('COME UP IF YOU HAVEN\'T PLAYED YET')}>Game over</button>
      <button onClick={() => setAnnouncement('thanks for coming, come back next week')}>Meeting over</button>
      {/* <button onClick={() => setAnnouncement('shh or gander will come to your house')}>be quiet lol</button> */}
    </div>
  );
};

export default Announce;
