import {Navbar} from 'react-bootstrap';

export default function Nav() {
    return(
        <>
        <Navbar expand="lg" className="bg-body-tertiary" style={{
            color : 'purple',
            padding: '0.5em',
            display : 'block',
            fontSize : '2em',
            float : 'left',
            fontFamily : 'fantasy'  
        }}>SecureVaults</Navbar>
        </>
    )
}