/*
 * Revisar: lista inicial montada a partir do ambiente conhecido — confirme/ajuste itens e adicione hardware.
 *
 * Página /uses. Categorias sem itens não são renderizadas — para adicionar
 * hardware, crie uma categoria nova com os itens reais (não inventar specs).
 * `icon` é resolvido por nome em TechGlyph (src/components/ui/TechIcon/TechIcon.tsx).
 */
import type { Language } from '../hooks/useLanguage';

export interface UsesItem {
  name: string;
  description: Record<Language, string>;
  url?: string;
  /** Nome em TECH_ICONS. Ausente/desconhecido = sem ícone. */
  icon?: string;
}

export interface UsesCategory {
  id: string;
  title: Record<Language, string>;
  items: UsesItem[];
}

export const usesCategories: UsesCategory[] = [
  {
    id: 'editor-terminal',
    title: { 'pt-BR': 'Editor & Terminal', 'pt-PT': 'Editor & Terminal', en: 'Editor & Terminal', es: 'Editor & Terminal' },
    items: [
      {
        name: 'VS Code',
        icon: 'VS Code',
        url: 'https://code.visualstudio.com/',
        description: {
          'pt-BR': 'Editor principal para todos os projetos — Python, TypeScript e o resto.',
          'pt-PT': 'Editor principal para todos os projetos — Python, TypeScript e o resto.',
          en: 'Main editor for every project — Python, TypeScript and everything else.',
          es: 'Editor principal para todos los proyectos — Python, TypeScript y lo demás.',
        },
      },
      {
        name: 'Claude Code',
        icon: 'Claude',
        url: 'https://www.anthropic.com/claude-code',
        description: {
          'pt-BR': 'Assistente de programação com IA, usado dentro do VS Code.',
          'pt-PT': 'Assistente de programação com IA, utilizado dentro do VS Code.',
          en: 'AI coding assistant, used inside VS Code.',
          es: 'Asistente de programación con IA, usado dentro de VS Code.',
        },
      },
      {
        name: 'Git Bash',
        icon: 'Git Bash',
        url: 'https://gitforwindows.org/',
        description: {
          'pt-BR': 'Terminal com comandos Unix no Windows.',
          'pt-PT': 'Terminal com comandos Unix no Windows.',
          en: 'Unix-style terminal on Windows.',
          es: 'Terminal con comandos Unix en Windows.',
        },
      },
      {
        name: 'PowerShell',
        icon: 'PowerShell',
        url: 'https://learn.microsoft.com/powershell/',
        description: {
          'pt-BR': 'Terminal nativo do Windows para scripts e tarefas do sistema.',
          'pt-PT': 'Terminal nativo do Windows para scripts e tarefas do sistema.',
          en: 'Native Windows shell for scripts and system tasks.',
          es: 'Terminal nativa de Windows para scripts y tareas del sistema.',
        },
      },
    ],
  },
  {
    id: 'stack',
    title: { 'pt-BR': 'Stack principal', 'pt-PT': 'Stack principal', en: 'Main stack', es: 'Stack principal' },
    items: [
      {
        name: 'Python',
        icon: 'Python',
        url: 'https://www.python.org/',
        description: {
          'pt-BR': 'Linguagem do backend, automações e scripts.',
          'pt-PT': 'Linguagem do backend, automações e scripts.',
          en: 'Language for backend work, automation and scripts.',
          es: 'Lenguaje del backend, automatizaciones y scripts.',
        },
      },
      {
        name: 'Django',
        icon: 'Django',
        url: 'https://www.djangoproject.com/',
        description: {
          'pt-BR': 'Framework para sistemas web e APIs.',
          'pt-PT': 'Framework para sistemas web e APIs.',
          en: 'Framework for web systems and APIs.',
          es: 'Framework para sistemas web y APIs.',
        },
      },
      {
        name: 'React + TypeScript',
        icon: 'React',
        url: 'https://react.dev/',
        description: {
          'pt-BR': 'Interfaces no front-end, como este portfólio.',
          'pt-PT': 'Interfaces no front-end, como este portefólio.',
          en: 'Front-end interfaces, like this portfolio.',
          es: 'Interfaces en el front-end, como este portafolio.',
        },
      },
      {
        name: 'PostgreSQL / MySQL',
        icon: 'PostgreSQL',
        url: 'https://www.postgresql.org/',
        description: {
          'pt-BR': 'Bancos de dados relacionais dos projetos.',
          'pt-PT': 'Bases de dados relacionais dos projetos.',
          en: 'Relational databases behind the projects.',
          es: 'Bases de datos relacionales de los proyectos.',
        },
      },
    ],
  },
  {
    id: 'desenvolvimento',
    title: { 'pt-BR': 'Desenvolvimento', 'pt-PT': 'Desenvolvimento', en: 'Development', es: 'Desarrollo' },
    items: [
      {
        name: 'Git + GitHub',
        icon: 'GitHub',
        url: 'https://github.com/Victorkaue333',
        description: {
          'pt-BR': 'Versionamento e hospedagem do código.',
          'pt-PT': 'Controlo de versões e alojamento do código.',
          en: 'Version control and code hosting.',
          es: 'Control de versiones y alojamiento del código.',
        },
      },
      {
        name: 'Node.js + npm',
        icon: 'Node.js',
        url: 'https://nodejs.org/',
        description: {
          'pt-BR': 'Runtime e gerenciador de pacotes do ecossistema JavaScript.',
          'pt-PT': 'Runtime e gestor de pacotes do ecossistema JavaScript.',
          en: 'Runtime and package manager for the JavaScript ecosystem.',
          es: 'Runtime y gestor de paquetes del ecosistema JavaScript.',
        },
      },
      {
        name: 'Docker',
        icon: 'Docker',
        url: 'https://www.docker.com/',
        description: {
          'pt-BR': 'Ambientes em contêiner para rodar e publicar serviços.',
          'pt-PT': 'Ambientes em contentores para executar e publicar serviços.',
          en: 'Containerized environments to run and ship services.',
          es: 'Entornos en contenedores para ejecutar y publicar servicios.',
        },
      },
      {
        name: 'DBeaver',
        icon: 'DBeaver',
        url: 'https://dbeaver.io/',
        description: {
          'pt-BR': 'Cliente para consultar e administrar bancos de dados.',
          'pt-PT': 'Cliente para consultar e administrar bases de dados.',
          en: 'Client to query and manage databases.',
          es: 'Cliente para consultar y administrar bases de datos.',
        },
      },
      {
        name: 'Bruno',
        icon: 'Bruno',
        url: 'https://www.usebruno.com/',
        description: {
          'pt-BR': 'Testes manuais de APIs REST.',
          'pt-PT': 'Testes manuais de APIs REST.',
          en: 'Manual testing of REST APIs.',
          es: 'Pruebas manuales de APIs REST.',
        },
      },
      {
        name: 'Vercel',
        icon: 'Vercel',
        url: 'https://vercel.com/',
        description: {
          'pt-BR': 'Deploy de sites front-end — inclusive deste.',
          'pt-PT': 'Deploy de sites front-end — incluindo este.',
          en: 'Deploys for front-end sites — this one included.',
          es: 'Despliegue de sitios front-end — incluido este.',
        },
      },
    ],
  },
  {
    id: 'produtividade',
    title: { 'pt-BR': 'Produtividade', 'pt-PT': 'Produtividade', en: 'Productivity', es: 'Productividad' },
    items: [
      {
        name: 'Obsidian',
        icon: 'Obsidian',
        url: 'https://obsidian.md/',
        description: {
          'pt-BR': 'Notas, documentação pessoal e estudos.',
          'pt-PT': 'Notas, documentação pessoal e estudo.',
          en: 'Notes, personal documentation and study.',
          es: 'Notas, documentación personal y estudios.',
        },
      },
      {
        name: 'Trello',
        icon: 'Trello',
        url: 'https://trello.com/',
        description: {
          'pt-BR': 'Quadros para organizar tarefas e projetos.',
          'pt-PT': 'Quadros para organizar tarefas e projetos.',
          en: 'Boards to organize tasks and projects.',
          es: 'Tableros para organizar tareas y proyectos.',
        },
      },
      {
        name: 'Google Chrome',
        icon: 'Google Chrome',
        url: 'https://www.google.com/chrome/',
        description: {
          'pt-BR': 'Navegador principal e DevTools para depurar o front-end.',
          'pt-PT': 'Navegador principal e DevTools para depurar o front-end.',
          en: 'Main browser, plus DevTools to debug the front-end.',
          es: 'Navegador principal y DevTools para depurar el front-end.',
        },
      },
    ],
  },
  {
    id: 'sistema',
    title: { 'pt-BR': 'Sistema operacional', 'pt-PT': 'Sistema operativo', en: 'Operating system', es: 'Sistema operativo' },
    items: [
      {
        name: 'Windows 11',
        icon: 'Windows',
        description: {
          'pt-BR': 'Sistema operacional do dia a dia.',
          'pt-PT': 'Sistema operativo do dia a dia.',
          en: 'Everyday operating system.',
          es: 'Sistema operativo del día a día.',
        },
      },
    ],
  },
  // Hardware: adicionar aqui quando houver itens confirmados.
];
