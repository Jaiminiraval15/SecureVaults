import { useEffect, useState } from 'react';
import { useAuthContext } from "../../hooks/useAuthContext";
import { Box, Container, TextField, Typography,Grid, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
export default function Account() {
    const [data, setData] = useState({});
    const { user } = useAuthContext();
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const  [password,setPassword] = useState("");
   const {userid} = useParams()
    const fetchData = async () => {
        try {

            const response = await fetch(`http://localhost:2003/api/user/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            if (response.ok) {
                const user= await response.json();
                setFirstname(user.firstname );
                    setLastname(user.lastname );
                    setUsername(user.username);
                    setEmail(user.email);
           
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {
            console.log('Error fetching user data:', error);
        }
    };
    const updateData = async () => {
        try {
            const response = await fetch(`http://localhost:2003/api/user/${userid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    username,
                    email,
                    password
                })
            });
            if (response.ok) {
                const userData = await response.json();
                setData(userData);
                
                swal("Updated successfully","","success");
            } else {
                swal("Failed to update","","error");  
                throw new Error('Failed to update user data');
                
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [user,userid]);

    return (
        <Box>
             <Typography variant="h4" gutterBottom color="primary" sx={{ textAlign: 'center', mt: 4 }}>
                        Account 
                    </Typography>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                   
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Firstname"
                                variant="outlined"
                                value={firstname}  
                                fullWidth
                                onChange={(e)=>setFirstname(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Lastname"
                                variant="outlined"
                                value={lastname}
                                onChange={(e)=>setLastname(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Username"
                                variant="outlined"
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Password"
                                variant="outlined"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Button variant='contained' style={{marginTop:'2em'}} onClick={updateData}>Update</Button>
            </Container>
        </Box>
    );
}
