import React from "react";

export interface Shortcut {
  key: string;
  callback: () => void;
}

export const ShortcutContext = React.createContext<Shortcut[]>([]);
