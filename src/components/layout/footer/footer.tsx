// src/components/layout/Footer/Footer.tsx
import React from 'react';
import logo from '@/assets/images/Anikai_Logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const linkStyle: React.CSSProperties = {
    color: 'var(--text-secondary)',
    fontSize: '0.85rem',
    textDecoration: 'none',
    transition: 'color 0.3s ease, text-shadow 0.3s ease',
    display: 'block',
    marginBottom: '8px',
  };

  const hoverStyle: React.CSSProperties = {
    color: '#e63946',
    textShadow: '0 0 8px rgba(230, 57, 70, 0.6)',
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--glass-border)',
        padding: '48px 40px 32px',
        marginTop: 'auto',
        position: 'relative',
      }}
    >
      {/* Contenido principal en 3 columnas */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '60px',
          alignItems: 'start',
        }}
      >
        {/* IZQUIERDA: Marca + Descripción + Redes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Logo + Nombre */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src={logo}
              alt="Anikai Logo"
              style={{
                width: '48px',
                height: '48px',
                filter: 'drop-shadow(0 0 12px rgba(230, 57, 70, 0.4))',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#e63946',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textShadow: '0 0 16px rgba(230, 57, 70, 0.5)',
              }}
            >
              ANIKAI
            </span>
          </div>

          {/* Tagline */}
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              lineHeight: '1.6',
              margin: 0,
              fontFamily: 'var(--font-main)',
            }}
          >
            Tu portal de recomendaciones anime. Descubre, organiza y comparte tus series favoritas.
          </p>

          {/* Redes Sociales */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '8px',
            }}
          >
            {[
              { 
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                ), 
                href: 'https://instagram.com', 
                label: 'Instagram' 
              },
              { 
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0-5 5"></path>
                  </svg>
                ), 
                href: 'https://tiktok.com', 
                label: 'TikTok' 
              },
              { 
                icon: 'X', 
                href: 'https://twitter.com', 
                label: 'Twitter',
                isText: true 
              },
            ].map(({ icon, href, label, isText }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(230, 57, 70, 0.1)',
                  border: '1px solid rgba(230, 57, 70, 0.3)',
                  borderRadius: '8px',
                  color: '#e63946',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  textDecoration: 'none',
                  borderBottom: 'none',
                }}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, {
                    background: 'rgba(230, 57, 70, 0.2)',
                    borderColor: '#e63946',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 12px rgba(230, 57, 70, 0.3)',
                  });
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, {
                    background: 'rgba(230, 57, 70, 0.1)',
                    borderColor: 'rgba(230, 57, 70, 0.3)',
                    transform: 'translateY(0)',
                    boxShadow: 'none',
                  });
                }}
                aria-label={label}
              >
                {isText ? (
                  <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>{icon}</span>
                ) : (
                  icon
                )}
              </a>
            ))}
          </div>
        </div>

        {/* CENTRO: Explorar */}
        <div>
          <h4
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#e63946',
              marginBottom: '16px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Explorar
          </h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px 24px',
            }}
          >
            {[
              { text: 'Home', href: '/' },
              { text: 'Catálogo', href: '/catalogo' },
              { text: 'Recomendaciones', href: '/recomendaciones' },
              { text: 'Mis Listas', href: '/listas' },
              { text: 'Favoritos', href: '/favoritos' },
              { text: 'Calendario', href: '/calendario' },
            ].map(({ text, href }) => (
              <a
                key={text}
                href={href}
                style={{
                  ...linkStyle,
                  fontSize: '0.9rem',
                  marginBottom: '0',
                  borderBottom: 'none',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, linkStyle)}
              >
                ‣ {text}
              </a>
            ))}
          </div>
        </div>

        {/* DERECHA: Legal + Contacto */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Legal */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#e63946',
                marginBottom: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Legal
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Términos y Condiciones', 'Política de Privacidad', 'Aviso Legal'].map((text) => (
                <a
                  key={text}
                  href="#"
                  style={{
                    ...linkStyle,
                    fontSize: '0.85rem',
                    borderBottom: 'none',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
                  onMouseLeave={(e) => Object.assign(e.currentTarget.style, linkStyle)}
                >
                  {text}
                </a>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#e63946',
                marginBottom: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Contacto
            </h4>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.85rem',
                margin: 0,
                lineHeight: '1.6',
              }}
            >
              ¿Tienes dudas o sugerencias?
              <br />
              <a
                href="mailto:contact@anikai.com"
                style={{
                  color: '#e63946',
                  textDecoration: 'none',
                  borderBottom: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, { color: '#e63946' })}
              >
                contact@anikai.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* ABAJO: Copyright + Creador */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '40px auto 0',
          paddingTop: '24px',
          borderTop: '1px solid var(--glass-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <p
          style={{
            margin: 0,
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-main)',
            fontSize: '0.85rem',
            fontWeight: '400',
            opacity: '0.7',
          }}
        >
          © {currentYear} Anikai. Todos los derechos reservados.
        </p>
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-serif)',
            fontSize: '0.9rem',
            fontWeight: '500',
            color: 'var(--text-secondary)',
          }}
        >
          Diseñado y trabajado por{' '}
          <a
            href="https://github.com/kaiglyph"
            style={{
              color: '#e63946',
              textDecoration: 'none',
              borderBottom: 'none',
              fontWeight: '600',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, { color: '#e63946' })}
            target="_blank"
            rel="noopener noreferrer"
          >
          KaiGlyph
          </a>
        </p>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 968px) {
          footer > div:first-child {
            grid-template-columns: 1fr;
            gap: 32px !important;
          }
          footer > div:last-child {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}