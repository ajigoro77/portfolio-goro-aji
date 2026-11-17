'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import { getConfig } from '@/lib/config-loader';

const cfg = getConfig();

function useTyping(words: string[], speed = 70, pause = 1500) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;
    const word = words[index % words.length];
    let delay = deleting ? speed / 2 : speed;
    if (!deleting && text === word) delay = pause;

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setIndex((v) => v + 1);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, words, speed, pause]);

  return text;
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const roles = useMemo(
    () =>
      cfg.personal.title
        .split('|')
        .map((s) => s.trim())
        .filter(Boolean),
    []
  );
  const typed = useTyping(roles);

  const stats = [
    { label: 'Proyek', value: String(cfg.projects.length) },
    { label: 'Sertifikasi', value: String(cfg.certifications?.length ?? 0) },
    { label: 'IPK', value: cfg.education.current.cgpa ?? '' },
  ].filter((s) => s.value && s.value !== '0');

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={handleMove}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 pb-16"
      style={{ '--x': '50%', '--y': '30%' } as React.CSSProperties}
    >
      <div className="modern-grid pointer-events-none absolute inset-0" />
      <div className="animate-blob pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-indigo-600/30 blur-3xl" />
      <div
        className="animate-blob pointer-events-none absolute -right-24 bottom-0 size-96 rounded-full bg-cyan-500/20 blur-3xl"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(500px circle at var(--x) var(--y), rgba(99,102,241,0.18), transparent 45%)',
        }}
      />

      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-12 md:grid-cols-[1.4fr_1fr]">
        <div>
          {cfg.internship.seeking && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Terbuka untuk peluang kerja
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-2 font-mono text-sm text-white/60"
          >
            Halo, saya
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-white via-indigo-200 to-cyan-300 bg-clip-text text-4xl leading-tight font-extrabold tracking-tight text-transparent sm:text-6xl"
          >
            {cfg.personal.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 h-8 font-mono text-lg text-cyan-300 sm:text-xl"
          >
            {typed}
            <span className="ml-0.5 inline-block h-5 w-0.5 translate-y-1 animate-pulse bg-cyan-300" />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70"
          >
            {cfg.personal.status}. {cfg.personal.location}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-105"
            >
              Lihat Proyek <ArrowDown className="size-4" />
            </a>
            <a
              href={cfg.resume.downloadUrl}
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              <Download className="size-4" /> Unduh CV
            </a>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              <Sparkles className="size-4" /> Tanya AI saya
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex items-center gap-4 text-white/60"
          >
            {cfg.social.github && (
              <a href={cfg.social.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition hover:text-white">
                <Github className="size-5" />
              </a>
            )}
            {cfg.social.linkedin && (
              <a href={cfg.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition hover:text-white">
                <Linkedin className="size-5" />
              </a>
            )}
            <a href={`mailto:${cfg.personal.email}`} aria-label="Email" className="transition hover:text-white">
              <Mail className="size-5" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mx-auto w-full max-w-xs"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-indigo-500 via-cyan-400 to-emerald-400 opacity-70 blur-lg" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900">
              <Image
                src={cfg.personal.avatar}
                alt={cfg.personal.name}
                width={400}
                height={400}
                priority
                className="aspect-square w-full object-cover"
              />
            </div>
          </div>
          {stats.length > 0 && (
            <div className="mt-6 grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur">
                  <div className="text-lg font-bold text-white">{s.value}</div>
                  <div className="text-xs text-white/50">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
