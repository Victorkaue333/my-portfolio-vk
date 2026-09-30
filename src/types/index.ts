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

/** Estágio do projeto — vira o selo ao lado da categoria no detalhe. */
export type ProjectStatus = 'production' | 'delivered' | 'mvp' | 'development';

/** Ícone de uma camada da arquitetura — a página resolve para um ícone Feather. */
export type ArchitectureIcon =
  | 'client' | 'device' | 'server' | 'api' | 'queue' | 'ai' | 'database' | 'storage' | 'cloud' | 'integration';

export interface ArchitectureLayer {
  icon: ArchitectureIcon;
  /** Papel da camada. Ex.: "Front-end", "Worker de IA". */
  label: string;
  /** Forma concreta. Ex.: "Django Templates + HTMX". */
  detail: string;
}

/** Funcionalidades agrupadas por tema. Grupo sem título = lista simples. */
export interface FeatureGroup {
  title?: string;
  items: string[];
}

/** Decisão técnica em formato de ADR curto: o que foi escolhido e por quê. */
export interface ProjectDecision {
  /** Assunto. Ex.: "Banco de dados". */
  topic: string;
  /** A escolha. Ex.: "PostgreSQL". */
  choice: string;
  /** O motivo/trade-off — não elogio à ferramenta. */
  why: string;
}

/** Linha da tabela de stack. O ícone sai de TECH_ICONS pelo `name`. */
export interface StackItem {
  name: string;
  /** Função no projeto. Ex.: "ORM, autenticação e admin". */
  role: string;
}

/**
 * Estudo de caso do detalhe (/projetos/:id). Segue a ordem do README dos
 * projetos: visão geral → problema/solução/resultado → funcionalidades →
 * arquitetura → decisões → stack → próximos passos. Opcionais somem da página
 * (e do sumário) quando vazios. Só fato verificável — ver ADR-0010.
 */
export interface ProjectCaseStudy {
  /** 1–2 parágrafos: o que é, para quem e por que existe. O 1º é o destaque. */
  overview: string[];
  /** Quem usa e o que vai fazer lá. */
  audiences?: { who: string; goal: string }[];
  challenge: string;
  solution: string;
  /** O que foi entregue/mudou. Número só em `Project.metrics`. */
  result: string;
  features: FeatureGroup[];
  architecture: {
    layers: ArchitectureLayer[];
    highlights?: string[];
  };
  decisions: ProjectDecision[];
  stack: StackItem[];
  roadmap?: string[];
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
  technologies: string[];
  category: 'pessoal' | 'real';
  status?: ProjectStatus;
  caseStudy?: ProjectCaseStudy;
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
  /** Destaque fixo na Home (usar em 2–3 projetos). */
  featured?: boolean;
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
  /** Página pública do emissor que valida o certificado. */
  verifyUrl?: string;
  /** Código de validação impresso no certificado. */
  credentialId?: string;
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
