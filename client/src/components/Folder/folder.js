import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Box, Card, CardContent, Typography, Container, Dialog, DialogTitle, DialogContent, TextField, Tooltip, Icon, IconButton, Button } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import swal from "sweetalert";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function Folder() {
    const { user } = useAuthContext();
    const [folders, setFolders] = useState([]);
    const token = user ? user.token : null;
    const navigate = useNavigate()
    const [openDialog, setOpenDialog] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleAddFolder = () => {
        fetch("http://localhost:2003/api/folder/addfolder", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ folderName: newFolderName })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setFolders([...folders, data]);
                setNewFolderName("");
                handleCloseDialog();
                fetchData();
                swal("Folder added successfully", "", "success");
            })
            .catch(error => {
                console.error('Error adding folder:', error);
                if (error.message.includes('HTTP error! Status: 400')) {
                    // The server responded with a 400 status code
                    swal("Folder already exists", "", "error");
                } else {
                    swal("Something went wrong", "", "error");
                }

            });
    }
    const fetchData = async () => {
        try {
            if (user && user.token) {
                const response = await fetch("http://localhost:2003/api/folder/", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                        'User-Id': user.id // The server needs to know which user is making the request
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch folders');
                }

                const data = await response.json();
                setFolders(data);
            }
        } catch (error) {
            console.error('Error fetching folders:', error);
        }
    };
    const handleDeleteFolder = async (folderId) => {
        try {
            // Display a SweetAlert confirmation dialog
            const result = await Swal.fire({
                title: 'Are you sure?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                // Make a request to the server to delete the folder with the specified folderId
                const response = await fetch(`http://localhost:2003/api/folder/${folderId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Delete the folder from the state
                setFolders((prevFolders) => prevFolders.filter(folder => folder._id !== folderId));

                Swal.fire(
                    'Deleted!',
                    'Your folder has been deleted.',
                    'success'
                );
            }
        } catch (error) {
            console.error('Error deleting folder:', error);
            Swal.fire(
                'Error!',
                'Something went wrong.',
                'error'
            );
        }
    };
    useEffect(() => {
        if(!user){
            navigate('/')
        }
        else{
            fetchData();
        }
       
    }, [user]);

    return (
        <>
            <Container maxWidth="lg">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <div>

                    </div>
                    <Button variant="outlined"
                        color="primary"
                        onClick={handleOpenDialog}
                        style={{
                            display: "flex", color: 'purple',
                            padding: '0.5em',
                            float: 'right',
                            marginRight: '1em',
                            marginTop: '0.5em'
                        }} >Add Folder</Button>
                </div>
            </Container>

            <Container maxWidth="lg">
                {/* <h2>The token is: {token}</h2> */}

                <Box sx={{ display: 'flex', flexWrap: 'wrap', color: 'purple', marginTop: '3em' }}>
                    {Array.isArray(folders) && folders.length > 0 ? (
                        folders.map(folder => (
                            <Card key={folder._id} sx={{ marginBottom: '3em', position:'relative' ,color: 'purple', minWidth: 275, width: '200px', marginRight: '10px', marginBottom: '10px' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {folder.folderName}
                                    </Typography>
                                </CardContent>
                                <DeleteOutlineIcon
                                    color="error"
                                    style={{ position: 'absolute', top: '5px', right: '30px', cursor: 'pointer' }}
                                    onClick={() => handleDeleteFolder(folder._id)}
                                />
                             
                                <EditIcon
                                    color="action"
                                    style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer' }}
                                    // onClick={() => handleEditFolder(folder._id)}
                                />
                            </Card>
                        ))
                    ) : (
                        <p>No folders available</p>
                    )}
                </Box>
            </Container>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Add Folder</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Folder Name"
                        variant="outlined"
                        fullWidth

                        autoComplete="off"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleAddFolder} style={{ marginTop: '1em' }}>
                        Add Folder
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
}



