# AI-Powered Portfolio — Starter Codebase

A full-stack starter for a software engineer / IT professional portfolio: React + Tailwind
frontend, Express + MySQL backend, JWT-authenticated admin API, and an AI assistant endpoint
that answers visitor questions grounded in your real portfolio data.

This is a **working starter**, not a finished product — see "What's stubbed" below before you
present it as complete.

## Stack

- **Frontend:** React (Vite), Tailwind CSS, Framer Motion, React Router, React Hook Form, Axios
- **Backend:** Node.js, Express, Sequelize (MySQL), JWT auth, Nodemailer, express-validator
- **Database:** MySQL 8+
- **AI:** OpenAI-compatible chat completion, grounded with a "RAG-lite" context built from your DB records

## Project structure

```
portfolio/
├── frontend/          React app (Vite)
├── backend/           Express API
├── database/
│   └── schema.sql     MySQL schema — run this first
├── netlify.toml        Frontend deploy config (Netlify)
└── render.yaml          Backend deploy config (Render)
```

## Quick start (local)

### 1. Database
```bash
mysql -u root -p < database/schema.sql
```

### 2. Backend
```bash
cd backend
cp .env.example .env      # fill in DB credentials, JWT_SECRET, etc.
npm install
npm run seed               # creates an admin user + placeholder profile/skills
npm run dev                 # http://localhost:5000
```
Seed credentials come from `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` in `.env` — **change the
password immediately after first login.**

### 3. Frontend
```bash
cd frontend
cp .env.example .env       # VITE_API_URL=http://localhost:5000/api
npm install
npm run dev                  # http://localhost:5173
```

The frontend works even without the backend running — every section falls back to placeholder
content in `frontend/src/data/placeholder.js` (see `useApiData` hook). Swap that file for your
real bio, projects, and resume link, or populate the database and let the API take over.

### 4. Admin dashboard
Visit `/admin/login`, sign in with the seeded admin account. The dashboard includes:
- **Overview** — visit counts, resume downloads, contact submissions, top projects
- **Messages** — contact form submissions, mark-as-read
- **Projects** — add/delete projects (this is the reference implementation; the same
  `GET/POST/PUT/DELETE` pattern in `backend/src/routes/resourceRouter.js` already powers skills,
  experience, education, certificates, achievements, services, and blog posts — you just need to
  add matching admin UI panels for them, following `ProjectsAdmin` in
  `frontend/src/pages/admin/Dashboard.jsx` as a template)

## Deployment

- **Frontend → Netlify:** connect the repo, `netlify.toml` is already configured (base `frontend/`, publish `frontend/dist`).
- **Backend → Render:** `render.yaml` blueprint included. Set the `sync: false` env vars (DB creds, JWT secret, CLIENT_URL, OPENAI_API_KEY) in the Render dashboard.
- **Database:** any managed MySQL works — PlanetScale, Railway, AWS RDS, or Render's MySQL. Point `DB_HOST`/`DB_USER`/etc. at it.

## What's fully built

- All 13 public sections (hero, about, skills, projects, experience, education, certifications,
  achievements, services, testimonials, contact, footer) with glassmorphism styling, dark/light
  mode, and scroll/hover animations
- REST API for every resource in the brief, with public GET + admin-only POST/PUT/DELETE
- JWT auth with role-based access (admin/editor), bcrypt password hashing, rate limiting, Helmet,
  XSS sanitization, input validation on the contact form
- Contact form → DB + optional email notification via Nodemailer
- Analytics event tracking (visits, resume downloads, contact submits) + an admin summary endpoint
- AI assistant chat widget, backed by a context-grounded endpoint (`POST /api/ai/ask`)
- MySQL schema covering every entity in the brief

## What's intentionally stubbed or simplified — extend these before shipping

- **AI assistant** uses "RAG-lite": it stuffs your whole profile/skills/projects/experience into
  the prompt rather than real vector embeddings. Fine at portfolio scale; if you want true
  semantic search, swap in `pgvector`, Pinecone, or similar and retrieve top-k chunks instead.
- **Admin UI** only has full CRUD screens for Projects + Messages. The backend already supports
  the rest — add UI panels the same way.
- **File uploads** (resume PDF, project screenshots, certificate images) aren't wired to Multer
  yet — the schema has `*_url` fields, so plug in an upload route + S3/Cloudinary or serve from
  `/uploads` locally.
- **No PWA / service worker**, no Three.js hero (used a lighter animated SVG graph instead — swap
  in Three.js in `Hero.jsx` if you want the 3D version).
- **No automated tests.**
- Placeholder copy and images throughout (`frontend/src/data/placeholder.js`, seed data in
  `backend/src/config/seed.js`) — replace with your real bio, projects, and resume.

## API reference

See `backend/src/routes/index.js` for the full mount list. Every resource follows:
```
GET    /api/<resource>       public
GET    /api/<resource>/:id   public
POST   /api/<resource>       admin/editor (JWT)
PUT    /api/<resource>/:id   admin/editor (JWT)
DELETE /api/<resource>/:id   admin only (JWT)
```
Special routes: `POST /api/auth/login`, `POST /api/contact`, `POST /api/analytics/track`,
`GET /api/analytics` (admin), `POST /api/ai/ask`.
