import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiX } from 'react-icons/fi';
import { Lens } from '../Lens/Lens';
import type { ProjectMedia } from '../../../types';
import './ProjectCarousel.css';

/** Item da galeria. `alt` vazio = o carrossel monta "<título> — tela n de N". */
export type CarouselItem = Pick<ProjectMedia, 'src'> & Partial<Pick<ProjectMedia, 'alt' | 'caption' | 'type'>>;

interface ProjectCarouselProps {
  items: CarouselItem[];
  title: string;
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ items, title }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  const count = items?.length ?? 0;
  const current = items[currentIndex];
  const altOf = (item: CarouselItem | undefined, i: number) =>
    item?.alt || t('projectDetail.gallery.shotAlt', { title, n: i + 1, total: count });
  const isDiagram = current?.type === 'diagram';

  const paginate = (newDirection: number) => {
    if (count === 0) return;
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = count - 1;
      if (nextIndex >= count) nextIndex = 0;
      return nextIndex;
    });
  };

  // Keyboard navigation — sempre registrado; decide dentro do handler
  useEffect(() => {
    if (count === 0) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const isActive = isLightboxOpen || !!document.activeElement?.closest('.project-carousel-container');
      if (!isActive) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); paginate(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); paginate(1); }
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, count]);

  // Scroll-lock enquanto o lightbox está aberto; foco entra no botão de
  // fechar e volta para quem abriu quando o diálogo fecha.
  useEffect(() => {
    if (!isLightboxOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const opener = openerRef.current;
    return () => {
      document.body.style.overflow = prev;
      opener?.focus();
    };
  }, [isLightboxOpen]);

  // Tab não sai do diálogo: os únicos focáveis são os botões dele.
  const trapFocus = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('button'));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  if (count === 0 || !current) return null;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <div className="project-carousel-wrapper">
      <div className="project-carousel-container" tabIndex={0} role="group" aria-roledescription="carousel" aria-label={t('projectDetail.gallery.label', { title })}>
        <div
          className={`project-carousel-main${isDiagram ? ' is-diagram' : ''}`}
          onClick={() => setIsLightboxOpen(true)}
        >
          {/* Lens: as screenshots são o único lugar do site onde ampliar tem
              função — capas de projeto são logotipos, e o briefing (regra 4)
              exclui logo/avatar/ícone. `zoomed` recebe uma cópia estática da
              imagem para a lupa não duplicar o motion.img com drag. */}
          <Lens
            className="carousel-lens"
            zoomFactor={1.5}
            lensSize={160}
            zoomed={
              <img
                src={current.src}
                className="carousel-image"
                alt=""
                aria-hidden="true"
                draggable={false}
              />
            }
          >
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentIndex}
              src={current.src}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.3 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_, { offset, velocity }) => {
                const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -10000) paginate(1);
                else if (swipe > 10000) paginate(-1);
              }}
              className="carousel-image"
              alt={altOf(current, currentIndex)}
              loading={currentIndex === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </AnimatePresence>
          </Lens>

          <div className="carousel-ui-overlay">
            {count > 1 && (
              <>
                <button
                  type="button"
                  className="carousel-nav prev"
                  onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                  aria-label={t('projectDetail.gallery.prev')}
                >
                  <FiChevronLeft />
                </button>
                <button
                  type="button"
                  className="carousel-nav next"
                  onClick={(e) => { e.stopPropagation(); paginate(1); }}
                  aria-label={t('projectDetail.gallery.next')}
                >
                  <FiChevronRight />
                </button>
              </>
            )}

            {/* Botão de verdade: abre a ampliação pelo teclado também. */}
            <button
              ref={openerRef}
              type="button"
              className="carousel-zoom-hint"
              onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(true); }}
              aria-haspopup="dialog"
            >
              <FiMaximize2 aria-hidden="true" />
              <span>{t('projectDetail.zoomHint')}</span>
            </button>
          </div>
        </div>

        {current.caption && (
          <p className="carousel-caption">
            {isDiagram && <span className="carousel-caption-tag">{t('projectDetail.gallery.diagram')}</span>}
            {current.caption}
          </p>
        )}

        {count > 1 && (
          <div className="carousel-indicators">
            {items.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                aria-label={t('projectDetail.gallery.goTo', { n: index + 1 })}
                aria-current={index === currentIndex ? 'true' : undefined}
              >
                {index === currentIndex && (
                  <motion.div
                      layoutId="active-indicator"
                      className="active-pillar"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              className="lightbox-content"
              role="dialog"
              aria-modal="true"
              aria-label={t('projectDetail.gallery.label', { title })}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={trapFocus}
            >
              <img
                src={current.src}
                className={`lightbox-image${isDiagram ? ' is-diagram' : ''}`}
                alt={altOf(current, currentIndex)}
              />

              <button
                ref={closeRef}
                type="button"
                className="lightbox-close"
                onClick={() => setIsLightboxOpen(false)}
                aria-label={t('projectDetail.gallery.close')}
              >
                <FiX aria-hidden="true" />
              </button>

              {count > 1 && (
                <div className="lightbox-nav-container">
                    <button type="button" className="lightbox-nav prev" onClick={() => paginate(-1)} aria-label={t('projectDetail.gallery.prev')}>
                        <FiChevronLeft aria-hidden="true" />
                    </button>
                    <span className="lightbox-counter" aria-live="polite">
                        {currentIndex + 1} / {count}
                    </span>
                    <button type="button" className="lightbox-nav next" onClick={() => paginate(1)} aria-label={t('projectDetail.gallery.next')}>
                        <FiChevronRight aria-hidden="true" />
                    </button>
                </div>
              )}

              <p className="lightbox-title">{current.caption || title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
