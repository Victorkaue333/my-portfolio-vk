# Touch Speaker — diagramas

Fonte: `github.com/Victorkaue333/touch-speaker` (v0.1.2). O repositório já
tem diagramas Mermaid em `ARCHITECTURE.md` e no README; estes seguem o mesmo
código, no padrão visual do portfólio.

## 1. Contexto

```mermaid
flowchart LR
  U([Usuário]) -->|segura Ctrl direito e fala| TS[Touch Speaker<br/>app de bandeja]
  TS -->|áudio webm/opus · HTTPS| GQ[Groq API<br/>Whisper large-v3-turbo]
  TS -->|Ctrl+V simulado| APP[Aplicativo em foco]
  TS --- OS[(Sistema operacional<br/>área de transferência · cofre de credenciais)]
  TS --- FS[(Arquivos locais<br/>config · histórico SQLite · log)]
```

## 2. Componentes (processo principal + renderers)

```mermaid
flowchart TB
  subgraph main [Processo principal · Electron]
    KB[keyboard.ts<br/>uiohook-napi] --> HK[HotkeyController]
    HK --> SC[SessionController]
    SC --> TR[GroqTranscriber + filtros]
    SC --> RF[Refiner<br/>identidade por enquanto]
    SC --> TI[TextInserter]
    TI --> PD[PasteDriver<br/>SendInput · CGEventPost]
    SC --> HS[HistoryService]
    HS --> ST[(HistoryStore<br/>node:sqlite)]
    CR[CredentialStore<br/>safeStorage]
  end
  subgraph pill [Renderer: pílula]
    REC[Recorder<br/>getUserMedia + MediaRecorder]
  end
  subgraph win [Renderer: janela principal]
    MW[Início · Histórico · Configurações]
  end
  REC <-->|IPC recorder:*| SC
  MW <-->|IPC history:* settings:*| main
  TR --> CR
```

## 3. Sequência — um ditado

```mermaid
sequenceDiagram
  actor U as Usuário
  participant K as Hook de teclado
  participant S as SessionController
  participant P as Pílula
  participant G as Groq (Whisper)
  participant I as TextInserter
  participant H as Histórico
  U->>K: pressiona Ctrl direito
  K->>S: start
  S->>P: mostrar + gravar
  U->>K: solta a tecla
  K->>S: stop
  P-->>S: áudio (IPC)
  S->>G: POST /audio/transcriptions
  G-->>S: texto + segmentos
  S->>S: filtros (≥500 ms, no_speech_prob)
  S->>I: inserir
  I->>I: guarda clipboard → escreve → cola → restaura
  S->>H: salva texto (sem áudio)
```

## 4. Release

```mermaid
flowchart LR
  T[tag v*] --> GA[GitHub Actions<br/>windows-latest · macos-14]
  GA --> TC[typecheck] --> TT[testes] --> PK[electron-builder] --> VF[verify-package] --> RL[GitHub Release + SHA256SUMS]
```

Legenda: o build macOS é gerado no CI mas não foi testado num Mac.
