# NaviKarier Backend

FastAPI server untuk NaviKarier — skill gap analyzer.

## Stack
- **FastAPI** — web framework
- **SQLAlchemy** — ORM
- **Pydantic** — validation
- **PyPDF2 + LangChain** — CV parsing & AI features
- **SQLite** (dev) → **PostgreSQL** (prod, opsional)

## Struktur

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py           # FastAPI entrypoint (mount /api)
│   ├── database.py       # SQLAlchemy engine + Base
│   ├── models.py         # ORM models
│   ├── services.py       # Business logic
│   └── api/
│       ├── __init__.py
│       ├── routes.py     # FastAPI router
│       └── controllers.py
├── requirements.txt
├── .env.example          # Copy to .env
└── .gitignore
```

## Setup

```bash
cd backend

# 1. Virtualenv
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

# 2. Install
pip install -r requirements.txt

# 3. Env
copy .env.example .env       # Windows
# cp .env.example .env       # macOS / Linux

# 4. Run
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

## API
- `GET /` — health check
- `GET /api/...` — lihat `app/api/routes.py`

## Notes
- Folder `BI-HACKATON/backend/` di root worktree adalah **versi awal**. Source-of-truth sekarang ada di sini (`backend/`).
- Tambah `python-dotenv` ke `requirements.txt` kalau mau auto-load `.env`.
