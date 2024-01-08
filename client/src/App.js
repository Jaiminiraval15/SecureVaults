import { useEffect } from 'react';
import './App.css';

import Home from './components/Home';
import Nav from './components/Navbar';
import {BrowserRouter,Routes,Route, Navigate ,Outlet} from 'react-router-dom'

import { EncryptionContext, EncryptionContextProvider } from './context/EncryptionContext';
import Folder from './components/Folder/folder';

import { useAuthContext } from './hooks/useAuthContext';
function PrivateRoute({ children,...rest }) {
  const { user } = useAuthContext();
  return (
    
    <Route {...rest}>
      {!user
      ?
    <Outlet/>
    :
    <Navigate to="/" replace/>
  }

    </Route>
  )
}


function App() {
  
 
  return (
   <>
 
 <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
    </BrowserRouter>
  
  
   </>
  );
}

export default App;
