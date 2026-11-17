# Goro Aji Ramadhan — Portfolio

Portofolio pribadi dengan AI chatbot (Next.js + Groq).

## Menjalankan
```bash
pnpm install
cp .env.example .env.local   # isi GROQ_API_KEY dan NEXT_PUBLIC_SITE_URL
pnpm dev
```

## Mengubah konten
Seluruh data (profil, skill, proyek, kontak) ada di `portfolio-config.json`.

## Catatan
- Letakkan file CV kamu di `public/resume-goro-aji.pdf`.
- Ganti `public/profile.png` dengan foto kamu.
- Template dasar: Anuj Jain (MIT License, lihat `docs/LICENSE`).
