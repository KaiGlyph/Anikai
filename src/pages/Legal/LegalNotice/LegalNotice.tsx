// src/pages/legal/LegalNotice.tsx
import React from 'react';
import { Link } from 'react-router-dom';
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
  const sections = [
    {
      icon: <Building size={22} />,
      number: '01',
      title: 'Datos Identificativos',
      content: `En cumplimiento con la normativa vigente, te proporcionamos la información legal de Anikai:

**Denominación social:** Anikai Platform
**Nombre comercial:** Anikai - Recomendaciones de Anime
**Actividad:** Plataforma de recomendaciones y curaduría de contenido anime
**Domicilio social:** [Tu dirección completa]
**País:** [Tu país]
**Email de contacto:** legal@anikai.com
**Teléfono:** [Tu número de teléfono si aplica]

**Inscripción registral:**
[Tu información de registro mercantil si aplica]`
    },
    {
      icon: <Target size={22} />,
      number: '02',
      title: 'Objeto del Sitio Web',
      content: `Anikai es una plataforma digital que ofrece:

**Servicios principales:**
• Recomendaciones personalizadas de anime
• Catálogo informativo de series y películas anime
• Sistema de listas personales (Favoritos, Para Ver, Visto)
• Reseñas y valoraciones de contenido
• Noticias y actualizaciones del mundo anime

**Carácter del servicio:**
Este sitio web tiene carácter informativo y de entretenimiento. Las recomendaciones son opiniones subjetivas de nuestro equipo curador y no garantizamos que se ajusten a todos los gustos.`
    },
    {
      icon: <UserCheck size={22} />,
      number: '03',
      title: 'Condiciones de Acceso y Uso',
      content: `El acceso y uso de Anikai atribuye la condición de usuario y implica:

**Aceptación plena:**
• De todos los términos publicados en este Aviso Legal
• De los Términos y Condiciones de uso
• De la Política de Privacidad
• De todas las políticas y normativas del sitio

**Obligaciones del usuario:**
• Hacer un uso adecuado y lícito del sitio
• No realizar actividades que dañen o sobrecarguen los servidores
• No intentar acceder a áreas restringidas
• No suplantar la identidad de otros
• Respetar los derechos de propiedad intelectual

**Prohibiciones:**
Queda expresamente prohibido el uso del sitio para fines ilegales o contrarios a la moral y el orden público.`
    },
    {
      icon: <Copyright size={22} />,
      number: '04',
      title: 'Propiedad Intelectual e Industrial',
      content: `**Derechos de Anikai:**
Todos los derechos de propiedad intelectual e industrial del sitio web, incluyendo pero no limitado a:

• Diseño gráfico, interfaz y código fuente
• Logotipos, marcas y símbolos distintivos
• Textos, reseñas y recomendaciones originales
• Estructura, selección y disposición del contenido
• Software y aplicaciones

Pertenecen exclusivamente a Anikai o a sus licenciantes.

**Contenido de terceros:**
Las imágenes, títulos, sinopsis y otro contenido relacionado con anime pertenecen a sus respectivos propietarios y se utilizan bajo el principio de uso justo con fines informativos y de recomendación.`
    },
    {
      icon: <Link2 size={22} />,
      number: '05',
      title: 'Enlaces y Links',
      content: `**Enlaces a Anikai:**
Cualquier persona que desee establecer un enlace a nuestro sitio web debe:

• Solicitar autorización previa por escrito
• No reproducir la marca Anikai sin permiso
• No crear frames o marcos alrededor del sitio
• No asociar el enlace con contenido ilegal o inapropiado

**Enlaces desde Anikai:**
Podemos incluir enlaces a sitios de terceros (plataformas de streaming, estudios, etc.):

• No nos hacemos responsables del contenido de terceros
• No controlamos ni aprobamos necesariamente dichos sitios
• El acceso es bajo tu propia responsabilidad
• Te recomendamos leer sus políticas de privacidad`
    },
    {
      icon: <AlertTriangle size={22} />,
      number: '06',
      title: 'Exención de Responsabilidades',
      content: `**Información del contenido:**
Aunque nos esforzamos por proporcionar información precisa y actualizada:

• No garantizamos la exactitud absoluta de todos los datos
• La información puede contener errores u omisiones
• Los horarios y disponibilidad pueden cambiar sin previo aviso
• Las imágenes pueden diferir del producto final

**Servicio "tal cual":**
El sitio se proporciona "tal cual" y "según disponibilidad":

• No garantizamos funcionamiento ininterrumpido
• No nos hacemos responsables por caídas del servidor
• No garantizamos la ausencia de virus o elementos nocivos
• El usuario es responsable de su propio sistema de seguridad`
    },
    {
      icon: <RefreshCw size={22} />,
      number: '07',
      title: 'Modificaciones del Sitio',
      content: `**Derecho de modificación:**
Anikai se reserva el derecho de:

• Modificar, suspender o cancelar total o parcialmente el sitio
• Cambiar el diseño, contenido o funcionalidades sin previo aviso
• Actualizar o eliminar información del catálogo
• Implementar nuevas características o eliminar existentes

**Sin indemnización:**
Estas modificaciones no darán derecho a los usuarios a ninguna indemnización o compensación.

**Notificación:**
Los cambios significativos se comunicarán a través del sitio web o por correo electrónico cuando sea apropiado.`
    },
    {
      icon: <Gavel size={22} />,
      number: '08',
      title: 'Legislación Aplicable',
      content: `**Normativa de aplicación:**
Este Aviso Legal se rige por:

• Las leyes del país donde Anikai tenga su sede operativa
• La normativa de protección de datos vigente
• La legislación sobre propiedad intelectual
• Las normas de comercio electrónico aplicables

**Idioma:**
El idioma oficial del sitio y de este Aviso Legal es el español.

**Validez:**
Si alguna disposición de este aviso se considera inválida o inaplicable, las demás disposiciones mantendrán su validez y aplicabilidad.`
    },
    {
      icon: <MapPin size={22} />,
      number: '09',
      title: 'Jurisdicción y Competencia',
      content: `**Fuero competente:**
Para cualquier controversia o reclamación derivada del uso de este sitio:

• Las partes se someten expresamente a los juzgados y tribunales de [Tu ciudad/país]
• Con renuncia expresa a cualquier otro fuero que pudiera corresponderles
• Sin perjuicio de las normas de protección al consumidor que sean de aplicación

**Resolución alternativa de litigios:**
Puedes recurrir a plataformas de resolución de litigios en línea disponibles en tu jurisdicción.`
    },
    {
      icon: <Clock size={22} />,
      number: '10',
      title: 'Duración y Terminación',
      content: `**Vigencia:**
Este Aviso Legal entrará en vigor en el momento de su publicación y tendrá carácter indefinido.

**Terminación del acceso:**
Anikai podrá suspender o terminar el acceso de cualquier usuario que:

• Incumpla estos términos o condiciones
• Realice actividades ilegales o fraudulentas
• Dañe la reputación o intereses de Anikai
• Suplante la identidad de otros usuarios

**Efectos de la terminación:**
Cesarán todos los derechos de uso del sitio y el usuario deberá destruir cualquier material descargado.`
    },
    {
      icon: <Mail size={22} />,
      number: '11',
      title: 'Contacto y Consultas',
      content: `**Para consultas sobre este Aviso Legal:**

Email: legal@anikai.com

Formulario de contacto disponible en la sección de Ayuda

Horario de atención: Lunes a Viernes, 9:00 - 18:00

**Respuesta:**
Nos comprometemos a responder a tus consultas en un plazo máximo de 72 horas hábiles.

**Reclamaciones:**
Si tienes alguna reclamación o queja, puedes contactarnos a través de los canales mencionados o utilizar nuestro formulario de contacto disponible en el sitio web.`
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
            Aviso <span className="gradient-text">Legal</span>
          </h1>
          <p className="hero-subtitle">
            Información legal y condiciones de uso
          </p>
          <p className="hero-date">
            Última actualización: 23 de Febrero, 2026
          </p>
        </div>

        {/* Intro */}
        <div className="legal-intro fade-in-up">
          <div className="intro-accent" />
          <p>
            Bienvenido a <strong>Anikai</strong>. Este Aviso Legal regula el acceso 
            y uso de nuestro sitio web de recomendaciones de anime. Por favor, 
            léelo detenidamente antes de utilizar nuestros servicios.
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
                Información Importante
              </h3>
              <p className="info-text">
                El acceso y uso de Anikai implica la aceptación plena de este Aviso Legal, 
                los Términos y Condiciones, y la Política de Privacidad.
              </p>
              <div className="info-buttons">
                <Link to="/" className="btn btn-ghost">
                  Volver al inicio
                </Link>
                <Link to="/terminos" className="btn btn-neon">
                  Ver Términos y Condiciones
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="legal-footer fade-in">
          <Link to="/terminos" className="footer-link">Términos y Condiciones</Link>
          <span className="separator">/</span>
          <Link to="/privacidad" className="footer-link">Política de Privacidad</Link>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;