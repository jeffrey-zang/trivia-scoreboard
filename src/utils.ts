import {useCallback, useMemo, DependencyList, useState, useEffect} from "react"

export const useShortcutEventListener: (key: string, deps: DependencyList, callback: (e?: KeyboardEvent, target?: Element) => void) => any = (key, deps, callback) => {
    return useCallback<(e: KeyboardEvent) => void>((e) => {
        const target = e.target as Element
        if (target.nodeName !== "INPUT" && target.nodeName !== "TEXTAREA" && e.key === key) {
            callback(e, target)
        }
    }, deps.concat(callback, key))
}

export const useAudio: (url: string) => [boolean, () => void] = url => {
    const audio = useMemo(() => new Audio(url), [])
    const [playing, setPlaying] = useState<boolean>(false)

    const toggle = () => setPlaying(!playing)

    useEffect(() => {
        playing ? audio.play() : audio.pause()
    }, [playing, audio])

    useEffect(() => {
        audio.addEventListener("ended", () => setPlaying(false))
        console.log("AAAAAAAA")

        return () => {
            audio.removeEventListener("ended", () => setPlaying(false))
        }
    }, [audio])

    return [playing, toggle]
}