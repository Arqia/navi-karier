# NaviKarier Frontend

Next.js 14 (App Router) + TypeScript untuk UI produk NaviKarier — skill gap analyzer.

## Stack
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript 5**
- Vanilla CSS dengan design tokens (lihat `app/globals.css`)
- Font: Instrument Serif + Geist + Geist Mono (Google Fonts)

## Struktur

```
frontend/
├── app/
│   ├── layout.tsx         # Root layout + Google Fonts preconnect
│   ├── page.tsx           # Halaman / (hero + features placeholder)
│   ├── globals.css        # Design tokens NaviKarier
│   └── components/
│       └── HeroWidget.tsx # Playable Skill Gap Meter (client component)
├── next.config.mjs        # Rewrite /api/* → backend FastAPI
├── tsconfig.json
├── package.json
├── .env.local.example     # Copy ke .env.local
└── .gitignore
```

## Setup

```bash
cd frontend

# 1. Install
npm install

# 2. Env
copy .env.local.example .env.local       # Windows
# cp .env.local.example .env.local       # macOS / Linux

# 3. Run
npm run dev
```

Buka http://localhost:3000.

## Integrasi Backend

`next.config.mjs` rewrite `/api/*` ke `NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:8000`). Jadi dari client cukup `fetch('/api/...')` — Next akan proxy ke FastAPI tanpa CORS issue saat dev.

Pastikan backend jalan dulu (lihat `../backend/README.md`).

## Scripts

| Script | Aksi |
|---|---|
| `npm run dev` | Dev server di port 3000 |
| `npm run build` | Production build |
| `npm run start` | Serve build di port 3000 |
| `npm run lint` | ESLint (scaffold config dibuat oleh `next lint` pertama kali) |
| `npm run typecheck` | `tsc --noEmit` |

## Catatan
- Folder `../web-utp/` adalah project Vite terpisah, **bukan** NaviKarier — abaikan.
- Folder `../BI-HACKATON/frontend/` adalah placeholder lama, **tidak** dipakai. Source-of-truth frontend ada di sini.
- Landing marketing single-file (`../index.html`) hidup terpisah dan tidak dimerge ke Next.js app ini.
