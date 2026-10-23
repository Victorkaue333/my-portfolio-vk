import type { Project } from '../../../types';

export const vksoftware: Project = {
  id: 'vksoftware',
  slug: 'vksoftware',
  title: 'VK Software',
  shortDescription: 'Site institucional da VK Software, focado em contato comercial.',
  detailedDescription:
    'Site institucional da VK Software: serviços, processo de trabalho e portfólio, com contato direto pelo WhatsApp.',
  description:
    'Site institucional da VK Software: serviços, processo de trabalho e portfólio, com contato direto pelo WhatsApp.',
  image: '/images/fotos-projetos-reais/vksoftware/1.webp',
  online: 'https://vksoftware.netlify.app/',
  detailPath: '/projetos/vksoftware',
  technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
  stack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
  category: 'real',
  status: 'production',
  privateCode: true,
  experienceId: 'vk-software',
  caseStudy: {
    overview: [
      'Site institucional da VK Software, a empresa pela qual desenvolvo sites e sistemas para negócios: apresenta os serviços, o processo de trabalho e os projetos entregues, e leva o visitante direto a uma conversa no WhatsApp.',
      'Três ofertas — landing pages, sites institucionais e sistemas web — e um processo em etapas claras, da descoberta ao suporte.',
    ],
    audiences: [
      { who: 'Donos de negócio', goal: 'Entendem o que a VK entrega e pedem orçamento em um clique.' },
      { who: 'Quem já conhece a VK', goal: 'Confere os projetos entregues e o jeito de trabalhar.' },
    ],
    challenge:
      'Uma empresa nova precisa passar confiança antes de ter um portfólio grande: explicar o que entrega, mostrar como trabalha e tornar o primeiro contato fácil — sem virar um site pesado.',
    solution:
      'Páginas estáticas em tema escuro, com navbar flutuante que marca a seção ativa, processo de trabalho em etapas (Descoberta → Proposta → Sprints → Deploy → Suporte) e chamadas para o WhatsApp nos pontos de decisão.',
    result:
      'Site no ar na Netlify, apresentando as três ofertas da empresa e reunindo os projetos de clientes numa página de portfólio.',
    features: [
      {
        title: 'Apresentação',
        items: [
          'Serviços: landing pages, sites institucionais e sistemas web',
          'Processo em 6 etapas, da descoberta ao suporte',
          'Missão, visão e princípios',
          'Página de portfólio com projetos de clientes',
        ],
      },
      {
        title: 'Navegação e contato',
        items: [
          'Navbar flutuante com destaque da seção ativa',
          'Rolagem suave entre seções',
          'Botão flutuante e CTAs para o WhatsApp',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'client', label: 'Páginas', detail: 'HTML5: início e portfólio' },
        { icon: 'storage', label: 'Estilos', detail: 'CSS modular: base, componentes, seções' },
        { icon: 'cloud', label: 'Hospedagem', detail: 'Netlify (CDN + HTTPS)' },
        { icon: 'integration', label: 'Contato', detail: 'Deep-link do WhatsApp' },
      ],
      highlights: [
        'Sem backend: páginas estáticas servidas pela CDN da Netlify.',
        'CSS separado em base, componentes, seções e responsivo.',
        'Os CTAs abrem a conversa no WhatsApp, sem formulário intermediário.',
      ],
    },
    decisions: [
      {
        topic: 'Tecnologia',
        choice: 'HTML, CSS e JavaScript puros',
        why: 'Site de apresentação não precisa de build nem framework: carrega rápido e qualquer ajuste é direto no arquivo.',
      },
      {
        topic: 'Hospedagem',
        choice: 'Netlify',
        why: 'Publicação a partir do repositório, com HTTPS e CDN sem custo.',
      },
      {
        topic: 'Conversão',
        choice: 'WhatsApp como canal principal',
        why: 'É onde o cliente já conversa; o CTA abre a conversa sem etapa no meio.',
      },
    ],
    stack: [
      { name: 'HTML5', role: 'Estrutura das páginas' },
      { name: 'CSS3', role: 'Estilos modulares e tema escuro' },
      { name: 'JavaScript', role: 'Seção ativa na navbar e rolagem suave' },
      { name: 'Bootstrap', role: 'Grid e componentes (5)' },
      { name: 'Lucide', role: 'Ícones' },
      { name: 'Netlify', role: 'Hospedagem' },
    ],
  },
  screenshots: [
    '/images/fotos-projetos-reais/vksoftware/1.webp',
    '/images/fotos-projetos-reais/vksoftware/2.webp',
    '/images/fotos-projetos-reais/vksoftware/3.webp',
    '/images/fotos-projetos-reais/vksoftware/4.webp',
    '/images/fotos-projetos-reais/vksoftware/5.webp',
    '/images/fotos-projetos-reais/vksoftware/6.webp',
    '/images/fotos-projetos-reais/vksoftware/7.webp',
    '/images/fotos-projetos-reais/vksoftware/8.webp',
    '/images/fotos-projetos-reais/vksoftware/9.webp',
    '/images/fotos-projetos-reais/vksoftware/10.webp',
    '/images/fotos-projetos-reais/vksoftware/11.webp',
  ],
};
