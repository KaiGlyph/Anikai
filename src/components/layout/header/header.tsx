// src/components/layout/header/Header.tsx
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, LogIn, UserPlus, Settings, LogOut, ChevronDown } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';
import logoNormal from "@/assets/images/Anikai_Logo.png";
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null); // ← NUEVO: Username real
  const location = useLocation();
  const navigate = useNavigate();

  // Efecto scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ← ACTUALIZADO: Verificar auth + obtener username de profiles
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      
      if (session?.user) {
        setUserEmail(session.user.email || null);
        
        // ← NUEVO: Obtener username de la tabla profiles
        const { data: profile } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', session.user.id)
          .single();
        
        setUserName(profile?.username || null);
      } else {
        setUserEmail(null);
        setUserName(null);
      }
    };
    
    checkSession();

    // Suscribirse a cambios de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setIsLoggedIn(!!session);
        
        if (session?.user) {
          setUserEmail(session.user.email || null);
          
          // ← NUEVO: Obtener username al cambiar estado
          const { data: profile } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', session.user.id)
            .single();
          
          setUserName(profile?.username || null);
        } else {
          setUserEmail(null);
          setUserName(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Cierra el menú al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  // Cierra el menú user al hacer click fuera
  useEffect(() => {
    const handleClickOutside = () => setIsUserMenuOpen(false);
    if (isUserMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen]);

  // Controla clase en body
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  // Función para cerrar sesión
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsUserMenuOpen(false);
    navigate('/');
  };

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
            
            {/* User Menu - Desktop */}
            <div 
              className="user-menu"
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={() => setIsUserMenuOpen(true)}
              onMouseLeave={() => setIsUserMenuOpen(false)}
            >
              <button className="user-menu__trigger">
                <div className="user-menu__avatar">
                  <User size={20} />
                </div>
                <ChevronDown size={16} className={`user-menu__arrow ${isUserMenuOpen ? 'rotated' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              <div className={`user-menu__dropdown ${isUserMenuOpen ? 'visible' : ''}`}>
                {isLoggedIn ? (
                  // Usuario logueado ← CON USERNAME REAL
                  <>
                    <div className="user-menu__header">
                      <div className="user-menu__user-avatar">
                        <User size={32} />
                      </div>
                      <div className="user-menu__user-info">
                        <span className="user-menu__username">
                          {/* ← MUESTRA USERNAME REAL, fallback al email */}
                          {userName || userEmail?.split('@')[0] || 'Usuario'}
                        </span>
                        <span className="user-menu__email">{userEmail}</span>
                      </div>
                    </div>
                    <div className="user-menu__divider" />
                    <Link to="/perfil" className="user-menu__item">
                      <User size={18} />
                      Mi Perfil
                    </Link>
                    <Link to="/configuracion" className="user-menu__item">
                      <Settings size={18} />
                      Configuración
                    </Link>
                    <div className="user-menu__divider" />
                    <button 
                      className="user-menu__item user-menu__item--danger"
                      onClick={handleLogout}
                    >
                      <LogOut size={18} />
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  // Usuario NO logueado
                  <>
                    <div className="user-menu__guest-header">
                      <p>Accede a tu cuenta</p>
                      <span>Para ver tus listas y recomendaciones</span>
                    </div>
                    <div className="user-menu__divider" />
                    <Link to="/login" className="user-menu__item">
                      <LogIn size={18} />
                      Iniciar Sesión
                    </Link>
                    <Link to="/registro" className="user-menu__item user-menu__item--primary">
                      <UserPlus size={18} />
                      Registrarse
                    </Link>
                  </>
                )}
              </div>
            </div>
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
            
            {/* User Section - Mobile */}
            <div className="mobileMenu__user-section">
              <div className="mobileMenu__user-avatar">
                <User size={32} />
              </div>
              {isLoggedIn ? (
                <div className="mobileMenu__user-info">
                  <span className="mobileMenu__username">
                    {userName || userEmail?.split('@')[0] || 'Usuario'}
                  </span>
                  <span className="mobileMenu__email">{userEmail}</span>
                </div>
              ) : (
                <div className="mobileMenu__guest-info">
                  <span className="mobileMenu__guest-text">Invitado</span>
                </div>
              )}
            </div>

            <div className="mobileMenu__divider" />
            
            {/* Navegación Principal */}
            <div className="mobileMenu__section">
              <span className="mobileMenu__section-title">Navegación</span>
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
            
            <div className="mobileMenu__divider" />
            
            {/* Cuenta - SOLO si está logueado */}
            {isLoggedIn && (
              <div className="mobileMenu__section">
                <span className="mobileMenu__section-title">Cuenta</span>
                <Link 
                  to="/perfil" 
                  className="mobileMenu__link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} />
                  Mi Perfil
                </Link>
                <Link 
                  to="/configuracion" 
                  className="mobileMenu__link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings size={18} />
                  Configuración
                </Link>
              </div>
            )}
            
            {/* Autenticación */}
            <div className="mobileMenu__section">
              {isLoggedIn ? (
                <button 
                  className="mobileMenu__button mobileMenu__button--danger"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                >
                  <LogOut size={18} />
                  Cerrar Sesión
                </button>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="mobileMenu__button mobileMenu__button--secondary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn size={18} />
                    Iniciar Sesión
                  </Link>
                  <Link 
                    to="/registro" 
                    className="mobileMenu__button mobileMenu__button--primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus size={18} />
                    Registrarse
                  </Link>
                </>
              )}
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}