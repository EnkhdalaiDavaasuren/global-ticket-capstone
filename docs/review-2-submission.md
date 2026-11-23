# W-13 capstone — Review 2 submission

**Project** `global-ticket-capstone` · **Branch** `main` · **Baseline** v1.0 single-seat reservation

## Human approval

| Document | Status |
| --- | --- |
| [Engineering constitution](../.specify/memory/constitution.md) | Awaiting human approval |
| [v1.0 baseline specification and API contract](../specs/001-v1-baseline/spec.md) | Awaiting human approval |

Both files in the tagged commit still say approval is pending. The published tag establishes the tested code snapshot. Record the human approval and date separately when provided.

## Published baseline

- Local `HEAD`, local `origin/main`, live GitHub `main`, and the peeled `v1.0.0` tag all point to `e25f32b59991b7db0e159d905fe28966c665926e`. The annotated tag object is `cf3154d42298f9dcd66e6a4facfff478edfa6853` locally and on GitHub. Verified with `git show-ref`, `git rev-parse`, and `git ls-remote`. [GitHub baseline](https://github.com/EnkhdalaiDavaasuren/global-ticket-capstone/tree/v1.0.0)
- `gh run list --commit` and `gh run view` confirmed the workflow for that commit completed, with `ci` successful and `deploy` skipped. [GitHub Actions run](https://github.com/EnkhdalaiDavaasuren/global-ticket-capstone/actions/runs/45165798118)

## Completed

- Local React build and all three TypeScript project checks passed. The unit, UI, integration, regression, concurrency, and security suites passed **25 tests** in total. [Commands and observed results](verification-status.md)
- Headless Chrome exercised the real local Worker with D1 and KV. The six local GET checks returned HTTP 200. The browser searched for and selected the concert, booked one seat with HTTP 201, and cancelled with HTTP 200. D1 inventory went **100 → 99 → 100**. Invalid and reused codes returned HTTP 404 and preserved inventory. [Browser report](browser-test-report.md) · [Redacted screenshot](../evidence/baseline/browser-v1-local.png)
- The Git ignore rules cover local secrets, the generated client bundle, and generated Worker types. The active migrations directory contains only `0001_initial_v1.sql`.
- The [project proposal](proposal.md), [architecture](architecture.md), [frontend UX](frontend-ux.md), [baseline plan](../specs/001-v1-baseline/plan.md), [tasks](../specs/001-v1-baseline/tasks.md), and [Wiki](../wiki/index.md) are ready for review.
- A read-only CLI turn targeted to the existing OpenClaw `main` agent returned `MAIN_AGENT_OK`, the exact repository and branch, and the matching HEAD SHA. The response identified the two files read, `AGENTS.md` and the v1.0 spec, correctly reported the spec as draft, and cited the CHG-001 migration rule.
- Registered the project's `wiki/` directory in Obsidian and opened it. Obsidian marked the exact vault path open and saved `index.md` as the active note. A filesystem check found zero missing Wiki link targets.

## Instructor checklist cross-reference

| Source | Verified coverage | Remaining |
| --- | --- | --- |
| Lab 0 PDF, pp. 56–57 | Tooling and proposal, React starter, separate TypeScript projects, Spec Kit structure, automated evidence, local Worker/D1/KV, browser journey, OpenClaw project access, Wiki vault | Capstone Telegram exchange |
| Session 1 PDF, pp. 68–69, Review 2 | Browser search, single-seat reservation and cancellation, D1 confirmation, confirmed API behavior, build and test evidence, redacted screenshot, synchronized Git baseline | Human approval of the constitution and confirmation of the spec as the approved baseline. Present the live demo at the review. |
| Session 1 PDF, p. 68, Review 3 | Plan, tasks, architecture, frontend UX, linked Wiki, and more than four negative cases recorded | Keyboard-only and simulated offline browser checks remain open as additional coverage |

## Pending or blocked

| Requirement | Status |
| --- | --- |
| Telegram interaction | `openclaw channels status --probe` reported both accounts connected. The route listing showed the default route to `main` and the separate bookstore account route to `bookstore`. The capstone-specific Telegram round trip remains unverified. |
| Human approval | The tagged constitution and specification remain drafts. Await an explicit approval record. |
| Submission | This verification report is a working-tree update after the synchronized baseline tag. |
