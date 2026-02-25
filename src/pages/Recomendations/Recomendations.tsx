// src/pages/Recommendations/Recommendations.tsx
import React, { useState, useEffect } from 'react';
import { getRecommendations, Anime } from '../../lib/recommendations';
import { supabase } from '../../lib/supabaseClient';
import { Star, TrendingUp, Sparkles } from 'lucide-react';
import './Recommendations.css';

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Obtener usuario actual
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id || null);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (userId !== undefined) { // undefined = cargando, null = no logueado
      loadRecommendations();
    }
  }, [userId]);

  const loadRecommendations = async () => {
    setLoading(true);
    try {
      const recs = await getRecommendations(userId || undefined, 20);
      setRecommendations(recs);
    } catch (error) {
      console.error('Error cargando recomendaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="recommendations-loading">
        <div className="loading-spinner" />
        <p>Calculando recomendaciones...</p>
      </div>
    );
  }

  return (
    <div className="recommendations-page">
      <div className="recommendations-header">
        <h1>
          <Sparkles size={32} />
          Recomendaciones para Ti
        </h1>
        <p>
          {userId 
            ? 'Basado en tus gustos y preferencias'
            : 'Animes populares y trending'}
        </p>
      </div>

      <div className="recommendations-grid">
        {recommendations.map((anime) => (
          <div key={anime.id} className="recommendation-card">
            <div className="recommendation-card__image">
              <img src={anime.image} alt={anime.title} />
              <div className="recommendation-card__rating">
                <Star size={14} fill="#e63946" stroke="#e63946" />
                {anime.rating}
              </div>
            </div>
            <div className="recommendation-card__content">
              <h3>{anime.title}</h3>
              <div className="recommendation-card__genres">
                {anime.genres.slice(0, 3).map(genre => (
                  <span key={genre} className="genre-tag">{genre}</span>
                ))}
              </div>
              <div className="recommendation-card__meta">
                <span>{anime.year}</span>
                <span>•</span>
                <span>{anime.genres.length} géneros</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {recommendations.length === 0 && (
        <div className="no-recommendations">
          <TrendingUp size={48} />
          <p>No hay recomendaciones disponibles</p>
          <p className="subtitle">¡Explora el catálogo para personalizar!</p>
        </div>
      )}
    </div>
  );
}