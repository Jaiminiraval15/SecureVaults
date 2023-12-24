
import { Box, TextField } from "@mui/material"
import { useState } from "react"

export default function SignupForm() {
    const [email, setEmail] = useState(' ')
    const [password, setPassword] = useState(' ')
    const [firstName, setFirstName] = useState(' ')
    const [lastName, setLastName] = useState(' ')
    const handleSubmit = async (e) => {
        e.preventDefault();

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>SignUp</h3>
                <label>FirstName:</label>
                <input type='text' onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}></input>
                <label>LastName:</label>
                <input type='text' onChange={(e) => setLastName(e.target.value)}
                    value={lastName}></input>
                <label>Email:</label>
                <input type='email' onChange={(e) => setEmail(e.target.value)}
                    value={email}></input>
                <label>Password:</label>
                <input type='password' onChange={(e) => setPassword(e.target.value)}
                    value={password}></input>
                <button >Signup</button>
            </form>
        </>
    )
}