import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './styles/themes.css'
import './i18n/index';
import { initTheme } from './hooks/useTheme'

initTheme() // ← añadir esta línea, antes del ReactDOM.createRoot

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)