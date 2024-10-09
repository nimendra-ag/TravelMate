import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AdminContextProvider from './context/AdminContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminContextProvider>
      <App />
    </AdminContextProvider>
  </StrictMode>,
)
