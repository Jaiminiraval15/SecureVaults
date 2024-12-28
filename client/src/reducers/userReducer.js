export const initialState = {
    user: null,
  };
  export const userReducer = (state, action) => {
    switch (action.type) {
      case 'SET_USER':
        return { ...state, user: action.payload };
        case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
      default:
      return state;
   }
  }