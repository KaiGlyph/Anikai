// src/pages/Lists/Lists.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import LoginModal from '../../components/common/LoginModal';
import { 
  Plus, 
  Folder, 
  Heart, 
  Clock, 
  CheckCircle, 
  Play, 
  Trash2, 
  Edit2, 
  X, 
  ChevronRight,
  Grid,
  List as ListIcon,
  Search
} from 'lucide-react';
import './Lists.css';

// ─────────────────────────────────────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────────────────────────────────────
interface UserList {
  id: string;
  name: string;
  type: 'system' | 'custom';
  color: string;
  icon: string;
  anime_count: number;
  description?: string;
  is_public: boolean;
}

interface ListAnime {
  anime_id: number;
  title: string;
  image: string;
  status: string;
  score: number;
  episodes_watched: number;
  total_episodes: number;
  added_at: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────
export default function Lists() {
  const navigate = useNavigate();
  
  // Estados de autenticación
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  // Estados de listas
  const [userLists, setUserLists] = useState<UserList[]>([]);
  const [selectedList, setSelectedList] = useState<UserList | null>(null);
  const [listAnimes, setListAnimes] = useState<ListAnime[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados de modales
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  // Estado de formulario nueva lista
  const [newListName, setNewListName] = useState('');
  const [newListColor, setNewListColor] = useState('#e63946');
  const [newListDescription, setNewListDescription] = useState('');
  const [creatingList, setCreatingList] = useState(false);
  
  // Estados de vista
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  // ───────────────────────────────────────────────────────────────────────────
  // EFECTO: Verificar autenticación
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
  // EFECTO: Cargar listas cuando hay usuario
  // ───────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isLoggedIn && userId) {
      fetchUserLists();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, userId]);

