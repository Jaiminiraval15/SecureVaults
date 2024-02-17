export const initialState = {
    key : ""
}
export const keyReducer = (state,action) => {
    switch(action.type){
        case 'SET_KEY' :
           window.sessionStorage.setItem("key",action.payload)
           return {...state,key: action.payload };
        case 'CLEAR_KEY' :
            window.sessionStorage.removeItem("key")
            return {...state, key: "" };
        default :
            return state
    }
}
