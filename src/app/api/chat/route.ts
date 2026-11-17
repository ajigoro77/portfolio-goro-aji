import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';

import { SYSTEM_PROMPT } from './prompt';
import { getContact } from './tools/getContact';
import { getInternship } from './tools/getInternship';
import { getPresentation } from './tools/getPresentation';
import { getProjects } from './tools/getProjects';
import { getResume } from './tools/getResume';
import { getSkills } from './tools/getSkills';

export const maxDuration = 30;

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

// Daftar model fallback (urutan prioritas). Jika model pertama gagal, coba model berikutnya.
// Model gratis di Groq: llama-3.1-8b-instant (production), llm-3.1-8b, dll.
// Model Enterprise (berbayar): llama-3.3-70b-versatile (tidak tersedia untuk akun gratis)
const FALLBACK_MODELS = (
  process.env.GROQ_FALLBACK_MODELS ||
  'llama-3.1-8b-instant,llama-3.1-8b,llama-3.2-3b-preview'
)
  .split(',')
  .map((m) => m.trim())
  .filter(Boolean);

const PRIMARY_MODEL = process.env.GROQ_MODEL || FALLBACK_MODELS[0] || 'llama-3.1-8b-instant';

const ALL_MODELS = [PRIMARY_MODEL, ...FALLBACK_MODELS.filter((m) => m !== PRIMARY_MODEL)];

function getErrorMessage(error: unknown): string {
  if (error == null) return 'Unknown error';
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  return JSON.stringify(error);
}

function isRetryableError(message: string): boolean {
  const lower = message.toLowerCase();
  return (
    lower.includes('rate limit') ||
    lower.includes('quota') ||
    lower.includes('429') ||
    lower.includes('does not exist') ||
    lower.includes('not found') ||
    lower.includes('unauthorized') ||
    lower.includes('401') ||
    lower.includes('403') ||
    lower.includes('network') ||
    lower.includes('fetch failed') ||
    lower.includes('connection')
  );
}

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      console.error('[CHAT-API] GROQ_API_KEY belum diisi di .env.local');
      return new Response('Missing GROQ_API_KEY', { status: 500 });
    }

    const { messages } = await req.json();

    const tools = {
      getProjects,
      getPresentation,
      getResume,
      getContact,
      getSkills,
      getInternship,
    };

    let lastError: Error | null = null;

    // Coba setiap model secara berurutan hingga salah satu berhasil
    for (const modelId of ALL_MODELS) {
      try {
        console.log(`[CHAT-API] Mencoba model: ${modelId}`);

        const result = streamText({
          model: groq(modelId),
          system: SYSTEM_PROMPT.content,
          messages,
          tools,
          maxSteps: 2,
          temperature: 0.3,
        });

        // Data stream protocol: dibutuhkan useChat agar tool card (projects, skills, dll) tampil
        return result.toDataStreamResponse({
          getErrorMessage,
        });
      } catch (error: unknown) {
        const errMsg = getErrorMessage(error);
        lastError = error as Error;
        console.warn(`[CHAT-API] Model ${modelId} gagal: ${errMsg}`);

        // Jika error bukan retryable, tidak perlu coba model berikutnya
        if (!isRetryableError(errMsg)) {
          break;
        }

        // Jika ini model terakhir, lempar error
        if (modelId === ALL_MODELS[ALL_MODELS.length - 1]) {
          throw error;
        }

        // Coba model berikutnya
        continue;
      }
    }

    // Jika semua model gagal
    const errorMsg = lastError ? getErrorMessage(lastError) : 'Unknown error';
    const lower = errorMsg.toLowerCase();

    if (lower.includes('rate limit') || lower.includes('quota') || lower.includes('429')) {
      return new Response('API quota exceeded. Please try again later.', { status: 429 });
    }
    if (lower.includes('network') || lower.includes('fetch failed') || lower.includes('connection')) {
      return new Response('Network error. Please check your connection and try again.', { status: 503 });
    }
    if (lower.includes('does not exist') || lower.includes('not found')) {
      return new Response(
        'Model AI tidak tersedia. Silakan coba lagi nanti.',
        { status: 500 }
      );
    }

    return new Response(`Internal Server Error: ${errorMsg}`, { status: 500 });
  } catch (error: unknown) {
    console.error('[CHAT-API] error fatal:', getErrorMessage(error));
    return new Response(`Internal Server Error: ${getErrorMessage(error)}`, { status: 500 });
  }
}
