import React, { createContext ,useReducer} from "react";
import { userReducer } from "../reducers/userReducer";
import { initialState } from "../reducers/userReducer";
const userContext = createContext();
export const UserProvider = ({children})=>{
    const [state,dispatch] = useReducer(userReducer,initialState);
    return(
        <userContext.Provider value={{state,dispatch}}>
            {children}
        </userContext.Provider>
    )
}   
export default userContext;