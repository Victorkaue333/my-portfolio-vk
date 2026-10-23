import type { ExperienceGroup } from '../types';

/**
 * Experiência profissional (fonte: LinkedIn). Estilo agrupado por empresa:
 * empresas com vários cargos (IF Sertão, NTIDI) exibem os cargos aninhados.
 * Ordem: mais recente primeiro. Idioma: PT-BR (dado bruto, não passa por t()).
 */
export const experiences: ExperienceGroup[] = [
  {
    id: 'ye-vida',
    company: 'Ye Vida',
    roles: [
      {
        title: 'Desenvolvedor Backend Júnior',
        employmentType: 'Tempo integral',
        period: 'jun 2026 - o momento',
        duration: '2 meses',
        location: 'São Paulo, Brasil',
        workMode: 'Remoto',
        description:
          'Atuo como Desenvolvedor Júnior na Ye Vida, participando da construção e evolução de uma plataforma digital voltada à conexão entre pessoas, comunidades e experiências, com foco em soluções escaláveis, seguras e de alta disponibilidade.',
        activities: [
          'Desenvolvimento e manutenção de aplicações web escaláveis',
          'Implementação de funcionalidades front-end e back-end',
          'Integração com APIs e serviços externos',
          'Modelagem e gerenciamento de banco de dados',
          'Participação em processos de deploy, monitoramento e infraestrutura',
          'Colaboração na definição de arquiteturas e boas práticas de desenvolvimento',
          'Controle de versão, revisão de código e integração contínua',
        ],
        skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Shadcn/UI', 'Framer Motion', 'Node.js', 'NestJS', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'GitHub Actions', 'WebSockets', 'CI/CD', 'Jest', 'Playwright', 'Supabase'],
      },
    ],
  },
  {
    id: 'henrique-energia-solar',
    company: 'Henrique Energia Solar',
    roles: [
      {
        title: 'Desenvolvedor Full Stack e Gestor de Projeto',
        employmentType: 'Freelance',
        period: 'mai 2026 - o momento',
        duration: '3 meses',
        location: 'Glória, Bahia, Brasil',
        workMode: 'Remoto',
        description:
          'Atuo como Desenvolvedor Full Stack e Gestor de Projeto na Henrique Energia Solar, liderando iniciativas de transformação digital, posicionamento de marca e estruturação de processos para apoiar o crescimento da empresa.',
        activities: [
          'Criação da identidade digital da empresa',
          'Desenvolvimento do site institucional',
          'Estruturação da presença online',
          'Organização de processos comerciais',
          'Apoio ao posicionamento e crescimento da marca',
        ],
        skills: ['React', 'TypeScript', 'Tailwind CSS', 'UX/UI', 'Branding', 'Marketing Digital', 'Gestão de Projetos'],
      },
    ],
  },
  {
    id: 'caji-solutions',
    company: 'Caji Solutions',
    roles: [
      {
        title: 'Desenvolvedor Full Stack Júnior',
        employmentType: 'Tempo integral',
        period: 'abr 2026 - o momento',
        duration: '4 meses',
        location: 'Ribeirão Preto, São Paulo, Brasil',
        workMode: 'Remoto',
        description:
          'Atuo como Desenvolvedor Full Stack na Caji Solutions, participando do desenvolvimento e evolução de plataformas SaaS voltadas à automação comercial e ao atendimento inteligente com Inteligência Artificial (projetos Prospect AI e Caji Assist).',
        activities: [
          'Evolução de plataformas SaaS voltadas à automação comercial',
          'Desenvolvimento de interfaces modernas e escaláveis',
          'Implementação de funcionalidades para prospecção e relacionamento com clientes',
          'Melhoria da experiência dos usuários e da usabilidade das aplicações',
          'Participação na evolução de soluções baseadas em IA',
        ],
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn/UI', 'Supabase', 'Git', 'GitHub', 'JavaScript'],
      },
    ],
  },
  {
    id: 'if-sertao',
    company: 'Instituto Federal do Sertão Pernambucano',
    employmentType: 'Autônomo',
    totalDuration: '1 ano',
    location: 'Floresta, Pernambuco, Brasil · Híbrido',
    roles: [
      {
        title: 'Desenvolvedor Web Full Stack React/TypeScript · Extensionista',
        period: 'fev 2026 - o momento',
        duration: '6 meses',
        description:
          'Principal responsável técnico pela plataforma Sertão Conecta, iniciativa do Campus Floresta voltada à oferta de cursos abertos, letramento digital e fortalecimento do ensino híbrido para a comunidade externa.',
        activities: [
          'Liderança da camada de desenvolvimento: arquitetura, requisitos e evolução da plataforma',
          'Construção do sistema com React, TypeScript, Tailwind CSS, Shadcn/UI e Supabase',
          'Implementação de mecanismos de gamificação (progresso, recompensas e acompanhamento)',
          'Componentes reutilizáveis e integrações com banco de dados',
          'Centralização do processo de aprendizagem em um único ambiente digital',
        ],
        skills: ['React', 'TypeScript', 'Tailwind CSS', 'Shadcn/UI', 'JavaScript', 'Supabase', 'PostgreSQL', 'Git'],
      },
      {
        title: 'Desenvolvedor Web Full Stack Django · Extensionista',
        period: 'ago 2025 - fev 2026',
        duration: '7 meses',
        description:
          'Desenvolvimento da plataforma Maratona Pitch para a Semana Nacional de Ciência e Tecnologia (SNCT), digitalizando e centralizando a gestão de eventos de pitch em um único ambiente.',
        activities: [
          'Levantamento de requisitos, definição da arquitetura e desenvolvimento da aplicação',
          'Sistema de votação online com validação, auditoria e rastreabilidade',
          'Gestão de eventos e controle de participantes com Python e Django',
          'Interfaces responsivas com HTML, CSS e JavaScript',
          'Integração entre frontend e backend com foco em escalabilidade e manutenção',
        ],
        skills: ['Python', 'Django', 'SQLite', 'Docker', 'JavaScript', 'HTML', 'CSS', 'Git'],
      },
    ],
  },
  {
    id: 'vk-software',
    company: 'VK Software',
    logo: '/images/fotos-projetos-pessoais/vk-portifolio/logotipo-vk.webp',
    roles: [
      {
        title: 'Fundador e Desenvolvedor Full Stack',
        employmentType: 'Autônomo',
        period: 'dez 2025 - o momento',
        duration: '8 meses',
        location: 'Itacuruba, Pernambuco, Brasil',
        workMode: 'Remoto',
        description:
          'Fundador e Desenvolvedor Full Stack da VK Software, empresa criada para desenvolver soluções digitais sob medida — automação de processos, organização de informações e presença digital — acompanhando todo o ciclo de vida dos projetos.',
        activities: [
          'Desenvolvimento de soluções web personalizadas para diferentes segmentos',
          'Automação de processos administrativos e operacionais',
          'Criação de sistemas de gestão e plataformas institucionais',
          'Estruturação da arquitetura e padronização dos projetos',
          'Implantação com foco em escalabilidade, desempenho e manutenção',
          'Atendimento direto aos clientes e levantamento de requisitos',
        ],
        skills: ['Python', 'Django', 'PHP', 'Laravel', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'PostgreSQL', 'MySQL', 'Docker', 'Git'],
      },
    ],
  },
  {
    id: 'freelancer',
    company: 'Freelancer',
    roles: [
      {
        title: 'Desenvolvedor Full Stack',
        employmentType: 'Freelance',
        period: 'jun 2025 - o momento',
        duration: '1 ano 2 meses',
        workMode: 'Remoto',
        description:
          'Criação de soluções web sob medida para empresas, profissionais e projetos digitais, do levantamento de requisitos à implantação em produção — sistemas web, APIs e plataformas administrativas voltadas à automação e centralização de informações.',
        activities: [
          'Digitalização de processos administrativos e operacionais',
          'Desenvolvimento de sistemas personalizados para diferentes necessidades de negócio',
          'Criação e integração de APIs',
          'Centralização e organização de informações',
          'Automação de tarefas que antes dependiam de processos manuais',
        ],
        skills: ['Python', 'Django', 'PHP', 'Laravel', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'PostgreSQL', 'MySQL', 'MongoDB', 'Docker', 'Git'],
      },
    ],
  },
  {
    id: 'ifpe-monitor',
    company: 'Instituto Federal de Ciência e Tecnologia de Pernambuco (IFPE)',
    roles: [
      {
        title: 'Monitor Voluntário — Machine Learning e Python',
        employmentType: 'Autônomo',
        period: 'abr 2026 - jun 2026',
        duration: '3 meses',
        location: 'Floresta, Pernambuco, Brasil',
        workMode: 'Híbrido',
        description:
          'Monitor voluntário no projeto de extensão de ensino de Machine Learning e Python, apoiando a organização, divulgação e suporte das atividades e ampliando o acesso à formação em ciência de dados e IA.',
        activities: [
          'Apoio à organização e planejamento das atividades do curso',
          'Suporte técnico às ferramentas e ambientes utilizados',
          'Participação nas ações de divulgação e comunicação do projeto',
          'Preparação de materiais e recursos educacionais',
          'Acompanhamento dos alunos durante as atividades de aprendizagem',
        ],
        skills: ['Python', 'Machine Learning', 'Git', 'GitHub', 'Produção de Conteúdo'],
      },
    ],
  },
  {
    id: 'ntidi',
    company: 'NTIDI — Next Technology Innovations Digital',
    logo: '/images/fotos-projetos-reais/ntidi/NTIDI.webp',
    employmentType: 'Freelance',
    totalDuration: '1 ano',
    location: 'Brasília, Distrito Federal, Brasil · Remoto',
    roles: [
      {
        title: 'Desenvolvedor Full Stack e Consultor de Vendas — NTIDI Express',
        period: 'abr 2026 - jun 2026',
        duration: '3 meses',
        description:
          'Conciliei responsabilidades técnicas e comerciais: evolução de aplicações web, IA, automação e cibersegurança (projeto Queelvra), além de apoio direto à equipe comercial e vendas consultivas.',
        activities: [
          'Desenvolvimento Full Stack de aplicações e plataformas digitais',
          'Evolução de soluções baseadas em Inteligência Artificial',
          'Administração de infraestrutura e deploy',
          'Integração entre aplicações web e mobile',
          'Apoio técnico à equipe comercial e vendas consultivas',
        ],
        skills: ['Python', 'Django', 'MySQL', 'Flutter', 'JavaScript', 'Bootstrap', 'Docker', 'GitHub Actions', 'Linux', 'Gunicorn', 'Nginx', 'Git', 'Inteligência Artificial'],
      },
      {
        title: 'Desenvolvedor Full Stack',
        period: 'out 2025 - jun 2026',
        duration: '9 meses',
        description:
          'Evolução de soluções de transformação digital, automação, cibersegurança e IA; arquitetura de aplicações, integrações entre serviços e novas funcionalidades para diferentes plataformas.',
        activities: [
          'Desenvolvimento Full Stack de aplicações web (Python, Django, MySQL)',
          'Desenvolvimento de APIs e integrações',
          'Estruturação de infraestrutura: servidores Linux, Docker, Gunicorn e Nginx',
          'Contribuição no projeto Queelvra (cibersegurança e antifraude com IA)',
          'Integração entre aplicações Python e sistemas em Flutter',
        ],
        skills: ['Python', 'Django', 'MySQL', 'Flutter', 'HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Docker', 'GitHub Actions', 'Linux', 'Gunicorn', 'Nginx', 'Git', 'Inteligência Artificial'],
      },
      {
        title: 'Desenvolvedor Web Júnior',
        period: 'jul 2025 - jun 2026',
        duration: '1 ano',
        description:
          'Desenvolvimento e manutenção de aplicações web voltadas à transformação digital e automação de processos, com Python, Django e MySQL — regras de negócio, APIs, autenticação e painéis administrativos.',
        activities: [
          'Desenvolvimento de aplicações web com Python e Django',
          'Construção e integração de APIs',
          'Desenvolvimento de interfaces responsivas',
          'Modelagem e manutenção de banco de dados MySQL',
          'Implementação de pipelines CI/CD com GitHub Actions',
          'Deploy e monitoramento de aplicações',
        ],
        skills: ['Python', 'Django', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Git', 'GitHub', 'GitHub Actions', 'Linux', 'Docker', 'Gunicorn', 'Nginx'],
      },
    ],
  },
  {
    id: 'cnpq',
    company: 'CNPq',
    roles: [
      {
        title: 'Bolsista de Pesquisa (Projeto Financiado)',
        employmentType: 'Temporário',
        period: 'set 2024 - set 2025',
        duration: '1 ano 1 mês',
        location: 'Floresta, Pernambuco, Brasil',
        workMode: 'Híbrido',
        description:
          'Bolsista do CNPq no projeto "Saberes Interculturais dos Povos Indígenas de Itaparica" (IF Sertão Pernambucano), com foco na valorização, preservação e divulgação dos conhecimentos tradicionais das comunidades indígenas da região.',
        activities: [
          'Organização e sistematização de dados e informações de pesquisa',
          'Produção de materiais educacionais e científicos',
          'Apoio às ações de extensão e divulgação do projeto',
          'Desenvolvimento e manutenção do portal institucional do projeto',
          'Integração entre conhecimento acadêmico e saberes tradicionais',
        ],
        skills: ['Pesquisa', 'Divulgação Científica', 'Sistematização de Dados', 'Comunicação'],
      },
    ],
  },
  {
    id: 'gre-estagio',
    company: 'GRE do Sertão do Submédio do São Francisco',
    roles: [
      {
        title: 'Estagiário — Desenvolvimento Web Full Stack Django e Suporte Técnico',
        employmentType: 'Estágio',
        period: 'mai 2025 - ago 2025',
        duration: '4 meses',
        location: 'Floresta, Pernambuco, Brasil',
        workMode: 'Presencial',
        description:
          'Planejamento, desenvolvimento e manutenção de soluções web para a Gerência Regional de Educação, contribuindo para o SIGREF — plataforma que centraliza demandas escolares, atividades administrativas e processos internos.',
        activities: [
          'Desenvolvimento front-end e back-end com Python, Django, JavaScript, HTML e CSS',
          'Gerenciamento de usuários, regras de negócio, testes e refatoração de código',
          'Suporte técnico à CTI e gestão de chamados via GLPI',
          'Digitalização e centralização de processos administrativos',
          'Treinamento de colaboradores e suporte a usuários internos',
        ],
        skills: ['Python', 'Django', 'JavaScript', 'HTML', 'CSS', 'GLPI', 'Git', 'Banco de Dados'],
      },
    ],
  },
];
