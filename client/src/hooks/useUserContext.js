import userContext from "../context/UserContext";
import { useContext } from "react";
export const useUserContext = ()=>{
    const context = useContext(userContext)
    if (!context) {
        throw new Error("use usercontext ");
      }
     return context;
}