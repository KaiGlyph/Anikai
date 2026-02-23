// src/pages/legal/Privacy.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  const sections = [
    {
      icon: <Database size={22} />,
      number: '01',
      title: 'Información que Recopilamos',
      content: `En Anikai, recopilamos información para mejorar tu experiencia y personalizar nuestras recomendaciones:

**Información que proporcionas:**
• Datos de registro (nombre de usuario, correo electrónico, contraseña)
• Preferencias de anime y géneros favoritos
• Listas personales (Favoritos, Para Ver, Visto)
• Historial de visualización y actividad en la plataforma
• Comunicaciones cuando contactas con nuestro equipo

**Información recopilada automáticamente:**
• Datos de navegación y uso del sitio
• Dirección IP y tipo de dispositivo
• Cookies y tecnologías similares
• Métricas de interacción con el contenido`
    },
    {
      icon: <Shield size={22} />,
      number: '02',
      title: 'Cómo Utilizamos tu Información',
      content: `Tu información se utiliza exclusivamente para:

• Personalizar recomendaciones de anime basadas en tus gustos
• Gestionar tu cuenta y listas personales
• Mejorar nuestro catálogo y sistema de curaduría
• Enviarte notificaciones sobre nuevos animes de tu interés
• Responder a tus consultas y solicitudes de soporte
• Analizar el uso del sitio para optimizar su funcionamiento
• Prevenir actividades fraudulentas y proteger la plataforma

**No compartimos** tu información personal con terceros con fines comerciales.`
    },
    {
      icon: <Key size={22} />,
      number: '03',
      title: 'Base Legal para el Tratamiento',
      content: `Procesamos tus datos bajo las siguientes bases legales:

**Consentimiento:** Al registrarte y usar nuestros servicios, aceptas esta política.

**Ejecución de un contrato:** Necesitamos ciertos datos para proporcionarte el servicio de recomendaciones.

**Interés legítimo:** Para mejorar constantemente nuestra plataforma y protegerla contra abusos.

**Obligaciones legales:** Cuando sea necesario para cumplir con la legislación aplicable.

Puedes retirar tu consentimiento en cualquier momento contactándonos.`
    },
    {
      icon: <Cookie size={22} />,
      number: '04',
      title: 'Cookies y Tecnologías de Rastreo',
      content: `Utilizamos cookies y tecnologías similares para:

**Cookies esenciales:**
• Autenticación y seguridad de sesión
• Preferencias de visualización
• Funcionamiento básico del sitio

**Cookies de preferencias:**
• Tus listas personales
• Configuración de idioma y tema
• Historial de navegación interno

**Cookies analíticas:**
• Estadísticas de uso anónimas
• Mejora de la experiencia de usuario
• Optimización del rendimiento

Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.`
    },
    {
      icon: <Share2 size={22} />,
      number: '05',
      title: 'Compartir Información con Terceros',
      content: `Solo compartimos tu información en las siguientes circunstancias:

**Proveedores de servicios:**
• Hosting y almacenamiento de datos
• Servicios de análisis y métricas
• Plataformas de email para notificaciones

Todos nuestros proveedores están obligados contractualmente a proteger tus datos.

**Obligaciones legales:**
• Cuando lo exija la ley o autoridades competentes
• Para proteger nuestros derechos legales
• Para prevenir fraudes o actividades ilegales

**Con tu consentimiento:**
• Solo cuando nos des permiso explícito`
    },
    {
      icon: <Lock size={22} />,
      number: '06',
      title: 'Seguridad de tus Datos',
      content: `Implementamos medidas de seguridad técnicas y organizativas:

**Protección técnica:**
• Encriptación SSL/TLS para todas las comunicaciones
• Almacenamiento seguro de contraseñas (hash bcrypt)
• Firewalls y sistemas de detección de intrusiones
• Copias de seguridad regulares y encriptadas

**Políticas internas:**
• Acceso restringido solo al personal autorizado
• Formación en protección de datos para nuestro equipo
• Auditorías periódicas de seguridad
• Protocolos de respuesta ante incidentes

Sin embargo, ningún sistema es 100% seguro. Te recomendamos usar contraseñas fuertes.`
    },
    {
      icon: <Clock size={22} />,
      number: '07',
      title: 'Conservación de Datos',
      content: `Conservamos tu información durante:

**Mientras tu cuenta esté activa:**
• Datos de perfil y preferencias
• Listas personales e historial
• Configuración de la cuenta

**Después de eliminar tu cuenta:**
• Eliminamos tus datos personales en 30 días
• Conservamos información anonimizada para estadísticas
• Mantenemos registros requeridos por ley (facturas, etc.)

**Plazos legales específicos:**
• Datos fiscales: 5 años según legislación
• Registros de seguridad: según sea necesario
• Datos anonimizados: indefinidamente (sin identificación)`
    },
    {
      icon: <UserCheck size={22} />,
      number: '08',
      title: 'Tus Derechos',
      content: `Tienes los siguientes derechos sobre tus datos:

**Acceso:** Solicitar una copia de tus datos personales.

**Rectificación:** Corregir información inexacta o incompleta.

**Eliminación:** Solicitar la eliminación de tus datos ("derecho al olvido").

**Portabilidad:** Recibir tus datos en formato estructurado.

**Oposición:** Oponerte al tratamiento de tus datos.

**Limitación:** Solicitar la limitación del tratamiento.

**Retirar consentimiento:** En cualquier momento sin afectar la legalidad del tratamiento anterior.

Para ejercer estos derechos, contáctanos en: privacy@anikai.com`
    },
    {
      icon: <Users size={22} />,
      number: '09',
      title: 'Menores de Edad',
      content: `Anikai está dirigido exclusivamente a mayores de 16 años.

**No recopilamos intencionalmente:**
• Datos de menores de 16 años
• Información de personas sin edad verificada

**Si descubrimos** que hemos recopilado datos de un menor sin verificación de edad:
• Eliminaremos la información inmediatamente
• Cerraremos la cuenta asociada
• Notificaremos al responsable legal si es aplicable

Los padres o tutores que crean que su hijo nos ha proporcionado datos deben contactarnos inmediatamente.`
    },
    {
      icon: <Globe size={22} />,
      number: '10',
      title: 'Transferencias Internacionales',
      content: `Tus datos pueden ser transferidos y procesados fuera de tu país de residencia:

**Destinatarios:**
• Servidores en la Unión Europea y otros países
• Proveedores de servicios cloud internacionales
• Plataformas de análisis de datos

**Garantías:**
• Cláusulas contractuales estándar aprobadas
• Decisiones de adecuación de la Comisión Europea
• Certificaciones Privacy Shield (cuando aplique)
• Medidas técnicas adicionales de protección

Al usar Anikai, aceptas estas transferencias internacionales.`
    },
    {
      icon: <RefreshCw size={22} />,
      number: '11',
      title: 'Cambios en esta Política',
      content: `Podemos actualizar esta Política de Privacidad periódicamente:

**Notificación:**
• Publicaremos la versión actualizada en esta página
• Indicamos la fecha de "última actualización"
• Cambios significativos se notificarán por email

**Aceptación:**
• El uso continuado del sitio tras cambios implica aceptación
• Te recomendamos revisar esta página regularmente
• Si no aceptas los cambios, debes dejar de usar el sitio

**Versiones anteriores:**
• Conservamos un historial de versiones
• Disponible bajo solicitud contactándonos`
    },
    {
      icon: <Mail size={22} />,
      number: '12',
      title: 'Contacto y Autoridad de Supervisión',
      content: `**Para consultas sobre privacidad:**

Email: privacy@anikai.com

Formulario de contacto disponible en la sección de Ayuda

Tiempo de respuesta: 48-72 horas hábiles

**Derecho a reclamar:**
Si consideras que hemos violado tus derechos de privacidad, tienes derecho a presentar una reclamación ante la autoridad de protección de datos de tu país:

• España: Agencia Española de Protección de Datos (AEPD)
• México: Instituto Nacional de Transparencia (INAI)
• Argentina: Agencia de Acceso a la Información Pública
• Otros: La autoridad correspondiente en tu jurisdicción

Estamos comprometidos a resolver tus inquietudes de manera justa y oportuna.`
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
            Política de <span className="gradient-text">Privacidad</span>
          </h1>
          <p className="hero-subtitle">
            Tus datos están seguros con nosotros
          </p>
          <p className="hero-date">
            Última actualización: 23 de Febrero, 2026
          </p>
        </div>

        {/* Intro */}
        <div className="privacy-intro fade-in-up">
          <div className="intro-accent" />
          <p>
            En <strong>Anikai</strong>, tu privacidad es nuestra prioridad. 
            Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos 
            tu información personal al usar nuestros servicios de recomendaciones de anime.
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
                Nuestro Compromiso
              </h3>
              <p className="commitment-text">
                Nos comprometemos a proteger tu privacidad y tratar tus datos 
                de manera segura, transparente y conforme a la legislación aplicable.
              </p>
              
              <div className="commitment-buttons">
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
        <div className="privacy-footer fade-in">
          <Link to="/terminos" className="footer-link">Términos y Condiciones</Link>
          <span className="separator">/</span>
          <Link to="/aviso-legal" className="footer-link">Aviso Legal</Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;