import type { Language } from '../hooks/useLanguage';

export interface Testimonial {
  id: string;
  name: string;
  role: Record<Language, string>;
  quote: Record<Language, string>;
  /** Iniciais para o avatar quando não há foto. */
  initials: string;
}

/**
 * Depoimentos exibidos na página de Serviços.
 * Conteúdo placeholder — substituir por feedback real de clientes.
 */
export const testimonials: Testimonial[] = [
  {
    id: 'ye-vida',
    name: 'Equipe Ye Vida',
    role: {
      'pt-BR': 'Startup de saúde',
      'pt-PT': 'Startup de saúde',
      en: 'Health startup',
      es: 'Health startup',
    },
    quote: {
      'pt-BR': 'Entrega consistente e comunicação clara em cada etapa. O backend ficou sólido e fácil de evoluir.',
      'pt-PT': 'Entrega consistente e comunicação clara em cada etapa. O backend ficou sólido e fácil de evoluir.',
      en: 'Consistent delivery and clear communication at every step. The backend turned out solid and easy to evolve.',
      es: 'Consistent delivery and clear communication at every step. The backend turned out solid and easy to evolve.',
    },
    initials: 'YV',
  },
  {
    id: 'mega',
    name: 'Mega Eletrônicos',
    role: {
      'pt-BR': 'E-commerce',
      'pt-PT': 'E-commerce',
      en: 'E-commerce',
      es: 'E-commerce',
    },
    quote: {
      'pt-BR': 'Resolveu um problema de integração que travava nosso fluxo há meses. Rápido, direto e sem enrolação.',
      'pt-PT': 'Resolveu um problema de integração que travava nosso fluxo há meses. Rápido, direto e sem enrolação.',
      en: 'Solved an integration problem that had been blocking our flow for months. Fast, direct and no fuss.',
      es: 'Solved an integration problem that had been blocking our flow for months. Fast, direct and no fuss.',
    },
    initials: 'ME',
  },
  {
    id: 'freela',
    name: 'Cliente Freelance',
    role: {
      'pt-BR': 'Projeto sob demanda',
      'pt-PT': 'Projeto sob demanda',
      en: 'On-demand project',
      es: 'On-demand project',
    },
    quote: {
      'pt-BR': 'Transformou uma ideia vaga em um produto no ar. Cumpriu o prazo e ainda deu suporte depois do deploy.',
      'pt-PT': 'Transformou uma ideia vaga em um produto no ar. Cumpriu o prazo e ainda deu suporte depois do deploy.',
      en: 'Turned a vague idea into a live product. Met the deadline and still supported it after deploy.',
      es: 'Turned a vague idea into a live product. Met the deadline and still supported it after deploy.',
    },
    initials: 'CF',
  },
];
