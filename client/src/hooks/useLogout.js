import { useAuthContext } from "./useAuthContext"
import { useEncryptionContext } from "./useEncryptionContext"

export const useLogout = () =>{
    const {dispatch} = useAuthContext()
    const {dispatch :encryptionDispatch} = useEncryptionContext()
    const logout = () =>{
        //remove the user from local storage
        sessionStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
        encryptionDispatch({type:'CLEAR_KEY'})       
    }
    return { logout }
}