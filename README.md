# Mac Anderson's SaaS Multi-agent App Scaffolding (Turborepo)

This template is designed for creating full stack monorepos that support the development of modern, multi-agent AI applications.

The project uses **turborepo** with `pnpm` workspaces. The backend lives in
`apps/api` while a Next.js frontend is scaffolded in `apps/web`.

The scaffold includes authentication with **Clerk** and a PostgreSQL
database hosted on **Supabase**. Basic pages for user registration, login,
logout and profile management are implemented in the Next.js app.
The web frontend communicates with a **FastAPI** backend located in
`apps/api`, replacing the previous Next.js API routes.
Example endpoints in the Python app enforce tenant-based data access using
Clerk authentication together with Supabase row level security policies.

Environment variables can be configured using the provided `.env.example` file.

Add `SUPERUSER_EMAIL` to specify which email address can access the `/super`
page for managing tenants and users.
Set `NEXT_PUBLIC_API_URL` to the URL of the FastAPI backend (defaults to
`http://localhost:8000`).

Tailwind CSS v3 is configured in the `web` app for styling components, and the
Tailwind and PostCSS configuration files are written in TypeScript.

## Installation

To install all Node and Python dependencies, run:

```bash
./scripts/install.sh
```
