import { createContext } from "react";

export const UserContext = createContext({
    userInfo : {role: -1, user_id: -1},
    setUserInfo : () => {}
})
