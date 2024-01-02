
import './App.css';
import LoginForm from './components/Forms/LoginForm';
import SignupForm from './components/Forms/SignupForm';
import Home from './components/Home';
import Nav from './components/Navbar';
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext';
import { EncryptionContextProvider } from './context/EncryptionContext';
import Folder from './components/Folder/folder';
function App() {
 
  return (
   <>
   <AuthContextProvider>
    <EncryptionContextProvider>
   
   <BrowserRouter>
   <Nav/>
   <Routes>
    <Route index exact element={<Home/>}></Route>
    
    <Route path='/folder' exact element={<Folder/>}></Route>
   </Routes>
   </BrowserRouter>
   </EncryptionContextProvider>
   </AuthContextProvider>
   </>
  );
}

export default App;
