import { useEncryptionContext } from "./useEncryptionContext"
import CryptoJS from 'crypto-js';
import { useEffect } from "react";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
export const useEncryptionFunction = () => {
   const { user } = useAuthContext();
    const { state,dispatch} = useEncryptionContext();
    const [vaults, setVaults] = useState([]);

    const fetchData = async () => {
        try {
        
          const res = await fetch(`http://localhost:2003/api/password`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          });
    
          if (!res.ok) {
            throw new Error("Failed to fetch vaults");
            
          }
          const data = await res.json();   
         setVaults(data);
        
        
        } catch (error) {
          console.error("Error fetching Vaults:", error);
        
        }
      };
    const generateKey = (email, password) => {
        let hash = CryptoJS.SHA256(email)
        return CryptoJS.PBKDF2(password, hash, { keySize: 256 / 32, iterations: 100 }).toString()
    }
 
    const encrypt = (data) => {
        if (!state) {
            throw new Error('Encryption context not properly initialized');
          }
          console.log("encrypt",state.key)
          let key = state.key
        let encryptedData = CryptoJS.AES.encrypt(data, key).toString()
        return encryptedData
    }

    
    const decrypt = (data) => {
        if (!state) {
            throw new Error('Encryption context not properly initialized');
          }
          console.log("decrypt",state.key)
          let key = state.key
        let decryptData = CryptoJS.AES.decrypt(data, key)
        return decryptData.toString(CryptoJS.enc.Utf8)
    }


 return { encrypt, decrypt, generateKey};
   
}
