'use client';

import { GraduationCap, MapPin, Target } from 'lucide-react';

import { getConfig } from '@/lib/config-loader';

import Reveal from './Reveal';
import SectionTitle from './SectionTitle';

const cfg = getConfig();

export default function About() {
  const edu = cfg.education.current;
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <SectionTitle eyebrow="01 / Tentang" title="Siapa saya" />
      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <p className="text-lg leading-relaxed text-white/75">{cfg.personal.bio}</p>
        </Reveal>
        <div className="space-y-4">
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <GraduationCap className="mb-3 size-5 text-indigo-400" />
              <p className="font-semibold text-white">{edu.degree}</p>
              <p className="text-sm text-white/60">{edu.institution}</p>
              <p className="mt-1 text-sm text-white/50">
                {[edu.duration, edu.cgpa ? `IPK ${edu.cgpa}` : '', edu.graduationDate].filter(Boolean).join(' • ')}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <MapPin className="mb-3 size-5 text-cyan-400" />
              <p className="font-semibold text-white">{cfg.personal.location}</p>
              <p className="text-sm text-white/60">{cfg.internship.availability}</p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <Target className="mb-3 size-5 text-emerald-400" />
              <p className="mb-2 font-semibold text-white">Fokus</p>
              <div className="flex flex-wrap gap-2">
                {cfg.internship.focusAreas.map((f) => (
                  <span key={f} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
