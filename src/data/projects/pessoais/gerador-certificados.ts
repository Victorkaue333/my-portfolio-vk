import type { Project } from '../../../types';

export const geradorCertificados: Project = {
  id: 'gerador-certificados',
  slug: 'gerador-certificados',
  title: 'Gerador de Certificados',
  shortDescription: 'Automação que emite certificados em lote a partir do Excel.',
  detailedDescription:
    'Automação em Python que gera certificados em lote a partir de uma planilha Excel e de um modelo PPTX, com exportação para PDF.',
  description:
    'Automação em Python que gera certificados em lote a partir de uma planilha Excel e de um modelo PPTX, com exportação para PDF.',
  image: '/images/fotos-projetos-pessoais/gerador-certificados/cover.webp',
  detailPath: '/projetos/gerador-certificados',
  technologies: ['Python', 'pandas', 'LibreOffice', 'Automação'],
  stack: ['Python', 'pandas', 'LibreOffice'],
  category: 'pessoal',
  teamSize: 2,
  role: {
    title: 'Desenvolvedor · em dupla',
    mine: [
      'Leitura e validação da planilha',
      'Substituição dos campos direto no XML do PPTX',
      'Conversão para PDF, logs e métricas de tempo',
    ],
    team: ['Campo de perfil e ajustes finais do script: Giselle Novaes'],
  },
  metrics: [
    { value: '429', label: 'certificados numa execução, sem falhas' },
    { value: '1,5 s', label: 'por certificado, já em PDF' },
    { value: '0,7 s', label: 'para 53 certificados só em PPTX' },
  ],
  caseStudy: {
    overview: [
      'Automação em Python que emite certificados em lote para um programa de extensão em Educação Escolar Quilombola do IF Sertão-PE: lê a planilha de participantes, preenche o modelo do PowerPoint e exporta cada certificado em PDF.',
      'Feito em dupla com a Giselle Novaes.',
    ],
    challenge:
      'Emitir centenas de certificados com nome e CPF corretos, sem preencher um por um e sem perder a formatação do modelo aprovado pela instituição.',
    solution:
      'O script abre o PPTX como ZIP e troca {{NOME}}, {{CPF}} e {{PERFIL}} direto no XML com lxml — o negrito do modelo fica intacto. Antes de gerar, valida a planilha (colunas, CPF com 11 dígitos, duplicados); depois converte cada arquivo para PDF com o LibreOffice em modo headless.',
    result:
      'Os certificados do programa saíram numa única execução, sem nenhuma falha, com log detalhado, relatório por pessoa e reprocessamento só do que falhasse.',
    features: [
      {
        title: 'Entrada',
        items: [
          'Planilha Excel com escolha automática da aba',
          'Coluna de nome reconhecida por alternativas',
          'Validação de colunas, CPF e duplicados',
          'Coluna de perfil opcional',
        ],
      },
      {
        title: 'Geração',
        items: [
          'Um PPTX por pessoa, com nome de arquivo seguro',
          'Negrito do modelo preservado',
          'PDF opcional via LibreOffice',
        ],
      },
      {
        title: 'Controle',
        items: [
          'Log no console e em arquivo',
          'Tempo por certificado, total e médio',
          'Relatório CSV e reprocessamento só das falhas',
        ],
      },
    ],
    architecture: {
      layers: [
        { icon: 'storage', label: 'Entrada', detail: 'Planilha .xlsx lida com pandas' },
        { icon: 'server', label: 'Script', detail: 'Python + lxml no XML do PPTX' },
        { icon: 'integration', label: 'Conversão', detail: 'LibreOffice headless' },
        { icon: 'storage', label: 'Saída', detail: 'PPTX, PDF, logs e relatório' },
      ],
      highlights: [
        'Sem python-pptx: o PPTX é tratado como ZIP, e só os nós de texto com os campos mudam.',
        'Quase todo o tempo de execução está na conversão para PDF; só o PPTX sai em frações de segundo.',
      ],
    },
    decisions: [
      {
        topic: 'Edição do PPTX',
        choice: 'XML direto com lxml',
        why: 'Trocar só o texto do trecho mantém a formatação do modelo — o negrito vem de graça.',
      },
      {
        topic: 'PDF',
        choice: 'LibreOffice headless',
        why: 'Converte com fidelidade sem depender do PowerPoint instalado.',
      },
      {
        topic: 'Dados',
        choice: 'Validar antes de gerar',
        why: 'CPF inválido ou pessoa duplicada é barrado antes de virar certificado errado.',
      },
      {
        topic: 'Falhas',
        choice: 'Relatório + --retry-failed',
        why: 'Numa leva de centenas, reprocessa só quem falhou.',
      },
    ],
    stack: [
      { name: 'Python', role: 'Linguagem (3.10+)' },
      { name: 'pandas', role: 'Leitura e validação da planilha' },
      { name: 'openpyxl', role: 'Leitura de arquivos .xlsx' },
      { name: 'lxml', role: 'Edição do XML do PPTX' },
      { name: 'LibreOffice', role: 'Conversão para PDF' },
    ],
  },
};
