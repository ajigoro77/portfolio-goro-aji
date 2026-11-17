'use client';

import { Award, Briefcase, GraduationCap } from 'lucide-react';

import { getConfig } from '@/lib/config-loader';

import Reveal from './Reveal';
import SectionTitle from './SectionTitle';

const cfg = getConfig();

type Item = {
  kind: 'work' | 'edu' | 'cert';
  title: string;
  org: string;
  period?: string;
  desc?: string;
  tags?: string[];
};

const ICONS = { work: Briefcase, edu: GraduationCap, cert: Award } as const;
const COLORS = {
  work: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40',
  edu: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
  cert: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
} as const;

export default function Journey() {
  const edu = cfg.education.current;
  const items: Item[] = [
    ...cfg.experience.map((e) => ({
      kind: 'work' as const,
      title: e.position,
      org: e.company,
      period: e.duration,
      desc: e.description,
      tags: e.technologies,
    })),
    {
      kind: 'edu' as const,
      title: edu.degree,
      org: edu.institution,
      period: edu.duration,
      desc: [edu.cgpa ? `IPK ${edu.cgpa}` : '', edu.graduationDate].filter(Boolean).join(' • ') || undefined,
    },
    ...(cfg.certifications ?? []).map((c) => ({
      kind: 'cert' as const,
      title: c.name,
      org: c.issuer,
      period: c.period ?? c.year,
      desc: c.description,
    })),
  ];

  return (
    <section id="journey" className="mx-auto max-w-5xl px-6 py-24">
      <SectionTitle eyebrow="04 / Perjalanan" title="Pengalaman, pendidikan & sertifikasi" />
      <div className="relative ml-4 border-l border-white/15 pl-8">
        {items.map((item, i) => {
          const Icon = ICONS[item.kind];
          return (
            <Reveal key={`${item.kind}-${item.title}`} delay={i * 0.05} className="relative mb-10 last:mb-0">
              <span className={`absolute top-0 -left-[3.15rem] flex size-9 items-center justify-center rounded-full border ${COLORS[item.kind]}`}>
                <Icon className="size-4" />
              </span>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  {item.period && <span className="font-mono text-xs text-white/50">{item.period}</span>}
                </div>
                <p className="text-sm text-indigo-300">{item.org}</p>
                {item.desc && <p className="mt-2 text-sm leading-relaxed text-white/65">{item.desc}</p>}
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <span key={t} className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/70">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
