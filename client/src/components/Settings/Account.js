import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../../hooks/useAuthContext";
import { Box, Container, TextField, Typography, Grid, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
export default function Account() {
    const [data, setData] = useState({});
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { userid } = useParams();
    const {logout} = useLogout();
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
                const userData = await response.json();

                setUsername(userData.username);
                setEmail(userData.email);
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
                    username,
                    email,
                    password
                })
            });
            if (response.ok) {
                const userData = await response.json();
                setData(userData);
                swal("Updated successfully", "", "success");
            } else {
                swal("Failed to update", "", "error");
                throw new Error('Failed to update user data');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };
    const deleteAccount = async (userid) => {
        console.log('User ID:', userid);
        try {
           
            const confirmDelete = await swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover your account and your credentials!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
    
           
            if (confirmDelete) {
                const response = await fetch(`http://localhost:2003/api/user/${userid}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (response.ok) {
                    console.log('Account deleted successfully');
                    swal("Account Deleted", "Your account has been successfully deleted.", "success").then(() => {
                      
                        navigate('/');
                        logout();
                    });
                }
            }
        } catch (error) {
            console.log(error);
            swal("Error", "Something went wrong while deleting your account.", "error");
        }
    }
    
    
    useEffect(() => {
        
 
        fetchData();
    }, [user, userid]);

    return (
        <Box>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom color="primary" style={{ textAlign: 'left', margin: '1.5rem' }}>
                    Account
                </Typography>
            </Grid>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mt: 4 }}>

                    <Grid container justifyContent="center" spacing={2}>


                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Username"
                                variant="outlined"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                    </Grid>
                </Box>
                <Button variant='contained' style={{ marginTop: '2em' }} onClick={updateData}>Update</Button>
            </Container>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom color="primary" style={{ textAlign: 'left', margin: '1.5rem' }}>
                    Delete your Account
                    
                </Typography>
                <Button variant='contained' color='error' style={{marginLeft:'1.5em' }} onClick={() => {
      
        deleteAccount(userid);
    }}>DELETE ACCOUNT</Button>

            </Grid>
        </Box>
    );
}

