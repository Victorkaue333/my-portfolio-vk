/* Tela Sobre (/sobre), incluindo a atividade no GitHub. */
import type base from '../pt-BR/sobre';

const sobre: typeof base = {
  about: {
    title: 'Sobre mí',
    subtitle: 'Desarrollador Full Stack',
    terminalLabel: 'Sesión de terminal con el resumen técnico',
    intro:
      'Soy desarrollador enfocado en backend y sistemas web, titulado en Desarrollo de Sistemas y estudiante de Gestión de Tecnologías de la Información. Trabajo en el desarrollo de APIs, lógica de negocio, modelado de datos, interfaces web y despliegue, con enfoque en arquitectura limpia, seguridad y valor de negocio.',
    highlights: {
      title: 'Diferenciales',
      backend: 'Backend Especializado',
      backendDesc: 'Lógica de negocio consistente, autenticación segura y modelado de datos orientado a escala.',
      api: 'APIs Escalables',
      apiDesc: 'Desarrollo de APIs REST enfocado en rendimiento, integración y mantenimiento a largo plazo.',
      enterprise: 'Sistemas Empresariales',
      enterpriseDesc: 'Experiencia en proyectos reales con entrega de principio a fin, desde la planificación hasta producción.',
    },
    skillsLabel: 'Stacks utilizadas',
  },
  expertise: {
    title: 'Experiencia técnica',
    subtitle: 'Mi stack técnico y competencias.',
  },
  github: {
    title: 'Actividad en GitHub',
    contributions: {
      title: 'Contribuciones en el último año',
      alt: 'Gráfico de contribuciones de Victor Kauê en GitHub durante el último año',
      error: 'No se pudo cargar el gráfico de contribuciones.',
      errorLink: 'Ver en GitHub',
      loading: 'Cargando contribuciones de GitHub…',
      total_one: '{{formatted}} contribución en el último año',
      total_other: '{{formatted}} contribuciones en el último año',
      tooltip_zero: 'Sin contribuciones el {{date}}',
      tooltip_one: '{{count}} contribución el {{date}}',
      tooltip_other: '{{count}} contribuciones el {{date}}',
      less: 'Menos',
      more: 'Más',
    },
    repos: {
      title: 'Repositorios recientes',
      loading: 'Cargando repositorios recientes…',
      noDescription: 'Sin descripción.',
      stars_one: '{{count}} estrella',
      stars_other: '{{count}} estrellas',
      updated: 'Actualizado {{when}}',
    },
    fallback: {
      text: 'No se pudo cargar mi actividad ahora. Consúltala directamente en mi perfil:',
      cta: 'Ver GitHub',
    },
    viewAll: 'Ver todos los repositorios',
  },
};

export default sobre;
