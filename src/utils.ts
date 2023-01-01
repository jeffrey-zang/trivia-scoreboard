import {useCallback, DependencyList} from "react"

export const useShortcutEventListener: (key: string, deps: DependencyList, callback: (e?: KeyboardEvent, target?: Element) => void) => any = (key, deps, callback) => {
    return useCallback<(e: KeyboardEvent) => void>((e) => {
        const target = e.target as Element
        if (target.nodeName !== "INPUT" && target.nodeName !== "TEXTAREA" && e.key === key) {
            callback(e, target)
        }
    }, deps)
}