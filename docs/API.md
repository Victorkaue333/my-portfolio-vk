# API

> **Este projeto não expõe nem consome uma API REST própria.** É uma SPA
> front-end estática, sem backend. Este documento registra os **contratos
> externos** que o app usa (deep-links) para que o
> comportamento fique explícito.

## Convenções gerais

- Não há servidor de aplicação, autenticação, tokens ou endpoints versionados.
- Toda "integração" é deep-link/navegação para serviço externo em runtime.
- Nenhum segredo é usado. Requisições são anônimas a recursos públicos.

## Contrato 1 — Deep-link de contato (WhatsApp)

Runtime. Disparado ao enviar o formulário de contato.

- **Origem:** `src/pages/Contato/Contato.tsx`
- **Método:** navegação `window.open(url, '_blank')`
- **Destino:** `https://wa.me/{PHONE}?text={mensagem}`
- **Telefone:** `558798774951`
- **Parâmetros (query):**

  | Param | Origem | Descrição |
  | --- | --- | --- |
  | `text` | Formulário | Mensagem URL-encoded com nome, e-mail, assunto e mensagem. |

**Payload (antes de encode):**

```
Nova mensagem do Portfólio

Nome: {nome}
Email: {email}
Assunto: {assunto}

Mensagem:
{mensagem}
```

**Exemplo:**

```
https://wa.me/5587981774951?text=Nova%20mensagem%20do%20Portf%C3%B3lio%0A%0ANome%3A%20...
```

Não há resposta programática — abre o WhatsApp do usuário.

## Contrato 2 — Links sociais e recursos

Runtime. Navegação direta (`<a target="_blank" rel="noopener noreferrer">`).

- Definidos em `src/data/social.ts` (`SocialLink`): e-mail, LinkedIn, GitHub, WhatsApp.
- Repositórios de projeto: campos `github` / `online` de cada `Project`.
- Currículo: `public/docs/Curriculo/Curriculo_Victor_Kaue.pdf`.
- Certificados: PDFs em `public/Certificados/pdfs/`.

## Formato de erros

Não aplicável a um backend. Erros possíveis são de cliente:

- Deep-link: falha silenciosa se o dispositivo não tiver WhatsApp/handler.

## Roadmap (se um backend for adicionado)

Caso futuramente exista API real (ex.: envio de e-mail server-side), documentar
aqui: base URL, autenticação, cada endpoint (método, rota, params, request,
response) e o formato de erro padronizado. Registrar a decisão em
[DECISIONS.md](DECISIONS.md).
