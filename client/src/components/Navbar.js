import User from './User';
import { Navbar } from 'react-bootstrap';
export default function Nav() {

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



