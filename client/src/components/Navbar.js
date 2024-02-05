import User from './User';
import {Container,Toolbar,Box,Menu,MenuItem,Typography,IconButton,Tooltip,Avatar} from '@mui/material';
import { Navbar } from 'react-bootstrap';
import AppBar from '@mui/material/AppBar';
export default function Nav() {
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    return (
        <>
         <Navbar expand="lg" className="bg-body-tertiary d-flex align-items-center" style={{
                color: 'purple',
                padding: '0.5em',
                display: 'inline',
                fontSize: '2em',
                float: 'left',
                fontFamily: 'fantasy',
                position: 'static'
            }}>SecureVaults
       
            </Navbar>
   
            <User/>
       
        </>
    )
}



