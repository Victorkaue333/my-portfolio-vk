import type { Project } from '../../../types';

export const devJobAutomation: Project = {
  id: 'dev-job-automation',
  slug: 'dev-job-automation',
  title: 'Dev Job Automation',
  shortDescription: 'Bot que coleta vagas em 6 sites e escreve cartas com IA.',
  detailedDescription:
    'Automação em Python que busca vagas de desenvolvedor, filtra pelo perfil e gera cartas de apresentação com IA.',
  description:
    'Automação em Python que busca vagas de desenvolvedor em seis sites, filtra pelo perfil e gera cartas de apresentação com IA.',
  image: '/images/fotos-projetos-pessoais/dev-job-automation/cover.webp',
  github: 'https://github.com/Victorkaue333/Dev-Job-Automation',
  detailPath: '/projetos/dev-job-automation',
  technologies: ['Python', 'Selenium', 'Gemini', 'Flask'],
  stack: ['Python', 'Selenium', 'Flask'],
  category: 'pessoal',
  teamSize: 1,
  caseStudy: {
    overview: [
      'Automação pessoal em Python para a minha própria busca de emprego: coleta vagas de desenvolvedor em seis sites, filtra pelo meu perfil, escreve a carta de apresentação com o Gemini e registra tudo num painel.',
    ],
    challenge:
      'Procurar vaga em seis sites todo dia é repetitivo: as mesmas buscas, as mesmas vagas que não servem e a mesma carta reescrita à mão.',
    solution:
      'Um bot Selenium por site, um filtro por palavras-chave e um gerador de mensagem com o Gemini — com texto padrão se a API falhar. Cada vaga aprovada vai para um CSV, e um painel Flask mostra o que foi coletado.',
    result:
      'Busca nos seis sites com um comando, vagas aprovadas registradas em CSV e acompanhadas num painel web. No LinkedIn, o bot também aciona a candidatura simplificada.',
    features: [
      {
        title: 'Coleta',
        items: [
          'LinkedIn, Indeed, Gupy, Catho, Vagas.com e InfoJobs',
          'Navegador real controlado pelo Selenium',
          'Login no LinkedIn e candidatura simplificada',
        ],
      },
      {
        title: 'Filtro e IA',
        items: [
          'Descarte por palavras de exclusão',
          'Aprovação só com Python, Django e Full Stack na vaga',
          'Carta de apresentação com Gemini, com texto padrão se a API falhar',
        ],
      },
      {
        title: 'Acompanhamento',
        items: [
          'Vagas registradas em CSV',
          'Painel Flask com totais e lista de vagas',
          'Scripts de apoio: currículo em PDF para texto e teste de seletores',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'server', label: 'CLI', detail: 'main.py com argparse' },
        { icon: 'integration', label: 'Coleta', detail: '6 bots Selenium' },
        { icon: 'ai', label: 'IA', detail: 'Gemini 2.5 Flash' },
        { icon: 'storage', label: 'Registro', detail: 'CSV com pandas' },
        { icon: 'client', label: 'Painel', detail: 'Flask + Jinja' },
      ],
    },
    decisions: [
      {
        topic: 'Coleta',
        choice: 'Selenium com navegador real',
        why: 'Os sites de vaga dependem de JavaScript e login; um navegador de verdade enxerga o mesmo que eu.',
      },
      {
        topic: 'IA',
        choice: 'Texto padrão se a API falhar',
        why: 'Uma falha do Gemini não derruba a execução inteira.',
      },
      {
        topic: 'Armazenamento',
        choice: 'CSV',
        why: 'Volume pequeno e pessoal; abre no Excel, sem banco para manter.',
      },
    ],
    stack: [
      { name: 'Python', role: 'Linguagem (3.13)' },
      { name: 'Selenium', role: 'Automação do navegador (4.41)' },
      { name: 'Gemini', role: 'Cartas de apresentação (google-genai)' },
      { name: 'Flask', role: 'Painel web (3.1)' },
      { name: 'pandas', role: 'Registro das vagas em CSV' },
    ],
    roadmap: [
      'Execução agendada estável (08h e 14h)',
      'Enviar a carta gerada junto com a candidatura',
      'Notificações por e-mail ou Telegram',
      'Testes automatizados',
    ],
  },
};
