// src/pages/AnimeDetail/AnimeDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import LoginModal from '../../components/common/LoginModal';
import { 
  Star, 
  Calendar, 
  Clock, 
  Play, 
  Heart, 
  Plus, 
  Check, 
  ChevronDown,
  Share2,
  Bookmark
} from 'lucide-react';
import './AnimeDetail.css';

// ─────────────────────────────────────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────────────────────────────────────
interface Anime {
  id: number;
  title: string;
  slug: string;
  image: string;
  synopsis: string;
  rating: number;
  popularity: number;
  year: number;
  episodes: number;
  status: string;
  type: string;
  genres: string[];
  studios: string[];
}

interface UserList {
  id: string;
  name: string;
  type: string;
  color: string;
  icon: string;
  anime_count: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────
export default function AnimeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Estados
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados de autenticación
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  // Estados del modal
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showListSelector, setShowListSelector] = useState(false);
  
  // Estados de listas
  const [userLists, setUserLists] = useState<UserList[]>([]);
  const [selectedList, setSelectedList] = useState<string>('');
  const [addingToList, setAddingToList] = useState(false);
  
  // Estado de anime en listas
  const [isInLists, setIsInLists] = useState(false);
  const [userStatus, setUserStatus] = useState<string>('');

  // ───────────────────────────────────────────────────────────────────────────
  // EFECTO: Verificar autenticación al montar
  // ───────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      setUserId(session?.user?.id || null);
    };
    checkAuth();
  }, []);

  // ───────────────────────────────────────────────────────────────────────────
  // EFECTO: Cargar datos del anime
  // ───────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (id) {
      fetchAnime(id);
    }
  }, [id]);

  // ───────────────────────────────────────────────────────────────────────────
  // EFECTO: Cargar listas del usuario cuando está logueado
  // ───────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isLoggedIn && userId) {
      fetchUserLists();
      checkIfInLists();
    }
  }, [isLoggedIn, userId]);

  // ───────────────────────────────────────────────────────────────────────────
  // FUNCIÓN: Obtener datos del anime desde Supabase
  // ───────────────────────────────────────────────────────────────────────────
  const fetchAnime = async (animeId: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('animes')
        .select('*')
        .eq('id', animeId)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Anime no encontrado');

      setAnime(data);
    } catch (err: any) {
      console.error('Error al cargar anime:', err);
      setError(err.message || 'Error al cargar el anime');
    } finally {
      setLoading(false);
    }
  };

  // ───────────────────────────────────────────────────────────────────────────
  // FUNCIÓN: Obtener listas del usuario
  // ───────────────────────────────────────────────────────────────────────────
  const fetchUserLists = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase.rpc('get_user_lists', {
        p_user_id: userId,
      });

      if (error) throw error;
      setUserLists(data || []);
      
      // Seleccionar primera lista por defecto (Viendo)
      if (data && data.length > 0) {
        const watchingList = data.find((l: UserList) => l.name === 'Viendo');
        setSelectedList(watchingList?.id || data[0].id);
      }
    } catch (err: any) {
      console.error('Error al cargar listas:', err);
    }
  };

  // ───────────────────────────────────────────────────────────────────────────
  // FUNCIÓN: Verificar si el anime ya está en listas
  // ───────────────────────────────────────────────────────────────────────────
  const checkIfInLists = async () => {
    if (!userId || !anime) return;

    try {
      const { data, error } = await supabase
        .from('user_list_animes')
        .select('list_id, status')
        .eq('anime_id', anime.id)
        .in('list_id', userLists.map(l => l.id))
        .maybeSingle();

      if (error) throw error;
      
      setIsInLists(!!data);
      setUserStatus(data?.status || '');
    } catch (err: any) {
      console.error('Error al verificar listas:', err);
    }
  };

  // ───────────────────────────────────────────────────────────────────────────
  // FUNCIÓN: Manejar click en "Añadir a lista"
  // ───────────────────────────────────────────────────────────────────────────
  const handleAddToListClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true); // ← Mostrar modal de login
    } else {
      setShowListSelector(!showListSelector); // ← Mostrar selector de listas
    }
  };

  // ───────────────────────────────────────────────────────────────────────────
  // FUNCIÓN: Añadir anime a lista seleccionada
  // ───────────────────────────────────────────────────────────────────────────
  const handleAddToList = async () => {
    if (!selectedList || !anime || !userId) return;

    try {
      setAddingToList(true);

      const { error } = await supabase.rpc('add_anime_to_list', {
        p_list_id: selectedList,
        p_anime_id: anime.id,
        p_status: 'planned',
      });

      if (error) throw error;

      setIsInLists(true);
      setShowListSelector(false);
      
      // Recargar listas para actualizar contador
      fetchUserLists();
      
    } catch (err: any) {
      console.error('Error al añadir a lista:', err);
      alert('Error al añadir a lista: ' + err.message);
    } finally {
      setAddingToList(false);
    }
  };

  // ───────────────────────────────────────────────────────────────────────────
  // FUNCIÓN: Eliminar anime de listas
  // ───────────────────────────────────────────────────────────────────────────
  const handleRemoveFromLists = async () => {
    if (!anime || !userId) return;

    try {
      const { error } = await supabase.rpc('remove_anime_from_list', {
        p_list_id: selectedList || userLists[0]?.id,
        p_anime_id: anime.id,
      });

      if (error) throw error;

      setIsInLists(false);
      setShowListSelector(false);
      fetchUserLists();
      
    } catch (err: any) {
      console.error('Error al eliminar de lista:', err);
      alert('Error al eliminar: ' + err.message);
    }
  };

  // ───────────────────────────────────────────────────────────────────────────
  // FUNCIÓN: Callback después de login exitoso
  // ───────────────────────────────────────────────────────────────────────────
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setShowListSelector(true); // Abrir selector después de login
  };

  // ───────────────────────────────────────────────────────────────────────────
  // RENDER: Loading
  // ───────────────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="anime-detail-page">
        <div className="anime-detail-loading">
          <div className="loading-spinner" />
          <p>Cargando información del anime...</p>
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // RENDER: Error
  // ───────────────────────────────────────────────────────────────────────────
  if (error || !anime) {
    return (
      <div className="anime-detail-page">
        <div className="anime-detail-error">
          <h1>❌ Error</h1>
          <p>{error || 'Anime no encontrado'}</p>
          <button onClick={() => navigate('/catalogo')}>
            Volver al Catálogo
          </button>
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // RENDER: Página Principal
  // ───────────────────────────────────────────────────────────────────────────
  return (
    <div className="anime-detail-page">
      
      {/* ─────────────────────────────────────────────────────────────────────
          HERO SECTION - Banner principal
          ───────────────────────────────────────────────────────────────────── */}
      <div className="anime-detail-hero">
        <div className="anime-detail-hero__background">
          <img src={anime.image} alt={anime.title} />
          <div className="anime-detail-hero__overlay" />
        </div>

        <div className="anime-detail-hero__content">
          <div className="anime-detail-hero__poster">
            <img src={anime.image} alt={anime.title} />
          </div>

          <div className="anime-detail-hero__info">
            <div className="anime-detail-hero__badges">
              <span className="badge badge--type">{anime.type}</span>
              <span className="badge badge--status">{anime.status}</span>
              <span className="badge badge--rating">
                <Star size={14} fill="#e63946" stroke="#e63946" />
                {anime.rating}
              </span>
            </div>

            <h1 className="anime-detail-hero__title">{anime.title}</h1>

            <div className="anime-detail-hero__meta">
              <span>
                <Calendar size={16} />
                {anime.year}
              </span>
              <span>
                <Clock size={16} />
                {anime.episodes} episodios
              </span>
              {anime.studios?.length > 0 && (
                <span>
                  <Play size={16} />
                  {anime.studios[0]}
                </span>
              )}
            </div>

            <div className="anime-detail-hero__genres">
              {anime.genres.map(genre => (
                <span key={genre} className="genre-pill">{genre}</span>
              ))}
            </div>

            {/* Botones de acción */}
            <div className="anime-detail-hero__actions">
              <button className="btn btn--primary">
                <Play size={20} />
                Ver Trailer
              </button>

              {/* Botón Añadir a Lista */}
              <div className="btn-group">
                <button 
                  className={`btn btn--secondary ${isInLists ? 'active' : ''}`}
                  onClick={handleAddToListClick}
                >
                  {isInLists ? (
                    <>
                      <Check size={20} />
                      En Lista
                    </>
                  ) : (
                    <>
                      <Plus size={20} />
                      Añadir a Lista
                    </>
                  )}
                </button>

                {showListSelector && isLoggedIn && (
                  <div className="list-selector">
                    <select
                      value={selectedList}
                      onChange={(e) => setSelectedList(e.target.value)}
                      className="list-selector__select"
                    >
                      {userLists.map(list => (
                        <option key={list.id} value={list.id}>
                          {list.name} ({list.anime_count})
                        </option>
                      ))}
                    </select>
                    
                    <div className="list-selector__actions">
                      <button 
                        className="btn btn--small btn--primary"
                        onClick={handleAddToList}
                        disabled={addingToList}
                      >
                        {addingToList ? 'Añadiendo...' : 'Añadir'}
                      </button>
                      
                      {isInLists && (
                        <button 
                          className="btn btn--small btn--danger"
                          onClick={handleRemoveFromLists}
                        >
                          Eliminar
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button className="btn btn--icon">
                <Heart size={20} />
              </button>

              <button className="btn btn--icon">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          CONTENIDO PRINCIPAL
          ───────────────────────────────────────────────────────────────────── */}
      <div className="anime-detail-content">
        
        {/* Sinopsis */}
        <section className="anime-detail-section">
          <h2 className="section-title">Sinopsis</h2>
          <p className="anime-detail-synopsis">{anime.synopsis}</p>
        </section>

        {/* Información adicional */}
        <section className="anime-detail-section">
          <h2 className="section-title">Información</h2>
          <div className="anime-detail-info-grid">
            <div className="info-item">
              <span className="info-label">Tipo</span>
              <span className="info-value">{anime.type}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Estado</span>
              <span className="info-value">{anime.status}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Año</span>
              <span className="info-value">{anime.year}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Episodios</span>
              <span className="info-value">{anime.episodes}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Rating</span>
              <span className="info-value">{anime.rating} ⭐</span>
            </div>
            <div className="info-item">
              <span className="info-label">Popularidad</span>
              <span className="info-value">#{anime.popularity}</span>
            </div>
          </div>
        </section>

        {/* Géneros */}
        <section className="anime-detail-section">
          <h2 className="section-title">Géneros</h2>
          <div className="anime-detail-genres">
            {anime.genres.map(genre => (
              <span key={genre} className="genre-tag">{genre}</span>
            ))}
          </div>
        </section>

        {/* Estudios */}
        {anime.studios?.length > 0 && (
          <section className="anime-detail-section">
            <h2 className="section-title">Estudios</h2>
            <div className="anime-detail-studios">
              {anime.studios.map(studio => (
                <span key={studio} className="studio-tag">{studio}</span>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          LOGIN MODAL - Se muestra cuando no está logueado
          ───────────────────────────────────────────────────────────────────── */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Accede a Mis Listas"
        subtitle="Inicia sesión para guardar animes en tus listas personales"
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}