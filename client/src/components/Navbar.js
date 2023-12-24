import { Navbar } from 'react-bootstrap';
import { Button} from '@mui/material';
import LoginForm from './Forms/LoginForm';
import SignupForm from './Forms/SignupForm';
import { useState } from 'react';


export default function Nav() {
    const [login,setLogin] = useState(false);
    const [signup,setSignup] = useState(false);
    const openLogin = ()=>{
        setLogin(true)
    }
    const openSignup = ()=>{
        setSignup(true)
    }
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
            }}>SecureVaults</Navbar>
            <Button variant="outlined"  style={{
                color: 'purple',
                padding: '0.5em',
                display: 'block',
                float: "right",
                marginRight: '1em',
                marginTop: '0.5em'
    }} onClick={openSignup}
    >Signup</Button>
     <Button variant="outlined" color="primary" style={{
        color: 'purple',
                padding: '0.5em',
                display: 'block',
                float: "right",
                marginRight: '1em',
                marginTop: '0.5em'
    }}
    onClick={openLogin}
   
    >Login</Button>
          {signup && <SignupForm />}
      {login && <LoginForm />}
        </>
    )
}