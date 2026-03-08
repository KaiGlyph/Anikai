// src/pages/legal/LegalNotice.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Scale, 
  Building, 
  Target, 
  UserCheck, 
  Copyright, 
  Link2, 
  AlertTriangle, 
  RefreshCw, 
  Gavel, 
  MapPin, 
  Clock, 
  Mail,
  ArrowRight,
  FileText
} from 'lucide-react';
import './LegalNotice.scss';

const LegalNotice: React.FC = () => {
  const { t } = useTranslation();

  const sections = [
    {
      icon: <Building size={22} />,
      number: '01',
      title: t('legal.legal_s01_title'),
      content: t('legal.legal_s01_body'),
    },
    {
      icon: <Target size={22} />,
      number: '02',
      title: t('legal.legal_s02_title'),
      content: t('legal.legal_s02_body'),
    },
    {
      icon: <UserCheck size={22} />,
      number: '03',
      title: t('legal.legal_s03_title'),
      content: t('legal.legal_s03_body'),
    },
    {
      icon: <Copyright size={22} />,
      number: '04',
      title: t('legal.legal_s04_title'),
      content: t('legal.legal_s04_body'),
    },
    {
      icon: <Link2 size={22} />,
      number: '05',
      title: t('legal.legal_s05_title'),
      content: t('legal.legal_s05_body'),
    },
    {
      icon: <AlertTriangle size={22} />,
      number: '06',
      title: t('legal.legal_s06_title'),
      content: t('legal.legal_s06_body'),
    },
    {
      icon: <RefreshCw size={22} />,
      number: '07',
      title: t('legal.legal_s07_title'),
      content: t('legal.legal_s07_body'),
    },
    {
      icon: <Gavel size={22} />,
      number: '08',
      title: t('legal.legal_s08_title'),
      content: t('legal.legal_s08_body'),
    },
    {
      icon: <MapPin size={22} />,
      number: '09',
      title: t('legal.legal_s09_title'),
      content: t('legal.legal_s09_body'),
    },
    {
      icon: <Clock size={22} />,
      number: '10',
      title: t('legal.legal_s10_title'),
      content: t('legal.legal_s10_body'),
    },
    {
      icon: <Mail size={22} />,
      number: '11',
      title: t('legal.legal_s11_title'),
      content: t('legal.legal_s11_body'),
    }
  ];

  return (
    <div className="legal-notice-page">
      {/* Background orbs - estáticos */}
      <div className="legal-bg">
        <div className="bg-orb orb-1" />
        <div className="bg-orb orb-2" />
      </div>

      <div className="legal-container">
        {/* Header */}
        <div className="legal-header fade-in">
          <div className="hero-icon-wrapper">
            <Scale size={72} strokeWidth={1.5} />
          </div>
          <h1 className="hero-title">
            {t('legal.legal_title')} <span className="gradient-text">{t('legal.legal_title_gradient')}</span>
          </h1>
          <p className="hero-subtitle">
            {t('legal.legal_subtitle')}
          </p>
          <p className="hero-date">
            {t('legal.last_updated')}
          </p>
        </div>

        {/* Intro */}
        <div className="legal-intro fade-in-up">
          <div className="intro-accent" />
          <p>
            {t('legal.legal_intro_before')} <strong>Anikai</strong>{t('legal.legal_intro_after')}
          </p>
        </div>

        {/* Sections */}
        <div className="legal-sections">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className="legal-section fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="section-glow" />
              <div className="section-header">
                <div className="section-number-wrapper">
                  <span className="section-number">{section.number}</span>
                </div>
                <div className="section-icon-box">
                  {section.icon}
                </div>
                <h2 className="section-title">{section.title}</h2>
              </div>
              <div className="section-content">
                {section.content.split('\n\n').map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="info-wrapper fade-in-up">
          <div className="info-card">
            <div className="info-glow" />
            <div className="info-content">
              <h3 className="info-title">
                <FileText size={24} />
                {t('legal.important_info')}
              </h3>
              <p className="info-text">
                {t('legal.important_text')}
              </p>
              <div className="info-buttons">
                <Link to="/" className="btn btn-ghost">
                  {t('legal.back_home')}
                </Link>
                <Link to="/terminos" className="btn btn-neon">
                  {t('legal.see_terms')}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="legal-footer fade-in">
          <Link to="/terminos" className="footer-link">{t('legal.footer_terms')}</Link>
          <span className="separator">/</span>
          <Link to="/privacidad" className="footer-link">{t('legal.footer_privacy')}</Link>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;