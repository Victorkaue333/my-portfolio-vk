import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaLinkedin } from 'react-icons/fa6';
import { FiClock, FiExternalLink, FiFileText, FiMail, FiMapPin, FiMessageSquare, FiSend, FiUser } from 'react-icons/fi';
import { SiGithub, SiWhatsapp } from 'react-icons/si';
import { Button } from '../../components/ui/Button/Button';
import { PageHero } from '../../components/ui/PageHero/PageHero';
import { socialLinks } from '../../data/social';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { usePageSeo } from '../../hooks/useSeo';
import type { ContactFormData } from '../../types';
import './Contato.css';

const WHATSAPP_PHONE = '5587981774951';

function buildWhatsAppUrl(data: ContactFormData): string {
  const message = encodeURIComponent(
    `Nova mensagem do Portfólio\n\n` +
    `Nome: ${data.nome}\n` +
    `Email: ${data.email}\n` +
    `Assunto: ${data.assunto}\n\n` +
    `Mensagem:\n${data.mensagem}`
  );
  return `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
}

const CONTACT_EMAIL = 'kaue.alves.pg@gmail.com';

const LOCATION = {
  label: 'Itacuruba, PE',
  query: encodeURIComponent('Itacuruba, Pernambuco, Brasil'),
  // URL final do embed (zoom 12). `maps?q=...&output=embed` redireciona para
  // cá com X-Frame-Options no salto — apontar direto evita o redirect.
  embed: 'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1sItacuruba,+Pernambuco,+Brasil!6i12',
};

/** Alternativa ao WhatsApp para quem usa e-mail corporativo — abre o cliente de e-mail já preenchido. */
function buildMailtoUrl(data: ContactFormData): string {
  const subject = encodeURIComponent(`[Portfólio] ${data.assunto}`);
  const body = encodeURIComponent(
    `${data.mensagem}\n\n` +
    `—\n${data.nome}\n${data.email}`
  );
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

type Channel = 'whatsapp' | 'email';

const EMPTY_FORM: ContactFormData = { nome: '', email: '', assunto: '', mensagem: '' };

const isContactDraft = (v: unknown): v is ContactFormData =>
  typeof v === 'object' && v !== null &&
  (['nome', 'email', 'assunto', 'mensagem'] as const).every(
    (k) => typeof (v as Record<string, unknown>)[k] === 'string',
  );

export default function Contato() {
  const { t } = useTranslation();
  // Rascunho sobrevive a recarregar/fechar a aba; limpo ao enviar.
  const [form, setForm] = useLocalStorage<ContactFormData>('vk_contact_draft', EMPTY_FORM, isContactDraft);
  const [sent, setSent] = useState<Channel | null>(null);
  const sentTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Qual botão enviou: o clique roda antes do submit, e os dois são type="submit"
  // para aproveitar a validação nativa do formulário.
  const channel = useRef<Channel>('whatsapp');

  usePageSeo('contact');

  useEffect(() => {
    return () => { if (sentTimer.current) clearTimeout(sentTimer.current); };
  }, []);

  const filledFields = [form.nome, form.email, form.assunto, form.mensagem].filter(Boolean).length;
  const progress = (filledFields / 4) * 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const via = channel.current;
    if (via === 'email') {
      window.location.href = buildMailtoUrl(form);
    } else {
      window.open(buildWhatsAppUrl(form), '_blank');
    }
    setSent(via);
    setForm(EMPTY_FORM);
    if (sentTimer.current) clearTimeout(sentTimer.current);
    sentTimer.current = setTimeout(() => setSent(null), 4000);
  };

  const handleChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const socialIconMap = {
    mail: FiMail,
    linkedin: FaLinkedin,
    github: SiGithub,
    whatsapp: SiWhatsapp,
  } as const;

  return (
    <main className="page-contato">
      <section className="contact-hero content-section">
        <div className="container">
          <PageHero
            titleMain={t('contato.heroMain')}
            titleAccent={t('contato.heroAccent')}
            subtitle={t('contato.heroSubtitle')}
            icon={<FiSend size={22} />}
          />

          <div className="contact-layout">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-progress">
                <div className="form-progress-bar" style={{ width: `${progress}%` }} />
              </div>

              <div className="form-group">
                <label htmlFor="nome"><FiUser size={16} /> {t('contato.nome')}</label>
                <input
                  id="nome"
                  type="text"
                  value={form.nome}
                  onChange={handleChange('nome')}
                  required
                  placeholder={t('contato.nomePh')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email"><FiMail size={16} /> {t('contato.email')}</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  required
                  placeholder={t('contato.emailPh')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="assunto"><FiFileText size={16} /> {t('contato.assunto')}</label>
                <input
                  id="assunto"
                  type="text"
                  value={form.assunto}
                  onChange={handleChange('assunto')}
                  required
                  placeholder={t('contato.assuntoPh')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="mensagem"><FiMessageSquare size={16} /> {t('contato.mensagem')}</label>
                <textarea
                  id="mensagem"
                  value={form.mensagem}
                  onChange={handleChange('mensagem')}
                  required
                  rows={5}
                  maxLength={1000}
                  placeholder={t('contato.mensagemPh')}
                />
                <span className="char-counter">{form.mensagem.length}/1000</span>
              </div>

              <div className="submit-actions">
                <Button type="submit" variant="primary" className="submit-btn" onClick={() => { channel.current = 'whatsapp'; }}>
                  <SiWhatsapp size={18} aria-hidden="true" />
                  {t('contato.submit')}
                </Button>
                <Button type="submit" variant="outline" className="submit-btn" onClick={() => { channel.current = 'email'; }}>
                  <FiMail size={18} aria-hidden="true" />
                  {t('contato.submitEmail')}
                </Button>
              </div>

              <p className="response-time">
                <FiClock size={14} aria-hidden="true" />
                {t('contato.responseTime')}
              </p>

              {sent && (
                <div className="form-success" role="status">
                  {t(sent === 'email' ? 'contato.successEmail' : 'contato.success')}
                </div>
              )}
            </form>

            <aside className="contact-sidebar">
              <h3>{t('contato.otherWays')}</h3>
              <div className="contact-cards">
                {socialLinks.map((s) => (
                  <a key={s.name} href={s.url} className={`contact-card hbg ${s.name.toLowerCase()}`} target="_blank" rel="noopener noreferrer">
                    {(() => {
                      const Icon = socialIconMap[s.icon as keyof typeof socialIconMap] || FiMail;
                      return <Icon size={20} aria-hidden="true" />;
                    })()}
                    <div>
                      <strong>{s.name}</strong>
                      <span>{s.detail}</span>
                    </div>
                  </a>
                ))}
              </div>
            </aside>
          </div>

          {/* Mapa largo embaixo do formulário */}
          <section className="contact-location" aria-labelledby="contact-location-title">
            <header className="contact-location-head">
              <FiMapPin size={18} aria-hidden="true" />
              <div>
                <h2 id="contact-location-title">{t('contato.locationTitle')}</h2>
                <span>{t('contato.locationDetail', { place: LOCATION.label })}</span>
              </div>
              <a
                className="contact-map-link"
                href={`https://www.google.com/maps/search/?api=1&query=${LOCATION.query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('contato.openMap')} <FiExternalLink size={13} aria-hidden="true" />
              </a>
            </header>
            <div className="contact-map">
              {/* Embed público do Google Maps (sem chave de API). `lazy`: só
                  carrega quando a seção chega perto da tela. */}
              <iframe
                title={t('contato.mapTitle', { place: LOCATION.label })}
                src={LOCATION.embed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
