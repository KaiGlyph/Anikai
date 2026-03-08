// src/pages/legal/Terms.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Scale, 
  Shield, 
  BookOpen, 
  UserCog, 
  Copyright, 
  FileText, 
  AlertTriangle, 
  Lock, 
  Server, 
  Clock, 
  Globe, 
  Mail,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import './Terms.scss';

const Terms: React.FC = () => {
  const { t } = useTranslation();
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const sections = [
    {
      icon: <Shield size={22} />,
      number: '01',
      title: t('legal.terms_s01_title'),
      content: t('legal.terms_s01_body'),
    },
    {
      icon: <BookOpen size={22} />,
      number: '02',
      title: t('legal.terms_s02_title'),
      content: t('legal.terms_s02_body'),
    },
    {
      icon: <UserCog size={22} />,
      number: '03',
      title: t('legal.terms_s03_title'),
      content: t('legal.terms_s03_body'),
    },
    {
      icon: <Copyright size={22} />,
      number: '04',
      title: t('legal.terms_s04_title'),
      content: t('legal.terms_s04_body'),
    },
    {
      icon: <FileText size={22} />,
      number: '05',
      title: t('legal.terms_s05_title'),
      content: t('legal.terms_s05_body'),
    },
    {
      icon: <AlertTriangle size={22} />,
      number: '06',
      title: t('legal.terms_s06_title'),
      content: t('legal.terms_s06_body'),
    },
    {
      icon: <Lock size={22} />,
      number: '07',
      title: t('legal.terms_s07_title'),
      content: t('legal.terms_s07_body'),
    },
    {
      icon: <Server size={22} />,
      number: '08',
      title: t('legal.terms_s08_title'),
      content: t('legal.terms_s08_body'),
    },
    {
      icon: <Clock size={22} />,
      number: '09',
      title: t('legal.terms_s09_title'),
      content: t('legal.terms_s09_body'),
    },
    {
      icon: <Globe size={22} />,
      number: '10',
      title: t('legal.terms_s10_title'),
      content: t('legal.terms_s10_body'),
    },
    {
      icon: <Mail size={22} />,
      number: '11',
      title: t('legal.terms_s11_title'),
      content: t('legal.terms_s11_body'),
    }
  ];

  const handleAccept = () => {
    if (accepted) {
      localStorage.setItem('termsAccepted', 'true');
      navigate('/catalogo');
    }
  };

  useEffect(() => {
    const previouslyAccepted = localStorage.getItem('termsAccepted');
    if (previouslyAccepted === 'true') {
      setAccepted(true);
    }
  }, []);

  return (
    <div className="terms-page">
      {/* Background Effects */}
      <div className="terms-bg-effects">
        <div className="glow-orb orb-1" />
        <div className="glow-orb orb-2" />
        <div className="glow-orb orb-3" />
      </div>

      <div className="terms-container">
        {/* Hero Header */}
        <motion.div
          style={{ opacity, scale }}
          className="terms-hero"
        >
          <div className="terms-hero-content">
            <motion.div 
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="hero-icon-wrapper"
            >
              <Scale size={72} strokeWidth={1.5} />
              <Sparkles className="sparkle-icon" size={24} />
            </motion.div>
            
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="hero-title"
            >
              {t('legal.terms_title')} <span className="gradient-text">{t('legal.terms_title_gradient')}</span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="hero-subtitle"
            >
              {t('legal.terms_subtitle')}
            </motion.p>
          </div>
        </motion.div>

        {/* Intro Box */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="terms-intro"
        >
          <div className="intro-accent" />
          <p>
            {t('legal.terms_intro_before')} <strong>Anikai</strong>{t('legal.terms_intro_after')}
          </p>
        </motion.div>

        {/* Sections - Asymmetric Layout */}
        <div className="terms-sections">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ x: index % 2 === 0 ? -40 : 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.05,
                type: "spring",
                stiffness: 100
              }}
              className={`terms-section ${index % 2 === 0 ? 'section-left' : 'section-right'}`}
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

              <div className="section-corner" />
            </motion.div>
          ))}
        </div>

        {/* Acceptance Section - Floating Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="acceptance-wrapper"
        >
          <div className="acceptance-card">
            <div className="acceptance-glow" />
            
            <div className="acceptance-content">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                />
                <div className="checkbox-box">
                  <CheckCircle2 size={18} />
                </div>
                <span className="checkbox-label">
                  {t('legal.terms_accept_label')}
                </span>
              </label>

              <div className="acceptance-buttons">
                <Link to="/" className="btn btn-ghost">
                  {t('legal.back_home')}
                </Link>
                <button 
                  onClick={handleAccept}
                  className={`btn btn-neon ${!accepted ? 'disabled' : ''}`}
                  disabled={!accepted}
                >
                  {t('legal.terms_continue')}
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Links */}
        <div className="terms-footer">
          <Link to="/privacidad" className="footer-link">{t('legal.footer_privacy')}</Link>
          <span className="separator">/</span>
          <Link to="/aviso-legal" className="footer-link">{t('legal.footer_legal')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Terms;