// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/header/header'
import Footer from './components/layout/footer/footer'

// Páginas Principales
import Home from './pages/Home/Home'
import Recommendations from './pages/Recomendations/Recomendations'
import Catalog from './pages/Catalog/Catalog'
import AnimeDetail from './pages/AnimeDetail/AnimeDetail' // ← IMPORTAR
import Lists from './pages/Lists/Lists'

// Páginas de Autenticación
import Login from './pages/Auth/Login'
import Registro from './pages/Auth/Registro'

// Páginas Legales
import Terms from './pages/Legal/Terms/Terms'
import Privacy from './pages/Legal/Privacy/Privacy'
import LegalNotice from './pages/Legal/LegalNotice/LegalNotice'

// Estilos Globales
import './styles/variables.css';
import './styles/glass.css';
import './styles/animations.css';


export default function App() {
  return (
    <BrowserRouter>
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)'
      }}>
        <Header />
        <main style={{ flex: 1, paddingTop: '80px' }}>
          <Routes>
            {/* Páginas Principales */}
            <Route path="/" element={<Home />} />
            <Route path="/recomendaciones" element={<Recommendations />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/anime/:id" element={<AnimeDetail />} /> {/* ← AÑADIR ESTA */}
            <Route path="/listas" element={<Lists />} />
            
            {/* Páginas de Autenticación */}
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            
            {/* Páginas Legales */}
            <Route path="/terminos" element={<Terms />} />
            <Route path="/privacidad" element={<Privacy />} />
            <Route path="/aviso-legal" element={<LegalNotice />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}