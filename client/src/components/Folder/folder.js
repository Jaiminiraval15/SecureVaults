// import { useEffect, useState } from "react";
// import { useAuthContext } from "../../hooks/useAuthContext";
// import { Box, Card, CardContent, FormControl, Typography, Container, Dialog, DialogTitle, DialogContent, TextField, Button, Grid } from "@mui/material";
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import EditIcon from '@mui/icons-material/Edit';
// import swal from "sweetalert";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// export default function Folder() {
//     const { user } = useAuthContext();
//     const [folders, setFolders] = useState([]);
//     const token = user ? user.token : null;
//     const navigate = useNavigate()
//     const [openDialog, setOpenDialog] = useState(false);
//     const [newFolderName, setNewFolderName] = useState("");
//     const [editingFolder, setEditingFolder] = useState(null);
//     const handleOpenDialog = (folderId) => {
//         setOpenDialog(true);
//         setEditingFolder(folderId);
//         const folderToEdit = folders.find((folder) => folder._id === folderId);
//         setNewFolderName(folderToEdit?.folderName || '');
//     };

//     const handleCloseDialog = () => {
//         setOpenDialog(false);
//         setEditingFolder(null);
//         setNewFolderName("");
//     };

//     const handleAddFolder = () => {
//         fetch("http://localhost:2003/api/folder/addfolder", {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${user.token}`
//             },
//             body: JSON.stringify({ folderName: newFolderName })
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 setFolders([...folders, data]);
//                 setNewFolderName("");
//                 handleCloseDialog();
//                 fetchData();
//                 swal("Folder added successfully", "", "success");
//             })
//             .catch(error => {
//                 console.error('Error adding folder:', error);
//                 if (error.message.includes('HTTP error! Status: 400')) {
//                     swal("Folder already exists", "", "error");
//                 } else {
//                     swal("Something went wrong", "", "error");
//                 }
//             });
//     };

//     const fetchData = async () => {
//         try {
//             if (user && user.token) {
//                 const response = await fetch("http://localhost:2003/api/folder/", {
//                     method: "GET",
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${user.token}`,
//                         'User-Id': user.id
//                     }
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch folders');
//                 }

//                 const data = await response.json();
//                 setFolders(data);
//             }
//         } catch (error) {
//             console.error('Error fetching folders:', error);
//         }
//     };

//     const handleDeleteFolder = async (folderId) => {
//         try {
//             const result = await Swal.fire({
//                 title: 'Are you sure?',
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonColor: '#3085d6',
//                 cancelButtonColor: '#d33',
//                 confirmButtonText: 'Yes, delete it!'
//             });

//             if (result.isConfirmed) {
//                 const response = await fetch(`http://localhost:2003/api/folder/${folderId}`, {
//                     method: 'DELETE',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${user.token}`
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }

//                 // Remove the folder 
//                 setFolders((prevFolders) => prevFolders.filter(folder => folder._id !== folderId));

//                 Swal.fire(
//                     'Deleted!',
//                     'Your folder has been deleted.',
//                     'success'
//                 );
//             }
//         } catch (error) {
//             console.error('Error deleting folder:', error);
//             Swal.fire(
//                 'Error!',
//                 'Something went wrong.',
//                 'error'
//             );
//         }
//     };

//     const handleUpdateFolder = async () => {
//         try {
//             const response = await fetch(`http://localhost:2003/api/folder/${editingFolder}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${user.token}`
//                 },
//                 body: JSON.stringify({ folderName: newFolderName })
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             // Update the folder 
//             setFolders((prevFolders) =>
//                 prevFolders.map((folder) =>
//                     folder._id === editingFolder ? { ...folder, folderName: newFolderName } : folder
//                 )
//             );

//             setEditingFolder(null);
//             setNewFolderName("");

//             Swal.fire('Edited!', 'Your folder has been edited.', 'success');
//             handleCloseDialog();
//         } catch (error) {
//             console.error('Error editing folder:', error);
//             Swal.fire('Error!', 'Something went wrong.', 'error');
//         }
//     };

//     useEffect(() => {
//         if (!user) {
//             navigate('/')
//         } else {
//             fetchData();
//         }
//     }, [user]);

//     return (
//         <>
//             <Container maxWidth="lg">
//                 <Grid container justifyContent="space-between" alignItems="center" marginBottom="20px">
//                     <Button
//                         variant="outlined"
//                         color="primary"
//                         onClick={() => handleOpenDialog(null)}
//                         style={{
//                             display: "flex",
//                             color: 'purple',
//                             padding: '0.5em',
//                             marginRight: '1em',
//                             marginTop: '3.5em',
//                             justifyContent: 'flex-end'
//                         }}
//                     >
//                         Add Folder
//                     </Button>
//                 </Grid>
//             </Container>

//             <Container maxWidth="lg">
//                 <Grid container spacing={2} justifyContent="flex-start">
//                     {Array.isArray(folders) && folders.length > 0 ? (
//                         folders.map((folder) => (
//                             <Grid item xs={12} sm={6} md={4} lg={3} key={folder._id}>
//                                 <Card
//                                     sx={{
//                                         marginBottom: '3em',
//                                         position: 'relative',
//                                         color: 'purple',
//                                         minWidth: 275,
//                                         width: '200px',
//                                         marginRight: '10px',
//                                         marginBottom: '10px'
//                                     }}
//                                 >
//                                     <CardContent>
//                                         <Typography variant="h6" component="div">
//                                             {folder.folderName}
//                                         </Typography>
//                                     </CardContent>
//                                     <DeleteOutlineIcon
//                                         color="error"
//                                         style={{ position: 'absolute', top: '5px', right: '30px', cursor: 'pointer' }}
//                                         onClick={() => handleDeleteFolder(folder._id)}
//                                     />
//                                     <EditIcon
//                                         color="action"
//                                         style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer' }}
//                                         onClick={() => handleOpenDialog(folder._id)}
//                                     />
//                                 </Card>
//                             </Grid>
//                         ))
//                     ) : (
//                         <Grid item xs={12}>
//                             <Typography>No folders available</Typography>
//                         </Grid>
//                     )}
//                 </Grid>
//             </Container>

