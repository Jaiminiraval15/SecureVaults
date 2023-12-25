import { Box,Button,TextField,FormControl,OutlinedInput } from "@mui/material"
import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"
export default function LoginForm(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {login, isLoading,error} = useLogin()
    const handleSubmit =  async (e)=>{
        e.preventDefault();
        await login(email,password)

    }
    return(
        <>
       <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "300px",
          padding: "20px",
          border: "1px solid #ccc", // Border color
          borderRadius: "8px", // Border radius
          backgroundColor: "#fff", // Background color
        }}
      >
        <h2>Login</h2>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </FormControl>

        <Button disabled={isLoading} variant="outlined" type="submit">
          Login
        </Button>
        {error && <div className='error'>{error}</div>}
      </form>
    </Box>
        </>
    )
}