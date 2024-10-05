import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AccomodationContextProvider from './context/AccomodationContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AccomodationContextProvider>
      <App />
    </AccomodationContextProvider>
  </StrictMode>,
)
