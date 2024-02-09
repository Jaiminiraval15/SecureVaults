import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../../hooks/useAuthContext";
import { Box, Container, TextField, Typography, Grid, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

export default function Profile() {
    const [data, setData] = useState({});
    const { user } = useAuthContext();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
   
    
    const { userid } = useParams();

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
                setFirstname(userData.firstname);
                setLastname(userData.lastname);
               
                
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
                    lastname
                   
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

    useEffect(() => {
        fetchData();
    }, [user, userid]);

    return (
        <Box>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom color="primary" style={{ textAlign: 'left', margin: '1.5rem' }}>
                   Profile
                </Typography>
            </Grid>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Grid container justifyContent="center" spacing={2}>
                       
                      
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Firstname"
                                variant="outlined"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Lastname"
                                variant="outlined"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                   
                    </Grid>
                </Box>
                <Button variant='contained' style={{ marginTop: '2em' }} onClick={updateData}>Update</Button>
            </Container>
        </Box>
    );
}