//             <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
           
//                 <DialogContent>
//                     <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                         <TextField
//                             name="FolderName"
//                             label="Folder Name"
//                             variant="outlined"
//                             type="text"
//                             onChange={(e) => setNewFolderName(e.target.value)}
//                             value={newFolderName}
//                             fullWidth
//                             autoComplete="off"
//                         />
//                     </FormControl>

//                     <Button
//                         variant="outlined"
//                         color="primary"
//                         onClick={editingFolder ? handleUpdateFolder : handleAddFolder}
//                         style={{ marginTop: '1em', color: 'purple' }}
//                     >
//                         {editingFolder ? 'Update' : 'Add'}
//                     </Button>
//                 </DialogContent>
//             </Dialog>
//         </>
//     );
// }
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import {useFolderContext}  from "../../hooks/useFolderContext";
import { fetchFolders, addFolder, editFolder, deleteFolder } from "../../services/service";
import { Box, Card, CardContent, FormControl, Typography, Container, Dialog, DialogContent, TextField, Button, Grid } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Folder() {
    const { user } = useAuthContext();
    const { state, dispatch } = useFolderContext();
    const [openDialog, setOpenDialog] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const [editingFolder, setEditingFolder] = useState(null);
    const navigate = useNavigate();

    const handleOpenDialog = (folderId) => {
        setOpenDialog(true);
        setEditingFolder(folderId);
        const folderToEdit = state.folder.find((folder) => folder._id === folderId);
        setNewFolderName(folderToEdit?.folderName || '');
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingFolder(null);
        setNewFolderName("");
    };

    const handleAddFolder = async () => {
        try {
            const newFolder = await addFolder({ folderName: newFolderName }, user.token);
            dispatch({ type: 'ADD_FOLDER', payload: newFolder });
            setNewFolderName("");
            handleCloseDialog();
            Swal.fire("Folder added successfully", "", "success");
        } catch (error) {
            console.error('Error adding folder:', error);
            Swal.fire("Something went wrong", "", "error");
        }
    };

    const handleUpdateFolder = async () => {
        try {
            const updatedFolder = await editFolder(editingFolder, { folderName: newFolderName }, user.token);
            dispatch({ type: 'UPDATE_FOLDER', payload: updatedFolder });
            setEditingFolder(null);
            setNewFolderName("");
            handleCloseDialog();
            Swal.fire('Edited!', 'Your folder has been edited.', 'success');
        } catch (error) {
            console.error('Error editing folder:', error);
            Swal.fire('Error!', 'Something went wrong.', 'error');
        }
    };

    const handleDeleteFolder = async (folderId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                await deleteFolder(folderId, user.token);
                dispatch({ type: 'DELETE_FOLDER', payload: folderId });
                Swal.fire('Deleted!', 'Your folder has been deleted.', 'success');
            }
        } catch (error) {
            console.error('Error deleting folder:', error);
            Swal.fire('Error!', 'Something went wrong.', 'error');
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/');
        } else {
            fetchFolders(user.token)
                .then(folders => dispatch({ type: 'SET_FOLDERS', payload: folders }))
                .catch(error => console.error('Error fetching folders:', error));
        }
    }, [user, navigate, dispatch]);

    return (
        <>
            <Container maxWidth="lg">
                <Grid container justifyContent="space-between" alignItems="center" marginBottom="20px">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleOpenDialog(null)}
                        style={{
                            display: "flex",
                            color: 'purple',
                            padding: '0.5em',
                            marginRight: '1em',
                            marginTop: '3.5em',
                            justifyContent: 'flex-end'
                        }}
                    >
                        Add Folder
                    </Button>
                </Grid>
            </Container>

            <Container maxWidth="lg">
                <Grid container spacing={2} justifyContent="flex-start">
                    {Array.isArray(state.folder) && state.folder.length > 0 ? (
                        state.folder.map((folder) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={folder._id}>
                                <Card
                                    sx={{
                                        marginBottom: '3em',
                                        position: 'relative',
                                        color: 'purple',
                                        minWidth: 275,
                                        width: '200px',
                                        marginRight: '10px',
                                        marginBottom: '10px'
                                    }}
                                >
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
                                        onClick={() => handleOpenDialog(folder._id)}
                                    />
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Typography>No folders available</Typography>
                        </Grid>
                    )}
                </Grid>
            </Container>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
                <DialogContent>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <TextField
                            name="FolderName"
                            label="Folder Name"
                            variant="outlined"
                            type="text"
                            onChange={(e) => setNewFolderName(e.target.value)}
                            value={newFolderName}
                            fullWidth
                            autoComplete="off"
                        />
                    </FormControl>

                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={editingFolder ? handleUpdateFolder : handleAddFolder}
                        style={{ marginTop: '1em', color: 'purple' }}
                    >
                        {editingFolder ? 'Update' : 'Add'}
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
}



