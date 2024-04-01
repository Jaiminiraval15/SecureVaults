import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../../hooks/useAuthContext";
import { Box, Container, TextField, Typography, Grid, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useEncryptionFunction } from '../../hooks/useEncryptionFunction';
import { useEncryptionContext } from '../../hooks/useEncryptionContext';

export default function Account() {
    const { state, dispatch } = useEncryptionContext();
    const { generateKey, encrypt, decrypt } = useEncryptionFunction();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { userid } = useParams();
    const { logout } = useLogout();
    const [userData, setUserData] = useState({
        username: "",
        email: ""
    });

    useEffect(() => {
        fetchData();
        console.log('useEffect current Key:', state.key)
    }, [user, userid, state]);

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
                setUserData(userData);
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
                    username: userData.username,
                    email: userData.email
                })
            });
            if (response.ok) {
                const userData = await response.json();
                const existingPassword = userData.password || '';

                const encryptedVaults = await fetchVaults();
                const decryptedVaults = encryptedVaults.map(vault => ({
                    ...vault,
                    password: decrypt(vault.password, state.key)
                }));

                const newKey = generateKey(userData.email, existingPassword);

                const encryptedVaultsWithNewKey = decryptedVaults.map(vault => ({
                    ...vault,
                    password: encrypt(vault.password),
                    username: encrypt(vault.username)
                }));

                const updateResponse = await fetch(`http://localhost:2003/api/user/${userid}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    },
                    body: JSON.stringify({
                        username: userData.username,
                        email: userData.email,
                        vaults: encryptedVaultsWithNewKey
                    })
                });

                if (updateResponse.ok) {
                    dispatch({ type: 'SET_KEY', payload: newKey });
                    window.sessionStorage.setItem('newKey', newKey);
                    swal("Updated successfully", "", "success");
                }
            } else {
                throw new Error('Failed to update user data');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const fetchVaults = async () => {
        try {
            const res = await fetch(`http://localhost:2003/api/password`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if (!res.ok) {
                throw new Error("Failed to fetch vaults");
            }
            return await res.json();
        } catch (error) {
            console.error("Error fetching Vaults:", error);
            return [];
        }
    };

    const deleteAccount = async () => {
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

    const handleUsernameChange = (e) => {
        setUserData(prevState => ({
            ...prevState,
            username: e.target.value
        }));
    };

    const handleEmailChange = (e) => {
        setUserData(prevState => ({
            ...prevState,
            email: e.target.value
        }));
    };

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
                                value={userData.username}
                                onChange={handleUsernameChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                value={userData.email}
                                onChange={handleEmailChange}
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
                <Button variant='contained' color='error' style={{ marginLeft: '1.5em' }} onClick={deleteAccount}>DELETE ACCOUNT</Button>

            </Grid>
        </Box>

    );
}
