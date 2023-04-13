import gander from '../assets/gander.png'
import mander from '../assets/mander.jpg'
import zander from '../assets/zander.png'
import { useShortcutEventListener } from "../utils";

import { useRef, useEffect, useState } from 'react'

const Gander = () => {

    const ref1= useRef<HTMLImageElement>(null);
    const ref2= useRef<HTMLImageElement>(null);
    const ref3= useRef<HTMLImageElement>(null);
    const refs = [ref1, ref2, ref3]
    const [show, setShow] = useState<boolean>(false);

    const eventListener = useShortcutEventListener("g", [], () => {
        if (show) {
            if (ref1.current && ref2.current && ref3.current) {
                ref1.current.className = '';
                ref2.current.className = '';
                ref3.current.className = '';
            }
            setShow(false)     
        } else {
            let refchosen = refs[Math.floor(Math.random() * refs.length)];
            if (refchosen.current != undefined) {
                refchosen.current.classList.toggle('show');
            }
            setShow(true)
        }
    });
    
      useEffect(() => {
        document.addEventListener("keydown", eventListener);
    
        return () => {
          document.removeEventListener("keydown", eventListener);
        };
      }, [eventListener]);    

    return (
        <div id='gander'>
            <img ref={ref1} src={mander} alt='mander'></img>
            <img ref={ref2} src={zander} alt='zander'></img>
            <img ref={ref3} src={gander} alt='gander'></img>
        </div>
    )
}
export default Gander;