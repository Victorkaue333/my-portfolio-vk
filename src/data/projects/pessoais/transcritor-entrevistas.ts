import type { Project } from '../../../types';

export const transcritorEntrevistas: Project = {
  id: 'transcritor-de-entrevistas',
  slug: 'transcritor-de-entrevistas',
  title: 'Transcritor de Entrevistas',
  shortDescription: 'Transcrição de entrevistas com IA e player sincronizado.',
  detailedDescription:
    'Ferramenta para acelerar análise de entrevistas, automatizando transcrição e organização de conteúdo textual.',
  description:
    'Aplicativo desenvolvido para transcrever entrevistas de forma automática, facilitando a análise e organização dos dados coletados.',
  image: '/images/fotos-projetos-pessoais/transcritor-de-entrevistas/Transcritor_de_Entrevistas.webp',
  github: 'https://github.com/Victorkaue333/Transcritor-de-Entrevistas',
  detailPath: '/projetos/transcritor-de-entrevistas',
  technologies: ['Python', 'FastAPI', 'Whisper', 'PyTorch'],
  stack: ['Python', 'FastAPI', 'Whisper', 'PyTorch'],
  category: 'pessoal',
  caseStudy: {
    overview: [
      'Ferramenta que transcreve entrevistas em vídeo ou áudio com o Whisper, separa quem falou e entrega o texto num player em que clicar numa frase leva ao ponto exato da gravação.',
      'Nasceu de uma dor própria: transcrever à mão as entrevistas de um projeto acadêmico — horas de trabalho, trechos difíceis de reencontrar e falantes misturados.',
    ],
    audiences: [
      { who: 'Pesquisadores', goal: 'Transcrevem entrevistas e localizam trechos para análise.' },
      { who: 'Jornalistas', goal: 'Conferem citações direto no ponto da gravação.' },
    ],
    challenge:
      'Transformar horas de gravação em texto pesquisável, com marcação de tempo e de falante, sem serviço pago e sem enviar áudio sensível para fora da máquina.',
    solution:
      'API em FastAPI que orquestra o Whisper para transcrever e, opcionalmente, o PyAnnote para identificar falantes. O front-end, em JavaScript puro, sincroniza texto e mídia: o trecho atual acompanha o player e a busca filtra em tempo real.',
    result:
      'Transcrição em português com timestamps, busca no texto e exportação em TXT, JSON e SRT — rodando localmente, pelo navegador ou pela linha de comando.',
    features: [
      {
        title: 'Transcrição',
        items: [
          'Upload de vídeo ou áudio',
          'Texto em português com timestamps (Whisper)',
          'Identificação de falantes opcional (PyAnnote)',
          'Modo linha de comando',
        ],
      },
      {
        title: 'Leitura',
        items: [
          'Clicar no trecho leva a mídia ao ponto exato',
          'Trecho atual destacado durante a reprodução',
          'Busca no texto em tempo real',
          'Transcrição salva no navegador',
        ],
      },
      {
        title: 'Exportação',
        items: ['TXT para leitura', 'JSON para análise', 'SRT para legenda'],
      },
    ],
    architecture: {
      layers: [
        { icon: 'client', label: 'Interface', detail: 'JavaScript puro + player sincronizado' },
        { icon: 'api', label: 'API', detail: 'FastAPI + Uvicorn' },
        { icon: 'ai', label: 'Modelos', detail: 'Whisper + PyAnnote (opcional)' },
        { icon: 'storage', label: 'Arquivos', detail: 'Mídia e saídas em disco, por job' },
      ],
      highlights: [
        'Três rotas: upload, consulta da transcrição por job e download por formato.',
        'Cada envio vira um job com ID único; mídia e resultados ficam em pastas separadas.',
        'Pipeline síncrono: simples para uso local, com fila prevista para a próxima etapa.',
      ],
    },
    decisions: [
      {
        topic: 'Execução',
        choice: 'Local, sem nuvem',
        why: 'O áudio não sai da máquina de quem transcreve, e não há custo por minuto.',
      },
      {
        topic: 'Falantes',
        choice: 'Diarização opcional',
        why: 'O PyAnnote multiplica o tempo de processamento; quem só precisa do texto não paga esse custo.',
      },
      {
        topic: 'Front-end',
        choice: 'JavaScript puro, sem framework',
        why: 'É uma tela só; um framework somaria build e dependências sem ganho real.',
      },
      {
        topic: 'Sincronização',
        choice: 'Destaque só quando o trecho muda',
        why: 'O player dispara eventos o tempo todo; atualizar a tela só na troca de trecho evita trabalho à toa.',
      },
    ],
    stack: [
      { name: 'Python', role: 'Linguagem (3.11+)' },
      { name: 'FastAPI', role: 'API de upload, consulta e download' },
      { name: 'Whisper', role: 'Transcrição com timestamps' },
      { name: 'PyTorch', role: 'Execução dos modelos' },
      { name: 'PyAnnote', role: 'Identificação de falantes' },
      { name: 'FFmpeg', role: 'Processamento de mídia' },
      { name: 'JavaScript', role: 'Player sincronizado e busca' },
    ],
    roadmap: [
      'Fila de processamento com progresso ao vivo via WebSocket',
      'Cache dos modelos entre transcrições',
      'Limite de tamanho de arquivo, rate limiting e autenticação',
    ],
  },
};
