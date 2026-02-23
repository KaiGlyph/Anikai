import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import logoNormal from "@/assets/images/Anikai_Logo.png";
import './Header.css'; // ← Importar CSS

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Efecto scroll para cambiar estilo del header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cierra el menú al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Controla clase en body para bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* Header Principal */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="header__nav">
          
          {/* Logo + Nombre */}
          <Link to="/" className="header__logo">
            <img 
              src={logoNormal} 
              alt="Anikai" 
              className="header__logo-img" 
            />
            <span className="header__logo-text">Anikai</span>
          </Link>

          {/* Navegación Desktop */}
          <nav className="desktopNav">
            <Link 
              to="/" 
              className={`desktopNav__link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/recomendaciones" 
              className={`desktopNav__link ${location.pathname === '/recomendaciones' ? 'active' : ''}`}
            >
              Recomendaciones
            </Link>
            <Link 
              to="/catalogo" 
              className={`desktopNav__link ${location.pathname === '/catalogo' ? 'active' : ''}`}
            >
              Catálogo
            </Link>
            <Link 
              to="/listas" 
              className={`desktopNav__link ${location.pathname === '/listas' ? 'active' : ''}`}
            >
              Listas
            </Link>
            
            {/* Botones de autenticación */}
            <button className="desktopNav__button">Iniciar Sesión</button>
            <button className="desktopNav__button desktopNav__button--primary">
              Registrarse
            </button>
          </nav>

          {/* Botón Hamburguesa Móvil */}
          <button
            className={`hamburgerButton ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menú"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>

      {/* Menú Móvil Overlay */}
{isMenuOpen && (
  <div className="mobileMenu" onClick={() => setIsMenuOpen(false)}>
    <div className="mobileMenu__content" onClick={e => e.stopPropagation()}>
      
      <Link 
        to="/" 
        className={`mobileMenu__link ${location.pathname === '/' ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      >
        Home
      </Link>
      <Link 
        to="/recomendaciones" 
        className={`mobileMenu__link ${location.pathname === '/recomendaciones' ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      >
        Recomendaciones
      </Link>
      <Link 
        to="/catalogo" 
        className={`mobileMenu__link ${location.pathname === '/catalogo' ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      >
        Catálogo
      </Link>
      <Link 
        to="/listas" 
        className={`mobileMenu__link ${location.pathname === '/listas' ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      >
        Listas
      </Link>
      
    </div>
  </div>
)}
    </>
  );
}