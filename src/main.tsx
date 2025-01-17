import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../utils/i18n.ts'
import { BrowserRouter } from "react-router-dom";
import Router from './router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StrictMode>,
)
