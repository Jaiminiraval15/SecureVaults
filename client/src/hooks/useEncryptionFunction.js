import { useEncryptionContext } from "./useEncryptionContext"
import CryptoJS from 'crypto-js';
export const useEncryptionFunction = () => {
    const { state, dispatch } = useEncryptionContext();

    const generateKey = (email, password) => {
        let hash = CryptoJS.SHA256(email)
        return CryptoJS.PBKDF2(password, hash, { keySize: 256 / 32, iterations: 100 }).toString()
    }
    const encrypt = (data) => {
        let encryptedData = CryptoJS.AES.encrypt(data, state.key).toString()
        return encryptedData
    }
    const decrypt = (data) => {
        let decryptData = CryptoJS.AES.decrypt(data, state.key)
        return decryptData.toString(CryptoJS.enc.Utf8)
    }
    return { encrypt, decrypt, generateKey };
}