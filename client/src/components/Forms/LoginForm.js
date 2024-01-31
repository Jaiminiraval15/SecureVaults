import { Box, Button, TextField, FormControl, OutlinedInput } from "@mui/material";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
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
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Login</h2>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
           name="email"
            label="Email"
            variant="outlined"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            autoComplete="off" 
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
          id ="password"
            name="password"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="off" 
          />
        </FormControl>

        <Button
          disabled={isLoading}
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "10px" }}
        >
          Login
        </Button>
        {error && <div className='error' style={{ marginTop: "10px", textAlign: "center" }}>{error}</div>}
      </form>
    </Box>
  
  );
}
