# Student walkthrough — 20 steps, no fake evidence

1. Unzip, inspect `README.md`, `AGENTS.md` and `git status`.
2. Confirm Node 22/npm/Git; confirm the existing OpenClaw `main` agent if using it.
3. Install the checked-in dependency versions with `npm ci`.
4. Copy `.dev.vars.example` to `.dev.vars`; generate a secret. Never commit it.
5. For Cloudflare remote resources, create D1 + KV and update real IDs in `wrangler.jsonc`.
6. Run `npm run generate-types` and `npm run typecheck`.
7. Run `npm run build` and `npm run test:unit` / `npm run test:ui`.
8. Run `npm run db:local`; confirm only migration 0001 is active.
9. Run `npm run seed:local` and check D1 events and the KV announcement. If a deeply nested Windows checkout causes local storage errors, use the [short-path instructions](README.md#windows-local-storage).
10. Run `npm run dev` in Terminal 1.
11. In Terminal 2: GET `/api/health`, `/api/events`, `/api/config`, `/`, `/styles.css`, `/assets/app.js`.
12. Open local URL in Chrome/Firefox/Safari. Search by 'Concert'.
13. Select an event, enter test email, reserve **1** seat (no real customers).
14. Observe HTTP 201; keep receipt private, do not put token in screenshots.
15. Cancel with receipt ID/code; confirm updated seats from the Worker API.
16. From Terminal 2 set the exact local `ADMIN_TOKEN` and `BASE_URL` then run all LOCAL HTTP tests.
17. Record actual, redacted results in `docs/browser-test-report.md` and `evidence/`.
18. Prepare `docs/proposal.md`, initial Spec Kit material, the project Wiki; don't claim unverified tests passed.
19. Freeze v1.0 baseline. Obtain CHG-001 approval; create v1.1 feature branch.
20. Follow `instructor/v1.1-reference/UPGRADE.md`; never accidentally apply migration 0002 to baseline.

The handout's Appendix C is a **v1.1 teaching example**. This ZIP intentionally starts at **v1.0**.
