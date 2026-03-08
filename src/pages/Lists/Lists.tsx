// src/pages/Lists/Lists.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabaseClient';
import LoginModal from '../../components/common/LoginModal';
import {
  Plus, Folder, Heart, Clock, CheckCircle, Play,
  Trash2, Edit2, X, ChevronRight, Grid, List as ListIcon, Search
} from 'lucide-react';
import './Lists.css';

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

export default function Lists() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userLists, setUserLists] = useState<UserList[]>([]);
  const [selectedList, setSelectedList] = useState<UserList | null>(null);
  const [listAnimes, setListAnimes] = useState<ListAnime[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const [showListModal, setShowListModal] = useState(false);
  const [editingList, setEditingList] = useState<UserList | null>(null);
  const [modalName, setModalName] = useState('');
  const [modalColor, setModalColor] = useState('#e63946');
  const [modalDescription, setModalDescription] = useState('');
  const [savingList, setSavingList] = useState(false);

  // ── Efectos ────────────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
      setUserId(session?.user?.id || null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setIsLoggedIn(!!session);
      setUserId(session?.user?.id || null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isLoggedIn && userId) fetchUserLists();
    else setLoading(false);
  }, [isLoggedIn, userId]);

  useEffect(() => {
    if (selectedList && userId) fetchListAnimes(selectedList.id);
  }, [selectedList]);

  // ── Datos ──────────────────────────────────────────────────────────────────
  const fetchUserLists = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_user_lists', { p_user_id: userId });
      if (error) throw error;
      setUserLists(data || []);
    } catch (err: any) {
      console.error('Error al cargar listas:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchListAnimes = async (listId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_list_animes')
        .select(`anime_id, status, score, episodes_watched, added_at, animes (id, title, image, episodes)`)
        .eq('list_id', listId)
        .order('added_at', { ascending: false });
      if (error) throw error;
      setListAnimes(data?.map((item: any) => ({
        anime_id: item.anime_id,
        title: item.animes?.title || '?',
        image: item.animes?.image || '',
        status: item.status,
        score: item.score,
        episodes_watched: item.episodes_watched,
        total_episodes: item.animes?.episodes || 0,
        added_at: item.added_at,
      })) || []);
    } catch (err: any) {
      console.error('Error al cargar animes:', err);
    }
  };

  // ── Modal ──────────────────────────────────────────────────────────────────
  const openCreateModal = () => {
    setEditingList(null);
    setModalName('');
    setModalColor('#e63946');
    setModalDescription('');
    setShowListModal(true);
  };

  const openEditModal = (list: UserList, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingList(list);
    setModalName(list.name);
    setModalColor(list.color);
    setModalDescription(list.description || '');
    setShowListModal(true);
  };

  const handleSaveList = async () => {
    if (!modalName.trim() || !userId) return;
    try {
      setSavingList(true);
      if (editingList) {
        const { error } = await supabase
          .from('user_lists')
          .update({ name: modalName.trim(), color: modalColor, description: modalDescription.trim() || null, updated_at: new Date().toISOString() })
          .eq('id', editingList.id).eq('type', 'custom');
        if (error) throw error;
        if (selectedList?.id === editingList.id) {
          setSelectedList(prev => prev ? { ...prev, name: modalName.trim(), color: modalColor, description: modalDescription.trim() || undefined } : null);
        }
      } else {
        const { error } = await supabase.from('user_lists').insert({ user_id: userId, name: modalName.trim(), type: 'custom', color: modalColor, description: modalDescription.trim() || null, is_public: false, icon: 'folder' });
        if (error) throw error;
      }
      setShowListModal(false);
      fetchUserLists();
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setSavingList(false);
    }
  };

  const handleDeleteList = async (listId: string) => {
    try {
      const { error } = await supabase.from('user_lists').delete().eq('id', listId).eq('type', 'custom');
      if (error) throw error;
      setShowDeleteConfirm(null);
      if (selectedList?.id === listId) setSelectedList(null);
      fetchUserLists();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const handleRemoveAnime = async (animeId: number) => {
    if (!selectedList) return;
    try {
      const { error } = await supabase.rpc('remove_anime_from_list', { p_list_id: selectedList.id, p_anime_id: animeId });
      if (error) throw error;
      fetchListAnimes(selectedList.id);
      fetchUserLists();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const handleLoginSuccess = () => { setIsLoggedIn(true); setShowLoginModal(false); fetchUserLists(); };

  const getListIcon = (iconName: string) => ({
    'play': <Play size={20} />, 'check-circle': <CheckCircle size={20} />,
    'clock': <Clock size={20} />, 'heart': <Heart size={20} />, 'folder': <Folder size={20} />,
  }[iconName] || <Folder size={20} />);

  const getStatusColor = (status: string) => ({
    'watching': '#3b82f6', 'completed': '#2a9d8f', 'planned': '#f4a261', 'dropped': '#e63946',
  }[status] || '#6c757d');

  const statusLabel = (status: string) => ({
    watching: t('lists.status_watching'),
    completed: t('lists.status_completed'),
    planned: t('lists.status_planned'),
    dropped: t('lists.status_dropped'),
  }[status] || status);

  // ── Renders especiales ────────────────────────────────────────────────────
  if (!isLoggedIn) return (
    <div className="lists-page">
      <div className="lists-empty">
        <div className="lists-empty__icon"><Folder size={64} /></div>
        <h2>{t('lists.login_title')}</h2>
        <p>{t('lists.login_sub')}</p>
        <button className="btn btn--primary" onClick={() => setShowLoginModal(true)}>
          {t('lists.login_btn')}
        </button>
      </div>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}
        title={t('lists.title')} subtitle={t('lists.create_subtitle')}
        onLoginSuccess={handleLoginSuccess} />
    </div>
  );

  if (loading && !selectedList) return (
    <div className="lists-page">
      <div className="lists-loading">
        <div className="loading-spinner" />
        <p>{t('lists.loading')}</p>
      </div>
    </div>
  );

  // ── Render principal ──────────────────────────────────────────────────────
  return (
    <div className="lists-page">

      {/* HEADER */}
      <div className="lists-header">
        <div className="lists-header__title">
          <h1>{t('lists.title')}</h1>
          <p>
            {userLists.length} {t('lists.animes_bullet')} •{' '}
            {userLists.reduce((acc, l) => acc + l.anime_count, 0)} animes
          </p>
        </div>
        <div className="lists-header__actions">
          <div className="view-toggle">
            <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}><Grid size={20} /></button>
            <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}><ListIcon size={20} /></button>
          </div>
          <button className="btn btn--primary" onClick={openCreateModal}>
            <Plus size={20} />{t('lists.new_list')}
          </button>
        </div>
      </div>

      {/* DETALLE DE LISTA */}
      {selectedList ? (
        <div className="list-detail">
          <div className="list-detail__header">
            <button className="btn btn--back" onClick={() => { setSelectedList(null); setListAnimes([]); }}>
              {t('lists.back')}
            </button>
            <div className="list-detail__info">
              <div className="list-detail__icon" style={{ backgroundColor: selectedList.color + '20', color: selectedList.color }}>
                {getListIcon(selectedList.icon)}
              </div>
              <div>
                <h2>{selectedList.name}</h2>
                {selectedList.description && <p className="list-detail__description">{selectedList.description}</p>}
              </div>
            </div>
            <div className="list-detail__actions">
              {selectedList.type === 'custom' && (
                <>
                  <button className="btn btn--icon" title={t('lists.edit_list_title')} onClick={e => openEditModal(selectedList, e)}>
                    <Edit2 size={18} />
                  </button>
                  <button className="btn btn--icon btn--danger" onClick={() => setShowDeleteConfirm(selectedList.id)} title={t('lists.delete_list_warning')}>
                    <Trash2 size={18} />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="list-detail__search">
            <Search size={18} />
            <input type="text" placeholder={t('lists.search_placeholder')} value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)} className="search-input" />
            {searchTerm && <button onClick={() => setSearchTerm('')} className="search-clear"><X size={16} /></button>}
          </div>

          <div className={`list-animes ${viewMode}`}>
            {listAnimes
              .filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(anime => (
                <div key={anime.anime_id} className="list-anime-card">
                  <div className="list-anime-card__image" onClick={() => navigate(`/anime/${anime.anime_id}`)}>
                    <img src={anime.image} alt={anime.title} />
                    {anime.score > 0 && <div className="list-anime-card__score">{anime.score}/10</div>}
                  </div>
                  <div className="list-anime-card__content">
                    <h4 className="list-anime-card__title" onClick={() => navigate(`/anime/${anime.anime_id}`)}>
                      {anime.title}
                    </h4>
                    {anime.total_episodes > 0 && (
                      <div className="list-anime-card__progress">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${Math.min(100, (anime.episodes_watched / anime.total_episodes) * 100)}%`, backgroundColor: getStatusColor(anime.status) }} />
                        </div>
                        <span className="progress-text">{anime.episodes_watched}/{anime.total_episodes} {t('common.episodes_short')}</span>
                      </div>
                    )}
                    {anime.status && (
                      <span className="status-badge" style={{ backgroundColor: getStatusColor(anime.status) + '20', color: getStatusColor(anime.status) }}>
                        {statusLabel(anime.status)}
                      </span>
                    )}
                  </div>
                  <button className="list-anime-card__remove" onClick={() => handleRemoveAnime(anime.anime_id)} title={t('common.delete')}>
                    <X size={18} />
                  </button>
                </div>
              ))}
            {listAnimes.length === 0 && (
              <div className="list-empty">
                <p>{t('lists.empty')}</p>
                <button onClick={() => navigate('/catalogo')}>{t('lists.explore')}</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={`lists-grid ${viewMode}`}>
          {userLists.map(list => (
            <div key={list.id} className={`list-card ${viewMode}`} onClick={() => setSelectedList(list)}>
              <div className="list-card__icon" style={{ backgroundColor: list.color + '20', borderColor: list.color + '40', color: list.color }}>
                {getListIcon(list.icon)}
              </div>
              <div className="list-card__content">
                <div className="list-card__header">
                  <h3>{list.name}</h3>
                  {list.type === 'system' && <span className="list-card__badge">{t('lists.system')}</span>}
                  {list.type === 'custom' && (
                    <button className="list-card__edit-btn" onClick={e => openEditModal(list, e)} title={t('lists.edit_list_title')}>
                      <Edit2 size={14} />
                    </button>
                  )}
                </div>
                {list.description && viewMode === 'list' && <p className="list-card__description">{list.description}</p>}
                <div className="list-card__meta">
                  <span>{list.anime_count} {t('lists.animes_bullet')}</span>
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL CREAR / EDITAR */}
      {showListModal && (
        <div className="modal-overlay" onClick={() => setShowListModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowListModal(false)}><X size={24} /></button>
            <h2>{editingList ? t('lists.edit_list') : t('lists.create_list')}</h2>
            <p className="modal-subtitle">{editingList ? t('lists.edit_subtitle') : t('lists.create_subtitle')}</p>
            <div className="form-group">
              <label>{t('lists.list_name')} *</label>
              <input type="text" value={modalName} onChange={e => setModalName(e.target.value)}
                placeholder={t('lists.list_name_placeholder')} maxLength={50} autoFocus
                onKeyDown={e => e.key === 'Enter' && handleSaveList()} />
            </div>
            <div className="form-group">
              <label>{t('lists.color')}</label>
              <div className="color-picker">
                {['#e63946', '#2a9d8f', '#f4a261', '#3b82f6', '#8b5cf6', '#ec4899'].map(color => (
                  <button key={color} className={`color-option ${modalColor === color ? 'active' : ''}`}
                    style={{ backgroundColor: color }} onClick={() => setModalColor(color)} />
                ))}
              </div>
              <div className="color-preview" style={{ borderColor: modalColor, color: modalColor }}>
                <Folder size={16} />
                <span>{modalName || t('lists.color_preview')}</span>
              </div>
            </div>
            <div className="form-group">
              <label>{t('lists.description')}</label>
              <textarea value={modalDescription} onChange={e => setModalDescription(e.target.value)}
                placeholder={t('lists.description_placeholder')} maxLength={200} rows={3} />
            </div>
            <div className="modal-actions">
              <button className="btn btn--secondary" onClick={() => setShowListModal(false)}>{t('lists.cancel')}</button>
              <button className="btn btn--primary" onClick={handleSaveList} disabled={!modalName.trim() || savingList}>
                {savingList
                  ? (editingList ? t('lists.saving') : t('lists.creating'))
                  : (editingList ? t('lists.save_changes') : t('lists.create'))
                }
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ELIMINAR */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
          <div className="modal-content modal--danger" onClick={e => e.stopPropagation()}>
            <h2>{t('lists.delete_list')}</h2>
            <p>{t('lists.delete_warning')}</p>
            <div className="modal-actions">
              <button className="btn btn--secondary" onClick={() => setShowDeleteConfirm(null)}>{t('lists.cancel')}</button>
              <button className="btn btn--danger" onClick={() => handleDeleteList(showDeleteConfirm)}>{t('lists.delete')}</button>
            </div>
          </div>
        </div>
      )}

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}
        title={t('lists.title')} subtitle={t('lists.create_subtitle')}
        onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}