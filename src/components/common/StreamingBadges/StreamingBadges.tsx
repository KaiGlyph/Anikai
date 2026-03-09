// src/components/common/StreamingBadges.tsx
// Usar en AnimeDetail dentro de la sección de Información:
//   <StreamingBadges platforms={anime.streaming_platforms} />

import React from 'react';
import './StreamingBadges.css';

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG: logo SVG inline + color de cada plataforma
// ─────────────────────────────────────────────────────────────────────────────
const PLATFORM_CONFIG: Record<string, { color: string; logo: React.ReactNode; url: string }> = {
  Crunchyroll: {
    color: '#f47521',
    url: 'https://www.crunchyroll.com',
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5c4.142 0 7.5 3.358 7.5 7.5 0 1.01-.2 1.973-.563 2.852L16.5 12.5a4.5 4.5 0 10-4.5 4.5c.617 0 1.207-.124 1.742-.349l2.358 2.358A7.463 7.463 0 0112 19.5c-4.142 0-7.5-3.358-7.5-7.5S7.858 4.5 12 4.5z"/>
      </svg>
    ),
  },
  Netflix: {
    color: '#e50914',
    url: 'https://www.netflix.com',
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.678.946.nipple.258.2.526.201h3.822c.fake.267 0 .523-.101.698-.274C15.638 15.85 13.289 8.006 10.226 0H5.398zm10.208 0c.559 1.527 1.05 2.96 1.547 4.367a1.62 1.62 0 001.023 0V0h-2.57zm2.57 19.633a1.62 1.62 0 01-1.023 0C15.66 22.018 14.195 24 14.195 24H18.6V19.633zM5.398 24h4.828L5.398 10.473V24z"/>
      </svg>
    ),
  },
  'Amazon Prime': {
    color: '#00a8e0',
    url: 'https://www.primevideo.com',
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705a.66.66 0 01-.75.074c-1.053-.875-1.239-1.28-1.818-2.114-1.739 1.773-2.963 2.303-5.212 2.303-2.662 0-4.733-1.642-4.733-4.927 0-2.568 1.39-4.313 3.37-5.166 1.716-.753 4.113-.887 5.943-1.094v-.41c0-.752.058-1.64-.383-2.289-.382-.579-1.124-.817-1.775-.817-1.206 0-2.282.618-2.545 1.898-.054.285-.261.567-.549.582l-3.064-.331c-.259-.058-.548-.266-.472-.66.701-3.694 4.04-4.807 7.03-4.807 1.528 0 3.526.407 4.73 1.566 1.527 1.426 1.38 3.328 1.38 5.399v4.888c0 1.47.611 2.117 1.183 2.912.2.281.244.619-.011.828-.641.534-1.781 1.524-2.406 2.079l-.003-.013zM20.807 18.757c-2.818 2.085-6.91 3.19-10.428 3.19-4.937 0-9.382-1.825-12.74-4.86-.264-.239-.028-.565.289-.38 3.628 2.113 8.115 3.382 12.747 3.382 3.127 0 6.568-.649 9.734-1.989.478-.204.878.313.398.657zm1.14-1.302c-.36-.46-2.379-.217-3.287-.109-.276.033-.318-.206-.069-.379 1.607-1.13 4.248-.804 4.555-.426.308.379-.082 3.022-1.588 4.283-.232.195-.453.09-.35-.166.34-.84 1.099-2.745.739-3.203z"/>
      </svg>
    ),
  },
  'Disney+': {
    color: '#113ccf',
    url: 'https://www.disneyplus.com',
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M11.57 7.44c-.37-.21-.72-.18-1.05.09-.33.27-.5.63-.5 1.08v7.08c0 .46.17.82.5 1.08.33.26.68.3 1.05.09l5.97-3.54c.37-.22.56-.52.56-.87s-.19-.65-.56-.87L11.57 7.44zM12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10z"/>
      </svg>
    ),
  },
  'HBO Max': {
    color: '#a020f0',
    url: 'https://www.max.com',
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14H8V8h2v8zm6 0h-2v-3h-2v3h-2V8h2v3h2V8h2v8z"/>
      </svg>
    ),
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE
// ─────────────────────────────────────────────────────────────────────────────
interface StreamingBadgesProps {
  platforms: string[];
  label?: string;
}

const StreamingBadges: React.FC<StreamingBadgesProps> = ({ platforms, label = 'Disponible en' }) => {
  if (!platforms || platforms.length === 0) return null;

  return (
    <div className="streaming-badges">
      {label && <span className="streaming-badges__label">{label}</span>}
      <div className="streaming-badges__list">
        {platforms.map(platform => {
          const config = PLATFORM_CONFIG[platform];
          if (!config) return (
            // Plataforma sin config → badge genérico
            <span key={platform} className="streaming-badge streaming-badge--generic">
              {platform}
            </span>
          );

          return (
            <a
              key={platform}
              href={config.url}
              target="_blank"
              rel="noopener noreferrer"
              className="streaming-badge"
              style={{ '--platform-color': config.color } as React.CSSProperties}
              title={`Ver en ${platform}`}
            >
              <span className="streaming-badge__icon">{config.logo}</span>
              <span className="streaming-badge__name">{platform}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default StreamingBadges;