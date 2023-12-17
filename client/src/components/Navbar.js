import {Navbar} from 'react-bootstrap';
import {Button} from '@mui/material';
export default function Nav() {
    return(
        <>
        <Navbar expand="lg" className="bg-body-tertiary d-flex align-items-center" style={{
            color : 'purple',
            padding: '0.5em',
            display : 'inline',
            fontSize : '2em',
            float : 'left',
            fontFamily : 'fantasy' ,
            position : 'static' 
        }}>SecureVaults</Navbar>
        <Button variant="outlined" style={{ color : 'purple',
            padding: '0.5em',
            display : 'block',
            float:"right",
            marginRight:'1em',
            marginTop:'0.5em'
            }} >Signup</Button>
        <Button variant="outlined" color="primary" style={{ color : 'purple',
            padding: '0.5em',
            display : 'block',
            float:"right",
            marginRight:'1em',
            marginTop:'0.5em'
            }} >Login</Button>
            
        </>
    )
}