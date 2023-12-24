
import { Button} from '@mui/material';
import LoginForm from './Forms/LoginForm';
import SignupForm from './Forms/SignupForm';
import { useState } from 'react';
export default function User(){
    const [login,setLogin] = useState(false);
    const [signup,setSignup] = useState(false);
    const openLogin = ()=>{
        setLogin(true)
    }
    const openSignup = ()=>{
        setSignup(true)
    }
    return(
        <>
       
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