// src/pages/Recommendations/Recommendations.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getRecommendations, Anime } from '../../lib/recommendations';
import { supabase } from '../../lib/supabaseClient';
import { Star, TrendingUp, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Recommendations.css';

export default function Recommendations() {
  const { t } = useTranslation();
  const [recommendations, setRecommendations] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id || null);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (userId !== undefined) {
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
        <p>{t('recommendations.loading')}</p>
      </div>
    );
  }

  return (
    <div className="recommendations-page">
      <div className="recommendations-header">
        <h1>
          <Sparkles size={32} />
          {t('recommendations.title')}
        </h1>
        <p>{userId ? t('recommendations.subtitle_user') : t('recommendations.subtitle_guest')}</p>
      </div>

      <div className="recommendations-grid">
        {recommendations.map((anime) => (
          <div
            key={anime.id}
            className="recommendation-card"
            onClick={() => navigate(`/anime/${anime.id}`)}
            style={{ cursor: 'pointer' }}
          >
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
                <span>{anime.genres.length} {t('recommendations.genres')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {recommendations.length === 0 && (
        <div className="no-recommendations">
          <TrendingUp size={48} />
          <p>{t('recommendations.empty')}</p>
          <p className="subtitle">{t('recommendations.empty_sub')}</p>
        </div>
      )}
    </div>
  );
}