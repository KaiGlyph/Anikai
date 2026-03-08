// src/pages/legal/Privacy.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Lock, 
  Shield, 
  Database, 
  Cookie, 
  Share2, 
  Key, 
  Clock, 
  UserCheck, 
  Users, 
  Globe, 
  RefreshCw, 
  Mail,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import './Privacy.scss';

const Privacy: React.FC = () => {
  const { t } = useTranslation();
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  const sections = [
    {
      icon: <Database size={22} />,
      number: '01',
      title: t('legal.privacy_s01_title'),
      content: t('legal.privacy_s01_body'),
    },
    {
      icon: <Shield size={22} />,
      number: '02',
      title: t('legal.privacy_s02_title'),
      content: t('legal.privacy_s02_body'),
    },
    {
      icon: <Key size={22} />,
      number: '03',
      title: t('legal.privacy_s03_title'),
      content: t('legal.privacy_s03_body'),
    },
    {
      icon: <Cookie size={22} />,
      number: '04',
      title: t('legal.privacy_s04_title'),
      content: t('legal.privacy_s04_body'),
    },
    {
      icon: <Share2 size={22} />,
      number: '05',
      title: t('legal.privacy_s05_title'),
      content: t('legal.privacy_s05_body'),
    },
    {
      icon: <Lock size={22} />,
      number: '06',
      title: t('legal.privacy_s06_title'),
      content: t('legal.privacy_s06_body'),
    },
    {
      icon: <Clock size={22} />,
      number: '07',
      title: t('legal.privacy_s07_title'),
      content: t('legal.privacy_s07_body'),
    },
    {
      icon: <UserCheck size={22} />,
      number: '08',
      title: t('legal.privacy_s08_title'),
      content: t('legal.privacy_s08_body'),
    },
    {
      icon: <Users size={22} />,
      number: '09',
      title: t('legal.privacy_s09_title'),
      content: t('legal.privacy_s09_body'),
    },
    {
      icon: <Globe size={22} />,
      number: '10',
      title: t('legal.privacy_s10_title'),
      content: t('legal.privacy_s10_body'),
    },
    {
      icon: <RefreshCw size={22} />,
      number: '11',
      title: t('legal.privacy_s11_title'),
      content: t('legal.privacy_s11_body'),
    },
    {
      icon: <Mail size={22} />,
      number: '12',
      title: t('legal.privacy_s12_title'),
      content: t('legal.privacy_s12_body'),
    }
  ];

  const handleAccept = () => {
    if (accepted) {
      localStorage.setItem('privacyAccepted', 'true');
      navigate('/catalogo');
    }
  };

  useEffect(() => {
    const previouslyAccepted = localStorage.getItem('privacyAccepted');
    if (previouslyAccepted === 'true') {
      setAccepted(true);
    }
  }, []);

  return (
    <div className="privacy-page">
      {/* Background orbs - estáticos */}
      <div className="privacy-bg">
        <div className="bg-orb orb-1" />
        <div className="bg-orb orb-2" />
      </div>

      <div className="privacy-container">
        {/* Header */}
        <div className="privacy-header fade-in">
          <div className="hero-icon-wrapper">
            <Lock size={72} strokeWidth={1.5} />
          </div>
          <h1 className="hero-title">
            {t('legal.privacy_title')} <span className="gradient-text">{t('legal.privacy_title_gradient')}</span>
          </h1>
          <p className="hero-subtitle">
            {t('legal.privacy_subtitle')}
          </p>
          <p className="hero-date">
            {t('legal.last_updated')}
          </p>
        </div>

        {/* Intro */}
        <div className="privacy-intro fade-in-up">
          <div className="intro-accent" />
          <p>
            {t('legal.privacy_intro_before')} <strong>Anikai</strong>{t('legal.privacy_intro_after')}
          </p>
        </div>

        {/* Sections */}
        <div className="privacy-sections">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className="privacy-section fade-in-up"
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

        {/* Commitment/Acceptance */}
        <div className="commitment-wrapper fade-in-up">
          <div className="commitment-card">
            <div className="commitment-glow" />
            <div className="commitment-content">
              <h3 className="commitment-title">
                <Shield size={24} />
                {t('legal.our_commitment')}
              </h3>
              <p className="commitment-text">
                {t('legal.commitment_text')}
              </p>
              
              <div className="commitment-buttons">
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
        <div className="privacy-footer fade-in">
          <Link to="/terminos" className="footer-link">{t('legal.footer_terms')}</Link>
          <span className="separator">/</span>
          <Link to="/aviso-legal" className="footer-link">{t('legal.footer_legal')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;