import { Checkbox, Typography } from "@mui/material";
import { useCallback,useState } from "react";
import '../App.css'
export default function GeneratePassword() {
    const [length,setLength] = useState(8);
    const [password,setPassword] = useState('');
    const [numbers,setNumbers] = useState(false);
    const [symbols,setSymbols] = useState(false);
    const [uppercase,setUppercase] = useState(true);
    const [lowercase,setLowercase] = useState(true);
    const passwordGenerator = useCallback(()=>{
        let pass = '';
        let uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let lowercase = 'abcdefghijklmnopqrstuvwxyz';
        let numbers = '0123456789';
        let symbols = '!@#$%^&*()_+';
        if(numbers){
            pass+=numbers;
        }
        if(symbols){
            pass+=symbols;
        }
        for(let i=1;i<=length;i++){

            let char = Math.floor(Math.random()*pass.length +1) ;
            pass +=pass.charAt(char)
        }
        setPassword(pass);
    },
    [length,numbers,symbols,uppercase,lowercase,setPassword]);
    
    return (
        <>
        <div className="wrapper">
      <div className="container wrapper-box">
        <Typography variant="h4" style={{ color: 'purple' }}>Password Generator</Typography>
        <div className="password-box">
          <input
            type="text"
            style={{ width: '100%' ,border:'1px solid purple'}}
            placeholder=""
            autoComplete="off"
           
          />
          <button
            className="copy-button"
           
            
          >
          
          </button>
        </div>
        <br />
        <div className="word-crieteria__box">
          <div>
            <label>Password length</label>
          </div>
          <div>
            <input
              type="number"
              min="4"
              max="20"
                style={{ width: '100%' ,border:'1px solid black',marginInline:'0.5em'}}
             
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Include uppercase </label>
          </div>
          <div>
            <Checkbox
              
    
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Include lowercase </label>
          </div>
          <div>
            <Checkbox
             
             
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Include numbers</label>
          </div>
          <div>
            <Checkbox
            
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Include symbols</label>
          </div>
          <div>
            <Checkbox
             
              
            />
          </div>
        </div>
        
      </div>
    </div>
      
        </>
    )
}