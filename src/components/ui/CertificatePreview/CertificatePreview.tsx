import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiX } from 'react-icons/fi';
import type { Certificate } from '../../../types';
import './CertificatePreview.css';

interface CertificatePreviewProps {
  certificates: Certificate[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  categoryLabel: (id: string) => string;
}

export function CertificatePreview({
  certificates,
  index,
  onClose,
  onNavigate,
  categoryLabel,
}: CertificatePreviewProps) {
  const { t } = useTranslation();
  const closeRef = useRef<HTMLButtonElement>(null);
  const current = index ?? 0;
  const count = certificates.length;
  const cert = index !== null ? certificates[index] ?? null : null;
  const isOpen = cert !== null;
  const prevIndex = (current - 1 + count) % count;
  const nextIndex = (current + 1) % count;

  // Teclado: Esc fecha, setas navegam
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (count < 2) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); onNavigate(prevIndex); }
      if (e.key === 'ArrowRight') { e.preventDefault(); onNavigate(nextIndex); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, count, prevIndex, nextIndex, onClose, onNavigate]);

  // Scroll-lock + foco no botão fechar; devolve o foco ao card ao fechar
  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      previousFocus?.focus?.();
    };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {cert && (
        <motion.div
          className="cert-preview-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="cert-preview-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-preview-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="cert-preview-header">
              <div className="cert-preview-heading">
                <span className="cert-preview-issuer">{cert.issuer}</span>
                <h2 id="cert-preview-title" className="cert-preview-title">{cert.title}</h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                className="cert-preview-icon-btn"
                onClick={onClose}
                aria-label={t('certsPage.close')}
              >
                <FiX size={20} />
              </button>
            </header>

            <div className="cert-preview-stage">
              {count > 1 && (
                <button
                  type="button"
                  className="cert-preview-nav prev"
                  onClick={() => onNavigate(prevIndex)}
                  aria-label={t('certsPage.prev')}
                >
                  <FiChevronLeft size={22} />
                </button>
              )}

              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={cert.id}
                  src={cert.image}
                  alt={cert.title}
                  className="cert-preview-image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                />
              </AnimatePresence>

              {count > 1 && (
                <button
                  type="button"
                  className="cert-preview-nav next"
                  onClick={() => onNavigate(nextIndex)}
                  aria-label={t('certsPage.next')}
                >
                  <FiChevronRight size={22} />
                </button>
              )}
            </div>

            <footer className="cert-preview-footer">
              <div className="cert-preview-meta">
                <span className="cert-badge">{categoryLabel(cert.category)}</span>
                {count > 1 && (
                  <span className="cert-preview-counter">{current + 1} / {count}</span>
                )}
              </div>
              {(cert.pdf || cert.image) && (
                <a
                  className="cert-preview-open"
                  href={cert.pdf || cert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cert.pdf ? t('certsPage.openPdf') : t('certsPage.openNewTab')}
                  <FiExternalLink size={14} />
                </a>
              )}
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
