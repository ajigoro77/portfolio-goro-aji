'use client';

import { Download, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { getConfig } from '@/lib/config-loader';

import Reveal from './Reveal';
import SectionTitle from './SectionTitle';

const cfg = getConfig();

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <SectionTitle eyebrow="05 / Kontak" title="Mari berdiskusi" />
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600/20 via-white/5 to-cyan-500/20 p-8 sm:p-12">
          <h3 className="max-w-xl text-2xl font-bold text-white sm:text-3xl">
            Tertarik bekerja sama atau ingin tahu lebih banyak?
          </h3>
          <p className="mt-3 max-w-xl text-white/70">
            Kirim email, hubungi lewat LinkedIn, atau tanya langsung ke asisten AI saya.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${cfg.personal.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-105"
            >
              <Mail className="size-4" /> {cfg.personal.email}
            </a>
            {cfg.social.linkedin && (
              <a href={cfg.social.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm text-white transition hover:bg-white/10">
                <Linkedin className="size-4" /> LinkedIn
              </a>
            )}
            {cfg.social.github && (
              <a href={cfg.social.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm text-white transition hover:bg-white/10">
                <Github className="size-4" /> GitHub
              </a>
            )}
            <a href={cfg.resume.downloadUrl} download className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm text-white transition hover:bg-white/10">
              <Download className="size-4" /> Unduh CV
            </a>
            <Link href="/chat" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
              <Sparkles className="size-4" /> Tanya AI
            </Link>
          </div>
        </div>
      </Reveal>
      <p className="mt-12 text-center text-sm text-white/40">
        © {new Date().getFullYear()} {cfg.personal.name}. Dibangun dengan Next.js & Groq.
      </p>
    </section>
  );
}
