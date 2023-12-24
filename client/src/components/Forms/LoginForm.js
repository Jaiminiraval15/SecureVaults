
import { Box,TextField } from "@mui/material"
import { useState } from "react"

export default function LoginForm(){
    const [email,setEmail] = useState(' ')
    const [password,setPassword] = useState(' ')
    const handleSubmit =  async (e)=>{
        e.preventDefault();
        
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label>Email:</label>
        <input type='email' onChange={(e)=>setEmail(e.target.value)}
         value={email}></input>
        <label>Password:</label>
        <input type='password' onChange={(e)=>setPassword(e.target.value)} 
        value={password}></input>
        <button >Login</button>
        </form>
        </>
    )
}