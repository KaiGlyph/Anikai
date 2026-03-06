// src/pages/Home/Home.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Star, ArrowRight, Award, Flame, Calendar, Newspaper, ChevronLeft, ChevronRight } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTACIÓN DE IMÁGENES
// ─────────────────────────────────────────────────────────────────────────────
import soloLeveling from '@/assets/images/animes/Ore-dake-Level-Up-na-Ken.jpg';
import demonSlayer from '@/assets/images/animes/Kimetsu-no-Yaiba.jpg';
import dandadan from '@/assets/images/animes/Dandadan.jpg';
import jujutsuKaisen from '@/assets/images/animes/Jujutsu-Kaisen.jpg';
import spyFamily from '@/assets/images/animes/Spy-X-Family.jpg';
import kaiju8Gou from '@/assets/images/animes/Kaijuu-8-gou.jpg';
import chainsawMan from '@/assets/images/animes/ChainsawMan.jpg';
import myHeroAcademia from '@/assets/images/animes/Boku-no-Hero.jpeg';
import onePunchMan from '@/assets/images/animes/One-Punch-Man.jpg';
import naruto from '@/assets/images/animes/Naruto.jpg';

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

// ─────────────────────────────────────────────────────────────────────────────
// IDs y SLUGS de la BD (verificados)
// id=43  slug=ore-dake-level-up-na-ken       → Solo Leveling
// id=30  slug=kimetsu-no-yaiba               → Demon Slayer
// id=13  slug=dandadan                       → Dandadan
// id=85  slug=jujutsu-kaisen                 → Jujutsu Kaisen
// id=88  slug=kaijuu-8-gou                   → Kaiju No. 8
// id=56  slug=spy-x-family                   → Spy x Family
// id=8   slug=chainsaw-man                   → Chainsaw Man
// id=4   slug=boku-no-hero-academia          → My Hero Academia
// id=42  slug=one-punch-man                  → One Punch Man
// id=40  slug=naruto                         → Naruto
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // ───────────────────────────────────────────────────────────────────────────
  // CARRUSEL
  // ───────────────────────────────────────────────────────────────────────────
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
      id: 43,
      slug: 'ore-dake-level-up-na-ken',
      title: 'Solo Leveling',
      image: soloLeveling,
      rating: 8.9,
      year: 2024,
      episodes: 25,
      addedDate: 'Finalizado',
      description: 'Sung Jin-Woo, el cazador más débil de la humanidad, obtiene un poder único que le permite subir de nivel infinitamente. Dos temporadas épicas completas.',
      genres: ['Acción', 'Fantasía', 'Aventura'],
    },
    {
      type: 'anime',
      id: 13,
      slug: 'dandadan',
      title: 'Dandadan',
      image: dandadan,
      rating: 8.7,
      year: 2024,
      episodes: 24,
      addedDate: 'Finalizado',
      description: 'Una comedia sobrenatural única donde alienígenas y fantasmas colisionan. Momo y Okarun viven aventuras increíbles en dos temporadas.',
      genres: ['Acción', 'Comedia', 'Sobrenatural'],
    },
    {
      type: 'anime',
      id: 85,
      slug: 'jujutsu-kaisen',
      title: 'Jujutsu Kaisen',
      image: jujutsuKaisen,
      rating: 8.7,
      year: 2020,
      episodes: 47,
      addedDate: 'En emisión',
      description: 'Yuji Itadori y sus compañeros luchan contra las maldiciones en el mundo de la hechicería. La T3 está en camino.',
      genres: ['Acción', 'Sobrenatural', 'Shounen'],
    },
    {
      type: 'anime',
      id: 30,
      slug: 'kimetsu-no-yaiba',
      title: 'Demon Slayer: Kimetsu no Yaiba',
      image: demonSlayer,
      rating: 8.7,
      year: 2019,
      episodes: 63,
      addedDate: 'Finalizado',
      description: 'Tanjiro Kamado se convierte en cazador de demonios para salvar a su hermana. Una saga completa con animación de ufotable.',
      genres: ['Acción', 'Sobrenatural', 'Histórico'],
    },
    {
      type: 'anime',
      id: 56,
      slug: 'spy-x-family',
      title: 'Spy x Family',
      image: spyFamily,
      rating: 8.6,
      year: 2022,
      episodes: 37,
      addedDate: 'Finalizado',
      description: 'Un espía, una asesina y una telépata forman una familia falsa. Comedia y acción en 37 episodios completos.',
      genres: ['Acción', 'Comedia', 'Slice of Life'],
    },
  ];

  // ───────────────────────────────────────────────────────────────────────────
  // ANIMES POPULARES
  // ───────────────────────────────────────────────────────────────────────────
  const featuredAnime = [
    {
      id: 85,
      slug: 'jujutsu-kaisen',
      title: 'Jujutsu Kaisen',
      image: jujutsuKaisen,
      rating: 8.7,
      year: 2020,
      episodes: 47,
      status: 'En emisión',
    },
    {
      id: 88,
      slug: 'kaijuu-8-gou',
      title: 'Kaiju No. 8',
      image: kaiju8Gou,
      rating: 8.5,
      year: 2024,
      episodes: 25,
      status: 'Finalizado',
    },
    {
      id: 56,
      slug: 'spy-x-family',
      title: 'Spy x Family',
      image: spyFamily,
      rating: 8.6,
      year: 2022,
      episodes: 37,
      status: 'Finalizado',
    },
    {
      id: 8,
      slug: 'chainsaw-man',
      title: 'Chainsaw Man',
      image: chainsawMan,
      rating: 8.6,
      year: 2022,
      episodes: 12,
      status: 'Finalizado',
    },
  ];

  // ───────────────────────────────────────────────────────────────────────────
  // RECOMENDACIÓN DE LA SEMANA
  // ───────────────────────────────────────────────────────────────────────────
  const curatorPick = {
    id: 43,
    slug: 'ore-dake-level-up-na-ken',
    title: 'Solo Leveling',
    image: soloLeveling,
    rating: 8.9,
    description: 'Sung Jin-Woo, el cazador más débil de la humanidad, obtiene un poder único que le permite subir de nivel infinitamente. Una obra maestra del género action-fantasy con dos temporadas completas.',
    genres: ['Acción', 'Fantasía', 'Aventura', 'Shounen'],
  };

  // ───────────────────────────────────────────────────────────────────────────
  // PRÓXIMOS ESTRENOS
  // ───────────────────────────────────────────────────────────────────────────
  const upcomingReleases = [
    {
      id: 30,
      slug: 'kimetsu-no-yaiba',
      title: 'Demon Slayer: Infinity Castle',
      image: demonSlayer,
      releaseDate: 'Mayo 2025',
      type: 'Película',
    },
    {
      id: 4,
      slug: 'boku-no-hero-academia',
      title: 'My Hero Academia: película',
      image: myHeroAcademia,
      releaseDate: '2025',
      type: 'Película',
    },
    {
      id: 42,
      slug: 'one-punch-man',
      title: 'One Punch Man Season 3',
      image: onePunchMan,
      releaseDate: '2025',
      type: 'Temporada',
    },
    {
      id: 40,
      slug: 'naruto',
      title: 'Naruto: Nuevo Proyecto',
      image: naruto,
      releaseDate: '2025',
      type: 'Especial',
    },
  ];

  // ───────────────────────────────────────────────────────────────────────────
  // NOTICIAS
  // ───────────────────────────────────────────────────────────────────────────
  const news = [
    {
      id: 1,
      title: 'Solo Leveling Season 2 completa su emisión',
      excerpt: 'La segunda temporada ha concluido con una animación impresionante por parte de A-1 Pictures...',
      date: 'Mar 2025',
      category: 'Finalizado',
      image: soloLeveling,
      animeId: 43,
      animeSlug: 'ore-dake-level-up-na-ken',
    },
    {
      id: 2,
      title: 'Demon Slayer: Infinity Castle llega a cines en mayo',
      excerpt: 'Ufotable confirma que la primera película del arco final de Kimetsu no Yaiba estrena en mayo de 2025...',
      date: 'Mar 2025',
      category: 'Películas',
      image: demonSlayer,
      animeId: 30,
      animeSlug: 'kimetsu-no-yaiba',
    },
    {
      id: 3,
      title: 'Dandadan T2 completa su emisión',
      excerpt: 'La segunda temporada de Dandadan ha concluido. Science SARU ha confirmado que habrá más contenido...',
      date: 'Mar 2025',
      category: 'Finalizado',
      image: dandadan,
      animeId: 13,
      animeSlug: 'dandadan',
    },
    {
      id: 4,
      title: 'Jujutsu Kaisen: T3 en producción en MAPPA',
      excerpt: 'MAPPA confirma que la tercera temporada de JJK está en desarrollo activo tras el cierre del manga...',
      date: 'Feb 2025',
      category: 'Anuncios',
      image: jujutsuKaisen,
      animeId: 85,
      animeSlug: 'jujutsu-kaisen',
    },
  ];

  // ───────────────────────────────────────────────────────────────────────────
  // AUTOPLAY CARRUSEL
  // ───────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % carouselSlides.length;
        if (hasInteracted && next === 0) return 1;
        return next;
      });
    }, currentSlide === 0 ? 8000 : 6000);
    return () => clearInterval(timer);
  }, [carouselSlides.length, isPaused, hasInteracted, currentSlide]);

  const handleInteraction = () => {
    if (!hasInteracted) setHasInteracted(true);
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

  // ───────────────────────────────────────────────────────────────────────────
  // NAVEGACIÓN — usa el ID numérico para ir al detalle
  // ───────────────────────────────────────────────────────────────────────────
  const goToAnime = (id: number) => navigate(`/anime/${id}`);

  return (
    <div className="home">

      {/* ── CARRUSEL ── */}
      <section
        className="home__unified-slider"
        onMouseEnter={() => { setIsPaused(true); handleInteraction(); }}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="slider-container" ref={sliderRef}>
          {carouselSlides.map((slide, index) => (
            <div
              key={slide.slug || slide.id}
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
                      <button className="btn btn--primary" onClick={() => navigate('/catalogo')}>
                        <Play size={20} />Explorar Catálogo
                      </button>
                      <button className="btn btn--secondary" onClick={() => navigate('/recomendaciones')}>
                        <Star size={20} />Recomendaciones
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="slider-background">
                  <img src={(slide as any).image} alt={slide.title} />
                  <div className="slider-overlay" />
                  <div className="slider-content">
                    <div className="slider-content__inner">
                      <div className="slider-content__meta">
                        <span className={`slider-badge ${(slide as any).addedDate === 'En emisión' ? 'slider-badge--airing' : 'slider-badge--new'}`}>
                          {(slide as any).addedDate}
                        </span>
                        <span className="slider-badge slider-badge--rating">
                          <Star size={14} fill="#ffffff" stroke="#ffffff" />
                          {(slide as any).rating}
                        </span>
                      </div>

                      <h2 className="slider-content__title">{slide.title}</h2>
                      <p className="slider-content__description">{(slide as any).description}</p>

                      <div className="slider-content__info">
                        <span>{(slide as any).year}</span>
                        <span>•</span>
                        <span>{(slide as any).episodes} episodios</span>
                      </div>

                      <div className="slider-content__genres">
                        {(slide as any).genres?.map((genre: string) => (
                          <span key={genre} className="genre-pill">{genre}</span>
                        ))}
                      </div>

                      <div className="slider-content__buttons">
                        <button
                          className="btn btn--primary"
                          onClick={() => goToAnime((slide as any).id)}
                        >
                          Ver Detalles
                        </button>
                        <button
                          className="btn btn--secondary"
                          onClick={() => goToAnime((slide as any).id)}
                        >
                          <Play size={18} />Ver Ahora
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

      {/* ── LAYOUT PRINCIPAL ── */}
      <div className="home__content-wrapper">
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
                    onClick={() => goToAnime(curatorPick.id)}
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
              <button className="view-all" onClick={() => navigate('/catalogo')}>
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
                        onClick={() => goToAnime(anime.id)}
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
                      onClick={() => goToAnime(anime.id)}
                    >
                      Ver anime
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>

        {/* ── SIDEBAR NOTICIAS ── */}
        <aside className="home__news-sidebar">
          <div className="news-sidebar__header">
            <h2 className="news-sidebar__title">
              <Newspaper size={24} />
              Noticias
            </h2>
          </div>

          <div className="news-list">
            {news.map((item) => (
              <article
                key={item.id}
                className="news-sidebar-card"
                onClick={() => goToAnime(item.animeId)}
                style={{ cursor: 'pointer' }}
              >
                <div className="news-sidebar-card__image">
                  <img src={item.image} alt={item.title} />
                  <div className="news-sidebar-card__category">{item.category}</div>
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
            onClick={() => navigate('/catalogo')}
            style={{ marginTop: '1.5rem', width: '100%' }}
          >
            Ver catálogo →
          </button>
        </aside>
      </div>
    </div>
  );
}