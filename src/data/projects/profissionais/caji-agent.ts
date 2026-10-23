import type { Project } from '../../../types';

export const cajiAgent: Project = {
  id: 'caji-agent',
  slug: 'caji-agent',
  title: 'Caji Agent',
  shortDescription: 'Agente de IA que atende e vende pelo WhatsApp.',
  detailedDescription:
    'SaaS da Caji Solutions que coloca agentes de IA para atender, qualificar, agendar e cobrar clientes pelo WhatsApp.',
  description:
    'SaaS da Caji Solutions que coloca agentes de IA para atender, qualificar, agendar e cobrar clientes pelo WhatsApp.',
  image: '/images/fotos-projetos-reais/caji-agent/cover.webp',
  online: 'https://www.cajiagent.com/',
  detailPath: '/projetos/caji-agent',
  technologies: ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'IA'],
  stack: ['React', 'TypeScript', 'Node.js', 'FastAPI', 'PostgreSQL'],
  category: 'real',
  status: 'production',
  privateCode: true,
  teamType: 'team',
  experienceId: 'caji-solutions',
  role: {
    title: 'Desenvolvedor full stack · time Caji Solutions',
    mine: [
      'Onboarding: endereço por CEP ou texto livre, com camada de provedores no back-end',
      'Moeda sugerida pela localização e catálogo de serviços no onboarding',
      'Idioma do agente separado do idioma do painel',
      'Conexão do WhatsApp por código numérico, unificada ao fluxo de QR Code',
      'Mudança agendada de plano de assinatura',
      'Medição de uso e cotas, com tela de consumo no painel administrativo',
      'Correções no WhatsApp: leitura de imagem e PDF, mensagens com agente pausado ou sessão reconectando',
      'Pipeline de CI no GitHub Actions e verificação pós-deploy da Vercel',
      'Testes automatizados das funcionalidades que entreguei',
    ],
    team: ['Arquitetura, motor de IA e a maior parte dos módulos: time da Caji Solutions'],
  },
  caseStudy: {
    overview: [
      'SaaS da Caji Solutions que coloca um agente de IA no WhatsApp da empresa: responde, qualifica o lead, agenda no Google Calendar, envia o link de pagamento e faz o follow-up — 24 horas por dia.',
      'Faço parte do time de desenvolvimento do produto, que está em produção, atuando em onboarding, internacionalização, WhatsApp, assinaturas e medição de uso.',
    ],
    audiences: [
      { who: 'Pequenas e médias empresas', goal: 'Atendem, agendam e vendem pelo WhatsApp sem aumentar a equipe.' },
      { who: 'Operadores', goal: 'Assumem a conversa quando o cliente precisa falar com uma pessoa.' },
      { who: 'Agências', goal: 'Gerenciam o atendimento dos leads que geram para os clientes.' },
    ],
    challenge:
      'Lead que chega fora do horário, ou espera resposta, esfria. Pequenas empresas perdem venda por atendimento lento, follow-up esquecido, agenda feita à mão e cobrança espalhada em vários canais.',
    solution:
      'Três serviços com papéis claros: painel em React; back-end em Node.js que concentra mensageria, tempo real e todo efeito externo (enviar, agendar, cobrar); e um motor de IA em Python com agentes CrewAI e busca semântica sobre o conteúdo de cada empresa.',
    result:
      'Produto em produção em cajiagent.com: atendimento no WhatsApp com áudio transcrito, imagens e PDFs lidos pelo agente, agenda integrada, links de pagamento, CRM em kanban e painel em 4 idiomas.',
    features: [
      {
        title: 'Atendimento',
        items: [
          'Conversas no WhatsApp respondidas pelo agente',
          'Áudios transcritos antes da resposta',
          'Imagens e PDFs convertidos em texto para o agente',
          'Operador pode assumir a conversa',
        ],
      },
      {
        title: 'Vendas',
        items: [
          'Qualificação e follow-up de leads',
          'CRM em kanban',
          'Agendamento no Google Calendar',
          'Links de pagamento (Stripe e Mercado Pago/Pix)',
        ],
      },
      {
        title: 'Conhecimento e painel',
        items: [
          'Base de conhecimento por empresa (RAG)',
          'Análise noturna das conversas',
          'Assistente de IA dentro do painel',
          'Painel em 4 idiomas',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'client', label: 'Painel', detail: 'React + TypeScript na Vercel' },
        { icon: 'server', label: 'Back-end', detail: 'Node.js, Express e Socket.io' },
        { icon: 'ai', label: 'Motor de IA', detail: 'FastAPI + agentes CrewAI' },
        { icon: 'database', label: 'Banco', detail: 'PostgreSQL + pgvector' },
        { icon: 'integration', label: 'Canais', detail: 'WhatsApp, agenda e pagamentos' },
      ],
      highlights: [
        'Só o back-end executa efeitos externos — enviar mensagem, criar evento, cobrar; o motor de IA decide e devolve ações.',
        'Painel e back-end conversam por REST e Socket.io, com atualização em tempo real.',
        'Fila de envios e controle de sessão no banco, projetados para o back-end escalar horizontalmente.',
        'Cada cliente usa a própria chave do modelo de linguagem (Gemini).',
      ],
    },
    decisions: [
      {
        topic: 'Serviços',
        choice: 'Node para mensageria, Python para IA',
        why: 'Mensageria e tempo real são maduros em Node; orquestração multiagente é madura em Python.',
      },
      {
        topic: 'Efeitos externos',
        choice: 'Centralizados no back-end',
        why: 'Um só lugar envia, agenda e cobra — o motor de IA decide, mas não age sozinho.',
      },
      {
        topic: 'Busca semântica',
        choice: 'pgvector no próprio PostgreSQL',
        why: 'O conhecimento de cada empresa fica no mesmo banco, sem serviço vetorial à parte.',
      },
    ],
    stack: [
      { name: 'React', role: 'Painel do cliente' },
      { name: 'TypeScript', role: 'Tipagem do front-end' },
      { name: 'Node.js', role: 'Back-end, mensageria e integrações (Express)' },
      { name: 'Socket.io', role: 'Tempo real entre painel e back-end' },
      { name: 'Python', role: 'Motor de IA' },
      { name: 'FastAPI', role: 'API do motor de IA' },
      { name: 'CrewAI', role: 'Orquestração dos agentes' },
      { name: 'PostgreSQL', role: 'Banco e busca vetorial (pgvector)' },
      { name: 'Prisma', role: 'ORM do back-end' },
      { name: 'Vercel', role: 'Deploy do painel' },
    ],
    quality: [
      'CI no GitHub Actions para back-end, painéis e motor de IA',
      'Testes automatizados nos três serviços (node:test, Vitest e pytest) e E2E com Playwright',
      'Auditoria Lighthouse agendada no CI',
    ],
  },
  screenshots: [
    '/images/fotos-projetos-reais/caji-agent/cover.webp',
    '/images/fotos-projetos-reais/caji-agent/1.webp',
    '/images/fotos-projetos-reais/caji-agent/2.webp',
    '/images/fotos-projetos-reais/caji-agent/3.webp',
  ],
};
