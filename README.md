# Unstuck App

> Break down overwhelming tasks into small, manageable microsteps — powered by AI.

Unstuck is a fullstack application built for people with ADHD who struggle to start tasks. You describe your goal and what's stopping you, and the AI breaks it down into clear microsteps with encouragement. It does not guarantee results though.

---

## Architecture

Unstuck is built as a distributed system with three parts:

```
Frontend (React + Vite)
    ↓
ContentAPI (Service A) — ASP.NET Core
    ↓
LLMProxyAPI (Service B) — ASP.NET Core
    ↓
HuggingFace (External LLM API)
```

- **Frontend** — React app with Tailwind CSS
- **ContentAPI** — Handles CRUD for task breakdowns, calls LLMProxyAPI
- **LLMProxyAPI** — Secure proxy to HuggingFace LLM

---

## Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/your-username/unstuck.git
cd unstuck
```

### 2. Set up the backend

See [backend/README.md](./unstuckapp-backend/README.md) for full instructions including User Secrets setup.

```bash
cd unstuckapp-backend
# Open ContentAPI.sln in Visual Studio
# Set both ContentAPI and LLMProxyAPI as startup projects
# Press F5
```

### 3. Set up the frontend

```bash
cd unstuckapp-frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Backend | ASP.NET Core 9, Entity Framework Core |
| Database | InMemory (EF Core) |
| LLM | HuggingFace — Qwen2.5-7B-Instruct |
| Auth | API key (service-to-service) |
| Docs | Scalar |

---

## Features

- AI-generated microsteps and encouragement
- Save, view and delete task breakdowns
- Track progress with checkboxes per microstep
- Scare factor — set manually or let AI decide
- Search and filter tasks by category
- Dark mode
- Confetti on task creation

---

## Notes

**Client-side filtering:** The frontend currently filters tasks client-side for simplicity. The backend already supports server-side filtering via query parameters (`?category=Health&sortBy=-createdAt`). For larger datasets, filtering should be moved to API calls.

---

## License

MIT
