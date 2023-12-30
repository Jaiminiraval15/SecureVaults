export const initialState = {
    key : ""
}
export const keyReducer = (state,action) => {
    switch(action.type){
        case 'SET_KEY' :
           window.sessionStorage.setItem("key",action.payload)
           return action.payload
        case 'CLEAR_KEY' :
            window.sessionStorage.removeItem("key")
            return ""
        default :
            return state
    }
}
