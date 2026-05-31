# NaviKarier

> AI-powered skill gap analyzer untuk job seekers Indonesia.
> *Dari tebakan jadi data.*

Hackathon: **Digdaya × Hackathon 2026** (Bank Indonesia × OJK).

## Struktur Repo

```
/
├── backend/          ← FastAPI (source-of-truth)
├── frontend/         ← Next.js 14 App Router (source-of-truth)
├── index.html        ← Landing marketing single-file (standalone)
│
├── BI-HACKATON/      ← Versi awal monorepo. Referensi, tidak dipakai aktif.
├── web-utp/          ← Project Vite terpisah, BUKAN NaviKarier. Abaikan.
├── axic-games/       ← Project lain. Abaikan.
└── money-tracker/    ← Project lain. Abaikan.
```

**Hanya `backend/`, `frontend/`, dan `index.html` yang relevan untuk NaviKarier.**

## Quick Start

### Backend (FastAPI)
```bash
cd backend
python -m venv venv
venv\Scripts\activate            # Windows
# source venv/bin/activate       # macOS / Linux
pip install -r requirements.txt
copy .env.example .env           # Windows
# cp .env.example .env           # macOS / Linux
uvicorn app.main:app --reload --port 8000
```
→ http://localhost:8000/docs

### Frontend (Next.js)
```bash
cd frontend
npm install
copy .env.local.example .env.local   # Windows
# cp .env.local.example .env.local   # macOS / Linux
npm run dev
```
→ http://localhost:3000

### Landing marketing
Buka `index.html` di browser langsung — single file, no build, no server.

## Detail
- [`backend/README.md`](backend/README.md) — FastAPI stack, env vars, API routes
- [`frontend/README.md`](frontend/README.md) — Next.js scripts, integrasi backend
- [`CLAUDE.md`](CLAUDE.md) — panduan untuk session Claude Code

## License
2026 NaviKarier — developed for Digdaya × Hackathon 2026.
