import { EncryptionContext } from "../context/EncryptionContext"
import { useContext } from "react";
export const useEncryptionContext = () =>{
    const context = useContext(EncryptionContext);
    if(!context){
        throw new Error (
            "useEncryptionContext must be used within an EncryptionContextProvider"
        )
    }
    return context;
}