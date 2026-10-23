# Diagramas de arquitetura — especificações

Especificações para gerar os diagramas dos estudos de caso no Ardem (ou
ferramenta equivalente). Cada arquivo tem a versão em Mermaid, revisável e
versionada, e as notas do que **não** pode aparecer.

Regra única: **só componente que existe no código**. Cada nó abaixo foi
conferido no repositório do projeto em 23/10/2026 (ver
`docs/auditoria/auditoria-2026-10-23.md`). O que é plano futuro aparece
tracejado e com o rótulo "planejado" — ou não aparece.

| Projeto | Arquivo | Diagramas | Publicação |
| --- | --- | --- | --- |
| AgendeAqui | [agendeaqui.md](agendeaqui.md) | contexto, containers, sequência, deploy | livre (repo público) |
| SuplaStock | [suplastock.md](suplastock.md) | contexto, módulos, fluxo do fiado, deploy | livre (repo público) |
| Touch Speaker | [touch-speaker.md](touch-speaker.md) | contexto, componentes, sequência | livre (repo público) |
| Sertão Conecta | [sertao-conecta.md](sertao-conecta.md) | contexto, containers, gamificação, CI/CD | **confirmar com o IF Sertão-PE** (repo privado) |
| Mav Imob | [mav-imob.md](mav-imob.md) | contexto, containers | **autorização da AEX Hub** (código proprietário) |
| MaratonaTech | [maratonatech.md](maratonatech.md) | contexto, componentes, sequência | confirmar com a organização do evento |

## Identidade visual dos diagramas

- **Fundo**: claro (`#f8fafc`). A galeria já exibe diagramas sobre moldura clara
  nos dois temas (`type: 'diagram'` em `ProjectMedia`).
- **Tipografia**: Manrope (a do site), 14–16 px nos nós, 12 px nas setas.
- **Cores**: neutros (`#0f172a` texto, `#e2e8f0` bordas, `#ffffff` nós) e um
  único acento laranja (`#f97316`) para destacar o caminho principal ou a parte
  que foi do autor. Nada de paleta extra.
- **Formas**: retângulo de borda fina para serviço; cilindro para banco;
  retângulo tracejado para fronteira/agrupamento (ex.: "Servidor do instituto");
  pessoa (ícone simples) para atores.
- **Setas**: simples, rotuladas com o protocolo ou a ação ("REST + JWT",
  "webhook HMAC", "fila").
- **Legenda** curta no rodapé quando houver tracejado ou acento.
- **Exportar** em SVG (fonte) e WebP 1600 px de largura para
  `public/images/fotos-projetos-*/<slug>/diagrama-<tipo>.webp`; registrar em
  `media` do projeto com `type: 'diagram'`, `alt` descritivo e `caption`.
