import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AlertProvider } from './AlertContext'
import { VehiculoProvider } from './VehiculoContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AlertProvider>
      <VehiculoProvider>
        <App />
      </VehiculoProvider>
    </AlertProvider>
  </StrictMode>,
)