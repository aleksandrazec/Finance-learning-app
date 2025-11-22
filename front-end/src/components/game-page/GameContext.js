import { createContext } from "react";

export const GameContext = createContext({
    currentBalance: 0,
    saving: 0,
    initialBalance: 0,
    ownedShares: {}
});