# AI Mono-Repo Project Scaffold (Turborepo)

This template is designed for creating full stack monorepos that support the development of modern, multi-agent AI applications.

The project uses **turborepo** with `pnpm` workspaces.  The backend lives in
`apps/api` while a Next.js frontend is scaffolded in `apps/web`.

The scaffold now includes authentication with **Clerk** and a PostgreSQL
database hosted on **Supabase**. Basic pages for user registration, login,
logout and profile management are implemented in the Next.js app. A simple API
route demonstrates how to enforce tenant-based data access using Clerk
authentication together with Supabase row level security policies.

Environment variables can be configured using the provided `.env.example` file.
Add `SUPERUSER_EMAIL` to specify which email address can access the `/super`
page for managing tenants and users.
