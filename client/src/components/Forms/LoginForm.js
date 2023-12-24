
import { Box,Button,TextField,FormControl,OutlinedInput } from "@mui/material"
import { useState } from "react"

export default function LoginForm(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const handleSubmit =  async (e)=>{
        e.preventDefault();

    }
    return(
        <>
         
        {/* <form onSubmit={handleSubmit}>
        <h3>Login</h3>
       


        <label>Email: </label>
        <TextField id="outlined-basic" label="Email" variant="outlined" type='email' onChange={(e)=>setEmail(e.target.value)}
         value={email} /><br/>

        <label>Password:</label>
   
            <TextField id="outlined-basic" label="Required" variant="outlined" type='password'
             onChange={(e)=>setPassword(e.target.value)} 
        value={password}/><br/>
        <Button variant="outlined" >Login</Button>
       
        </form> */}
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

        <Button variant="outlined" type="submit">
          Login
        </Button>
      </form>
    </Box>
        </>
    )
}