  // ───────────────────────────────────────────────────────────────────────────
  // EFECTO: Cargar animes de lista seleccionada
  // ───────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (selectedList && userId) {
      fetchListAnimes(selectedList.id);
    }
  }, [selectedList]);

  // ───────────────────────────────────────────────────────────────────────────
  // FUNCIÓN: Obtener listas del usuario
  // ───────────────────────────────────────────────────────────────────────────
  const fetchUserLists = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_user_lists', {
        p_user_id: userId,
      });

      if (error) throw error;
      setUserLists(data || []);
    } catch (err: any) {
      console.error('Error al cargar listas:', err);
    } finally {
      setLoading(false);
    }
  };

  // ───────────────────────────────────────────────────────────────────────────
  // FUNCIÓN: Obtener animes de una lista
  // ───────────────────────────────────────────────────────────────────────────
  const fetchListAnimes = async (listId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_list_animes')
        .select(`
          anime_id,
          status,
          score,
          episodes_watched,
          added_at,
          animes:anime_id (
            id,
            title,
            image,
            episodes
          )
        `)
        .eq('list_id', listId)
        .order('added_at', { ascending: false });

      if (error) throw error;

      // Transformar datos
      const transformed = data?.map((item: any) => ({
        anime_id: item.anime_id,
        title: item.animes?.title || 'Desconocido',
        image: item.animes?.image || '',
        status: item.status,
        score: item.score,
        episodes_watched: item.episodes_watched,
        total_episodes: item.animes?.episodes || 0,
        added_at: item.added_at,
      })) || [];

      setListAnimes(transformed);
    } catch (err: any) {
      console.error('Error al cargar animes de lista:', err);
    }
  };

  // ───────────────────────────────────────────────────────────────────────────
  // FUNCIÓN: Crear nueva lista personalizada
  // ───────────────────────────────────────────────────────────────────────────
  const handleCreateList = async () => {
    if (!newListName.trim() || !userId) return;

    try {
      setCreatingList(true);

      const { error } = await supabase
        .from('user_lists')
        .insert({
          user_id: userId,
          name: newListName.trim(),
          type: 'custom',
          color: newListColor,
          description: newListDescription.trim() || null,
          is_public: false,
          icon: 'folder',
        });

      if (error) throw error;

      // Reset y recargar
      setNewListName('');
      setNewListColor('#e63946');
      setNewListDescription('');
      setShowCreateListModal(false);
      fetchUserLists();
      
    } catch (err: any) {
      console.error('Error al crear lista:', err);
      alert('Error: ' + err.message);
    } finally {
      setCreatingList(false);
    }
  };

  // ───────────────────────────────────────────────────────────────────────────
  // FUNCIÓN: Eliminar lista personalizada
  // ───────────────────────────────────────────────────────────────────────────
  const handleDeleteList = async (listId: string) => {
    try {
      const { error } = await supabase
        .from('user_lists')
        .delete()
        .eq('id', listId)
        .eq('type', 'custom'); // Solo permitir borrar custom

      if (error) throw error;

      setShowDeleteConfirm(null);
      if (selectedList?.id === listId) {
        setSelectedList(null);
      }
      fetchUserLists();
      
    } catch (err: any) {
      console.error('Error al eliminar lista:', err);
      alert('Error: ' + err.message);
    }
  };

  // ───────────────────────────────────────────────────────────────────────────
  // FUNCIÓN: Eliminar anime de lista
  // ───────────────────────────────────────────────────────────────────────────
  const handleRemoveAnime = async (animeId: number) => {
    if (!selectedList) return;

    try {
      const { error } = await supabase.rpc('remove_anime_from_list', {
        p_list_id: selectedList.id,
        p_anime_id: animeId,
      });

      if (error) throw error;

      fetchListAnimes(selectedList.id);
      fetchUserLists(); // Actualizar contador
      
    } catch (err: any) {
      console.error('Error al eliminar anime:', err);
      alert('Error: ' + err.message);
    }
  };

  // ───────────────────────────────────────────────────────────────────────────
  // FUNCIÓN: Callback login exitoso
  // ───────────────────────────────────────────────────────────────────────────
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    fetchUserLists();
  };

  // ───────────────────────────────────────────────────────────────────────────
  // FUNCIÓN: Icono según tipo de lista
  // ───────────────────────────────────────────────────────────────────────────
    const getListIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
        'play': <Play size={20} />,
        'check-circle': <CheckCircle size={20} />,
        'clock': <Clock size={20} />,
        'heart': <Heart size={20} />,
        'folder': <Folder size={20} />,
    };
    return icons[iconName] || <Folder size={20} />;
    };

  // ───────────────────────────────────────────────────────────────────────────
  // FUNCIÓN: Color de badge según estado
  // ───────────────────────────────────────────────────────────────────────────
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'watching': '#3b82f6',
      'completed': '#2a9d8f',
      'planned': '#f4a261',
      'dropped': '#e63946',
    };
    return colors[status] || '#6c757d';
  };

  // ───────────────────────────────────────────────────────────────────────────
  // RENDER: No autenticado
  // ───────────────────────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className="lists-page">
        <div className="lists-empty">
          <div className="lists-empty__icon">
            <Folder size={64} />
          </div>
          <h2>Accede para ver tus listas</h2>
          <p>Guarda tus animes favoritos, organiza tu plan para ver y sigue tu progreso.</p>
          <button 
            className="btn btn--primary"
            onClick={() => setShowLoginModal(true)}
          >
            Iniciar Sesión / Registrarse
          </button>
        </div>

        <LoginModal 
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          title="Accede a Mis Listas"
          subtitle="Organiza tus animes como quieras"
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // RENDER: Loading
  // ───────────────────────────────────────────────────────────────────────────
  if (loading && !selectedList) {
    return (
      <div className="lists-page">
        <div className="lists-loading">
          <div className="loading-spinner" />
          <p>Cargando tus listas...</p>
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // RENDER: Página Principal
  // ───────────────────────────────────────────────────────────────────────────
  return (
    <div className="lists-page">
      
      {/* ─────────────────────────────────────────────────────────────────────
          HEADER
          ───────────────────────────────────────────────────────────────────── */}
      <div className="lists-header">
        <div className="lists-header__title">
          <h1>Mis Listas</h1>
          <p>{userLists.length} listas • {userLists.reduce((acc, l) => acc + l.anime_count, 0)} animes</p>
        </div>
        
        <div className="lists-header__actions">
          {/* Toggle vista */}
          <div className="view-toggle">
            <button
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
              title="Vista de cuadrícula"
            >
              <Grid size={20} />
            </button>
            <button
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
              title="Vista de lista"
            >
              <ListIcon size={20} />
            </button>
          </div>
          
          {/* Nueva lista */}
          <button 
            className="btn btn--primary"
            onClick={() => setShowCreateListModal(true)}
          >
            <Plus size={20} />
            Nueva Lista
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          VISTA: Lista seleccionada (detalle)
          ───────────────────────────────────────────────────────────────────── */}
      {selectedList ? (
        <div className="list-detail">
          
          {/* Header de lista */}
          <div className="list-detail__header">
            <button 
              className="btn btn--back"
              onClick={() => {
                setSelectedList(null);
                setListAnimes([]);
              }}
            >
              ← Volver
            </button>
            
            <div className="list-detail__info">
              <div 
                className="list-detail__icon"
                style={{ backgroundColor: selectedList.color + '20', color: selectedList.color }}
              >
                {getListIcon(selectedList.icon)}
              </div>
              <div>
                <h2>{selectedList.name}</h2>
                {selectedList.description && (
                  <p className="list-detail__description">{selectedList.description}</p>
                )}
              </div>
            </div>
            
            {/* Acciones de lista */}
            <div className="list-detail__actions">
              {selectedList.type === 'custom' && (
                <>
                  <button 
                    className="btn btn--icon"
                    title="Editar lista"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    className="btn btn--icon btn--danger"
                    onClick={() => setShowDeleteConfirm(selectedList.id)}
                    title="Eliminar lista"
                  >
                    <Trash2 size={18} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Buscador dentro de lista */}
          <div className="list-detail__search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Buscar en esta lista..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="search-clear">
                <X size={16} />
              </button>
            )}
          </div>

          {/* Animes de la lista */}
          <div className={`list-animes ${viewMode}`}>
            {listAnimes
              .filter(anime => 
                anime.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(anime => (
                <div key={anime.anime_id} className="list-anime-card">
                  <div 
                    className="list-anime-card__image"
                    onClick={() => navigate(`/anime/${anime.anime_id}`)}
                  >
                    <img src={anime.image} alt={anime.title} />
                    {anime.score > 0 && (
                      <div className="list-anime-card__score">
                        {anime.score}/10
                      </div>
                    )}
                  </div>
                  
                  <div className="list-anime-card__content">
                    <h4 
                      className="list-anime-card__title"
                      onClick={() => navigate(`/anime/${anime.anime_id}`)}
                    >
                      {anime.title}
                    </h4>
                    
                    {/* Progreso de episodios */}
                    {anime.total_episodes > 0 && (
                      <div className="list-anime-card__progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ 
                              width: `${Math.min(100, (anime.episodes_watched / anime.total_episodes) * 100)}%`,
                              backgroundColor: getStatusColor(anime.status)
                            }}
                          />
                        </div>
                        <span className="progress-text">
                          {anime.episodes_watched}/{anime.total_episodes} eps
                        </span>
                      </div>
                    )}
                    
                    {/* Estado */}
                    {anime.status && (
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(anime.status) + '20', color: getStatusColor(anime.status) }}
                      >
                        {anime.status === 'watching' && 'Viendo'}
                        {anime.status === 'completed' && 'Completado'}
                        {anime.status === 'planned' && 'Plan'}
                        {anime.status === 'dropped' && 'Abandonado'}
                      </span>
                    )}
                  </div>
                  
                  <button 
                    className="list-anime-card__remove"
                    onClick={() => handleRemoveAnime(anime.anime_id)}
                    title="Eliminar de lista"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            
            {listAnimes.length === 0 && (
            <div className="list-empty">
                <p>Esta lista está vacía</p>
                <button onClick={() => navigate('/catalogo')}>
                Explorar Catálogo
                </button>
            </div>
            )}
            </div>
            </div>
            ) : (
            /* Grid de listas */
            <div className={`lists-grid ${viewMode}`}>
                {userLists.map(list => (
                <div
                    key={list.id}
                    className={`list-card ${viewMode}`}
                    onClick={() => setSelectedList(list)}
                >
                    <div
                    className="list-card__icon"
                    style={{
                        backgroundColor: list.color + '20',
                        borderColor: list.color + '40',
                        color: list.color
                    }}
                    >
                    {getListIcon(list.icon)}
                    </div>
              
              <div className="list-card__content">
                <div className="list-card__header">
                  <h3>{list.name}</h3>
                  {list.type === 'system' && (
                    <span className="list-card__badge">Sistema</span>
                  )}
                </div>
                
                {list.description && viewMode === 'list' && (
                  <p className="list-card__description">{list.description}</p>
                )}
                
                <div className="list-card__meta">
                  <span>{list.anime_count} animes</span>
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────
          MODAL: Crear nueva lista
          ───────────────────────────────────────────────────────────────────── */}
      {showCreateListModal && (
        <div className="modal-overlay" onClick={() => setShowCreateListModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowCreateListModal(false)}
            >
              <X size={24} />
            </button>
            
            <h2>Crear Nueva Lista</h2>
            <p className="modal-subtitle">Organiza tus animes como quieras</p>
            
            <div className="form-group">
              <label>Nombre de la lista *</label>
              <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="Ej: Anime 2024, Shounen Favoritos..."
                maxLength={50}
              />
            </div>
            
            <div className="form-group">
              <label>Color</label>
              <div className="color-picker">
                {['#e63946', '#2a9d8f', '#f4a261', '#3b82f6', '#8b5cf6', '#ec4899'].map(color => (
                  <button
                    key={color}
                    className={`color-option ${newListColor === color ? 'active' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setNewListColor(color)}
                  />
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label>Descripción (opcional)</label>
              <textarea
                value={newListDescription}
                onChange={(e) => setNewListDescription(e.target.value)}
                placeholder="¿Para qué es esta lista?"
                maxLength={200}
                rows={3}
              />
            </div>
            
            <div className="modal-actions">
              <button 
                className="btn btn--secondary"
                onClick={() => setShowCreateListModal(false)}
              >
                Cancelar
              </button>
              <button 
                className="btn btn--primary"
                onClick={handleCreateList}
                disabled={!newListName.trim() || creatingList}
              >
                {creatingList ? 'Creando...' : 'Crear Lista'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────
          MODAL: Confirmar eliminación
          ───────────────────────────────────────────────────────────────────── */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
          <div className="modal-content modal--danger" onClick={e => e.stopPropagation()}>
            <h2>¿Eliminar lista?</h2>
            <p>Esta acción no se puede deshacer. Los animes no se eliminarán, solo se quitarán de esta lista.</p>
            
            <div className="modal-actions">
              <button 
                className="btn btn--secondary"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancelar
              </button>
              <button 
                className="btn btn--danger"
                onClick={() => handleDeleteList(showDeleteConfirm)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────
          LOGIN MODAL
          ───────────────────────────────────────────────────────────────────── */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Accede a Mis Listas"
        subtitle="Organiza tus animes como quieras"
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}