import { createContext, useReducer } from "react";
import { authReducer, initialState } from "../reducers/authReducer";
export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(authReducer,initialState)
    return(
     <AuthContext.Provider value={{...state,dispatch}}>
        {children}
    </AuthContext.Provider>
    )
}