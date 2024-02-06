import { Button,  Typography } from "@mui/material";
import { useCallback,useState,useEffect,useRef } from "react";
import '../App.css'

export default function GeneratePassword() {
    const [length,setLength] = useState(8);
    const [password,setPassword] = useState('');
    const [numbers,setNumbers] = useState(false);
    const [symbols,setSymbols] = useState(false);
    const [uppercase,setUppercase] = useState(true);
    const [lowercase,setLowercase] = useState(true);
    //useRef
    const passwordRef = useRef(null);

   
    const passwordGenerator = useCallback(() => {
        let pass = '';
        let str = '';
        let uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        let numberChars = '0123456789';
        let symbolChars = '!@#$%^&*()_+';
      
        if (numbers) str += numberChars;
        if (symbols) str += symbolChars;
        if (uppercase) str += uppercaseChars;
        if (lowercase) str += lowercaseChars;
      
        for (let i = 1; i < length; i++) {
          let charIndex = Math.floor(Math.random() * str.length+1);
          pass += str.charAt(charIndex);
        }
      
        setPassword(pass);
      }, [length, numbers, symbols, uppercase, lowercase,setPassword]);

    const copyPassword = useCallback(()=>{
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0,20);
        window.navigator.clipboard.writeText(password);
    },[password])

    useEffect(()=>{

        passwordGenerator();
    },
    [uppercase,lowercase,numbers,symbols,length])
    return (
        <>
        <div className="wrapper">
      <div className="container wrapper-box">
        <Typography variant="h4" style={{ color: 'purple' }}>Password Generator</Typography>
        <div className="password-box">
        <input
            type="text"
            value={password}
            style={{ width: '100%' ,border:'1px solid black'}}
            placeholder="Password"
            autoComplete="off"
           readOnly
           ref={passwordRef}
           
          />
  <Button variant="outlined" onClick={copyPassword} style={{marginInline:'0.5em'}}>Copy</Button>
</div>

        <br />
        <div className="word-crieteria__box">
          <div>
            <label>Length: {length}</label>
          </div>
          <div>
            <input
              type="range"
              min={8}
              max={20}
              value={length}
                style={{ width: '100%' ,border:'1px solid black',marginInline:'0.5em'}}
                onChange={(e) => setLength(e.target.value)}
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Uppercase </label>
          </div>
          <div>
            <input type='checkbox'
            defaultChecked={uppercase}
            onChange={(e)=>setUppercase((prev)=>(!prev))}
            style={{marginInline:'0.5em'}}
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Lowercase </label>
          </div>
          <div>
          <input type='checkbox'
            defaultChecked={lowercase}
            onChange={(e)=>setLowercase((prev)=>(!prev))}
            style={{marginInline:'0.5em'}}
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Numbers</label>
          </div>
          <div>
          <input type='checkbox'
            defaultChecked={numbers}
            onChange={(e)=>setNumbers((prev)=>(!prev))}
            style={{marginInline:'0.5em'}}
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Symbols</label>
          </div>
          <div>
          <input type='checkbox'
            defaultChecked={symbols}
            onChange={(e)=>setSymbols((prev)=>(!prev))}
            style={{marginInline:'0.5em'}}
            />
          </div>
        </div>
       
      </div>
    </div>
      
        </>
    )
}



