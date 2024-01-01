
import { useEffect,useState } from "react"
export default function Folder(){
    
const [folders,setFolders] = useState("")
useEffect(()=>{
    fetch("http://localhost:2003/api/folder/")
})
    return(
        <>

        </>
    )
}