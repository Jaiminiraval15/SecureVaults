import VaultContext  from "../context/VaultContext";
import { useContext } from "react";
export const useVaultContext = ()=>{
    const context = useContext(VaultContext)
    if (!context) {
        throw new Error("use vaultcontext ");
      }
     return context;
}