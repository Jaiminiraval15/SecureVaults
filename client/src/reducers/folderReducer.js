export const initialState = {   
    folder : [],
}
export const folderReducer = (state,action) => {    
    switch(action.type){
        case 'SET_FOLDERS' :
            return {...state, folder: action.payload };
        case 'ADD_FOLDER' :
            return {...state, folder: [...state.folder, action.payload] };
        case 'UPDATE_FOLDER' :
            return {
                ...state,
                folder: state.folder.map(folder =>
                    folder._id === action.payload._id ? action.payload : folder
                ),
            };
        case 'DELETE_FOLDER' :
            return {
                ...state,
                folder: state.folder.filter(folder => folder._id !== action.payload),
            };
        default :
            return state
    }
}