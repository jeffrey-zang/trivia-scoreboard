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

    const eventListener = useShortcutEventListener("g", [], () => {
        let refchosen = refs[Math.floor(Math.random() * refs.length)];
        if (refchosen.current != undefined) {
            refchosen.current.classList.toggle('show');
        }
        console.log('among')
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