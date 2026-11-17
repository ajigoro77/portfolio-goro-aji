'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

import Chat from '@/components/chat/chat';

export default function ChatPage() {
  return (
    <>
      <Link
        href="/"
        className="fixed top-4 left-4 z-[60] inline-flex items-center gap-1.5 rounded-full border bg-white/90 px-4 py-2 text-sm font-medium text-neutral-800 shadow backdrop-blur transition hover:bg-white"
      >
        <ArrowLeft className="size-4" /> Portfolio
      </Link>
      <Suspense fallback={<div className="p-8">Loading chat...</div>}>
        <Chat />
      </Suspense>
    </>
  );
}
