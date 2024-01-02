
import { Button,Link } from '@mui/material';
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
          <Link to="/signup" style={{ textDecoration: 'none' }}>
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
          </Link>
          <Link to="/login" style={{ textDecoration: 'none' }}>
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
          </Link>
          {showForm === 'signup' && <SignupForm />}
          {showForm === 'login' && <LoginForm />}
        </>
      )}
    </>
  );
}
