import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  AuthProvider  from './context/AuthProvider.jsx';
import { BrowserRouter } from "react-router";
import Routing from './routes/Routing.jsx';
import './index.css'
import NavBar from './components/NavBar.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Routing />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
