// src/pages/Home/Home.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Play, Star, ArrowRight, Award, Flame, Calendar, Newspaper, ChevronLeft, ChevronRight } from 'lucide-react';

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
import "../../styles/themes.css";
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
// IDs verificados en BD
// id=43 Solo Leveling | id=30 Demon Slayer | id=13 Dandadan
// id=85 Jujutsu Kaisen | id=88 Kaiju No.8 | id=56 Spy x Family
// id=8  Chainsaw Man | id=4 My Hero Academia | id=42 OPM | id=40 Naruto
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // ───────────────────────────────────────────────────────────────────────────
  // CARRUSEL
  // Títulos y géneros se quedan en su idioma original (nombres propios de anime)
  // Las descripciones cortas del slider sí se traducen
  // ───────────────────────────────────────────────────────────────────────────
  const carouselSlides = [
    {
      type: 'hero',
      id: 'hero',
      title: 'Anikai',
    },
    {
      type: 'anime', id: 43,
      title: 'Solo Leveling',
      image: soloLeveling,
      rating: 8.9, year: 2024, episodes: 25,
      statusKey: 'finalizado',
      descKey: 'slide_solo_leveling',
      genres: ['Acción', 'Fantasía', 'Aventura'],
    },
    {
      type: 'anime', id: 13,
      title: 'Dandadan',
      image: dandadan,
      rating: 8.7, year: 2024, episodes: 24,
      statusKey: 'finalizado',
      descKey: 'slide_dandadan',
      genres: ['Acción', 'Comedia', 'Sobrenatural'],
    },
    {
      type: 'anime', id: 85,
      title: 'Jujutsu Kaisen',
      image: jujutsuKaisen,
      rating: 8.7, year: 2020, episodes: 47,
      statusKey: 'en_emision',
      descKey: 'slide_jjk',
      genres: ['Acción', 'Sobrenatural', 'Shounen'],
    },
    {
      type: 'anime', id: 30,
      title: 'Demon Slayer: Kimetsu no Yaiba',
      image: demonSlayer,
      rating: 8.7, year: 2019, episodes: 63,
      statusKey: 'finalizado',
      descKey: 'slide_demon_slayer',
      genres: ['Acción', 'Sobrenatural', 'Histórico'],
    },
    {
      type: 'anime', id: 56,
      title: 'Spy x Family',
      image: spyFamily,
      rating: 8.6, year: 2022, episodes: 37,
      statusKey: 'finalizado',
      descKey: 'slide_spy_family',
      genres: ['Acción', 'Comedia', 'Slice of Life'],
    },
  ];

  const featuredAnime = [
    { id: 85, title: 'Jujutsu Kaisen',  image: jujutsuKaisen, rating: 8.7, year: 2020, episodes: 47,  statusKey: 'en_emision' },
    { id: 88, title: 'Kaiju No. 8',     image: kaiju8Gou,     rating: 8.5, year: 2024, episodes: 25,  statusKey: 'finalizado' },
    { id: 56, title: 'Spy x Family',    image: spyFamily,     rating: 8.6, year: 2022, episodes: 37,  statusKey: 'finalizado' },
    { id: 8,  title: 'Chainsaw Man',    image: chainsawMan,   rating: 8.6, year: 2022, episodes: 12,  statusKey: 'finalizado' },
  ];

  const curatorPick = {
    id: 43,
    title: 'Solo Leveling',
    image: soloLeveling,
    rating: 8.9,
    descKey: 'curator_solo_leveling',
    genres: ['Acción', 'Fantasía', 'Aventura', 'Shounen'],
  };

  const upcomingReleases = [
    { id: 30, title: 'Demon Slayer: Infinity Castle', image: demonSlayer,    releaseDate: 'Mayo 2025', typeKey: 'type_movie' },
    { id: 4,  title: 'My Hero Academia: película',    image: myHeroAcademia, releaseDate: '2025',      typeKey: 'type_movie' },
    { id: 42, title: 'One Punch Man Season 3',        image: onePunchMan,    releaseDate: '2025',      typeKey: 'type_season' },
    { id: 40, title: 'Naruto: Nuevo Proyecto',        image: naruto,         releaseDate: '2025',      typeKey: 'type_special' },
  ];

  // Noticias: títulos y excerpts se quedan en español (son contenido editorial)
  const news = [
    { id: 1, titleKey: 'news_solo_leveling',  excerptKey: 'news_solo_leveling_ex',  date: 'Mar 2025', category: 'Finalizado', image: soloLeveling,  animeId: 43 },
    { id: 2, titleKey: 'news_demon_slayer',   excerptKey: 'news_demon_slayer_ex',   date: 'Mar 2025', category: 'Películas',  image: demonSlayer,   animeId: 30 },
    { id: 3, titleKey: 'news_dandadan',       excerptKey: 'news_dandadan_ex',       date: 'Mar 2025', category: 'Finalizado', image: dandadan,      animeId: 13 },
    { id: 4, titleKey: 'news_jjk',            excerptKey: 'news_jjk_ex',            date: 'Feb 2025', category: 'Anuncios',   image: jujutsuKaisen, animeId: 85 },
  ];

  // ───────────────────────────────────────────────────────────────────────────
  // AUTOPLAY
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

  const handleInteraction = () => { if (!hasInteracted) setHasInteracted(true); };
  const goToSlide = (i: number) => { handleInteraction(); setCurrentSlide(i); };
  const nextSlide = () => {
    handleInteraction();
    setCurrentSlide(prev => { const n = (prev + 1) % carouselSlides.length; return hasInteracted && n === 0 ? 1 : n; });
  };
  const prevSlide = () => {
    handleInteraction();
    setCurrentSlide(prev => { const n = (prev - 1 + carouselSlides.length) % carouselSlides.length; return hasInteracted && n === 0 ? carouselSlides.length - 1 : n; });
  };
  const goToAnime = (id: number) => navigate(`/anime/${id}`);

  // ───────────────────────────────────────────────────────────────────────────
  // HELPERS
  // ───────────────────────────────────────────────────────────────────────────
  const statusLabel = (key: string) => key === 'finalizado' ? t('home.finalizado') : t('home.en_emision');
  const isAiring = (key: string) => key === 'en_emision';

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
            <div key={slide.id} className={`slider-slide ${index === currentSlide ? 'active' : ''}`}>
              {slide.type === 'hero' ? (
                <div className="slider-hero">
                  <div className="slider-hero__overlay" />
                  <div className="slider-hero__content">
                    <h1 className="slider-hero__title">Anikai</h1>
                    <p className="slider-hero__subtitle">{t('home.hero_subtitle')}</p>
                    <div className="slider-hero__buttons">
                      <button className="btn btn--primary" onClick={() => navigate('/catalogo')}>
                        <Play size={20} />{t('home.explore_catalog')}
                      </button>
                      <button className="btn btn--secondary" onClick={() => navigate('/recomendaciones')}>
                        <Star size={20} />{t('home.recommendations')}
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
                        <span className={`slider-badge ${isAiring((slide as any).statusKey) ? 'slider-badge--airing' : 'slider-badge--new'}`}>
                          {statusLabel((slide as any).statusKey)}
                        </span>
                        <span className="slider-badge slider-badge--rating">
                          <Star size={14} fill="#ffffff" stroke="#ffffff" />
                          {(slide as any).rating}
                        </span>
                      </div>

                      <h2 className="slider-content__title">{slide.title}</h2>
                      <p className="slider-content__description">{t(`home.${(slide as any).descKey}`)}</p>

                      <div className="slider-content__info">
                        <span>{(slide as any).year}</span>
                        <span>•</span>
                        <span>{(slide as any).episodes} {t('common.episodes_short')}</span>
                      </div>

                      <div className="slider-content__genres">
                        {(slide as any).genres?.map((genre: string) => (
                          <span key={genre} className="genre-pill">{genre}</span>
                        ))}
                      </div>

                      <div className="slider-content__buttons">
                        <button className="btn btn--primary" onClick={() => goToAnime((slide as any).id)}>
                          {t('home.view_details')}
                        </button>
                        <button className="btn btn--secondary" onClick={() => goToAnime((slide as any).id)}>
                          <Play size={18} />{t('home.watch_now')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <button className="slider-control slider-control--prev" onClick={prevSlide}><ChevronLeft size={32} /></button>
          <button className="slider-control slider-control--next" onClick={nextSlide}><ChevronRight size={32} /></button>

          <div className="slider-indicators">
            {carouselSlides.map((_, index) => (
              <button
                key={index}
                className={`slider-indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`${index + 1}`}
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
                <Award size={28} />{t('home.week_pick')}
              </h2>
              <p className="section-subtitle">{t('home.week_pick_sub')}</p>
            </div>

            <div className="curator-card">
              <div className="curator-card__image">
                <img src={curatorPick.image} alt={curatorPick.title} />
                <div className="curator-card__badge">{t('home.week_pick')}</div>
              </div>
              <div className="curator-card__content">
                <h3 className="curator-card__title">{curatorPick.title}</h3>
                <div className="curator-card__meta">
                  <span className="rating">
                    <Star size={16} fill="#e63946" stroke="#e63946" />
                    {curatorPick.rating}
                  </span>
                </div>
                <p className="curator-card__description">{t(`home.${curatorPick.descKey}`)}</p>
                <div className="curator-card__spacer" />
                <div className="curator-card__bottom">
                  <div className="curator-card__genres">
                    {curatorPick.genres.map(genre => (
                      <span key={genre} className="genre-tag">{genre}</span>
                    ))}
                  </div>
                  <button className="btn btn--primary btn--full" onClick={() => goToAnime(curatorPick.id)}>
                    {t('home.view_details')}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Más Populares */}
          <section className="home__popular">
            <div className="section-header">
              <h2 className="section-title"><Flame size={28} />{t('home.most_popular')}</h2>
              <button className="view-all" onClick={() => navigate('/catalogo')}>{t('home.see_all')}</button>
            </div>

            <div className="anime-grid">
              {featuredAnime.map(anime => (
                <div key={anime.id} className="anime-card">
                  <div className="anime-card__image">
                    <img src={anime.image} alt={anime.title} />
                    <div className="anime-card__rating">
                      <Star size={14} fill="#e63946" stroke="#e63946" />{anime.rating}
                    </div>
                  </div>
                  <div className="anime-card__content">
                    <h3 className="anime-card__title">{anime.title}</h3>
                    <div className="anime-card__meta">
                      <span>{anime.year}</span>
                      <span>•</span>
                      <span>{anime.episodes} {t('common.episodes_short')}</span>
                    </div>
                    <div className="anime-card__footer">
                      <span className={`status status--${isAiring(anime.statusKey) ? 'airing' : 'completed'}`}>
                        {statusLabel(anime.statusKey)}
                      </span>
                      <button
                        className="anime-card__arrow"
                        onClick={() => goToAnime(anime.id)}
                        aria-label={anime.title}
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
              <h2 className="section-title"><Calendar size={28} />{t('home.upcoming')}</h2>
            </div>

            <div className="upcoming-grid">
              {upcomingReleases.map(anime => (
                <div key={anime.id} className="upcoming-card">
                  <div className="upcoming-card__image">
                    <img src={anime.image} alt={anime.title} />
                    <div className="upcoming-card__date">
                      <Calendar size={16} />{anime.releaseDate}
                    </div>
                  </div>
                  <div className="upcoming-card__content">
                    <h3 className="upcoming-card__title">{anime.title}</h3>
                    <div className="upcoming-card__meta">
                      <span className="type">{t(`home.${anime.typeKey}`)}</span>
                    </div>
                    <button className="btn-notify" onClick={() => goToAnime(anime.id)}>
                      {t('home.see_anime')}
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
              <Newspaper size={24} />{t('home.news')}
            </h2>
          </div>

          <div className="news-list">
            {news.map(item => (
              <article
                key={item.id}
                className="news-sidebar-card"
                onClick={() => goToAnime(item.animeId)}
                style={{ cursor: 'pointer' }}
              >
                <div className="news-sidebar-card__image">
                  <img src={item.image} alt={t(`home.${item.titleKey}`)} />
                  <div className="news-sidebar-card__category">{item.category}</div>
                </div>
                <div className="news-sidebar-card__content">
                  <div className="news-sidebar-card__date">{item.date}</div>
                  <h3 className="news-sidebar-card__title">{t(`home.${item.titleKey}`)}</h3>
                  <p className="news-sidebar-card__excerpt">{t(`home.${item.excerptKey}`)}</p>
                </div>
              </article>
            ))}
          </div>

          <button
            className="btn btn--secondary"
            onClick={() => navigate('/catalogo')}
            style={{ marginTop: '1.5rem', width: '100%' }}
          >
            {t('home.see_catalog')}
          </button>
        </aside>
      </div>
    </div>
  );
}