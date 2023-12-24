
import { Box, TextField,Button } from "@mui/material"
import { useState } from "react"

export default function SignupForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();

    }
    return (
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
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <h2>SignUp</h2>

        <TextField
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          type="text"
          fullWidth
          margin="normal"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />

        <TextField
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          type="text"
          fullWidth
          margin="normal"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />

        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          type="text"
          fullWidth
          margin="normal"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />

        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <Button variant="outlined" type="submit">
          Signup
        </Button>
      </form>
    </Box>
        </>
    )
}