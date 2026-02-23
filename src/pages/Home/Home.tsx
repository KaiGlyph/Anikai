// src/pages/Home/Home.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Star, Clock, ArrowRight, Award, Flame, Calendar, Newspaper, ChevronLeft, ChevronRight } from 'lucide-react';

// Importar imágenes
import jujutsuKaisen from '@/assets/images/animes/Jujutsu Kaisen.jpg';
import jigokuraku from '@/assets/images/animes/Jigokuraku.jpg';
import kaiju8Gou from '@/assets/images/animes/Kaijuu 8-gou.jpg';
import kakegurui from '@/assets/images/animes/kakegurui.jpg';
import kenjaNoMago from '@/assets/images/animes/Kenja no Mago.jpg';
import iselevE from '@/assets/images/animes/Iseleve.jpg';

//Importar estilos - RUTAS CORREGIDAS
import './Home.css';
import '../../styles/variables.css';
import '../../styles/animations.css';
import '../../components/common/Button/button.css';
import '../../components/layout/SectionHeader/SectionHeader.css';
import '../../components/common/Cards/AnimeCards.css';
import '../../components/common/Cards/NewsCards.css';
import '../../components/common/Cards/CuratorCard.css';
import '../../components/common/Cards/UpcomingCard.css';
import '../../components/layout/Slider/Slider.css';
import '../../components/layout/Grid/Grid.css';

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // SLIDES DEL CARRUSEL - Slide 0 = Hero, resto = Animes
  const carouselSlides = [
    {
      type: 'hero',
      id: 'hero',
      title: 'Anikai',
      subtitle: 'El momento perfecto para descubrir tu próximo anime',
      buttons: true,
    },
    {
      type: 'anime',
      id: 7,
      title: 'Solo Leveling',
      image: jujutsuKaisen,
      rating: 8.8,
      year: 2024,
      episodes: 12,
      addedDate: 'Hace 2 días',
      description: 'Sung Jin-Woo, el cazador más débil, obtiene un poder único que le permite subir de nivel infinitamente.',
      genres: ['Acción', 'Fantasía', 'Aventura'],
    },
    {
      type: 'anime',
      id: 8,
      title: 'Frieren',
      image: jigokuraku,
      rating: 9.1,
      year: 2023,
      episodes: 28,
      addedDate: 'Hace 3 días',
      description: 'La elfa Frieren emprende un viaje para comprender mejor a los humanos después de la muerte del héroe.',
      genres: ['Aventura', 'Drama', 'Fantasía'],
    },
    {
      type: 'anime',
      id: 9,
      title: 'Demon Slayer',
      image: kaiju8Gou,
      rating: 8.7,
      year: 2024,
      episodes: 11,
      addedDate: 'Hace 5 días',
      description: 'Tanjiro lucha contra demonios para encontrar una cura para su hermana Nezuko.',
      genres: ['Acción', 'Sobrenatural', 'Histórico'],
    },
    {
      type: 'anime',
      id: 10,
      title: 'Chainsaw Man',
      image: kakegurui,
      rating: 8.5,
      year: 2022,
      episodes: 12,
      addedDate: 'Hace 1 semana',
      description: 'Denji se convierte en Chainsaw Man para pagar las deudas de su padre.',
      genres: ['Acción', 'Sobrenatural', 'Gore'],
    },
    {
      type: 'anime',
      id: 11,
      title: 'Attack on Titan',
      image: kenjaNoMago,
      rating: 9.0,
      year: 2023,
      episodes: 87,
      addedDate: 'Hace 1 semana',
      description: 'La humanidad lucha por sobrevivir contra los titanes devoradores de hombres.',
      genres: ['Acción', 'Drama', 'Misterio'],
    },
  ];

  // Animes populares
  const featuredAnime = [
    {
      id: 1,
      title: 'Jujutsu Kaisen',
      image: jujutsuKaisen,
      rating: 8.6,
      year: 2020,
      episodes: 47,
      status: 'En emisión',
    },
    {
      id: 2,
      title: 'Kaiju No. 8',
      image: kaiju8Gou,
      rating: 8.4,
      year: 2024,
      episodes: 12,
      status: 'En emisión',
    },
    {
      id: 3,
      title: 'Kakegurui',
      image: kakegurui,
      rating: 7.8,
      year: 2017,
      episodes: 24,
      status: 'Finalizado',
    },
    {
      id: 4,
      title: 'Jigokuraku',
      image: jigokuraku,
      rating: 8.5,
      year: 2023,
      episodes: 13,
      status: 'Finalizado',
    },
  ];

  // Recomendación principal
  const curatorPick = {
    id: 100,
    title: 'Jigokuraku',
    image: jigokuraku,
    rating: 8.5,
    description: 'Un ninja condenado a muerte es enviado a una isla misteriosa para buscar el elixir de la vida. Una obra maestra de acción, misterio y supervivencia.',
    genres: ['Acción', 'Aventura', 'Sobrenatural', 'Seinen'],
  };

  // Próximos estrenos
  const upcomingReleases = [
    {
      id: 11,
      title: 'Attack on Titan: Final',
      image: jujutsuKaisen,
      releaseDate: '15 Mar 2025',
      type: 'Película',
    },
    {
      id: 12,
      title: 'One Piece: Egghead',
      image: jigokuraku,
      releaseDate: '22 Mar 2025',
      type: 'Temporada',
    },
    {
      id: 13,
      title: 'My Hero Academia 8',
      image: kaiju8Gou,
      releaseDate: '5 Abr 2025',
      type: 'Temporada',
    },
    {
      id: 14,
      title: 'Bleach: TYBW Part 3',
      image: kakegurui,
      releaseDate: '12 Abr 2025',
      type: 'Arco',
    },
  ];

  // Noticias
  const news = [
    {
      id: 1,
      title: 'Anunciada la temporada 2 de Solo Leveling',
      excerpt: 'El estudio A-1 Pictures confirma que la segunda temporada llegará en octubre de 2025...',
      date: '20 Feb 2025',
      category: 'Anuncios',
      image: jujutsuKaisen,
    },
    {
      id: 2,
      title: 'Demon Slayer rompe récords de taquilla',
      excerpt: 'La última película de la franquicia supera los 100 millones de dólares en su primera semana...',
      date: '19 Feb 2025',
      category: 'Películas',
      image: jigokuraku,
    },
    {
      id: 3,
      title: 'Nuevo anime de Studio Ghibli en producción',
      excerpt: 'Hayao Miyazaki trabaja en un nuevo proyecto que se estrenará en 2026...',
      date: '18 Feb 2025',
      category: 'Producción',
      image: kaiju8Gou,
    },
    {
      id: 4,
      title: 'Crunchyroll anuncia nuevos doblajes',
      excerpt: 'La plataforma confirma el doblaje al español de 20 animes populares...',
      date: '17 Feb 2025',
      category: 'Streaming',
      image: kakegurui,
    },
  ];

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % carouselSlides.length;
        if (hasInteracted && next === 0) {
          return 1;
        }
        return next;
      });
    }, currentSlide === 0 ? 8000 : 6000);

    return () => clearInterval(timer);
  }, [carouselSlides.length, isPaused, hasInteracted, currentSlide]);

  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  const goToSlide = (index: number) => {
    handleInteraction();
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    handleInteraction();
    setCurrentSlide((prev) => {
      const next = (prev + 1) % carouselSlides.length;
      return hasInteracted && next === 0 ? 1 : next;
    });
  };

  const prevSlide = () => {
    handleInteraction();
    setCurrentSlide((prev) => {
      const next = (prev - 1 + carouselSlides.length) % carouselSlides.length;
      return hasInteracted && next === 0 ? carouselSlides.length - 1 : next;
    });
  };

  return (
    <div className="home">
      {/* Carrusel Unificado - Hero + Animes */}
      <section 
        className="home__unified-slider"
        onMouseEnter={() => {
          setIsPaused(true);
          handleInteraction();
        }}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="slider-container" ref={sliderRef}>
          {carouselSlides.map((slide, index) => (
            <div 
              key={slide.id} 
              className={`slider-slide ${index === currentSlide ? 'active' : ''}`}
            >
              {slide.type === 'hero' ? (
                <div className="slider-hero">
                  <div className="slider-hero__overlay" />
                  <div className="slider-hero__content">
                    <h1 className="slider-hero__title">Anikai</h1>
                    <p className="slider-hero__subtitle">
                      El momento perfecto para descubrir tu próximo anime
                    </p>
                    <div className="slider-hero__buttons">
                      <button 
                        className="btn btn--primary"
                        onClick={() => navigate('/catalogo')}
                      >
                        <Play size={20} />
                        Explorar Catálogo
                      </button>
                      <button 
                        className="btn btn--secondary"
                        onClick={() => navigate('/recomendaciones')}
                      >
                        <Star size={20} />
                        Recomendaciones
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="slider-background">
                  <img src={slide.image} alt={slide.title} />
                  <div className="slider-overlay" />
                  <div className="slider-content">
                    <div className="slider-content__inner">
                      <div className="slider-content__meta">
                        <span className="slider-badge slider-badge--new">Nuevo</span>
                        <span className="slider-badge slider-badge--rating">
                          <Star size={14} fill="#ffffff" stroke="#ffffff" />
                          {slide.rating}
                        </span>
                      </div>
                      
                      <h2 className="slider-content__title">{slide.title}</h2>
                      <p className="slider-content__description">{slide.description}</p>
                      
                      <div className="slider-content__info">
                        <span>{slide.year}</span>
                        <span>•</span>
                        <span>{slide.episodes} episodios</span>
                        <span>•</span>
                        <span className="slider-added">{slide.addedDate}</span>
                      </div>
                      
                      <div className="slider-content__genres">
                        {slide.genres?.map((genre) => (
                          <span key={genre} className="genre-pill">{genre}</span>
                        ))}
                      </div>
                      
                      <div className="slider-content__buttons">
                        <button 
                          className="btn btn--primary"
                          onClick={() => navigate(`/anime/${slide.id}`)}
                        >
                          Ver Detalles
                        </button>
                        <button 
                          className="btn btn--secondary"
                          onClick={() => navigate(`/anime/${slide.id}`)}
                        >
                          <Play size={18} />
                          Ver Ahora
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <button className="slider-control slider-control--prev" onClick={prevSlide}>
            <ChevronLeft size={32} />
          </button>
          <button className="slider-control slider-control--next" onClick={nextSlide}>
            <ChevronRight size={32} />
          </button>

          <div className="slider-indicators">
            {carouselSlides.map((_, index) => (
              <button
                key={index}
                className={`slider-indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Layout Principal: Contenido + Sidebar Noticias */}
      <div className="home__content-wrapper">
        {/* Columna Izquierda: TODO el contenido */}
        <main className="home__main-content">
          {/* Recomendación de la Semana */}
          <section className="home__curator">
            <div className="section-header">
              <h2 className="section-title">
                <Award size={28} />
                Recomendación de la Semana
              </h2>
              <p className="section-subtitle">Nuestra selección especial para ti</p>
            </div>
            
            <div className="curator-card">
              <div className="curator-card__image">
                <img src={curatorPick.image} alt={curatorPick.title} />
                <div className="curator-card__badge">Recomendado</div>
              </div>
              <div className="curator-card__content">
                <h3 className="curator-card__title">{curatorPick.title}</h3>
                <div className="curator-card__meta">
                  <span className="rating">
                    <Star size={16} fill="#e63946" stroke="#e63946" />
                    {curatorPick.rating}
                  </span>
                </div>
                <p className="curator-card__description">{curatorPick.description}</p>
                
                <div className="curator-card__spacer" />
                
                <div className="curator-card__bottom">
                  <div className="curator-card__genres">
                    {curatorPick.genres.map((genre) => (
                      <span key={genre} className="genre-tag">{genre}</span>
                    ))}
                  </div>
                  <button 
                    className="btn btn--primary btn--full"
                    onClick={() => navigate(`/anime/${curatorPick.id}`)}
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Más Populares */}
          <section className="home__popular">
            <div className="section-header">
              <h2 className="section-title">
                <Flame size={28} />
                Más Populares
              </h2>
              <button 
                className="view-all"
                onClick={() => navigate('/catalogo')}
              >
                Ver todo →
              </button>
            </div>

            <div className="anime-grid">
              {featuredAnime.map((anime) => (
                <div key={anime.id} className="anime-card">
                  <div className="anime-card__image">
                    <img src={anime.image} alt={anime.title} />
                    <div className="anime-card__rating">
                      <Star size={14} fill="#e63946" stroke="#e63946" />
                      {anime.rating}
                    </div>
                  </div>
                  <div className="anime-card__content">
                    <h3 className="anime-card__title">{anime.title}</h3>
                    <div className="anime-card__meta">
                      <span>{anime.year}</span>
                      <span>•</span>
                      <span>{anime.episodes} eps</span>
                    </div>
                    <div className="anime-card__footer">
                      <span className={`status status--${anime.status === 'Finalizado' ? 'completed' : 'airing'}`}>
                        {anime.status}
                      </span>
                      <button 
                        className="anime-card__arrow"
                        onClick={() => navigate(`/anime/${anime.id}`)}
                        aria-label={`Ver detalles de ${anime.title}`}
                      >
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Próximos Estrenos */}
          <section className="home__upcoming">
            <div className="section-header">
              <h2 className="section-title">
                <Calendar size={28} />
                Próximos Estrenos
              </h2>
              <button 
                className="view-all"
                onClick={() => navigate('/calendario')}
              >
                Ver calendario →
              </button>
            </div>

            <div className="upcoming-grid">
              {upcomingReleases.map((anime) => (
                <div key={anime.id} className="upcoming-card">
                  <div className="upcoming-card__image">
                    <img src={anime.image} alt={anime.title} />
                    <div className="upcoming-card__date">
                      <Calendar size={16} />
                      {anime.releaseDate}
                    </div>
                  </div>
                  <div className="upcoming-card__content">
                    <h3 className="upcoming-card__title">{anime.title}</h3>
                    <div className="upcoming-card__meta">
                      <span className="type">{anime.type}</span>
                    </div>
                    <button 
                      className="btn-notify"
                      onClick={() => {/* Notificar */}}
                    >
                      Notificarme
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Columna Derecha: Noticias Sidebar FIJO */}
        <aside className="home__news-sidebar">
          <div className="news-sidebar__header">
            <h2 className="news-sidebar__title">
              <Newspaper size={24} />
              Noticias
            </h2>
          </div>
          
          <div className="news-list">
            {news.map((item) => (
              <article key={item.id} className="news-sidebar-card">
                <div className="news-sidebar-card__image">
                  <img src={item.image} alt={item.title} />
                  <div className="news-sidebar-card__category">
                    {item.category}
                  </div>
                </div>
                <div className="news-sidebar-card__content">
                  <div className="news-sidebar-card__date">{item.date}</div>
                  <h3 className="news-sidebar-card__title">{item.title}</h3>
                  <p className="news-sidebar-card__excerpt">{item.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
          
          <button 
            className="btn btn--secondary"
            onClick={() => navigate('/noticias')}
            style={{ marginTop: '1.5rem', width: '100%' }}
          >
            Ver todas →
          </button>
        </aside>
      </div>
    </div>
  );
}