import { Outlet } from "react-router-dom"
import Nav from "./Navbar"
export default function Layout(){
    return(
        <>
        <Nav/>
        <Outlet/>
        </>
    )
}