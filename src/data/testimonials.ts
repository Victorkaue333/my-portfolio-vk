import type { Language } from '../hooks/useLanguage';

export interface Testimonial {
  id: string;
  /** Nome real de quem deu o depoimento. */
  name: string;
  /** Cargo + empresa. Ex.: "Gerente de Projetos na NTIDI". */
  role: Record<Language, string>;
  quote: Record<Language, string>;
  /** Iniciais para o avatar quando não há foto. */
  initials: string;
  /** Link público que comprove o depoimento (recomendação no LinkedIn, perfil). */
  url?: string;
}

/**
 * Depoimentos exibidos na página de Serviços.
 *
 * Só depoimentos REAIS, com autorização de quem escreveu. Lista vazia = a seção
 * some da página (ver Servicos.tsx). Os três placeholders anteriores foram
 * removidos: depoimento inventado derruba a credibilidade do portfólio.
 *
 * Exemplo:
 * {
 *   id: 'nome-sobrenome',
 *   name: 'Nome Sobrenome',
 *   role: { pt: 'Gerente de Projetos na Empresa', en: 'Project Manager at Company' },
 *   quote: { pt: '...', en: '...' },
 *   initials: 'NS',
 *   url: 'https://www.linkedin.com/in/victorkaue/details/recommendations/',
 * },
 */
export const testimonials: Testimonial[] = [];
