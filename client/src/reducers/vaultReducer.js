const vaultReducer = (state, action) => {
    switch (action.type) {
      case 'SET_VAULTS':
        return { ...state, vaults: action.payload };
      case 'ADD_VAULT':
        return { ...state, vaults: [...state.vaults, action.payload] };
      case 'UPDATE_VAULT':
        return {
          ...state,
          vaults: state.vaults.map(vault =>
            vault._id === action.payload._id ? action.payload : vault
          ),
        };
      case 'DELETE_VAULT':
        return {
          ...state,
          vaults: state.vaults.filter(vault => vault._id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default vaultReducer;
  