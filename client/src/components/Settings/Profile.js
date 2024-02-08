import { useEffect, useState } from 'react';
import { useAuthContext } from "../../hooks/useAuthContext";
import { Box, Container, TextField, Typography,Grid } from '@mui/material';
export default function Profile() {
    const [data, setData] = useState({});
    const { user } = useAuthContext();

    useEffect(() => {
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
                    setData(userData);
                     console.log('User data:', userData)
                } else {
                    throw new Error('Failed to fetch user data');
                }
            } catch (error) {
                console.log('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [user]);

    return (
        <Box>
             <Typography variant="h4" gutterBottom color="primary">
                        Profile
                    </Typography>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                   
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Firstname"
                                variant="outlined"
                                value={data.firstname || ''}
                                aria-readonly
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Lastname"
                                variant="outlined"
                                value={data.lastname || ''}
                                aria-readonly
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Username"
                                variant="outlined"
                                value={data.username || ''}
                                aria-readonly
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                value={data.email || ''}
                                aria-readonly
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}
