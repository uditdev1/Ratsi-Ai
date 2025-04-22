// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import "./axiosConfig.js";
import { AuthProvider } from "./hooks/useVerifyMe.tsx";
import "./utils/Interceptors/AuthInterceptor.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>,
)
