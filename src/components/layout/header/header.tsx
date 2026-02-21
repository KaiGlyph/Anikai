import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import logoDark from "@/assets/images/Anikai_LogoNegro.png";
import logoNormal from "@/assets/images/Anikai_Logo.png";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cierra el menú al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // ✅ NUEVO: Añade/elimina clase 'menu-open' al body al abrir/cerrar el menú
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full transition-all duration-300 glass ${
          isScrolled ? "bg-[#0b0d10]/90" : ""
        }`}
        style={{
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "80px",
          display: "flex",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Logo + Nombre (Izquierda) */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              textDecoration: "none",
            }}
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src={isScrolled ? logoNormal : logoNormal}
              alt="Anikai"
              style={{
                height: "56px",
                width: "56px",
                objectFit: "contain",
              }}
            />
            <span
              style={{
                color: "white",
                fontFamily: "var(--font-serif)",
                fontSize: "28px",
                fontWeight: "400",
              }}
            >
              Anikai
            </span>
          </Link>

          {/* Navegación Desktop - SOLO VISIBLE EN PANTALLAS >= 768px */}
          <nav
            style={{
              alignItems: "center",
              gap: "32px",
            }}
            className="desktop-nav"
          >
            <Link
              to="/"
              className={`text-red-400 hover:text-red-300 transition-colors ${
                location.pathname === '/' ? 'font-bold' : ''
              }`}
              style={{ fontWeight: "500", fontSize: "16px" }}
            >
              Home
            </Link>
            <Link
              to="/recomendaciones"
              className={`text-red-400 hover:text-red-300 transition-colors ${
                location.pathname === '/recomendaciones' ? 'font-bold' : ''
              }`}
              style={{ fontWeight: "500", fontSize: "16px" }}
            >
              Recomendaciones
            </Link>
            <Link
              to="/catalogo"
              className={`text-red-400 hover:text-red-300 transition-colors ${
                location.pathname === '/catalogo' ? 'font-bold' : ''
              }`}
              style={{ fontWeight: "500", fontSize: "16px" }}
            >
              Catálogo
            </Link>
            <Link
              to="/listas"
              className={`text-red-400 hover:text-red-300 transition-colors ${
                location.pathname === '/listas' ? 'font-bold' : ''
              }`}
              style={{ fontWeight: "500", fontSize: "16px" }}
            >
              Listas
            </Link>
          </nav>

          {/* Menú Hamburguesa - SOLO VISIBLE EN MOBILE */}
          <button
            className="hamburger-button"
            style={{
              color: "white",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "24px",
              padding: "8px",
              transition: "transform 0.3s ease",
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menú"
          >
            <div style={{ 
              transition: "transform 0.3s ease, opacity 0.2s ease",
              transform: isMenuOpen ? "rotate(90deg)" : "rotate(0deg)",
            }}>
              {isMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </div>
          </button>
        </div>
      </header>

      {/* Menú Móvil - Solo visible cuando isMenuOpen = true */}
      {isMenuOpen && (
        <div
          className="mobile-menu"
          style={{
            position: "fixed",
            top: "80px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "transparent",
            backdropFilter: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            zIndex: 999,
            animation: "fadeIn 0.3s ease-out",
          }}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="mobile-menu-content"
            style={{
              width: "100%",
              maxWidth: "100%",
              backgroundColor: "rgba(11, 13, 16, 0.8)",
              backdropFilter: "blur(12px)",
              border: "none",
              borderRadius: "12px",
              padding: "32px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
            }}
            onClick={e => e.stopPropagation()}
          >
            <Link
              to="/"
              className={`text-red-400 hover:text-red-300 transition-colors ${
                location.pathname === '/' ? 'font-bold' : ''
              }`}
              style={{ fontWeight: "500", fontSize: "20px", textAlign: "center", width: "100%" }}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/recomendaciones"
              className={`text-red-400 hover:text-red-300 transition-colors ${
                location.pathname === '/recomendaciones' ? 'font-bold' : ''
              }`}
              style={{ fontWeight: "500", fontSize: "20px", textAlign: "center", width: "100%" }}
              onClick={() => setIsMenuOpen(false)}
            >
              Recomendaciones
            </Link>
            <Link
              to="/catalogo"
              className={`text-red-400 hover:text-red-300 transition-colors ${
                location.pathname === '/catalogo' ? 'font-bold' : ''
              }`}
              style={{ fontWeight: "500", fontSize: "20px", textAlign: "center", width: "100%" }}
              onClick={() => setIsMenuOpen(false)}
            >
              Catálogo
            </Link>
            <Link
              to="/listas"
              className={`text-red-400 hover:text-red-300 transition-colors ${
                location.pathname === '/listas' ? 'font-bold' : ''
              }`}
              style={{ fontWeight: "500", fontSize: "20px", textAlign: "center", width: "100%" }}
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