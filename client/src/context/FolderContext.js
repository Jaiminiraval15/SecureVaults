import { useContext, createContext, useState, useEffect, useReducer } from "react";
import {folderReducer,initialState} from "../reducers/folderReducer";
export const FolderContext = createContext();
export const FolderProvider = ({children}) =>{
    const [state,dispatch] = useReducer(folderReducer,initialState);
    return (
        <FolderContext.Provider value={{state,dispatch}}>
            {children}
        </FolderContext.Provider>
    )
}