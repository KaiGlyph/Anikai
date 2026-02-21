import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/header/header'
import Footer from './components/layout/footer/footer'
import Home from './pages/Home/Home'
import Recommendations from './pages/Recommendations'
import Catalog from './pages/Catalog'
import Lists from './pages/Lists'

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
            <Route path="/" element={<Home />} />
            <Route path="/recomendaciones" element={<Recommendations />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/listas" element={<Lists />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}