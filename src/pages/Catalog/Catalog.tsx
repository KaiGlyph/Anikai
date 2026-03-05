// src/pages/Catalog/Catalog.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Search, Filter, Star, Grid, List, ChevronDown, ChevronUp, X } from 'lucide-react';
import './Catalog.css';

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

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────
export default function Catalog() {
  const navigate = useNavigate();
  
  // Estados
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados de filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showGenres, setShowGenres] = useState(false);
  
  // Estados de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  // ───────────────────────────────────────────────────────────────────────────
  // EFECTO: Cargar animes al montar el componente
  // ───────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    fetchAnimes();
  }, []);

  // ───────────────────────────────────────────────────────────────────────────
  // EFECTO: Aplicar filtros cuando cambian
  // ───────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedGenres, selectedStatus, selectedType, sortBy, animes]);

  // ───────────────────────────────────────────────────────────────────────────
  // FUNCIÓN: Obtener animes desde Supabase
  // ───────────────────────────────────────────────────────────────────────────
  const fetchAnimes = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('animes')
        .select('*')
        .order('popularity', { ascending: false });

      if (error) throw error;

      setAnimes(data || []);
      setFilteredAnimes(data || []);
    } catch (err: any) {
      console.error('Error al cargar animes:', err);
      setError(err.message || 'Error al cargar el catálogo');
    } finally {
      setLoading(false);
    }
  };

  // ───────────────────────────────────────────────────────────────────────────
  // FUNCIÓN: Aplicar filtros y búsqueda
  // ───────────────────────────────────────────────────────────────────────────
  const applyFilters = () => {
    let result = [...animes];

    // Filtro por búsqueda (nombre)
    if (searchTerm) {
      result = result.filter(anime =>
        anime.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por tipo (Anime, Película)
    if (selectedType) {
      result = result.filter(anime => anime.type === selectedType);
    }

    // Filtro por géneros
    if (selectedGenres.length > 0) {
      result = result.filter(anime =>
        selectedGenres.every(genre => anime.genres.includes(genre))
      );
    }

    // Filtro por estado
    if (selectedStatus) {
      result = result.filter(anime => anime.status === selectedStatus);
    }

    // Ordenar
    switch (sortBy) {
      case 'popularity':
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'year':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredAnimes(result);
    setCurrentPage(1);
  };

  // ───────────────────────────────────────────────────────────────────────────
  // FUNCIÓN: Obtener todos los géneros únicos
  // ───────────────────────────────────────────────────────────────────────────
  const getAllGenres = () => {
    const genres = new Set<string>();
    animes.forEach(anime => {
      anime.genres.forEach(genre => genres.add(genre));
    });
    return Array.from(genres).sort();
  };

  // ───────────────────────────────────────────────────────────────────────────
  // FUNCIÓN: Toggle género seleccionado
  // ───────────────────────────────────────────────────────────────────────────
  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  // ───────────────────────────────────────────────────────────────────────────
  // FUNCIÓN: Limpiar todos los filtros
  // ───────────────────────────────────────────────────────────────────────────
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenres([]);
    setSelectedStatus('');
    setSelectedType('');
    setSortBy('popularity');
    setShowGenres(false);
  };

  // ───────────────────────────────────────────────────────────────────────────
  // CALCULO: Paginación
  // ───────────────────────────────────────────────────────────────────────────
  const totalPages = Math.ceil(filteredAnimes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAnimes = filteredAnimes.slice(startIndex, endIndex);

  // ───────────────────────────────────────────────────────────────────────────
  // RENDER: Loading
  // ───────────────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="catalog-page">
        <div className="catalog-loading">
          <div className="loading-spinner" />
          <p>Cargando catálogo...</p>
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // RENDER: Error
  // ───────────────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="catalog-page">
        <div className="catalog-error">
          <p>❌ {error}</p>
          <button onClick={fetchAnimes}>Reintentar</button>
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // RENDER: Página Principal
  // ───────────────────────────────────────────────────────────────────────────
  return (
    <div className="catalog-page">
      {/* Header del Catálogo */}
      <div className="catalog-header">
        <h1>Catálogo de Animes</h1>
        <p>{filteredAnimes.length} animes disponibles</p>
      </div>

      {/* Barra de Búsqueda y Filtros */}
      <div className="catalog-filters">
        {/* Búsqueda */}
        <div className="search-container">
          <Search size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Filtros Principales */}
        <div className="filters-container">
          {/* Tipo - SIN OVA */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-select"
          >
            <option value="">Todos los tipos</option>
            <option value="Anime">Anime</option>
            <option value="Película">Película</option>
          </select>

          {/* Estado */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="filter-select"
          >
            <option value="">Todos los estados</option>
            <option value="En emisión">En emisión</option>
            <option value="Finalizado">Finalizado</option>
            <option value="Próximamente">Próximamente</option>
          </select>

          {/* Ordenar */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="popularity">Más populares</option>
            <option value="rating">Mejor valorados</option>
            <option value="year">Más recientes</option>
            <option value="title">Nombre (A-Z)</option>
          </select>

          {/* Vista */}
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
              <List size={20} />
            </button>
          </div>

          {/* Limpiar filtros */}
          <button className="clear-filters" onClick={clearFilters}>
            <X size={16} />
            Limpiar
          </button>
        </div>

        {/* Géneros - COLAPSABLE */}
        <div className="genres-section">
          <button 
            className="genres-toggle"
            onClick={() => setShowGenres(!showGenres)}
          >
            <Filter size={18} />
            <span>Géneros ({selectedGenres.length})</span>
            {showGenres ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {showGenres && (
            <div className="genres-list">
              {getAllGenres().map(genre => (
                <button
                  key={genre}
                  className={`genre-tag ${selectedGenres.includes(genre) ? 'active' : ''}`}
                  onClick={() => toggleGenre(genre)}
                >
                  {genre}
                  {selectedGenres.includes(genre) && <span className="genre-remove">×</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid de Animes */}
      <div className={`catalog-content ${viewMode}`}>
        {currentAnimes.length > 0 ? (
          currentAnimes.map(anime => (
            <div
              key={anime.id}
              className={`anime-card ${viewMode}`}
              onClick={() => navigate(`/anime/${anime.id}`)}
            >
              <div className="anime-card__image">
                <img src={anime.image} alt={anime.title} />
                <div className="anime-card__rating">
                  <Star size={14} fill="#e63946" stroke="#e63946" />
                  {anime.rating}
                </div>
                <div className="anime-card__type">{anime.type}</div>
                <div className="anime-card__status">{anime.status}</div>
              </div>
              <div className="anime-card__content">
                <h3 className="anime-card__title">{anime.title}</h3>
                <div className="anime-card__meta">
                  <span>{anime.year}</span>
                  <span>•</span>
                  <span>{anime.episodes} eps</span>
                </div>
                <div className="anime-card__genres">
                  {anime.genres.slice(0, 3).map(genre => (
                    <span key={genre} className="genre-pill">{genre}</span>
                  ))}
                </div>
                {viewMode === 'list' && (
                  <p className="anime-card__synopsis">{anime.synopsis}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No se encontraron animes con esos filtros</p>
            <button onClick={clearFilters}>Limpiar filtros</button>
          </div>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ← Anterior
          </button>
          
          <span className="pagination-info">
            Página {currentPage} de {totalPages}
          </span>
          
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );

    // Al inicio del useEffect de fetchAnimes
  useEffect(() => {
    const debugConnection = async () => {
      console.log('🔍 Debug móvil:');
      console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
      console.log('Key definida:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
      
      try {
        const { data, error } = await supabase
          .from('animes')
          .select('id')
          .limit(1);
        
        if (error) {
          console.error('❌ Error Supabase:', error);
          setError('Error de conexión: ' + error.message);
        } else {
          console.log('✅ Conexión exitosa, animes:', data?.length);
        }
      } catch (e: any) {
        console.error('❌ Excepción:', e);
        setError('Excepción: ' + e.message);
      }
    };
    
    debugConnection();
  }, []);
}