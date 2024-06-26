import { Link } from 'react-router-dom';
import { Button, Dialog, MenuItem, Avatar, Menu, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LoginForm from './Forms/LoginForm';
import SignupForm from './Forms/SignupForm';
import { useState } from 'react';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

import LogoutIcon from '@mui/icons-material/Logout';

export default function User() {
  const [showForm, setShowForm] = useState(null);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openProfile = () => {
    navigate('/userProfile');
  }
    const openSignup = () => {
    setShowForm('signup');
  };

  const openLogin = () => {
    setShowForm('login');
  };
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
  
      setShowForm(null);
    
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/');
  };

  return (
    <>
      {user && (
        <>
             <div>
            <Link to="/vault" style={{ color: 'purple', padding: '0.5em', display: 'block', float: 'right', marginRight: '1em', marginTop: '0.5em' }}>Vault</Link>
            <Link to="/folder" style={{ color: 'purple', padding: '0.5em', display: 'block', float: 'right', marginRight: '1em', marginTop: '0.5em' }}>Folder</Link>
            <Link to="/generatePassword" style={{ color: 'purple', padding: '0.5em', display: 'block', float: 'right', marginRight: '1em', marginTop: '0.5em' }}>Generate Password</Link>
          </div>
          <Avatar src="/broken-image.jpg" style={{ float: 'right', marginRight: '1em', marginTop: '0.5em' }} onClick={openMenu}></Avatar>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
           
            <MenuItem onClick={handleLogout}><LogoutIcon style={{marginInline:'0.2em'}}/>Logout</MenuItem>
          </Menu>
         
         
        </>
      )}

{!user && (
        <>
          <Button
            variant="outlined"
            style={{
              color: 'purple',
              padding: '0.5em',
              display: 'block',
              float: 'right',
              marginRight: '1em',
              marginTop: '0.5em'
            }}
            onClick={openSignup}
          >
            Signup
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{
              color: 'purple',
              padding: '0.5em',
              display: 'block',
              float: 'right',
              marginRight: '1em',
              marginTop: '0.5em'
            }}
            onClick={openLogin}
          >
            Login
          </Button>
       
          <Dialog open={showForm !== null} onClose={handleClose} className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <DialogTitle>
              
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                style={{ position: 'absolute', top: '1px', right: '3px' }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                width: 'auto'
              }}
            >
              {showForm === 'signup' && <SignupForm />}
              {showForm === 'login' && <LoginForm />}
            </DialogContent>
          </Dialog>
        
    </>
)}
</>
  );
}