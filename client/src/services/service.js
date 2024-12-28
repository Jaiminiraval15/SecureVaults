
export const fetchFolders = async (userToken) => {
  try {
    const response = await fetch("http://localhost:2003/api/folder/", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch folders');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching folders:', error);
    throw error;
  }
};

export const addFolder = async (folderData, userToken) => {
    
  try {
    const response = await fetch("http://localhost:2003/api/folder/addfolder", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
      body: JSON.stringify(folderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to add folder: ${errorData.message || 'Unknown error'}`);
    }

    const newFolder = await response.json();
    return newFolder;
  } catch (error) {
    console.error('Error adding folder:', error);
    throw error;
  }
};

export const editFolder = async (folderId, updatedData, userToken) => {
  try {
    const response = await fetch(`http://localhost:2003/api/folder/${folderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to update folder: ${errorData.message || 'Unknown error'}`);
    }

    const updatedFolder = await response.json();
    return updatedFolder;
  } catch (error) {
    console.error('Error editing folder:', error);
    throw error;
  }
};

export const deleteFolder = async (folderId, userToken) => {
  try {
    const response = await fetch(`http://localhost:2003/api/folder/${folderId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to delete folder: ${errorData.message || 'Unknown error'}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error deleting folder:', error);
    throw error;
  }
};

export const fetchVaults = async (token) => {
  try {
    const res = await fetch(`http://localhost:2003/api/password`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch vaults");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching vaults:", error);
    throw error;
  }
};
export const addVault = async (vaultData, token, encrypt) => {
  
  try {
    const encryptedUserName = encrypt(vaultData.username);
    const encryptedPassword = encrypt(vaultData.password);
    
    const response = await fetch(`http://localhost:2003/api/password/addpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...vaultData,
        username: encryptedUserName,
        password: encryptedPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to add vault: ${errorData.message || 'Unknown error'}`);
    }

    const newVault = await response.json();
    return newVault;
  } catch (error) {
    console.error('Error adding vault:', error);
    throw error;
  }
};

export const editVault = async (vaultId, updatedData, userToken, encrypt) => {
  try {
    const encryptedUserName = encrypt(updatedData.username);
    const encryptedPassword = encrypt(updatedData.password);

    const response = await fetch(`http://localhost:2003/api/password/${vaultId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        ...updatedData,
        username: encryptedUserName,
        password: encryptedPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to update vault: ${errorData.message || 'Unknown error'}`);
    }

    const updatedVault = await response.json();
    return updatedVault;
  } catch (error) {
    console.error('Error editing vault:', error);
    throw error;
  }
};

export const deleteVault = async (vaultId, userToken) => {
  try {
    const response = await fetch(`http://localhost:2003/api/password/${vaultId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to delete vault: ${errorData.message || 'Unknown error'}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error deleting vault:', error);
    throw error;
  }
};
export const fetchUser = async (token) => {
  try {
    const response = await fetch(`http://localhost:2003/api/user/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
export const updateUser = async (userId, userData, token) => {
  try {
    const response = await fetch(`http://localhost:2003/api/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error('Failed to update user data');
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};
