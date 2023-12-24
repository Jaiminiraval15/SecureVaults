
import './App.css';
import LoginForm from './components/Forms/LoginForm';
import Home from './components/Home';
import Nav from './components/Navbar';
import {BrowserRouter,Routes,Route } from 'react-router-dom'
function App() {
  return (
   <>
   <Nav/>
   <BrowserRouter>
   <Routes>
    <Route path='/' exact element={<Home/>}></Route>
    
   
   </Routes>
   </BrowserRouter>

   </>
  );
}

export default App;
