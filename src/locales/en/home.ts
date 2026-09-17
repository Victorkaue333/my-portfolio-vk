/* Tela inicial (/). */
import type base from '../pt-BR/home';

const home: typeof base = {
  hero: {
    role: 'Developer',
    tech: 'Full Stack',
    description:
      'Focus on performance and maintenance. I deliver reliable software for critical processes, from business rules to production deployment.',
    cta: 'Meet my journey',
    cta2: 'View Projects',
  },
  home: {
    featuredTitle: 'Featured Projects',
    impactTitle: 'By the numbers',
    viewAllProjects: 'View all projects',
    metrics: {
      projectsLabel: 'Published projects',
      projectsContext: 'Each with a case study: challenge, solution and stack',
      realLabel: 'Professional projects',
      realContext: 'Built for companies, public bodies and events',
      orgsLabel: 'Companies & institutions',
      orgsContext: 'Startups, public sector and funded research',
    },
    servicesSubtitle: 'Where logic meets performance to create value.',
    featuredSubtitle: 'Real projects, with context, stack and outcome.',
    featuredCta: 'See case study',
    featuredTeam_one: 'Solo',
    featuredTeam_other: 'Team of {{count}}',
  },
};

export default home;
