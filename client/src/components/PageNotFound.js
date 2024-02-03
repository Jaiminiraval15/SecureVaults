import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function PageNotFound() {
    const navigate = useNavigate();
    const handleNavigateHome = ()=>{
        navigate('/');
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column',alignItems: 'center', height: '100vh' }}>
        <Typography variant="h3" style={{color:'purple',marginBottom:'20px'}}>Oops! Page Not Found</Typography>
        <Button variant="outlined" onClick={handleNavigateHome} style={{color:'purple'}}>Go to Home Page</Button>
        </div>
    );
}