import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import Router from "./router/Router.jsx";
import AuthContextProvider from './Contexts/AuthContext.jsx';


createRoot(document.getElementById('root')).render(

  <AuthContextProvider>
     <Router/>
  </AuthContextProvider>
)
