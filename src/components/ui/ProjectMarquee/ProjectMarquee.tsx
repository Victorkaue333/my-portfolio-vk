import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../../../types';
import { srcFor, srcSetFor } from '../../../utils/imageSrcSet';
import { InfiniteMovingCards } from '../InfiniteMovingCards/InfiniteMovingCards';
import './ProjectMarquee.css';

interface ProjectMarqueeProps {
  projects: Project[];
  title: string;
  icon?: ReactNode;
}

/**
 * Faixa de projetos passando em loop, com cabeçalho e contagem.
 *
 * Complementa os destaques fixos da Home, não os substitui: os cards parados
 * dão contexto (ver comentário em Home.tsx), a faixa mostra a amplitude. Por
 * isso o card é compacto — capa, título e descrição curta — e leva ao estudo
 * de caso.
 *
 * O loop, a pausa no hover/foco e o `prefers-reduced-motion` vêm do
 * InfiniteMovingCards.
 */
export function ProjectMarquee({ projects, title, icon }: ProjectMarqueeProps) {
  if (projects.length === 0) return null;

  const items = projects.map((project) => ({
    key: project.id,
    content: (
      <Link to={project.detailPath} className="pm-card">
        <span className="pm-image">
          <img
            src={srcFor(project.image, 480)}
            srcSet={srcSetFor(project.image)}
            sizes="(max-width: 768px) 220px, 260px"
            alt=""
            width={260}
            height={163}
            loading="lazy"
            decoding="async"
          />
        </span>
        <span className="pm-body">
          <span className="pm-title">{project.title}</span>
          <span className="pm-desc">{project.shortDescription || project.description}</span>
        </span>
      </Link>
    ),
  }));

  return (
    <div className="project-marquee">
      <h3 className="pm-header">
        {icon && <span className="pm-header-icon" aria-hidden="true">{icon}</span>}
        <span className="pm-header-title">{title}</span>
        <span className="pm-header-count">{projects.length}</span>
      </h3>
      <InfiniteMovingCards items={items} direction="left" speed="slow" label={title} />
    </div>
  );
}
