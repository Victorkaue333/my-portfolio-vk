import type { ExperienceGroup } from '../types';

/**
 * Experiência profissional (fonte: LinkedIn, out 2026). Estilo agrupado por
 * empresa: empresas com vários cargos (IF Sertão, NTIDI) exibem os cargos
 * aninhados. Ordem: início mais recente primeiro (a timeline usa o início
 * como rótulo). Duração não é digitada — sai do
 * `period` (utils/period.ts). Idioma: PT-BR (dado bruto, não passa por t()).
 */
export const experiences: ExperienceGroup[] = [
  {
    id: 'aex-hub',
    company: 'AEX Hub',
    roles: [
      {
        title: 'Full Stack Developer',
        employmentType: 'Tempo integral',
        period: 'jun 2026 - o momento',
        location: 'Belo Horizonte, Minas Gerais, Brasil',
        workMode: 'Remoto',
        description:
          'Engenharia de software em um ecossistema de criação e desenvolvimento de startups, com participação no direcionamento técnico das soluções e na organização dos processos de desenvolvimento. O trabalho envolve avaliar necessidades de negócio, discutir alternativas de implementação e orientar decisões técnicas junto à equipe, além de desenvolver funcionalidades e integrações das aplicações.',
        activities: [
          'Desenvolvimento de soluções Full Stack, abrangendo interfaces, serviços backend e integrações',
          'Participação nas decisões de arquitetura e na definição de estratégias técnicas',
          'Organização e priorização das demandas de engenharia em conjunto com a equipe',
          'Avaliação de tecnologias e soluções para novas funcionalidades',
          'Alinhamento técnico com os responsáveis pelos produtos e demais desenvolvedores',
        ],
        skills: ['TypeScript', 'React', 'Next.js', 'Node.js', 'NestJS', 'PostgreSQL', 'Redis', 'APIs REST'],
      },
    ],
  },
  {
    id: 'grupo-glipy',
    company: 'Grupo Glipy',
    roles: [
      {
        title: 'Full Stack Developer',
        employmentType: 'Tempo integral',
        period: 'jun 2026 - o momento',
        location: 'Belo Horizonte, Minas Gerais, Brasil',
        workMode: 'Remoto',
        description:
          'Desenvolvimento de produtos digitais do Grupo Glipy, incluindo Glipy Travel, Glipy Business e Glipy Pay, com responsabilidades em engenharia Full Stack e direcionamento técnico. A participação envolve o desenvolvimento das aplicações, avaliação de alternativas de arquitetura e comunicação direta com os responsáveis pelos produtos para transformar requisitos de negócio em soluções técnicas.',
        activities: [
          'Implementação de interfaces, funcionalidades backend e integrações entre serviços',
          'Discussão e definição de soluções arquiteturais para evolução das aplicações',
          'Avaliação de tecnologias e estratégias de implementação',
          'Organização de prioridades e acompanhamento técnico das entregas',
          'Comunicação com os responsáveis pelos produtos para alinhamento de requisitos e decisões',
        ],
        skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'Redis', 'Docker', 'APIs REST'],
      },
    ],
  },
  {
    id: 'mavis-imob',
    company: 'Mavis Imob',
    roles: [
      {
        title: 'Partner & Backend Developer',
        employmentType: 'Meio período',
        period: 'jun 2026 - o momento',
        location: 'Belo Horizonte, Minas Gerais, Brasil',
        workMode: 'Remoto',
        description:
          'Sócio e desenvolvedor da Mavis Imob, com responsabilidades sobre diferentes frentes de engenharia das soluções da empresa, incluindo desenvolvimento frontend, backend, infraestrutura e organização técnica dos projetos. A atuação contempla a construção de módulos da plataforma, estruturação dos serviços, integração de sistemas e participação nas decisões relacionadas à arquitetura, funcionalidades e evolução dos produtos.',
        activities: [
          'Desenvolvimento Full Stack de interfaces, módulos administrativos e portais da plataforma',
          'Implementação de APIs REST, serviços e regras de negócio com NestJS',
          'Modelagem e integração de dados com PostgreSQL e Prisma ORM',
          'Configuração de infraestrutura, containers e ambientes de execução',
          'Definição e revisão de contratos de integração entre serviços',
          'Organização de tarefas, priorização de entregas e discussão de decisões técnicas',
        ],
        skills: ['TypeScript', 'React', 'Vite', 'Node.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Redis', 'Docker', 'Coolify'],
      },
    ],
  },
  {
    id: 'ye-vida',
    company: 'Ye Vida',
    roles: [
      {
        title: 'Full Stack Developer',
        employmentType: 'Tempo integral',
        period: 'jun 2026 - out 2026',
        location: 'Belo Horizonte, Minas Gerais, Brasil',
        workMode: 'Remoto',
        description:
          'Desenvolvimento de uma plataforma de rede social vinculada ao ecossistema da Ye Vida, com trabalho direcionado à construção de funcionalidades web, integração de serviços e evolução da aplicação. A contratação ocorreu pela Ye Vida, com atividades técnicas concentradas no projeto da plataforma social.',
        activities: [
          'Implementação de funcionalidades frontend e backend',
          'Desenvolvimento de interfaces e componentes responsivos',
          'Integração de APIs REST e serviços da aplicação',
          'Apoio à evolução dos módulos e à organização técnica do sistema',
          'Testes, correções e manutenção das funcionalidades',
        ],
        skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL'],
      },
    ],
  },
  {
    id: 'henrique-energia-solar',
    company: 'Henrique Energia Solar',
    logo: '/images/experiencias/henrique-energia-solar.webp',
    roles: [
      {
        title: 'Full Stack Developer & Project Manager',
        employmentType: 'Freelance',
        period: 'mai 2026 - jul 2026',
        location: 'Glória, Bahia, Brasil',
        workMode: 'Remoto',
        description:
          'Planejamento e desenvolvimento do site institucional da Henrique Energia Solar, incluindo a organização dos conteúdos, construção da interface e publicação da aplicação. Além da implementação técnica, contribuí para a organização da presença digital da empresa e para decisões relacionadas à comunicação e divulgação dos serviços.',
        activities: [
          'Planejamento técnico e desenvolvimento do site institucional',
          'Implementação de interfaces e componentes responsivos',
          'Estruturação de conteúdos e organização da navegação',
          'Apoio à comunicação e organização das redes sociais',
          'Gestão das prioridades e acompanhamento das entregas',
          'Publicação e manutenção da aplicação',
        ],
        skills: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Git', 'Vercel'],
      },
    ],
  },
  {
    id: 'caji-solutions',
    company: 'Caji Solutions',
    logo: '/images/experiencias/caji-solutions.webp',
    roles: [
      {
        title: 'Full Stack Developer',
        employmentType: 'Temporário',
        period: 'abr 2026 - o momento',
        location: 'Avilés, Astúrias, Espanha',
        workMode: 'Remoto',
        description:
          'Desenvolvimento de plataformas SaaS voltadas à automação comercial, prospecção de clientes e atendimento com Inteligência Artificial. A engenharia dos produtos envolve aplicações frontend e backend, integração de serviços externos e implementação de recursos de IA. Também participo da avaliação e definição de novas funcionalidades, considerando requisitos de produto e possibilidades técnicas.',
        activities: [
          'Desenvolvimento de funcionalidades e interfaces com React e TypeScript',
          'Construção de componentes reutilizáveis e integração com APIs',
          'Implementação e evolução de serviços backend',
          'Integração de recursos de Inteligência Artificial aos fluxos das aplicações',
          'Desenvolvimento de funcionalidades relacionadas à automação e atendimento',
          'Participação nas decisões técnicas e definição de novas funcionalidades',
          'Testes, correções e melhorias na experiência das aplicações',
        ],
        skills: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Shadcn/UI', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Supabase'],
      },
    ],
  },
  {
    id: 'ntidi',
    company: 'NTIDI - Next Technology Innovations Digital Technology',
    logo: '/images/experiencias/ntidi.webp',
    employmentType: 'Freelance',
    location: 'Brasília, Distrito Federal, Brasil · Remoto',
    roles: [
      {
        title: 'Junior Full Stack Developer',
        period: 'abr 2026 - jun 2026',
        description:
          'Desenvolvimento de aplicações web, integrações e serviços backend para projetos de transformação digital, automação e cibersegurança. Entre os produtos desenvolvidos pela equipe estava o Queelvra, sistema de cibersegurança com componentes em Flutter, Java e Python. Minha contribuição esteve relacionada ao desenvolvimento e à integração dos serviços backend em Python, além das atividades de engenharia web e infraestrutura.',
        activities: [
          'Desenvolvimento de serviços e funcionalidades backend com Python',
          'Implementação de aplicações e APIs com Django',
          'Integração entre serviços Python e aplicações desenvolvidas com outras tecnologias',
          'Desenvolvimento de módulos administrativos e regras de negócio',
          'Configuração de ambientes Linux, Docker, Gunicorn e Nginx',
          'Participação em deploy, manutenção e processos de CI/CD',
          'Apoio à evolução técnica das soluções da empresa',
        ],
        skills: ['Python', 'Django', 'Django REST Framework', 'JavaScript', 'MySQL', 'Docker', 'Linux', 'Nginx', 'Gunicorn', 'GitHub Actions'],
      },
      {
        title: 'Junior Full Stack Developer',
        period: 'jun 2025 - dez 2025',
        description:
          'Desenvolvimento e manutenção de aplicações web com Python e Django, participando da implementação de funcionalidades backend, interfaces administrativas e integração com bancos de dados. Essa etapa consolidou minha experiência com aplicações utilizadas em projetos profissionais, incluindo implementação de regras de negócio, integração frontend/backend e publicação de sistemas.',
        activities: [
          'Desenvolvimento de APIs e funcionalidades com Python e Django',
          'Implementação de interfaces utilizando HTML, CSS, JavaScript e Bootstrap',
          'Manutenção de módulos administrativos e integração com bancos de dados',
          'Correção de problemas e melhorias nas aplicações existentes',
          'Apoio à configuração de ambientes e publicação de sistemas',
        ],
        skills: ['Python', 'Django', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'MySQL', 'Git'],
      },
      {
        title: 'Software Development Trainee',
        period: 'jul 2025 - nov 2025',
        description:
          'Início da trajetória profissional em desenvolvimento de software na NTIDI, com participação em atividades de aprendizado prático, implementação de funcionalidades e manutenção de aplicações web. O período serviu de base para o aprofundamento em Python, Django, desenvolvimento frontend e versionamento, antecedendo a progressão para Desenvolvedor Full Stack Júnior.',
        skills: ['Python', 'Django', 'JavaScript', 'HTML', 'CSS', 'Git'],
      },
    ],
  },
  {
    id: 'ifpe-monitor',
    company: 'Instituto Federal de Ciência e Tecnologia de Pernambuco (IFPE)',
    logo: '/images/experiencias/ifpe-monitor.webp',
    roles: [
      {
        title: 'Volunteer Teaching Assistant — Python & Machine Learning',
        employmentType: 'Autônomo',
        period: 'abr 2026 - jun 2026',
        location: 'Floresta, Pernambuco, Brasil',
        workMode: 'Híbrido',
        description:
          'Colaboração voluntária em uma iniciativa de formação e divulgação de conhecimentos relacionados a Python, Machine Learning e ciência de dados. Minha participação esteve concentrada na estruturação digital e na organização das atividades, incluindo o desenvolvimento do site, produção de materiais de divulgação e criação de canais de comunicação para a comunidade.',
        activities: [
          'Desenvolvimento do site de divulgação do projeto',
          'Criação e organização de conteúdos para redes sociais',
          'Configuração do servidor Discord para interação dos participantes',
          'Apoio à organização e divulgação das atividades',
          'Colaboração no planejamento e comunicação do evento',
        ],
        skills: ['Desenvolvimento Web', 'Comunicação Digital', 'Organização de Eventos', 'Gestão de Comunidades', 'Trabalho em Equipe'],
      },
    ],
  },
  {
    id: 'if-sertao',
    company: 'Instituto Federal de Educação, Ciência e Tecnologia do Sertão Pernambucano',
    logo: '/images/experiencias/if-sertao.webp',
    employmentType: 'Autônomo',
    location: 'Floresta, Pernambuco, Brasil · Híbrido',
    roles: [
      {
        title: 'Technical Lead & Full Stack Developer | Sertão Conecta',
        period: 'fev 2026 - ago 2026',
        description:
          'Liderança técnica do Sertão Conecta, Ambiente Virtual de Aprendizagem (AVA) gamificado desenvolvido no IF Sertão-PE — Campus Floresta para apoiar a oferta de cursos de extensão e atividades educacionais. Responsável pelas principais decisões de engenharia do projeto, incluindo escolha da stack, definição da arquitetura, organização dos serviços e direcionamento das implementações. Também desenvolvi funcionalidades Full Stack, com atuação concentrada especialmente no backend, infraestrutura e integração dos componentes da plataforma.',
        activities: [
          'Definição da arquitetura, tecnologias e estrutura técnica da aplicação',
          'Desenvolvimento de serviços backend, autenticação e integrações',
          'Implementação de recursos de gamificação e acompanhamento da aprendizagem',
          'Modelagem e integração de dados com PostgreSQL e Supabase',
          'Configuração de infraestrutura, containers e ambientes',
          'Organização de testes e processos de CI/CD',
          'Orientação técnica da equipe durante o desenvolvimento',
        ],
        skills: ['React', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL', 'Docker', 'Linux', 'Nginx', 'GitHub Actions', 'Playwright'],
      },
      {
        title: 'Full Stack Web Developer | Maratona Tech / Maratona Pitch',
        period: 'ago 2025 - fev 2026',
        description:
          'Desenvolvimento de uma plataforma web de inscrições, gestão de participantes, avaliações e votação para atividades da Maratona Tech, no contexto dos projetos e eventos institucionais do IF Sertão-PE. A solução permitiu reunir cadastros e processos de votação em uma única aplicação, apoiando a organização do evento e a participação do público. Trabalhei no desenvolvimento Full Stack com Python e Django, implementação de telas e funcionalidades, testes e preparação da infraestrutura, além de apoio técnico à equipe. Escala: aproximadamente 160 participantes/usuários.',
        activities: [
          'Implementação de funcionalidades de inscrição e gerenciamento de participantes',
          'Desenvolvimento de módulos de votação e avaliação',
          'Construção de interfaces e integração com o backend',
          'Implementação de regras de negócio e recursos administrativos',
          'Testes, correções e apoio à infraestrutura',
          'Orientação técnica aos integrantes da equipe',
          'Apoio à operação do sistema durante o evento',
        ],
        skills: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Docker', 'Git'],
      },
    ],
  },
  {
    id: 'va-suplementos',
    company: 'VA Suplementos',
    roles: [
      {
        title: 'Full Stack Developer',
        employmentType: 'Freelance',
        period: 'fev 2026 - ago 2026',
        location: 'Itacuruba, Pernambuco, Brasil',
        workMode: 'Remoto',
        description:
          'Desenvolvimento de um sistema de gestão comercial para a VA Suplementos, empresa do setor de suplementos alimentares, com foco na centralização e organização das operações de caixa, estoque e controle financeiro. Responsável pelo desenvolvimento Full Stack e pelas principais decisões técnicas do projeto, desde o levantamento das necessidades do estabelecimento e definição da arquitetura até a implementação das funcionalidades, configuração do ambiente e publicação da aplicação. O sistema substituiu controles descentralizados por funcionalidades integradas em uma aplicação web.',
        activities: [
          'Planejamento da solução, definição da arquitetura e escolha das tecnologias',
          'Desenvolvimento do backend com Python e Django, incluindo regras de negócio e operações de gestão',
          'Implementação de interfaces administrativas com JavaScript, HTML, CSS e Bootstrap',
          'Desenvolvimento de módulos para controle de caixa e movimentações financeiras',
          'Implementação de funcionalidades de cadastro de produtos e gestão de estoque',
          'Criação de registros comerciais e controle de contas a receber, permitindo acompanhar clientes com pagamentos pendentes',
          'Configuração do ambiente de execução com Gunicorn e Nginx',
          'Publicação da aplicação utilizando Railway',
        ],
        skills: ['Python', 'Django', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'Nginx', 'Gunicorn', 'Railway'],
      },
    ],
  },
  {
    id: 'vk-software',
    company: 'VK Software',
    logo: '/images/experiencias/vk-software.webp',
    roles: [
      {
        title: 'Founder & Full Stack Developer',
        employmentType: 'Autônomo',
        period: 'dez 2025 - o momento',
        location: 'Itacuruba, Pernambuco, Brasil',
        workMode: 'Remoto',
        description:
          'Fundador da VK Software, iniciativa dedicada à criação de aplicações web, sistemas de gestão e soluções digitais personalizadas para empresas e profissionais. Responsável pelo planejamento técnico e desenvolvimento dos projetos, desde o levantamento de requisitos e definição das tecnologias até a implementação, publicação e manutenção das soluções. O trabalho também envolve relacionamento com clientes, identificação de necessidades e organização das entregas.',
        activities: [
          'Desenvolvimento de sistemas web, aplicações e sites institucionais',
          'Planejamento de soluções e definição da arquitetura dos projetos',
          'Implementação de interfaces, APIs, regras de negócio e integrações',
          'Modelagem de dados e configuração de ambientes',
          'Implantação e manutenção de aplicações',
          'Atendimento a clientes, levantamento de requisitos e organização dos projetos',
        ],
        skills: ['Python', 'FastAPI', 'TypeScript', 'React', 'Next.js', 'Node.js', 'NestJS', 'PostgreSQL', 'Docker'],
      },
    ],
  },
  {
    id: 'freelancer',
    company: 'Freelancer',
    logo: '/images/experiencias/freelancer.webp',
    roles: [
      {
        title: 'Freelance Full Stack Developer',
        employmentType: 'Freelance',
        period: 'jun 2025 - o momento',
        workMode: 'Remoto',
        description:
          'Desenvolvimento independente de aplicações web, sistemas comerciais e soluções digitais para empresas e projetos de diferentes segmentos. Os trabalhos abrangem o ciclo de desenvolvimento de software, desde o entendimento das necessidades do cliente até a definição da arquitetura, implementação, testes e publicação. Entre as entregas estão sistemas de gestão comercial, controle administrativo, sites institucionais e soluções para digitalização de processos.',
        activities: [
          'Desenvolvimento de aplicações web e sistemas personalizados',
          'Implementação de funcionalidades frontend e backend',
          'Construção de APIs, integrações e regras de negócio',
          'Modelagem de dados e organização da arquitetura das aplicações',
          'Configuração de infraestrutura, deploy e manutenção de sistemas',
          'Comunicação direta com clientes e acompanhamento das entregas',
        ],
        skills: ['Python', 'FastAPI', 'TypeScript', 'React', 'Next.js', 'NestJS', 'PostgreSQL', 'Docker'],
      },
    ],
  },
  {
    id: 'gre-estagio',
    company: 'Secretaria de Educação do Estado de Pernambuco',
    logo: '/images/experiencias/gre-estagio.webp',
    roles: [
      {
        title: 'Full Stack Web Development & IT Support Intern',
        employmentType: 'Estágio',
        period: 'mai 2025 - ago 2025',
        location: 'Floresta, Pernambuco, Brasil',
        workMode: 'Presencial',
        description:
          'Desenvolvimento e implantação de um sistema de gestão para a Gerência Regional de Educação (GRE) Floresta, abrangendo processos administrativos, hospedagens e demandas relacionadas à rede regional de ensino. A aplicação foi utilizada por mais de 200 usuários, em uma estrutura institucional responsável por mais de 118 escolas. Minha contribuição envolveu desenvolvimento de telas e funcionalidades com Python e Django, testes, organização de demandas e treinamento dos servidores responsáveis pela utilização do sistema.',
        activities: [
          'Desenvolvimento de funcionalidades e módulos administrativos',
          'Implementação de telas e integração com o backend',
          'Apoio à digitalização de processos de gestão e hospedagens',
          'Testes, correções e melhorias da aplicação',
          'Treinamento de usuários e suporte técnico',
          'Organização de demandas e acompanhamento das necessidades da instituição',
        ],
        skills: ['Python', 'Django', 'JavaScript', 'HTML', 'CSS', 'Git', 'GLPI'],
      },
    ],
  },
  {
    id: 'cnpq',
    company: 'CNPq',
    logo: '/images/experiencias/cnpq.webp',
    roles: [
      {
        title: 'CNPq Research Fellow & Web Developer',
        employmentType: 'Temporário',
        period: 'set 2024 - set 2025',
        location: 'Floresta, Pernambuco, Brasil',
        workMode: 'Híbrido',
        description:
          'Pesquisa financiada pelo CNPq, desenvolvida no IF Sertão-PE, voltada à documentação, valorização e divulgação dos saberes tradicionais dos povos indígenas da região de Itaparica. O trabalho envolveu atividades de pesquisa, organização de dados, sistematização de informações e apoio à produção de materiais científicos e educacionais. Como contribuição técnica, desenvolvi o site institucional do projeto, organizando a apresentação dos conteúdos e realizando sua publicação na Vercel.',
        activities: [
          'Participação na pesquisa e sistematização de informações',
          'Organização de materiais acadêmicos e educacionais',
          'Desenvolvimento do site institucional com HTML, CSS e JavaScript',
          'Estruturação e publicação de conteúdos digitais',
          'Configuração e deploy da aplicação na Vercel',
          'Apoio à divulgação científica dos resultados',
        ],
        skills: ['HTML', 'CSS', 'JavaScript', 'Git', 'GitHub', 'Vercel'],
      },
    ],
  },
  {
    id: 'jl-imports',
    company: 'JL Imports',
    roles: [
      {
        title: 'Mobile Sales Consultant & Store Operations Lead',
        employmentType: 'Temporário',
        period: 'ago 2024 - dez 2024',
        location: 'Itacuruba, Pernambuco, Brasil',
        workMode: 'Presencial',
        description:
          'Vendas consultivas e suporte à operação comercial de uma loja especializada em smartphones, acessórios e produtos eletrônicos. Além do atendimento aos clientes, fui responsável por atividades relacionadas à organização da loja, controle de mercadorias, pagamentos e divulgação comercial.',
        activities: [
          'Atendimento ao público e vendas de smartphones e acessórios',
          'Orientação aos clientes na escolha dos produtos',
          'Organização de mercadorias, exposição e estoque',
          'Apoio ao controle de caixa e pagamento de contas',
          'Execução de atividades administrativas e operacionais',
          'Criação de conteúdos e ações de marketing para divulgação da loja',
        ],
        skills: ['Vendas Consultivas', 'Atendimento ao Cliente', 'Gestão de Estoque', 'Organização Financeira', 'Marketing Digital', 'Comunicação'],
      },
    ],
  },
  {
    id: 'cartorio-itacuruba',
    company: 'Cartório Único de Itacuruba',
    roles: [
      {
        title: 'Civil Registry Administrative Assistant',
        employmentType: 'Meio período',
        period: 'jul 2023 - fev 2024',
        location: 'Itacuruba, Pernambuco, Brasil',
        workMode: 'Presencial',
        description:
          'Suporte às atividades administrativas do Cartório Único de Itacuruba, incluindo atendimento ao público, organização documental e apoio às rotinas de registro civil. Além das responsabilidades administrativas, contribuí com a organização do ambiente e desenvolvi a proposta visual da fachada do cartório.',
        activities: [
          'Atendimento ao público e orientação sobre serviços cartorários',
          'Conferência, organização e arquivamento de documentos',
          'Apoio às rotinas administrativas e procedimentos de registro civil',
          'Utilização de sistemas internos para consulta e organização de informações',
          'Criação da proposta visual da fachada do estabelecimento',
          'Colaboração em melhorias na organização do ambiente de trabalho',
        ],
        skills: ['Gestão Documental', 'Rotinas Administrativas', 'Atendimento ao Público', 'Organização', 'Design Visual'],
      },
    ],
  },
];
