import { useEffect } from "react";
import { createContext, useReducer} from "react";
import { authReducer, initialState } from "../reducers/authReducer";
export const AuthContext = createContext();


export const AuthContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(authReducer,initialState)
   
    useEffect(()=>{
        const user = JSON.parse(sessionStorage.getItem('user'))
        if(user){
            dispatch({type: 'LOGIN',payload:user})
        }
    },[])
    return(
     <AuthContext.Provider value={{...state,dispatch}}>
        {children}
    </AuthContext.Provider>
    )
}
