import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import {useEncryptionFunction} from "../../hooks/useEncryptionFunction";
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
} from "@mui/material";
import { useEncryptionContext } from "../../hooks/useEncryptionContext";


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
    const {state} = useEncryptionContext()
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      fetchData();
      fetchFolders(); // Fetch folders when the component mounts
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

      // Reset form values
      setPasswordName("");
      setUserName("");
      setPassword("");

      setOpenForm(false);
    } catch (error) {
      console.error("Error adding vault:", error);
    }
  };

  const handleCardClick = (vaultId) => {
    const selected = vault.find((v) => v._id === vaultId);
    if (selected) {
      setSelectedVault(selected);
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
    variant="outlined"
    fullWidth
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={{ marginBottom: "20px" }}
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
        <Typography variant="h6">
        Folder Name: {selectedVault && selectedVault.folderid ? selectedVault.folderid.folderName : ""}
          </Typography>
          <Typography variant="h6">
            Password Name: {selectedVault ? selectedVault.passwordName : ""}
          </Typography>
          <Typography variant="h6">
            Username: {selectedVault ? decrypt(selectedVault.username) : ""}
          </Typography>
          <Typography variant="h6">
            Password: {selectedVault ? decrypt(selectedVault.password) : ""}
          </Typography>
        </DialogContent>
      </Dialog>
      <Container maxWidth="lg">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {vault.map((v) => (
            <Card
              key={v._id}
              style={{ width: "200px", margin: "10px", cursor: "pointer" }}
              onClick={() => handleCardClick(v._id)}
            >
              <CardContent>
              <Typography variant="h6">Folder: {v.folderid.folderName}</Typography>
              <Typography variant="h6">Name: {v.passwordName}</Typography>
          
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
