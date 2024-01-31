import { Box, Button, TextField, FormControl } from "@mui/material";
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
        overflow: "hidden",
       
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
          overflow: "hidden", 
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center",fontWeight:'bolder' }}>Login</h2>

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
            sx={{ marginBottom: "20px" }} 
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
            sx={{ marginBottom: "20px" }} 
          />
        </FormControl>

        <Button
          disabled={isLoading}
          variant="outlined"
          color="primary"
          type="submit"
          style={{ marginTop: "10px", width: "100%" ,color:'purple'}} 
        >
          Login
        </Button>
        {error && (
          <div
            className='error'
            style={{
              marginTop: "10px",
              textAlign: "center",
              width: "100%", 
            }}
          >
            {error}
          </div>
        )}
      </form>
    </Box>
  );
}
