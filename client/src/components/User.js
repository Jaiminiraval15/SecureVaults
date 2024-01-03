import { Button, Dialog, DialogContent, DialogTitle, Link,IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LoginForm from './Forms/LoginForm';
import SignupForm from './Forms/SignupForm';
import { useState } from 'react';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export default function User() {
  const [showForm, setShowForm] = useState(null);
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const openSignup = () => {
    setShowForm('signup');
  };

  const openLogin = () => {
    setShowForm('login');
  };

  const handleClose = () => {
    setShowForm(null);
  };

  const handleSubmit = () => {
    logout();
  };
  

  return (
    <>
      {user && (
        <Link to="/logout" style={{ textDecoration: 'none' }}>
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
            onClick={handleSubmit}
          >
            Logout
          </Button>
        </Link>
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