'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'Tentang' },
  { id: 'skills', label: 'Skill' },
  { id: 'projects', label: 'Proyek' },
  { id: 'journey', label: 'Perjalanan' },
  { id: 'contact', label: 'Kontak' },
];

export default function Navbar() {
  const [active, setActive] = useState('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 right-0 left-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400"
      />
      <header className="fixed top-4 left-1/2 z-[60] w-[calc(100%-1.5rem)] max-w-3xl -translate-x-1/2">
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-black/40 px-2 py-2 shadow-lg shadow-black/30 backdrop-blur-xl">
          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                    active === link.id
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#home"
            className="px-4 text-sm font-semibold text-white md:hidden"
          >
            Goro Aji
          </a>
          <Link
            href="/chat"
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-1.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            <Sparkles className="size-4" />
            Tanya AI
          </Link>
        </nav>
      </header>
    </>
  );
}
