import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

/**
 * react-scan só no dev server (`apply: 'serve'`): destaca re-renders em tempo
 * real. Injetado como <script> em head-prepend porque a lib precisa instrumentar
 * o React antes de ele carregar — um `import()` dentro do main.tsx chegaria
 * tarde demais. Servido do node_modules, não de CDN, e o build de produção nunca
 * vê este plugin.
 */
const reactScanDev = (): PluginOption => ({
  name: 'react-scan-dev',
  apply: 'serve',
  transformIndexHtml: () => [
    {
      tag: 'script',
      attrs: { src: '/node_modules/react-scan/dist/auto.global.js' },
      injectTo: 'head-prepend',
    },
  ],
});

export default defineConfig({
  plugins: [reactScanDev(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    // scripts/prerender-meta.mjs lê dist/.vite/manifest.json para injetar
    // modulepreload do chunk de cada rota (encurta a cadeia até o LCP).
    manifest: true,
    rollupOptions: {
      output: {
        // Forma de função: a forma de objeto só casa o módulo raiz do pacote,
        // deixando `react-dom/client` (e afins) cair no chunk principal.
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (/node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/.test(id)) {
            return 'vendor-react';
          }
          if (/node_modules[\\/](framer-motion|motion|motion-dom|motion-utils)[\\/]/.test(id)) {
            return 'vendor-motion';
          }
          if (/node_modules[\\/](i18next|react-i18next|i18next-browser-languagedetector)[\\/]/.test(id)) {
            return 'vendor-i18n';
          }
          // react-icons fica de fora de propósito: agrupar tudo num chunk faz
          // os ícones de todas as rotas carregarem já no primeiro acesso.
          // Sem regra, o Rollup divide por rota e cada página traz só os seus.
        },
      },
    },
  },
})
