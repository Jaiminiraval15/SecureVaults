
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useEncryptionFunction } from "../../hooks/useEncryptionFunction";
import { useVaultContext } from "../../hooks/useVaultContext";
import {
  Container,
  Button,
  MenuItem,
  Dialog,
  DialogActions,
  TextField,
  DialogContent,
  Typography,
  Card,
  CardContent,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Grid
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import swal from 'sweetalert';
import Swal from "sweetalert2";
import { fetchVaults, addVault, editVault, deleteVault, fetchFolders } from '../../services/service'; 

export default function Vault() {
  const { user } = useAuthContext();
  const { state, dispatch } = useVaultContext(); // Use context for vaults
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [passwordName, setPasswordName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [folders, setFolders] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const { encrypt, decrypt } = useEncryptionFunction();
  const [selectedVault, setSelectedVault] = useState(null);
  const navigate = useNavigate();
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editedVaultData, setEditedVaultData] = useState({}); // Initialize as an empty object
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.token) {
      navigate("/");
    } else {
      fetchData();
      fetchFoldersData();
    }
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const vaults = await fetchVaults(user.token);
      dispatch({ type: 'SET_VAULTS', payload: vaults });
    } catch (error) {
      console.error("Error fetching Vaults:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFoldersData = async () => {
    try {
      setLoading(true);
      const foldersData = await fetchFolders(user.token);
      setFolders(foldersData);
    } catch (error) {
      console.error("Error fetching Folders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVaultSubmit = async () => {
    try {
      const newVault = await addVault({
        username: userName,
        password: password,
        passwordName: passwordName,
        folderid: selectedFolder
      }, user.token, encrypt);

      dispatch({ type: 'ADD_VAULT', payload: newVault });
      await fetchFoldersData(); 
      await fetchData();
      swal("Vault added successfully", "", "success");
      resetForm();
      setOpenForm(false);
    } catch (error) {
      swal("Something went wrong", "", "error");
      console.error("Error adding vault:", error);
    }
  };

  const handleEditClick = (vault) => {
    setSelectedVault(vault);
    setEditedVaultData({
      passwordName: vault.passwordName,
      username: decrypt(vault.username),
      password: decrypt(vault.password),
      folderid: vault.folderid._id
    });
    setSelectedFolder(vault.folderid._id);
    setEditFormOpen(true);
  };

  const handleEdit = async () => {
    try {

      const updatedVault = await editVault(selectedVault._id, {
        ...editedVaultData,
        username: (editedVaultData.username),
        password: (editedVaultData.password),
        folderid: editedVaultData.folderid,
        passwordName: editedVaultData.passwordName
      }, user.token, encrypt);


      dispatch({ type: 'UPDATE_VAULT', payload: updatedVault });

  
      await fetchData(); // Fetch data again to reflect the changes
      Swal.fire('Edited!', 'Your vault has been edited.', 'success');
      setEditFormOpen(false);
      setSelectedVault(null);
    } catch (error) {
      Swal.fire('Error!', 'Something went wrong.', 'error');
      console.error('Error editing vault:', error);
    }
  };

  const handleDelete = async (passwordid) => {
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
        await deleteVault(passwordid, user.token);
        dispatch({ type: 'DELETE_VAULT', payload: passwordid });
        Swal.fire('Deleted!', 'Your vault has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting vault:', error);
      swal("Oops! Something went wrong while deleting the vault!", {
        icon: "error",
      });
    }
  };

  const resetForm = () => {
    setPasswordName("");
    setUserName("");
    setPassword("");
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Grid container justifyContent="space-between" alignItems="center" marginBottom="20px">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpenForm(true)}
            style={{ display: "flex", color: "purple", padding: "0.5em", marginRight: "1em", marginTop: "3.5em", justifyContent: "flex-end" }}
          >
            Add Vault
          </Button>
        </Grid>
      </Container>

      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogContent>
          <FormControl fullWidth sx={{ marginBottom: "20px", width: "100%" }}>
            <InputLabel htmlFor="folder-select">Folder</InputLabel>
            <Select
              value={selectedFolder || ''}
              onChange={(e) => setSelectedFolder(e.target.value)}
              label="Folder"
              fullWidth
            >
              {folders.map((folder) => (
                <MenuItem key={folder._id} value={folder._id}>
                  {folder.folderName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Password Name"
            variant="outlined"
            fullWidth
            value={passwordName}
            onChange={(e) => setPasswordName(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <TextField
            label="User Name"
            variant="outlined"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "20px" }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button onClick={handleAddVaultSubmit} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {state.vaults.map((v) => (
            <Grid item key={v._id} xs={12} sm={6} md={4} lg={3}>
              <Card style={{ width: "100%", color: "purple" }}>
                <CardContent style={{ position: 'relative' }}>
                  <Typography variant="h6">Folder: {v.folderid.folderName}</Typography>
                  <Typography variant="h6">Vault: {v.passwordName}</Typography>
                  <div style={{ position: 'absolute', top: 0, right: 0, display: 'flex' }}>
                    <IconButton onClick={() => handleEditClick(v)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(v._id)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog open={editFormOpen} onClose={() => setEditFormOpen(false)}>
       
        <DialogContent>
          <FormControl fullWidth sx={{ marginBottom: "20px", width: "100%" }}>
            <InputLabel htmlFor="folder-select">Folder</InputLabel>
            <Select
              value={editedVaultData.folderid || ''}
              onChange={(e) => setEditedVaultData({ ...editedVaultData, folderid: e.target.value })}
              label="Folder"
              fullWidth
            >
              {folders.map((folder) => (
                <MenuItem key={folder._id} value={folder._id}>
                  {folder.folderName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Password Name"
            variant="outlined"
            fullWidth
            value={editedVaultData.passwordName || ''}
            onChange={(e) => setEditedVaultData({ ...editedVaultData, passwordName: e.target.value })}
            style={{ marginBottom: "20px" }}
          />
          <TextField
            label="User Name"
            variant="outlined"
            fullWidth
            value={editedVaultData.username || ''}
            onChange={(e) => setEditedVaultData({ ...editedVaultData, username: e.target.value })}
            style={{ marginBottom: "20px" }}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            value={editedVaultData.password || ''}
            onChange={(e) => setEditedVaultData({ ...editedVaultData, password: e.target.value })}
            style={{ marginBottom: "20px" }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditFormOpen(false)}>Cancel</Button>
          <Button onClick={handleEdit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}




