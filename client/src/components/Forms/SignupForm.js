import { Box, TextField, Button, FormControl, OutlinedInput } from "@mui/material";
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, firstName, lastName, userName);
  };

  return (
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
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>SignUp</h2>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            size="small"
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            size="small"
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            size="small"
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            size="small"
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
            size="small"
          />
        </FormControl>

        <Button
          disabled={isLoading}
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "10px" }}
        >
          Signup
        </Button>
        {error && (
          <div className='error' style={{ marginTop: "10px", textAlign: "center" }}>
            {error}
          </div>
        )}
      </form>
    </Box>
  );
}


