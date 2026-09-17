import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Layout/Navbar/Navbar';
import { Footer } from './components/Layout/Footer/Footer';
import { BackToTop } from './components/Layout/BackToTop/BackToTop';
import ScrollToTop from './components/Layout/ScrollToTop/ScrollToTop';
import { MobileNavbar } from './components/Layout/Navbar/MobileNavbar';
import { ScrollReveal } from './components/Layout/ScrollReveal/ScrollReveal';
import {
  Home,
  Sobre,
  Projetos,
  ProjetoDetalhe,
  Servicos,
  Certificados,
  Contato,
  NaoEncontrado,
} from './routes';
import './App.css';

/* Sem spinner: loaders davam sensação de site lento. Na navegação a página
   antiga fica na tela até a nova carregar; o fallback só aparece no primeiro
   carregamento e reserva a altura da tela para o footer não subir. */
function PagePlaceholder() {
  return <div className="page-placeholder" aria-hidden="true" />;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      {/* A transição de página era `AnimatePresence mode="wait"` + `motion.div`.
          Isso trazia o framer-motion para o bundle inicial de toda rota e, com
          `mode="wait"`, ainda segurava a página nova até a antiga terminar de
          sair — atraso somado ao download do chunk lazy. Trocar a chave
          remonta o wrapper e o CSS toca `page-enter` sozinho. */}
      {/* Suspense FORA do wrapper com key: o BrowserRouter navega dentro de
          `startTransition`, então um boundary que já existe mantém a página
          antiga na tela até o chunk da nova chegar. Dentro do wrapper, cada
          troca de key criava um boundary novo, que sempre mostra o fallback —
          a tela ficava vazia e o footer subia. */}
      <Suspense fallback={<PagePlaceholder />}>
        <div key={location.pathname} className="page-motion-wrapper">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/projetos/:id" element={<ProjetoDetalhe />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/certificados" element={<Certificados />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="*" element={<NaoEncontrado />} />
          </Routes>
        </div>
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollReveal />
      <Navbar />
      <AppRoutes />
      <Footer />
      <MobileNavbar />
      <BackToTop />
      {/* Page views + origem do tráfego. Só envia em produção na Vercel;
          precisa ativar "Analytics" no painel do projeto. */}
      <Analytics />
    </BrowserRouter>
  );
}
