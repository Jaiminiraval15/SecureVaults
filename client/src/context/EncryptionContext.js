import { createContext, useEffect, useReducer } from "react";

import { initialState, keyReducer } from "../reducers/keyReducer";
export const EncryptionContext = createContext();
export const EncryptionContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(keyReducer,initialState)
   useEffect(()=>{
    const storedKey = window.sessionStorage.getItem('key')
    if(storedKey){
        dispatch({type:'SET_KEY',payload:storedKey})
    }
    else {
        dispatch({ type: "SET_KEY", payload: "" });
    }
   },[])
   return (
    <EncryptionContext.Provider value={{ state, dispatch }}>
      {children}
    </EncryptionContext.Provider>
  );
}
