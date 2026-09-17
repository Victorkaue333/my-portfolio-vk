/** Número verificável de um projeto. Ex.: { value: '40%', label: 'menos tempo de resposta' }. */
export interface ProjectMetric {
  value: string;
  label: string;
}

/** O que foi meu e o que foi da equipe — recrutador quer separar os dois. */
export interface ProjectRole {
  /** Ex.: "Desenvolvedor Full Stack (único dev)". */
  title: string;
  /** O que eu fiz. */
  mine: string[];
  /** O que ficou com outras pessoas (design, PO, infra...). */
  team?: string[];
}

export interface Project {
  id: string;
  slug?: string;
  title: string;
  shortDescription?: string;
  detailedDescription?: string;
  description: string;
  image: string;
  github?: string;
  online?: string;
  detailPath: string;
  stack?: string[];
  features?: string[];
  technologies: string[];
  category: 'pessoal' | 'real';
  summary?: {
    problema: string;
    solucao: string;
    stack: string;
  };
  detailed_info?: {
    desafio: string;
    solucao: string;
    impacto: string;
    arquitetura: {
      frontend: string;
      api: string;
      banco: string;
    };
    decisoes: {
      autenticacao: string;
      backend: string;
      deploy: string;
      banco: string;
    };
    tech_v2: {
      name: string;
      icon: string;
      color?: string;
    }[];
  };
  screenshots?: string[];
  /**
   * Campos de estudo de caso — todos opcionais; o bloco correspondente só
   * aparece quando o dado existe. Preencher só com números reais.
   */
  /** 2–3 métricas de impacto. */
  metrics?: ProjectMetric[];
  role?: ProjectRole;
  /** Pessoas no time, contando comigo. 1 = projeto solo. */
  teamSize?: number;
  /** Ex.: "3 meses" ou "ago 2025 – fev 2026". */
  duration?: string;
}

/** Um cargo (posição) — modelo estilo LinkedIn. */
export interface ExperienceRole {
  title: string;
  /** Ex.: "jun 2026 - o momento" */
  period: string;
  /** Ex.: "2 meses", "1 ano 2 meses" */
  duration?: string;
  /** "Tempo integral" | "Freelance" | "Autônomo" | "Estágio" | "Temporário" — usado em grupos de 1 cargo. */
  employmentType?: string;
  /** Cidade/estado — usado em grupos de 1 cargo. */
  location?: string;
  /** "Remoto" | "Híbrido" | "Presencial" */
  workMode?: string;
  description?: string;
  activities?: string[];
  skills?: string[];
}

/** Empresa agrupando um ou mais cargos (estilo LinkedIn). */
export interface ExperienceGroup {
  id: string;
  company: string;
  /** Caminho do logo em /images/... — sem logo cai no monograma. */
  logo?: string;
  /** Meta a nível de empresa (exibido quando há vários cargos). */
  employmentType?: string;
  totalDuration?: string;
  location?: string;
  roles: ExperienceRole[];
}

export interface Education {
  id: string;
  institution: string;
  course: string;
  period: string;
  icon: string;
}

export interface ExpertiseCategory {
  title: string;
  items: ExpertiseItem[];
}

export interface ExpertiseItem {
  /** Nome da tecnologia — o ícone é resolvido por nome em TechIcon (TECH_ICONS). */
  name: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  category: string;
  image?: string;
  pdf?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  /** Chave do ícone react-icons mapeada nos consumidores (ex.: Footer). */
  icon: string;
  detail: string;
}

export interface ContactFormData {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  images: { src: string; alt: string }[];
}

export interface KpiItem {
  value: string;
  label: string;
}

export interface ResultItem {
  value: string;
  label: string;
}
