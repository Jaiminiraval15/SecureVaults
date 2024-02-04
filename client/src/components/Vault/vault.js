import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useEncryptionFunction } from "../../hooks/useEncryptionFunction";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import swal from 'sweetalert';
import Swal from "sweetalert2";
import {
  Container,
  Button,
  MenuItem,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  DialogContent,
  Typography,
  Card,
  CardContent,
  Select,
  FormControl,
  InputLabel,
  IconButton
  
} from "@mui/material";
import { useEncryptionContext } from "../../hooks/useEncryptionContext";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
export default function Vault() {
  const { user } = useAuthContext();
  const [vault, setVault] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [passwordName, setPasswordName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [folders, setFolders] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const { encrypt, decrypt } = useEncryptionFunction();
  const [selectedVault, setSelectedVault] = useState(null); // Store the selected vault for decryption
  const navigate = useNavigate();
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editedVaultData, setEditedVaultData] = useState(null);
  const { state } = useEncryptionContext();
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!user && !user.token) {
      navigate("/");
    } else {

      fetchData();
      fetchFolders(); 
    }
  }, [user]);

  const fetchData = async () => {
    try {
      if (user && user.token) {
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
        const data = await res.json();
        setVault(data);
      }
    } catch (error) {
      console.error("Error fetching Vaults:", error);
    }
  };

  const fetchFolders = async () => {
    try {
      if (user && user.token) {
        const res = await fetch(`http://localhost:2003/api/folder`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch folders");
        }
        const data = await res.json();
        setFolders(data);
        console.log('Folders:', data)
      }
    } catch (error) {
      console.error("Error fetching Folders:", error);
    }
  };

  const handleAddVaultSubmit = async () => {
    try {
      const encryptedUserName = encrypt(userName);
      const encryptedPassword = encrypt(password);
      const response = await fetch(`http://localhost:2003/api/password/addpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({

          password: encryptedPassword,
          passwordName: passwordName,
          folderid: selectedFolder,
          username: encryptedUserName,

        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add vault");
      }

      // Refresh vault list
      fetchData();
      swal("Vault added successfully", "", "success");
      // Reset form values
      setPasswordName("");
      setUserName("");
      setPassword("");

      setOpenForm(false);
    } catch (error) {
      swal("Something went wrong", "", "error");
      console.error("Error adding vault:", error);
    }
  };
  const handleEdit = async (passwordid) => {
    try {
      const res = await fetch(`http://localhost:2003/api/password/${passwordid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          folderid: editedVaultData.folderid,
          passwordName: editedVaultData.passwordName,
          password: editedVaultData.password,
          username: editedVaultData.username,
        }),
      });
  
      if (!res.ok) {
        throw new Error("Failed to update vault");
      }
  
      const updatedVault = vault.map((item) => {
        if (item._id === passwordid) {
          return editedVaultData; 
        }
        return item;
      });
  
      setVault(updatedVault);
      Swal.fire('Edited!', 'Your vault has been edited.', 'success');
      setEditFormOpen(false);
      setShowCardDetails(true);

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
        const res = await fetch(`http://localhost:2003/api/password/${passwordid}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
        });
  
        if (!res.ok) {
          throw new Error("Failed to delete vault");
        }
  
        const updatedVault = vault.filter((item) => item._id !== passwordid);
        setVault(updatedVault);
        Swal.fire(
          'Deleted!',
          'Your vault has been deleted.',
          'success'
      );
      } 
    } catch (error) {
      console.error('Error deleting vault:', error);
      swal("Oops! Something went wrong while deleting the vault!", {
        icon: "error",
      });
    }
  };
  
  return (
    <div>
      <Container maxWidth="lg">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div></div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpenForm(true)}
            style={{
              display: "flex",
              color: "purple",
              padding: "0.5em",
              marginRight: "1em",
              marginTop: "3.5em",
              justifyContent: "flex-end",
            }}
          >
            Add Vault
          </Button>
        </div>
      </Container>
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>Add Vault</DialogTitle>
        <DialogContent>
          <FormControl fullWidth style={{ marginBottom: "20px" }}>
            <InputLabel htmlFor="folder-select">Folder</InputLabel>
            <Select
              value={selectedFolder || ''}
              onChange={(e) => setSelectedFolder(e.target.value)}
              label="Folder"
              inputProps={{
                name: 'folder',
                id: 'folder-select',
              }}
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
            type={showPassword ? 'text' : 'password'} // Toggle between text and password type
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
          <Button onClick={handleAddVaultSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={Boolean(selectedVault)}
        onClose={() => setSelectedVault(null)}
      >
        <DialogTitle>Vault Details</DialogTitle>
        <DialogContent>
          <Typography variant="h6" >
            Folder Name: {selectedVault && selectedVault.folderid ? selectedVault.folderid.folderName : ""}
          </Typography>
          <Typography variant="h6" >
            Vault Name: {selectedVault ? selectedVault.passwordName : ""}
          </Typography>
          <Typography variant="h6" >
            Username: {selectedVault ? decrypt(selectedVault.username) : ""}
          </Typography>
          <Typography variant="h6" >
            Password: {selectedVault ? decrypt(selectedVault.password) : ""}
          </Typography>
        </DialogContent>
      </Dialog>
      <Container maxWidth="lg">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {vault.map((v) => (
            <Card key={v._id} style={{ width: "200px", margin: "10px", color: "purple" }}>
              <CardContent style={{ position: 'relative' }}>
                <Typography variant="h6">Folder: {v.folderid.folderName}</Typography>
                <Typography variant="h6">Vault: {v.passwordName}</Typography>
                <Button variant="outlined" onClick={() => setSelectedVault(v)} style={{ marginBottom: "10px" ,marginTop:'15px'}}>View</Button>

                <EditIcon
                  color="action"
                  style={{ marginLeft: '10px' }}
                  onClick={() => {
                    setSelectedVault(v);
                    setEditedVaultData(v);
                    setSelectedFolder(v.folderid._id); 
                    setEditFormOpen(true); 
                    
                  }}
                />
               
              <DeleteOutlineIcon 
              color="error" 
              style={{ marginLeft: '10px' }}
              onClick={() => handleDelete(v._id)} 
            />
            
              </CardContent>
            </Card>

          ))} 
        </div>
      </Container>
      {/* Edit Vault Dialog Box */}

      <Dialog open={editFormOpen && selectedVault !== null} onClose={() => setEditFormOpen(false)}>


        <DialogTitle>Edit Vault</DialogTitle>
        <DialogContent>
          <FormControl fullWidth style={{ marginBottom: "20px" }}>
            <InputLabel htmlFor="folder-select">Folder</InputLabel>
            <Select
              value={editedVaultData && editedVaultData.folderid ? editedVaultData.folderid._id : ''}
              onChange={(e) => {
                const selectedFolder = folders.find(folder => folder._id === e.target.value);
                setEditedVaultData({
                  ...editedVaultData,
                  folderid: selectedFolder
                });
              }}
              label="Folder"
              inputProps={{
                name: 'folder',
                id: 'folder-select',
              }}
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
          
            value={editedVaultData ? editedVaultData.passwordName : ''}
            onChange={(e) => setEditedVaultData({ ...editedVaultData, passwordName: e.target.value })}
            style={{ marginBottom: "20px" }}
           
          />
          <TextField
            label="User Name"
            variant="outlined"
            fullWidth
            value={editedVaultData ? decrypt(editedVaultData.username) : ''}
            onChange={(e) => setEditedVaultData({ ...editedVaultData, username: encrypt(e.target.value) })}
            style={{ marginBottom: "20px" }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'} //Toggle
            fullWidth
            value={editedVaultData ? decrypt(editedVaultData.password) : ''}
            onChange={(e) => setEditedVaultData({ ...editedVaultData, password: encrypt(e.target.value) })}
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
          <Button variant="outlined" style={{ color: 'purple' }} onClick={() => setEditFormOpen(false)}>Cancel</Button>
          <Button variant="outlined" style={{ color: 'purple' }} onClick={() => handleEdit(selectedVault._id)} color="primary">Save</Button>
        </DialogActions>
      </Dialog>


    </div>

  );
}



