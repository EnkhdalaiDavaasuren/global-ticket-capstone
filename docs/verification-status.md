# Lab 0 and Session 1 verification

November 23, 2026 (Asia/Chita) · `global-ticket-capstone` · `main` · [001-v1-baseline](../specs/001-v1-baseline/spec.md)

## Tooling and observed results

| Command or check | Observed result |
| --- | --- |
| `node -v`, `npm -v`, `git --version`, `uv --version`, `specify --version` | Default Node 26.13.1, npm 11.20.0, Git 2.51.0.windows.2, uv 0.11.29, Specify 1.4.2. Selected cached Node 22.23.5 for the supported runtime |
| `npm ci --offline --no-audit --no-fund` | Clean install from the existing lockfile in a temporary directory added 191 packages. The initial in-place attempt hit a Windows permission error, and the clean install emitted an engine warning from the host npm and dependency warnings |
| `npm run typecheck` | Wrangler type generation and separate Worker, React, and test TypeScript checks passed after declaring the readiness script as a module |
| `npm run build` | esbuild generated the React bundle |
| `npm run test:unit`, `npm run test:ui` | 13 unit and 5 UI tests passed |
| `npm run db:local`, `npm run db:seed:local`, `npm run kv:seed:local`, `npm run dev` | On Node 22 with the same short Windows `--persist-to` path, migration 0001 applied, both event rows and KV seed loaded, and the Worker started on port 8787 |
| Local GET requests using `curl.exe` | `/api/health`, `/api/events`, `/api/config`, `/`, `/styles.css`, and `/assets/app.js` each returned 200 |
| `npm run test:integration`, `npm run test:regression`, `npm run test:concurrency`, `npm run test:security` | 3 integration, 1 regression, 1 concurrency, and 2 security tests passed against localhost after forwarding the supplied Worker URL through the Vitest config |
| Chrome and read-only local D1 query | Booking returned 201 and cancellation returned 200. Inventory changed 100 → 99 → 100. Wrong and reused codes returned 404 without changing inventory. [Browser report](browser-test-report.md) |
| `git check-ignore` | Local `.dev.vars`, generated JS, and generated Worker types are ignored |
| `openclaw agents list` and targeted `openclaw agent --agent main` | Existing `main` found. A read-only project prompt named this repo, branch, and `AGENTS.md`. Model sign-in failed before the agent confirmed project selection |

## Review status

- The engineering constitution and v1.0 specification remain pending human approval. The [proposal](proposal.md), [architecture](architecture.md), [UX notes](frontend-ux.md), and [Wiki index](../wiki/index.md) are available for review.
- Git had no commit, tag, or remote at verification time. The reviewed baseline and its `v1.0.0` tag await sign-off and a Git author address suitable for sharing. A GitHub remote is needed to publish them.
- Obsidian was found on disk. Vault navigation and the OpenClaw Telegram workflow require interactive verification.
- Production smoke awaits a real HTTPS deployment URL. Wrangler IDs are local placeholders, and remote resource changes and deployment require approval.
