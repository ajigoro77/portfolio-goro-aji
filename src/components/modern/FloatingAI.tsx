'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function FloatingAI() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="fixed right-5 bottom-5 z-[60]"
    >
      <Link
        href="/chat"
        className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:scale-105"
      >
        <Sparkles className="size-4 transition group-hover:rotate-12" />
        Tanya AI Goro
      </Link>
    </motion.div>
  );
}
