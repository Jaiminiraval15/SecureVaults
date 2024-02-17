import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/AuthContext';
import { EncryptionContext, EncryptionContextProvider } from './context/EncryptionContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Folder from './components/Folder/folder';
import { useAuthContext } from './hooks/useAuthContext';
import Vault from './components/Vault/vault';
import { Navigate } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import GeneratePassword from './components/GeneratePassword';
import UserProfile from './components/UserProfile';
import { useEncryptionContext } from './hooks/useEncryptionContext';


const ProtectedRoute = ({ element, ...rest }) => {
  const { user } = useAuthContext();
  
  
  return user? element : <Navigate to="/" state={{ from: rest.location }} />;
};

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'folder',
        element: <ProtectedRoute element={<Folder />} />
        
      },{
        path:'vault',
        element:<ProtectedRoute element={<Vault />} />
      },
      {
        path:'generatePassword',
        element : <ProtectedRoute element={<GeneratePassword />} />
      },
      {
        path:'userProfile',
        element : <ProtectedRoute element={<UserProfile />} />
      },
      {
        path:'*',
        element:<PageNotFound/>
      }
    
    ]
    }
  
]
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <AuthContextProvider>
    <EncryptionContextProvider >
    <RouterProvider router={router}>
      
    </RouterProvider>
    </EncryptionContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
