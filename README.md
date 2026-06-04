# NaviKarier

> Dari tebakan jadi data. Platform diagnostik karier berbasis AI untuk job seekers Indonesia.

**Digdaya × Hackathon 2026** — Bank Indonesia × OJK
Problem Statement: Digitalisasi Penciptaan Lapangan Kerja

---

## Apa itu NaviKarier?

NaviKarier adalah platform **Skill Gap Advisor** yang membantu pencari kerja Indonesia mengetahui secara presisi kompetensi apa yang kurang untuk posisi yang mereka inginkan — dan langkah konkret untuk menutupnya.

Alur kerjanya sederhana:

1. Upload CV (PDF/DOCX) + tentukan posisi target
2. AI menganalisis dan membandingkan profil dengan standar kompetensi industri
3. Kamu mendapat **Match Score**, **Skill Gap List**, dan **Training Roadmap** yang spesifik

Bukan sekadar cek keyword. NaviKarier membaca konteks pengalaman secara semantik menggunakan LLM.

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | Next.js 14 App Router, TypeScript, React 18 |
| Backend | Python 3, FastAPI, SQLAlchemy, Pydantic |
| AI Engine | LangChain + OpenAI GPT-4o |
| CV Parsing | PyPDF2 |
| Database | SQLite (dev) → PostgreSQL (prod) |
| Deployment | Vercel (frontend), Railway (backend) |

---

## Struktur Repo

```
/
├── backend/     ← FastAPI app (source-of-truth)
├── frontend/    ← Next.js 14 App Router (source-of-truth)
└── index.html   ← Landing page standalone
```

> Folder lain di root (`BI-HACKATON/`, `web-utp/`, dll) adalah project terpisah, bukan bagian NaviKarier.

---

## Quick Start

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS / Linux
pip install -r requirements.txt
cp .env.example .env         # isi OPENAI_API_KEY
uvicorn app.main:app --reload --port 8000
```

API docs: `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local   # isi NEXT_PUBLIC_API_BASE_URL
npm run dev
```

App: `http://localhost:3000`

### Landing Page

Buka `index.html` langsung di browser — tidak perlu build atau server.

---

## Cara Kerja (Pipeline)

```
CV (PDF/DOCX) + posisi target
        ↓
   PyPDF2 — ekstraksi teks
        ↓
   LangChain + GPT-4o — analisis semantik
        ↓
   JSON: { match_score, skill_gaps[], training_roadmap[] }
        ↓
   Dashboard: Match Score · Skill Gap · Roadmap
```

Data CV **tidak disimpan** setelah analisis selesai. Hanya hasil analisis yang dipersistensi.

---

## Tim

**Brawijaya 303** — Universitas Brawijaya

| Nama | Peran |
|---|---|
| Arva Mada Jayastu | Project Lead, Frontend Developer |
| Farrel Arzaqia Mecca | Backend Developer, AI Integration |
| Fairuz Zata Amani | Business Analyst, Documentation |

---

## Dokumentasi Detail

- [`backend/README.md`](./backend/README.md) — FastAPI setup, env vars, API routes
- [`frontend/README.md`](./frontend/README.md) — Next.js scripts, proxy config

---

## License

2026 NaviKarier — Dibuat untuk Digdaya × Hackathon 2026.
