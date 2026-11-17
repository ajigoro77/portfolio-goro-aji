'use client';

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { ExternalLink, Github, X, Youtube } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { getConfig } from '@/lib/config-loader';

import Reveal from './Reveal';
import SectionTitle from './SectionTitle';

const cfg = getConfig();
type Project = (typeof cfg.projects)[number];

function LinkIcon({ name }: { name: string }) {
  const n = name.toLowerCase();
  if (n.includes('github')) return <Github className="size-4" />;
  if (n.includes('youtube')) return <Youtube className="size-4" />;
  return <ExternalLink className="size-4" />;
}

function Picture({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      unoptimized={src.toLowerCase().endsWith('.gif')}
      className={className}
    />
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);
  const cover = project.images[0];

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileHover={{ scale: 1.02 }}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left backdrop-blur transition-colors hover:border-white/30"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
        {cover ? (
          <Picture src={cover.src} alt={cover.alt} className="object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex size-full items-center justify-center text-white/30">No preview</div>
        )}
        <span className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">
          {project.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-white/65">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((t) => (
            <span key={t} className="rounded-full bg-indigo-500/15 px-2.5 py-1 text-xs text-indigo-200">
              {t}
            </span>
          ))}
        </div>
        <span className="mt-4 text-sm font-medium text-cyan-300">Lihat detail →</span>
      </div>
    </motion.button>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [active, setActive] = useState(0);
  const current = project.images[active];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0d0d14] p-5 sm:p-7"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs tracking-widest text-indigo-300 uppercase">{project.category}</p>
            <h3 className="text-xl font-bold text-white sm:text-2xl">{project.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            <X className="size-4" />
          </button>
        </div>

        {current && (
          <>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
              <Picture src={current.src} alt={current.alt} className="object-contain" />
            </div>
            {project.images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {project.images.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                      i === active ? 'border-cyan-400' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Picture src={img.src} alt={img.alt} className="object-cover" />
                  </button>
                ))}
              </div>
            )}
            <p className="mt-2 text-xs text-white/40">{current.alt}</p>
          </>
        )}

        <p className="mt-5 leading-relaxed text-white/75">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((t) => (
            <span key={t} className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs text-indigo-200">
              {t}
            </span>
          ))}
        </div>

        {project.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:bg-white/10"
              >
                <LinkIcon name={l.name} /> {l.name}
              </a>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <SectionTitle eyebrow="03 / Proyek" title="Karya yang pernah saya bangun" />
      <div className="grid gap-6 md:grid-cols-2">
        {cfg.projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <ProjectCard project={p} onOpen={() => setSelected(p)} />
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {selected && <ProjectModal key={selected.title} project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
