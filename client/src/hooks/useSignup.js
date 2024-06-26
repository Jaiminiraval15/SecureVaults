import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useEncryptionContext } from "./useEncryptionContext";
import {useEncryptionFunction } from "./useEncryptionFunction";
export const useSignup = () => {
    const [error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const { dispatch } = useAuthContext();
    const { dispatch: encryptionDispatch } = useEncryptionContext();
    const { generateKey } = useEncryptionFunction()
    
    const signup = async (email,password,firstname,lastname,username) =>{
        setIsLoading(true)
        setError(null)
        const res = await fetch('http://localhost:2003/api/routes/signup',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email,password,firstname,lastname,username})
        })
        const data = await res.json()
        if (!res.ok){
            setIsLoading(false)
            setError(data.error)
        }
        if(res.ok){
                   // Generate a key using the email and password
        const key = generateKey(email, password);

        // Save the key to the EncryptionContext
        encryptionDispatch({ type: 'SET_KEY', payload: key });
            //save the user to session
            sessionStorage.setItem('user',JSON.stringify(data))
            //update authContext
            dispatch({type: 'LOGIN',payload:data})
            setIsLoading(false)
        }

    }
    return {isLoading,error,signup}
}