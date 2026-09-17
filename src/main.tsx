import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './theme/ThemeProvider';
import './i18n';
import './styles/variables.css';
import './styles/reset.css';
import './styles/global.css';
import './styles/animations.css';
import './styles/interactions.css';
import './styles/light-overrides.css';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StrictMode>
  );
}
