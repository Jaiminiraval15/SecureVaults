import { Outlet ,Navigate} from "react-router-dom"
import Nav from "./Navbar"
import { useAuthContext } from "../hooks/useAuthContext"
import { useEffect } from "react";
export default function Layout(){
   
    return(
        <>
        <Nav/>
        <Outlet/>
        </>
    )
}