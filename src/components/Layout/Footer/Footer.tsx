import { useTranslation } from 'react-i18next';
import { FaLinkedin } from 'react-icons/fa6';
import { FiMail } from 'react-icons/fi';
import { SiGithub, SiWhatsapp } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { navPages } from '../../../config/pages';
import { socialLinks } from '../../../data/social';
import './Footer.css';

const socialIconMap = {
  mail: FiMail,
  linkedin: FaLinkedin,
  github: SiGithub,
  whatsapp: SiWhatsapp,
} as const;

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="container footer-inner">
        <Link to="/" className="footer-brand" aria-label={t('footer.home')}>
          <img
            className="footer-mark"
            src="/images/brand/logotipo-vk-48.webp"
            srcSet="/images/brand/logotipo-vk-48.webp 1x, /images/brand/logotipo-vk-96.webp 2x"
            width={79}
            height={48}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <span className="footer-brand-name">
            Victor<span> Kauê</span>
          </span>
        </Link>

        <nav className="footer-nav" aria-label={t('footer.navLabel')}>
          <ul>
            {navPages.map((page) => (
              <li key={page.path}>
                <Link to={page.path}>{t(`nav.${page.navKey}`)}</Link>
              </li>
            ))}
            <li>
              <Link to="/uses">{t('uses.footerLink')}</Link>
            </li>
          </ul>
        </nav>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} Victor Kauê · {t('footer.rights')}
          </p>

          <ul className="footer-social" aria-label={t('footer.socialLabel')}>
            {socialLinks.map((social) => {
              const Icon = socialIconMap[social.icon as keyof typeof socialIconMap] ?? FiMail;
              return (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={social.name.toLowerCase()}
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
