import { useTranslation } from 'react-i18next';
import { FaLinkedin } from 'react-icons/fa6';
import { FiMail } from 'react-icons/fi';
import { SiGithub, SiWhatsapp } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { navPages } from '../../../config/pages';
import { socialLinks } from '../../../data/social';
import './Footer.css';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const socialIconMap = {
    mail: FiMail,
    linkedin: FaLinkedin,
    github: SiGithub,
    whatsapp: SiWhatsapp,
  } as const;

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <span>Victor</span>
              <span>Kauê</span>
            </Link>
            <p>
              Desenvolvedor full-stack com foco em sistemas web escaláveis, React, TypeScript, Python e Django.
              Soluções pensadas com lógica e entregues com consistência.
            </p>
            <div className="footer-contact-icons">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className={s.name.toLowerCase()}
                >
                  {(() => {
                    const Icon = socialIconMap[s.icon as keyof typeof socialIconMap] || FiMail;
                    return <Icon size={16} aria-hidden="true" />;
                  })()}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-nav">
            <p className="footer-label">Navegação</p>
            <ul>
              {navPages.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{t(`nav.${link.navKey}`)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <p className="footer-label">Ficou na dúvida? Fale Comigo:</p>
            <a href="mailto:kaue.alves.pg@gmail.com" className="footer-email-cta">
              kaue.alves.pg@gmail.com
            </a>
            <div className="footer-contact-icons">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className={s.name.toLowerCase()}
                >
                  {(() => {
                    const Icon = socialIconMap[s.icon as keyof typeof socialIconMap] || FiMail;
                    return <Icon size={18} aria-hidden="true" />;
                  })()}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} Victor Kauê - Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
