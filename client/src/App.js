import { useEffect } from 'react';
import './App.css';

import Home from './components/Home';
import Nav from './components/Navbar';
import {BrowserRouter,Routes,Route, Navigate ,Outlet} from 'react-router-dom'

import { EncryptionContext, EncryptionContextProvider } from './context/EncryptionContext';
import Folder from './components/Folder/folder';

import { useAuthContext } from './hooks/useAuthContext';


function App() {
  
 
  return (
   <>
 

  
  
   </>
  );
}

export default App;
