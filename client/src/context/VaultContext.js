import React, { createContext, useContext, useReducer } from 'react';
import vaultReducer from '../reducers/vaultReducer';

const VaultContext = createContext();

export const VaultProvider = ({ children }) => {
  const [state, dispatch] = useReducer(vaultReducer, { vaults: [] });

  return (
    <VaultContext.Provider value={{ state, dispatch }}>
      {children}
    </VaultContext.Provider>
  );
};

export default VaultContext;