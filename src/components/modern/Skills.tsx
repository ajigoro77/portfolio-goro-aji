'use client';

import { motion } from 'framer-motion';
import { Brain, Code2, Cpu, Database, Plug, Users, Wrench } from 'lucide-react';

import { getConfig } from '@/lib/config-loader';

import Reveal from './Reveal';
import SectionTitle from './SectionTitle';

const cfg = getConfig();

const CATEGORIES = [
  { key: 'programming', label: 'Languages & Web', icon: Code2, color: 'text-indigo-400' },
  { key: 'web_development', label: 'Integrations & UI', icon: Plug, color: 'text-cyan-400' },
  { key: 'databases', label: 'Databases', icon: Database, color: 'text-emerald-400' },
  { key: 'devops_cloud', label: 'Tools & Automation', icon: Wrench, color: 'text-amber-400' },
  { key: 'ml_ai', label: 'AI / ML', icon: Brain, color: 'text-fuchsia-400' },
  { key: 'iot_hardware', label: 'IoT & Hardware', icon: Cpu, color: 'text-rose-400' },
  { key: 'soft_skills', label: 'Soft Skills', icon: Users, color: 'text-sky-400' },
] as const;

export default function Skills() {
  const groups = CATEGORIES.map((c) => ({
    ...c,
    items: (cfg.skills[c.key as keyof typeof cfg.skills] ?? []) as string[],
  })).filter((g) => g.items.length > 0);

  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
      <SectionTitle eyebrow="02 / Skill" title="Tech stack & kemampuan" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => {
          const Icon = g.icon;
          return (
            <Reveal key={g.key} delay={i * 0.06}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-white/25 hover:bg-white/10">
                <div className="mb-4 flex items-center gap-2">
                  <Icon className={`size-5 ${g.color}`} />
                  <h3 className="font-semibold text-white">{g.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <motion.span
                      key={item}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="cursor-default rounded-full border border-white/10 bg-black/30 px-3 py-1 text-sm text-white/80"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
