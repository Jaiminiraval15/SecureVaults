// import React, { useEffect, useState } from 'react';
// import { useAuthContext } from "../../hooks/useAuthContext";
// import { Box, Container, TextField, Typography, Grid, Button } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import swal from 'sweetalert';
// import { useNavigate } from 'react-router-dom';
// import { useLogout } from '../../hooks/useLogout';
// import { useEncryptionFunction } from '../../hooks/useEncryptionFunction';
// import { useEncryptionContext } from '../../hooks/useEncryptionContext';
// import { fetchVaults, editVault } from '../../services/service';

// export default function Account() {
//     const { state, dispatch } = useEncryptionContext();
//     const { generateKey, encrypt, decrypt } = useEncryptionFunction();
//     const { user } = useAuthContext();
//     const navigate = useNavigate();
//     const { userid } = useParams();
//     const { logout } = useLogout();
//     const [userData, setUserData] = useState({
//         username: "",
//         email: ""
//     });

//     useEffect(() => {
//         fetchData();
//         console.log('useEffect current Key:', state.key)
//     }, [user, userid, state]);

//     const fetchData = async () => {
//         try {
//             const response = await fetch(`http://localhost:2003/api/user/`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${user.token}`
//                 }
//             });
//             if (response.ok) {
//                 const userData = await response.json();
//                 setUserData(userData);
//             } else {
//                 throw new Error('Failed to fetch user data');
//             }
//         } catch (error) {
//             console.log('Error fetching user data:', error);
//         }
//     };

//     const updateData = async () => {
//         try {
//             // Step 1: Fetch existing vaults and decrypt them using the current key
//             const encryptedVaults = await fetchVaults(user.token);
//             const decryptedVaults = encryptedVaults.map(vault => ({
//                 ...vault,
//                 username: decrypt(vault.username, state.key),
//                 password: decrypt(vault.password, state.key)
//             }));
    
//             // Step 2: Clear the old key from context and sessionStorage
//             dispatch({ type: 'CLEAR_KEY' });
//             window.sessionStorage.removeItem('newKey'); // or 'currentKey' depending on what you stored it as
    
//             // Step 3: Generate a new key using the updated email
//             const existingPassword = userData.password || ''; // assuming you have user's password stored
//             const newKey = generateKey(userData.email, existingPassword);
    
//             // Step 4: Save the new key in the context and sessionStorage
//             dispatch({ type: 'SET_KEY', payload: newKey });
//             window.sessionStorage.setItem('newKey', newKey);
    
//             // Step 5: Re-encrypt the vaults with the new key
//             const encryptedVaultsWithNewKey = decryptedVaults.map(vault => ({
//                 ...vault,
//                 username: encrypt(vault.username, newKey),
//                 password: encrypt(vault.password, newKey)
//             }));
    
//             // Step 6: Update user data (email)
//             const response = await fetch(`http://localhost:2003/api/user/${userid}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${user.token}`
//                 },
//                 body: JSON.stringify({
//                     username: userData.username,
//                     email: userData.email
//                 })
//             });
    
//             if (response.ok) {
//                 // Step 7: Update vaults on the server
//                 for (const vault of encryptedVaultsWithNewKey) {
//                     await editVault(vault._id, vault, user.token, encrypt);
//                 }
    
//                 swal("Updated successfully", "", "success");
//             } else {
//                 throw new Error('Failed to update user data');
//             }
//         } catch (error) {
//             console.log('Error:', error);
//         }
//     };
    

//     const deleteAccount = async () => {
//         try {
//             const confirmDelete = await swal({
//                 title: "Are you sure?",
//                 text: "Once deleted, you will not be able to recover your account and your credentials!",
//                 icon: "warning",
//                 buttons: true,
//                 dangerMode: true,
//             });

//             if (confirmDelete) {
//                 const response = await fetch(`http://localhost:2003/api/user/${userid}`, {
//                     method: 'DELETE',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${user.token}`
//                     }
//                 });
//                 if (response.ok) {
//                     console.log('Account deleted successfully');
//                     swal("Account Deleted", "Your account has been successfully deleted.", "success").then(() => {
//                         navigate('/');
//                         logout();
//                     });
//                 }
//             }
//         } catch (error) {
//             console.log(error);
//             swal("Error", "Something went wrong while deleting your account.", "error");
//         }
//     }

//     const handleUsernameChange = (e) => {
//         setUserData(prevState => ({
//             ...prevState,
//             username: e.target.value
//         }));
//     };

//     const handleEmailChange = (e) => {
//         setUserData(prevState => ({
//             ...prevState,
//             email: e.target.value
//         }));
//     };

//     return (
//         <Box>
//             <Grid item xs={12}>
//                 <Typography variant="h4" gutterBottom color="primary" style={{ textAlign: 'left', margin: '1.5rem' }}>
//                     Account
//                 </Typography>
//             </Grid>
//             <Container maxWidth="lg">
//                 <Box sx={{ textAlign: 'center', mt: 4 }}>

//                     <Grid container justifyContent="center" spacing={2}>


//                         <Grid item xs={12} sm={12}>
//                             <TextField
//                                 label="Username"
//                                 variant="outlined"
//                                 value={userData.username}
//                                 onChange={handleUsernameChange}
//                                 fullWidth
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={12}>
//                             <TextField
//                                 label="Email"
//                                 variant="outlined"
//                                 value={userData.email}
//                                 onChange={handleEmailChange}
//                                 fullWidth
//                             />
//                         </Grid>

//                     </Grid>
//                 </Box>
//                 <Button variant='contained' style={{ marginTop: '2em' }} onClick={updateData}>Update</Button>
//             </Container>
//             <Grid item xs={12}>
//                 <Typography variant="h4" gutterBottom color="primary" style={{ textAlign: 'left', margin: '1.5rem' }}>
//                     Delete your Account

//                 </Typography>
//                 <Button variant='contained' color='error' style={{ marginLeft: '1.5em' }} onClick={deleteAccount}>DELETE ACCOUNT</Button>

//             </Grid>
//         </Box>

//     );
// }
