# Crooked Numbers Web

React and TypeScript frontend for exploring current MLB team information through the
Crooked Numbers API.

## Prerequisites

- Node.js 22 LTS or newer
- npm 11 or newer
- A running `crooked-numbers-api` instance

## Environment

Copy the example environment file and point it at the API:

```bash
cp .env.example .env.local
```

The default example sets `VITE_API_BASE_URL=http://localhost:5088/api`. Vite exposes
this value at build time; use the appropriate API URL in each environment.

## Run locally

```bash
npm ci
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`).

## Validation

```bash
npm run typecheck
npm run lint
npm run format:check
npm test
npm run build
```

Use `npm run lint:fix` and `npm run format` to apply automatic fixes. Tests use Vitest,
React Testing Library, and mocked HTTP responses; they do not call a running API.

## Application routes

- `/` — team selection
- `/teams/:teamId` — team overview, active roster, batting, pitching, and schedule tabs

React Query owns remote state. API calls and JSON contracts live under `src/api` so UI
components do not depend on the MLB Stats API directly.
