/* Tela Sobre (/sobre), incluindo a atividade no GitHub. */
import type base from '../pt-BR/sobre';

const sobre: typeof base = {
  about: {
    title: 'About',
    subtitle: 'Full Stack Developer',
    terminalLabel: 'Terminal session with the technical summary',
    intro:
      "I am a developer focused on backend and web systems, with a degree in Systems Development and currently studying Information Technology Management. I build APIs, business rules, data modeling, web interfaces and deployment with focus on clean architecture, security and business value.",
    highlights: {
      title: 'Differentiators',
      backend: 'Specialized Backend',
      backendDesc: 'Consistent business rules, secure authentication and scale-oriented data modeling.',
      api: 'Scalable APIs',
      apiDesc: 'REST API development focused on performance, integration and long-term maintenance.',
      enterprise: 'Enterprise Systems',
      enterpriseDesc: 'Experience in real projects with end-to-end delivery, from planning to production.',
    },
  },
  expertise: {
    title: 'Technical Expertise',
    subtitle: 'My technical stack and competencies.',
  },
  github: {
    title: 'GitHub activity',
    contributions: {
      title: 'Contributions in the last year',
      alt: "Victor Kauê's GitHub contribution graph for the last year",
      error: "Couldn't load the contribution graph.",
      errorLink: 'View on GitHub',
      loading: 'Loading GitHub contributions…',
      total_one: '{{formatted}} contribution in the last year',
      total_other: '{{formatted}} contributions in the last year',
      tooltip_zero: 'No contributions on {{date}}',
      tooltip_one: '{{count}} contribution on {{date}}',
      tooltip_other: '{{count}} contributions on {{date}}',
      less: 'Less',
      more: 'More',
    },
    repos: {
      title: 'Recent repositories',
      loading: 'Loading recent repositories…',
      noDescription: 'No description.',
      stars_one: '{{count}} star',
      stars_other: '{{count}} stars',
      updated: 'Updated {{when}}',
    },
    fallback: {
      text: "Couldn't load my activity right now. Check it out directly on my profile:",
      cta: 'View GitHub',
    },
    viewAll: 'View all repositories',
  },
};

export default sobre;
