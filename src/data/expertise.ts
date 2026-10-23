import type { ExpertiseCategory } from '../types';

/**
 * Especialidades por domínio, na ordem do posicionamento atual. Cada item tem
 * uso comprovado em algum projeto de data/projects/ ou cargo de
 * data/experiences.ts. Django, PHP e afins ficam em `history`: experiência
 * real, mas não a especialização de hoje.
 *
 * A ordem importa: CodeWindow e o terminal de /sobre leem os primeiros itens
 * de `backend` e `frontend`. Ícones: resolvidos por nome em TechIcon.
 */
export const expertise: ExpertiseCategory[] = [
  {
    id: 'backend',
    items: [{ name: 'Python' }, { name: 'FastAPI' }, { name: 'Node.js' }, { name: 'NestJS' }],
  },
  {
    id: 'frontend',
    items: [{ name: 'TypeScript' }, { name: 'React' }, { name: 'Next.js' }, { name: 'Tailwind CSS' }, { name: 'Vite' }],
  },
  {
    id: 'data',
    items: [{ name: 'PostgreSQL' }, { name: 'Redis' }, { name: 'Supabase' }, { name: 'Prisma' }],
  },
  {
    id: 'infra',
    items: [
      { name: 'Docker' },
      { name: 'GitHub Actions' },
      { name: 'Nginx' },
      { name: 'Linux' },
      { name: 'Vercel' },
      { name: 'Playwright' },
      { name: 'Vitest' },
    ],
  },
  {
    id: 'ai',
    items: [{ name: 'Whisper' }, { name: 'Gemini' }, { name: 'PyTorch' }, { name: 'Selenium' }, { name: 'pandas' }],
  },
  {
    id: 'history',
    items: [
      { name: 'Django' },
      { name: 'PHP' },
      { name: 'Laravel' },
      { name: 'MySQL' },
      { name: 'JavaScript' },
      { name: 'Bootstrap' },
    ],
  },
  {
    id: 'tools',
    items: [{ name: 'Git' }, { name: 'GitHub' }, { name: 'VS Code' }, { name: 'DBeaver' }, { name: 'Bruno' }],
  },
];
