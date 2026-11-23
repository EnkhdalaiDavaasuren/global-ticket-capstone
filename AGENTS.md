# Project-local AGENTS.md — ticket capstone

Use the **existing OpenClaw `main` agent**; do not create a new agent. Project selection must explicitly identify this repository, branch and `AGENTS.md` before any edit. The repository is separate from graphene-research and other projects.

## Source authority
- `specs/` and `.specify/memory/constitution.md`: approved intended behavior.
- `src/`, `client/`, `public/`, `migrations/`, `tests/`: implemented behavior.
- `docs/` + `evidence/`: actual reviewed decisions/results.
- `wiki/`: summarized lessons, never higher authority than specs.

## Safety and engineering
- Baseline v1.0 accepts one seat. Do not copy upgrade migration until CHG-001 approval and a feature branch.
- Never invent PASS, deployment URLs, PR numbers, evidence or approvals.
- No customer secrets, ADMIN_TOKEN, raw cancellation code, logs with email, or unredacted screenshots in Git/Wiki/evidence.
- Client uses typed React TSX, safe JSX text rendering and same-origin `/api/*`; no frontend D1/KV access.
- Worker uses typed input validation, prepared SQL, atomic D1 `batch()` and conditional mutations, constant-time admin checks.
- Run production **read-only** smoke. Remote migration, seed, deployment, secrets and data deletion require explicit human approval.
- No SQL BEGIN/COMMIT inside Worker D1 code. Don't change a production-applied migration.
- Use npm scripts; keep Worker/client/tests TypeScript projects separate.
- Run `npm run build` before deploying. Verify actual tests rather than trusting source examples.
- `public/assets/app.js` is generated and not edited by hand.

## Main-agent reporting
Project, branch, spec, files changed, commands actually run, observed results, open risks, evidence links, next approval needed.
