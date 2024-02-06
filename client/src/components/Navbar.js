import User from './User';
import { Container, AppBar, Toolbar, Typography, Box, IconButton, Tooltip, Avatar } from '@mui/material';
import { Navbar } from 'react-bootstrap';
import MenuIcon from '@mui/icons-material/Menu';

export default function Nav() {


  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Navbar.Brand className="bg-body-tertiary" style={{
            color: 'purple',
            padding: '0.5em',
            display: 'inline',
            fontSize: '2em',
            float: 'left',
            fontFamily: 'fantasy',
            position: 'static',
            marginRight: 'auto'
          }}>SecureVaults</Navbar.Brand>
          <User />
        </Toolbar>
      </AppBar>
    </>
  )
}

