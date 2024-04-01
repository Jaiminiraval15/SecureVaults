import { useEncryptionContext } from "./useEncryptionContext"
import CryptoJS from 'crypto-js';

export const useEncryptionFunction = () => {
  
    const { state,dispatch} = useEncryptionContext(); 
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
