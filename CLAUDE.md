# CLAUDE.md — Panduan Sesi Claude Code

Catatan ini auto-loaded saat Claude Code dibuka di root worktree.
Tujuan: cegah Claude menyentuh folder yang tidak relevan dan pastikan
pekerjaan masuk ke direktori yang benar.

## Project
**NaviKarier** — AI-powered skill gap analyzer untuk job seekers Indonesia.
Hackathon: Digdaya × Hackathon 2026 (Bank Indonesia × OJK).

## Direktori yang BOLEH disentuh

| Path | Isi |
|---|---|
| `backend/` | FastAPI app (source-of-truth) |
| `frontend/` | Next.js 14 App Router app (source-of-truth) |
| `index.html` | Landing marketing single-file (standalone) |
| `README.md` | Root docs |
| `CLAUDE.md` | File ini |

## Direktori yang TIDAK BOLEH disentuh

Jangan baca, edit, copy, atau jadikan sebagai "tujuan utama" pekerjaan:

| Path | Alasan |
|---|---|
| `BI-HACKATON/` | Versi awal monorepo. Sudah dimigrasi ke `backend/`. Biarkan untuk referensi. |
| `web-utp/` | Project Vite tidak terkait NaviKarier. Punya orang lain / project lain. |
| `axic-games/` | Project tidak terkait. |
| `money-tracker/` | Project tidak terkait. |

Jika user minta fitur baru, **default-nya** masuk ke `frontend/` atau `backend/` — bukan ke folder-folder di atas.

## Stack

### Backend (`backend/`)
- Python 3, FastAPI, SQLAlchemy, Pydantic
- Entry: `app/main.py` → `uvicorn app.main:app --reload --port 8000`
- API mount: `/api`
- Lihat `backend/README.md`

### Frontend (`frontend/`)
- Next.js 14 App Router, TypeScript, React 18
- Vanilla CSS dengan design tokens di `app/globals.css`
- Font: Inter + JetBrains Mono (Google Fonts)
- Dev: `npm run dev` → http://localhost:3000
- API proxy: `/api/*` → `NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:8000`)
- Lihat `frontend/README.md`

## Design System (singkat)

Aesthetic: Dark mode, unkey.com-inspired, developer-focused.

Color tokens (lihat `frontend/app/globals.css` dan `index.html` `:root` untuk lengkap):
- `--bg` `#09090b` (near-black background)
- `--ink` `#fafafa` (primary text, putih lembut)
- `--ink-2` `#a1a1aa` (secondary text)
- `--ink-3` `#71717a` (tertiary/muted)
- `--accent` `#3b82f6` (blue accent)
- `--red` `#ef4444` (gap / warning)
- `--green` `#22c55e` (strength / success)
- `--amber` `#f59e0b` (medium / in-progress)

Font: Inter (body) + JetBrains Mono (code/labels).

**Jangan pakai:** Instrument Serif, Geist, Poppins, gradient ungu, light mode backgrounds.

## Workflow Saran

1. Sebelum mengubah file, konfirmasi targetnya ada di `backend/`, `frontend/`, atau file root yang diijinkan.
2. Untuk fitur baru: tulis dulu rencana ringkas (file mana yang akan disentuh) sebelum eksekusi.
3. Untuk hal yang lintas backend ↔ frontend: tulis type contract dulu (Pydantic model di backend, TS type di frontend), baru implementasi.

## Hindari

- Membuat folder baru di root tanpa konfirmasi user.
- Menyentuh `web-utp/`, `BI-HACKATON/`, `axic-games/`, `money-tracker/`.
- Menjalankan `npm install` / `pip install` tanpa konfirmasi (mahal & lambat).
- Generate ulang `index.html` — itu landing yang sudah jadi.
