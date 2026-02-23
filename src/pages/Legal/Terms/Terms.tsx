// src/pages/legal/Terms.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const sections = [
    {
      icon: <Shield size={22} />,
      number: '01',
      title: 'Aceptación de los Términos',
      content: `Al acceder y utilizar Anikai, aceptas cumplir y estar sujeto a estos Términos y Condiciones de uso. Si no estás de acuerdo con alguno de estos términos, te pedimos que no utilices nuestro sitio web.

Anikai es una plataforma de recomendaciones y curaduría de contenido anime dirigida a mayores de 16 años. El uso del sitio implica la aceptación plena de todas las condiciones aquí descritas.`
    },
    {
      icon: <BookOpen size={22} />,
      number: '02',
      title: 'Descripción del Servicio',
      content: `Anikai proporciona un servicio de recomendaciones personalizadas de anime basado en la curaduría de un equipo especializado. El servicio incluye:

• Catálogo de anime con información detallada
• Sistema de listas personales (Favoritos, Para Ver, Visto)
• Recomendaciones personalizadas
• Fichas técnicas de cada título

Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del servicio en cualquier momento sin previo aviso.`
    },
    {
      icon: <UserCog size={22} />,
      number: '03',
      title: 'Registro y Cuenta de Usuario',
      content: `Para acceder a ciertas funcionalidades del sitio, puede ser necesario crear una cuenta de usuario. Al registrarte, te comprometes a:

• Proporcionar información veraz y actualizada
• Mantener la confidencialidad de tus credenciales
• Notificar inmediatamente cualquier uso no autorizado de tu cuenta
• Aceptar la responsabilidad por todas las actividades que ocurran bajo tu cuenta

Anikai no se hace responsable por la pérdida o robo de información de acceso.`
    },
    {
      icon: <Copyright size={22} />,
      number: '04',
      title: 'Propiedad Intelectual',
      content: `Todo el contenido original de Anikai, incluyendo pero no limitado a:

• Diseño gráfico y interfaz de usuario
• Logotipos, símbolos y elementos visuales
• Textos, recomendaciones y reseñas
• Código fuente y estructura del sitio

Está protegido por derechos de propiedad intelectual e industrial y pertenece exclusivamente a Anikai o a sus licenciantes.

Las imágenes, títulos y sinopsis de anime son propiedad de sus respectivos creadores y se utilizan bajo el principio de uso justo con fines informativos y de recomendación.`
    },
    {
      icon: <FileText size={22} />,
      number: '05',
      title: 'Contenido y Recomendaciones',
      content: `Las recomendaciones proporcionadas en Anikai son opiniones subjetivas de nuestro equipo curador. No garantizamos:

• Que todas las recomendaciones se ajusten a tus gustos personales
• La disponibilidad continua de los títulos recomendados en plataformas de streaming
• La exactitud absoluta de toda la información del catálogo

Las clasificaciones por edad y advertencias de contenido son orientativas. Es responsabilidad del usuario verificar la idoneidad del contenido.`
    },
    {
      icon: <AlertTriangle size={22} />,
      number: '06',
      title: 'Conducta del Usuario',
      content: `Al utilizar Anikai, te comprometes a NO:

• Utilizar el sitio para fines ilegales o no autorizados
• Intentar acceder a sistemas o datos protegidos
• Interferir con el funcionamiento del sitio
• Utilizar bots, scrapers o herramientas automatizadas
• Suplantar la identidad de otros usuarios o del personal
• Publicar contenido ofensivo, discriminatorio o inapropiado

Nos reservamos el derecho de suspender o terminar cuentas que violen estos términos.`
    },
    {
      icon: <Lock size={22} />,
      number: '07',
      title: 'Privacidad y Protección de Datos',
      content: `Tu privacidad es importante para nosotros. El tratamiento de tus datos personales se rige por nuestra Política de Privacidad, que incluye:

• Qué datos recopilamos y por qué
• Cómo utilizamos y protegemos tu información
• Tus derechos sobre tus datos
• Uso de cookies y tecnologías similares

Al usar Anikai, aceptas el tratamiento de tus datos según lo establecido en dicha política.`
    },
    {
      icon: <Server size={22} />,
      number: '08',
      title: 'Limitación de Responsabilidad',
      content: `Anikai se proporciona "tal cual" y "según disponibilidad". En la máxima medida permitida por la ley:

• No garantizamos que el sitio sea ininterrumpido, seguro o libre de errores
• No nos hacemos responsables por daños directos, indirectos o consecuentes
• No garantizamos la precisión, actualidad o integridad de la información
• No somos responsables por enlaces a sitios de terceros

El usuario asume todo el riesgo asociado con el uso del sitio.`
    },
    {
      icon: <Clock size={22} />,
      number: '09',
      title: 'Modificaciones de los Términos',
      content: `Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio.

Tu uso continuado de Anikai después de cualquier modificación constituye tu aceptación de los nuevos términos. Te recomendamos revisar periódicamente esta página.`
    },
    {
      icon: <Globe size={22} />,
      number: '10',
      title: 'Ley Aplicable y Jurisdicción',
      content: `Estos Términos y Condiciones se regirán e interpretarán de conformidad con las leyes del país donde Anikai tenga su sede operativa, sin tener en cuenta sus disposiciones sobre conflicto de leyes.

Cualquier disputa relacionada con estos términos o el uso del sitio se someterá a la jurisdicción exclusiva de los tribunales competentes, salvo que la ley aplicable disponga lo contrario.`
    },
    {
      icon: <Mail size={22} />,
      number: '11',
      title: 'Contacto',
      content: `Si tienes alguna pregunta sobre estos Términos y Condiciones, puedes contactarnos a través de:

Email: contact@anikai.com

Formulario de contacto disponible en la sección de Ayuda

Tiempo de respuesta: 24-48 horas hábiles

Estaremos encantados de resolver tus dudas.`
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
              Términos y <span className="gradient-text">Condiciones</span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="hero-subtitle"
            >
              Última actualización: 23 de Febrero, 2026
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
            Bienvenido a <strong>Anikai</strong>. Por favor, lee cuidadosamente 
            estos Términos y Condiciones antes de utilizar nuestro sitio web. 
            Al acceder o usar nuestros servicios, aceptas estar sujeto a estos términos.
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
                  He leído y acepto los Términos y Condiciones
                </span>
              </label>

              <div className="acceptance-buttons">
                <Link to="/" className="btn btn-ghost">
                  Volver al inicio
                </Link>
                <button 
                  onClick={handleAccept}
                  className={`btn btn-neon ${!accepted ? 'disabled' : ''}`}
                  disabled={!accepted}
                >
                  Continuar a explorar
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Links */}
        <div className="terms-footer">
          <Link to="/privacidad" className="footer-link">Política de Privacidad</Link>
          <span className="separator">/</span>
          <Link to="/aviso-legal" className="footer-link">Aviso Legal</Link>
        </div>
      </div>
    </div>
  );
};

export default Terms;