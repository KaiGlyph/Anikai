export default function Catalog() {
  return (
    <div style={{ 
      padding: '40px 24px',
      minHeight: 'calc(100vh - 160px)'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        fontFamily: 'var(--font-serif)',
        fontWeight: '700',
        marginBottom: '32px',
        color: 'var(--text-primary)'
      }}>
        Catálogo
      </h1>
      <p style={{ 
        fontSize: '1.1rem', 
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-main)',
        fontWeight: '500'
      }}>
        Próximamente: Explora nuestro catálogo de animes
      </p>
    </div>
  )
}