# Software Engineering Capstone Project
## Global Event Ticket Reservation System

**Full-stack TypeScript · React + TypeScript (TSX) Browser UI · Cloudflare Workers/D1/KV · GitHub Pull Requests · CI/CD · Single OpenClaw `main` Agent · Spec Kit · Project Wiki · Obsidian · Telegram**

**Course dates:** November 23–December 9, 2026  
**Duration:** About two and a half weeks (Nov 23–Dec 9); six sessions  
**Focus:** Requirements → Design → TypeScript implementation → Testing → Code Review → CI → CD → Operations → Maintenance → Version Evolution  
**Revision:** v5 — November 23, 2026; applies the v4 review: API contract/test consistency, a supervised v1.0 production baseline, local-only write testing, a production React build, step-scoped CI/CD credentials, constant-time admin checks, and the Common Core 80 + Individual 20 grading structure (see Appendix B). React + TypeScript (TSX) edition.

> ### Evidence Policy — read once, applies to the whole document
>
> 1. **Nothing in this document has been executed.** Every command, configuration file, npm script, folder tree, code sample, SQL statement, log line, HTTP status, latency figure, path, and resource ID is a **target or example**, not a record of a verified result.
> 2. **Placeholders must be replaced.** Values such as `<YOUR_USER>`, `REPLACE_WITH_ACTUAL_DATABASE_ID`, `YOUR_EVENT_ID`, `THE-ACTUAL-DEPLOYED-URL`, and example column names must be replaced with values observed on the student's own machine, repository, and Cloudflare account.
> 3. **Expected outcomes are a teaching contract.** Tables of expected HTTP responses and smoke results describe what a correct implementation should return. A student's implementation passes only when real output shows it.
> 4. **Folder trees and scripts are target structures.** Listing a file or an npm script does not prove that it exists or works. Create files as the Labs introduce them and verify each script before relying on it.
> 5. **Templates are for students to commit and review.** `AGENTS.md`, `SKILL.md`, workflow, and report templates must be adapted to the real starter. When a command differs, update `package.json`, `AGENTS.md`, and CI together.
> 6. **Record real evidence, never invented evidence.** Store actual (redacted) command output, run URLs, commit SHAs, and timestamps in `evidence/`, `docs/`, and `wiki/`. A document, Wiki page, or traceability matrix containing invented `PASS`, PR, or deployment data is unacceptable and earns no credit.
> 7. **Write testing is local only (v5).** This course defines no staging environment. Reservation and cancellation writes are tested against the local Worker and local D1. Production is touched read-only, except for the instructor-authorized v1.0 baseline test data created in Lab 2 Step 0.

# 1. Project Overview and Learning Outcomes

## 1.1 Project Purpose

Students will develop, verify, review, deploy, operate, and evolve a production-style **full-stack Global Event Ticket Reservation System**. Students use a real browser to **search for events → select an event → reserve seats → view a confirmation and private cancellation code → cancel a reservation → observe updated availability**. The browser client is written in **React + TypeScript (TSX) with CSS**; the API is a Cloudflare Worker, D1 maintains reservations/inventory, and KV provides announcements/configuration. Database design and SQL are supporting technologies; the assessment primarily concerns **software engineering process and evidence**.

The shared baseline is **Version 1.0**, in which each reservation contains one seat. Through approved changes, students deliver **Version 1.1**, which supports reservations of one to five seats, preserves previous reservations, and demonstrates the complete release lifecycle.

AI assistance is permitted throughout the work. However, students remain responsible for understanding the code, checking generated artifacts, reviewing changes, and substantiating every test and deployment claim.

## 1.2 Seven Learning Outcomes

By the end of the project, students will be able to:

1. Explain the complete software engineering lifecycle, from requirements to deployment and operations.
2. Build and use a **React + TypeScript (TSX) front-end** integrated with **Cloudflare Workers, D1, and KV**, including event search, reservation, cancellation, and error states.
3. Upgrade both the **browser UI and Worker API** from Version 1.0 to Version 1.1, including **backward-compatible D1 schema changes**.
4. Execute **unit, browser UI (Vitest/jsdom), integration, regression, concurrency, security, and smoke tests**; demonstrate a real browser journey.
5. Verify and deploy changes using **GitHub Pull Requests and CI/CD**.
6. Validate authentication, authorization, secrets management, and operational logging.
7. Present a final verified release and an **18-component software engineering portfolio**.

## 1.3 Complete Lifecycle

```text
Requirements → Design → Implementation → Testing → Code Review
     → Continuous Integration → Continuous Deployment
     → Operations → Maintenance → Evolution
```

A feature is not complete when AI produces code. It is complete only when the change is **specified, reviewed, tested, securely released, and verified**.

## 1.4 Mandatory Full-Stack User Journey (Added in v3)

**Definition of Done:** A student can open the application URL in Chrome, Safari, or Firefox; type an event keyword; choose a matching event; submit a reservation; receive a real reservation identifier and a one-time cancellation code; cancel that reservation from the same UI; and refresh the events to verify that remaining inventory is restored. These actions must reach the **real Worker API and D1**, not hard-coded browser fixtures. KV data must remain accessible through its read API. Before v1.1, one reservation means one seat; after v1.1, the user can select **1–5 seats**.

| Journey | v1.0 baseline (Review 2) | v1.1 release (Review 6) | Required proof |
|---|---|---|---|
| Search/browse events | Search visible events by title in the browser | Same behavior retained | Browser screen + GET `/api/events` |
| Reserve | One-seat form | Quantity selector 1–5; errors 400/409 handled | UI + POST + D1 inventory record |
| Confirm | Real reservation ID and private cancellation code | Shows quantity and keeps code private | Redacted screen, test assertion |
| Cancel | Cancel using ID and private code | Restore **all** reserved seats | Browser + D1 pre/post comparison |
| Operations | Local client build and Worker runtime | Approved production asset/API release | CI build, read-only smoke, logs |

**Scope control:** The event keyword search is deliberately **client-side filtering of the `GET /api/events` response**. Full-text search indexes, a new search database, payments, customer accounts, and a browser admin dashboard are **out of scope** unless separately approved. Administrators create test events through the protected API, not by putting `ADMIN_TOKEN` in browser code. No customer email, admin token, or cancellation code is written into screenshots, public logs, Wiki, Git, or URLs.

**Evidence policy extension:** A screenshot alone does not prove persistence; pair it with the actual API response and an authorized, redacted D1 inventory check. No browser or deployment result in this document is a claim of execution.


---

# 2. Six-Session Capstone Schedule

## 2.1 Three Sprints

| Sprint | Dates | Principal objective |
|---|---|---|
| Sprint 1 — Specify & Evolve | Nov 23–30 | **Lab 1:** verified full-stack v1.0 browser search/single-seat reservation/cancellation with Workers/D1/KV. **Lab 2:** supervised v1.0 production baseline release, CHG-001, feature branch, v1.1 group-seat UI + API, D1 migration, UI/unit tests |
| Sprint 2 — Verify & Deliver | Nov 30–Dec 7 | **Lab 3:** browser UI tests + manual browser E2E + API integration/regression/concurrency/security, PR, CI. **Lab 4:** approved CD of HTML/CSS/compiled JS + Worker/D1/KV, read-only asset/API smoke |
| Sprint 3 — Operate & Release | Dec 7–9 | **Lab 5:** UI/Worker security, error/availability states, observability, incident, refactoring. **Lab 6:** live browser search → reserve → cancel defense, release evidence and portfolio |

## 2.2 Six Reviews and Labs

| Date | Student presentation at start of class | Lab begun in class |
|---|---|---|
| **Nov 23 (Mon)** | Review 1 — Product vision, user stories, shared OpenClaw main agent, Spec Kit setup | **Lab 1** — Lifecycle, SDD, architecture, browser UI v1.0 + Workers/D1/KV baseline |
| **Nov 25 (Wed)** | Review 2 — Working TypeScript v1.0 with Workers, D1, KV | **Lab 2** — v1.0 production baseline, v1.1 UI quantity selector, API, change impact, feature branch, D1 migration, UI/unit tests |
| **Nov 30 (Mon)** | Review 3 — v1.0 → v1.1 implementation and testing | **Lab 3** — Browser/UI and API testing, real-browser journey, GitHub PR and CI |
| **Dec 2 (Wed)** | Review 4 — Pull Request, code review, automated CI | **Lab 4** — CD of browser assets + Worker, read-only UI/API smoke, release management |
| **Dec 7 (Mon)** | Review 5 — Production deployment, CI/CD and operational evidence | **Lab 5** — UI/Worker security, observability, incident, refactoring, final release |
| **Dec 9 (Wed)** | Review 6 — Final software engineering defense | **Lab 6** — Live browser demo, portfolio, reflection, and final verification |

**Teaching pattern:** Each class opens with a short Review of completed work. Students then begin the new Lab and complete its remaining deliverables before the next Review. Each Lab ends with a **"Lab N deliverables (presented at Review N+1)"** list. **Lab 0** is preparation before November 23.

---

# 3. Application and Delivery Architecture

## 3.1 Required Architecture

```text
                Customer Browser
            public/index.html (#root)
            React main.tsx → app.js
          App.tsx: Search · Reserve · Cancel
                       │
              same-origin /api/*
                       ▼
                 Cloudflare Workers
              API · Validation · Auth
               Business Logic · Logs
                       │
           ┌───────────┼───────────┐
           ▼           ▼           ▼
          D1           KV        Queues
       Events &     Announcements Optional
      Reservations  Configuration Notifications
           │           │
           └───────────┘
                       │
                 Application
                  Operations


                GitHub Repository
                       │
                       ▼
                Pull Request
                       │
                       ▼
                GitHub Actions
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
     Continuous                 Continuous
     Integration                Deployment
          │                         │
     Unit Tests                D1 Migration
     Integration Tests         Worker Deployment
     Regression Tests          Production Smoke Test
          │                         │
          └────────────┬────────────┘
                       ▼
                Production Release
                       │
                       ▼
                Observability
                       │
                       ▼
             Incident & Maintenance
```

**Design interpretation:** Cloudflare Workers static assets serve `public/index.html`, `public/styles.css`, and the compiled React bundle `public/assets/app.js`; React's typed API module uses `fetch('/api/...')` to reach the same-origin Worker API. **The browser NEVER connects directly to D1 or KV.** Workers is the TypeScript application/API boundary. **D1** is the authoritative source for events, reservations, and remaining seat inventory. **KV** is for announcements and relatively stable configuration, **not** authoritative ticket inventory. **Queues** is optional and is not a prerequisite to pass the capstone. GitHub Actions drives separate CI and gated CD stages. Workers Observability supports incident investigation.

## 3.2 Technology Responsibilities

| Component | Software Engineering Responsibility |
|---|---|
| React + TypeScript (TSX) + CSS | Accessible event search/list, reservation and cancellation components, React hooks/state, status messages |
| Cloudflare static assets | Serve the React build bundle and HTML/CSS over the same origin as the Worker API |
| Cloudflare Workers | Application APIs, validation, authentication, business logic |
| Cloudflare D1 | Persistent reservation data and authoritative inventory |
| Cloudflare Workers KV | Announcements and relatively stable application configuration |
| GitHub | Version control, branching, Pull Requests, code review |
| GitHub Actions | Automated testing and deployment pipelines |
| Wrangler | Local development, migrations, deployment, logs, rollback |
| Workers Observability | Request logging, errors, latency, operational investigation |
| OpenClaw | AI-assisted development, test analysis, documentation, engineering coordination |
| Spec Kit | Requirement specifications, plans, tasks, and change control |
| Karpathy Wiki Skill | Engineering knowledge ingestion, retrieval, and maintenance |
| Obsidian | Markdown review, engineering knowledge, decisions, and lessons |
| Telegram | Student requests, approvals, and AI agent reports |

## 3.3 TypeScript Rules

- **All maintainable Worker application source is TypeScript:** `src/**/*.ts`.
- **All handwritten browser application source is TypeScript/TSX:** `client/**/*.ts` and `client/**/*.tsx` (`client/main.tsx` mounts React, `client/App.tsx` renders the UI, `client/api.ts` calls Worker endpoints, `client/search.ts` filters data).
- **Tests and engineering utilities are TypeScript/TSX:** `tests/**/*.ts`, `tests/**/*.tsx`, `scripts/**/*.ts`.
- `public/index.html` holds `<div id="root"></div>`; `public/styles.css` supplies styles. React JSX renders untrusted strings as escaped text; never use `dangerouslySetInnerHTML` for event/user data. `public/assets/app.js` is **generated from `client/main.tsx` by esbuild (`--jsx=automatic`)** and must not be edited manually. It is listed in `.gitignore`; `npm run build` regenerates it locally, in CI, and in CD, and the production build uses `--minify` so the bundle contains React's production build. Browsers execute JavaScript, but developers write TypeScript/TSX.
- Define Worker binding types with `wrangler types` and run `npm run typecheck` in CI. Keep generated Worker types aligned with `wrangler.jsonc`.
- **Use separate TypeScript projects for separate runtimes** (Section 4.4): the Worker (`src/`) uses Workers runtime types, the React client (`client/`) uses DOM/React JSX types, and tests/scripts use Node.js/DOM types. One combined `tsconfig.json` mixes these global types and produces conflicts.
- **All automated course tests use Vitest** (`tests/**/*.test.ts` and `tests/**/*.test.tsx`), organized as projects (`unit`, `ui`, `integration`, `regression`, `concurrency`, `security`, `smoke`). React UI tests run in **jsdom + React Testing Library**; the separate **manual real-browser journey** is mandatory and recorded as acceptance evidence. Optional Playwright E2E is extra credit.
- SQL remains SQL in `migrations/*.sql`, YAML in `.github/workflows/*.yml`, and Markdown in `docs/`, `specs/`, and `wiki/`.
- Use a consistent supported Node.js version; the sample course workflow uses Node.js 22. Lock dependency versions with `package-lock.json` and use `npm ci` in CI.

## 3.4 Browser Screen Specification and API Contract (Added in v3)

**Screens are React components on one responsive page.** `public/index.html` contains only the `#root` mount node and script reference; `client/main.tsx` mounts React, `client/App.tsx` renders semantic sections, manages controlled forms and state with hooks, `client/search.ts` supplies pure event filtering, and `client/api.ts` owns all HTTP calls. The browser still uses same-origin `/api/*` paths.

| Screen/region | Required elements | Behavior |
|---|---|---|
| Header / announcement | Page title; optional KV announcement | Render as **text**, with a fallback when configuration is unavailable |
| React `EventSearch` region | Controlled search input, event buttons, time, remaining seats, empty/loading/error states | `useState`/`useMemo` and a pure `filterEvents` function; fetch real D1-backed events, no runtime fixtures |
| React reservation form | Selected event, controlled email and seat quantity | v1.0 quantity fixed at 1; v1.1 number input min 1/max 5; disable during pending request |
| React confirmation region | Reservation ID, quantity, private cancellation code | Show code **only after successful POST** in React memory; no URL or storage persistence |
| React cancellation form | Controlled reservation ID/code and Cancel button | Submit over HTTPS/localhost; clear sensitive state and refetch D1-backed events after success |
| React status region | `role="status"` / `aria-live="polite"`, error/empty states | State-driven messages distinguish 400/409/404/5xx and loading conditions |

**Proposed teaching API shape (must be checked against the instructor's real starter and approved in `specs/`; examples are not an assertion that the routes already exist):**

| Operation | Method / path | Example response shape / rule |
|---|---|---|
| List/search source | `GET /api/events` | `{"events":[{"id":"evt-1","title":"Demo Concert","startsAt":"2027-03-01T09:00:00Z","remainingSeats":10}]}`; client filters by title |
| Event detail (**required**; used by integration and concurrency tests) | `GET /api/events/:id` | `200` `{ "id":"evt-1", "title":"...", "startsAt":"...", "remainingSeats":10 }`; `404` for an unknown ID |
| Config/announcement | `GET /api/config` | Existing KV response; document the actual structure before rendering |
| Reserve | `POST /api/reservations` | Body `{ "eventId":"evt-1", "email":"student@example.com", "seatCount":3 }`; `201` returns `{ "reservationId":"...", "cancelToken":"...", "seatCount":3 }`. **v1.0 also returns `seatCount` (always `1`).** `400` invalid input; `404` unknown event; `409` not enough seats |
| Cancel | `POST /api/reservations/:id/cancel` | Body `{ "cancelToken":"..." }`; `200` on success, `404` for unknown/used/invalid credential |
| Protected event creation | `POST /api/admin/events` | Body `{ "title":"...", "startsAt":"...", "capacity":100 }`; `201` returns `{ "id":"evt-...", "title":"...", "startsAt":"...", "remainingSeats":100 }`; `401` without a valid bearer token. Instructor/test tooling only; the token must not appear in browser source |

If the actual baseline returns a raw event array, uses `id` instead of `reservationId`, or has a different cancellation route, **do not pretend the sample is already compatible**: approve one contract, then make the Worker, `client/api.ts`, React components, Vitest, and the spec agree. API field names shown above are the **v3 recommended target**. Never return stored token hashes. Issue an unpredictable raw cancellation code once (at least 128 random bits from `crypto.getRandomValues`), store only its SHA-256 hash, and look the reservation up by hash equality in SQL. That lookup is acceptable because the code is high-entropy and the hash is deterministic; the raw code is never stored or compared. Redact the code from all logs. **A client must never discard a `201` receipt because of a contract mismatch:** once the server has created a reservation, the UI must still show its ID and cancellation code. The browser keeps a current code in the form only while needed and never saves it to localStorage, sessionStorage, cookies, Git, or URL parameters.

**Acceptance criteria, all observable:** AC-UI-01 list populated from D1; AC-UI-02 a title keyword filters shown events; AC-UI-03 one-seat v1.0 booking succeeds; AC-UI-04 v1.1 group booking of 1–5 succeeds; AC-UI-05 0, 6, and non-integers are rejected before submission and by the API; AC-UI-06 a 409 leaves inventory unchanged and shows a clear error; AC-UI-07 cancellation with the right code returns precisely the booked quantity; AC-UI-08 invalid/used code does not restore inventory; AC-UI-09 refreshed availability is consistent with a D1 check; AC-UI-10 build and static assets are deployed with the tested API version; AC-UI-11 user inputs are rendered safely and UI is keyboard operable.



## 3.5 React Component and Data-Flow Design (Added in v4)

React is the **client-side view layer**, not a second backend. The Cloudflare Worker still owns validation, authentication, reservation rules, and D1/KV access.

```text
public/index.html → <div id="root">
              │
      client/main.tsx (createRoot)
              │
       client/App.tsx (hooks)
              │
     ┌────────┼──────────┐
     ▼        ▼          ▼
 EventSearch  Reserve    Cancel
 (React JSX)  (form)     (form)
     │        │          │
     └────────┴──────────┘
              │
   client/api.ts — fetch('/api/*')
              │
       Worker → D1 / KV
```

| React concept | Capstone application | Verification |
|---|---|---|
| Component/JSX | Semantic sections, event buttons, forms and status messages | React Testing Library role/label assertions |
| `useState` | Search keyword, selected ID, form values, loading, receipt, error/status | Controlled-input interaction tests |
| `useEffect` | Initial fetch of real events and optional KV announcement | Mocked API call assertion |
| `useMemo` | Derive case-insensitive matching events from `events` and `search` | Pure search unit check plus component behavior |
| `useCallback` | Stable refresh function for initial load and post-mutation refetch | API refetch count and real-browser checks |
| Conditional rendering | Empty, sold-out, pending, confirmation and server failure states | UI tests for each state |
| React's default escaping | Render `{event.title}` as text, not HTML | No injected element in jsdom |
| `createRoot` | Mount the client into `#root` | Local browser + deployed static-asset smoke |

**State boundaries:** React state holds only current UI values; it is **not** an inventory database. `getEvents()` refetches authoritative D1-backed data after successful mutations. No `ADMIN_TOKEN`, cancellation credential persistence, localStorage cache, or hard-coded production event arrays are allowed in the client. The version change is intentionally small: freeze **`MAX_SEATS = 1` in v1.0**, then change to **`5` with approved CHG-001** and update server validation, D1 schema, and tests in Lab 2. All React code remains client-rendered; server-side rendering, Next.js, and React Router are out of scope.


---

# 4. Unified Project Repository: Code + Wiki + Specs + Evidence

## 4.1 Revised Folder Structure

The following structure adapts the research project pattern (`graphene-research/`) to a **TypeScript software engineering** capstone. The developer changes code and the agent maintains engineering knowledge **inside the same repository**.

```text
global-ticket-capstone/
├── README.md                          # Purpose, setup, runbook, verification
├── AGENTS.md                          # Project-specific rules for the existing main agent
├── package.json                       # npm scripts and TypeScript toolchain
├── package-lock.json                  # Reproducible dependency lockfile
├── tsconfig.base.json                 # Shared strict compiler options
├── tsconfig.json                      # Worker project: src/ + Workers runtime types
├── worker-configuration.d.ts          # GENERATED by `wrangler types`; never edit
├── wrangler.jsonc                     # Worker, D1, KV, assets, observability bindings
├── vitest.config.ts                   # Vitest projects: unit/integration/regression/...
├── .gitignore                         # Dependencies, .dev.vars, public/assets/ (generated)
├── .dev.vars.example                  # Names only (ADMIN_TOKEN=); NEVER real secrets
│
├── .github/
│   ├── workflows/
│   │   └── ci-deploy.yml              # PR CI and approval-gated release pipeline
│   └── pull_request_template.md       # Spec/test/release traceability
│
├── .specify/
│   └── memory/
│       └── constitution.md            # Approved engineering constitution
├── .agents/
│   └── skills/                       # Spec Kit generic-generated project skills
│       └── speckit-*/SKILL.md         # Generated names vary by Spec Kit version
│
├── docs/                               # Reviewed engineering documents
│   ├── proposal.md
│   ├── architecture.md
│   ├── frontend-ux.md                  # Screen flows, UI stories, API contract, accessibility
│   ├── browser-test-report.md          # Real-browser acceptance with redacted evidence
│   ├── change-request-CHG-001.md
│   ├── version-evolution-v1.1.md
│   ├── test-plan.md
│   ├── security-review.md
│   ├── deployment-report.md
│   ├── rollback-plan.md
│   ├── incident-report.md
│   ├── refactoring-report.md
│   ├── release-notes-v1.1.md
│   ├── portfolio-template.md
│   ├── traceability-matrix.md
│   └── ai-prompt-log.md
│
├── references/                         # Instructor handouts and public references
│   └── README.md                       # Source list and citation policy
│
├── src/                                # TypeScript Cloudflare Worker code
│   ├── index.ts                        # Worker entry point / HTTP routing
│   ├── validation.ts                   # Input validation (seatCount, etc.)
│   ├── types.ts                        # Domain types (events, reservations)
│   ├── auth.ts                         # Admin and cancellation authorization
│   ├── logging.ts                      # Structured, privacy-safe operational logs
│   └── services/
│       ├── reservations.ts             # Business rules, inventory consistency
│       ├── events.ts                   # Event operations with D1
│       └── config.ts                   # KV announcement/configuration access
│
├── client/
│   ├── tsconfig.json                   # Browser project: React JSX + DOM types
│   ├── main.tsx                        # createRoot mount into #root
│   ├── App.tsx                         # React hooks, controlled forms, status UI
│   ├── api.ts                          # Typed same-origin Worker API calls
│   └── search.ts                       # Pure case-insensitive title filtering
├── public/
│   ├── index.html                      # HTML shell with React #root mount node
│   ├── styles.css                      # Responsive and keyboard-visible styling
│   └── assets/
│       └── app.js                      # GENERATED by npm run build; gitignored; never edit
│
├── migrations/
│   ├── 0001_initial_v1.sql             # v1.0 baseline database schema
│   └── 0002_seat_count_v11.sql         # v1.1 ONLY after CHG-001 approval
│
├── seeds/
│   ├── d1-seed.sql                     # Idempotent demo events (INSERT OR IGNORE)
│   └── kv-seed.json                    # Initial KV config/announcement keys
│
├── tests/                              # ALL tests run with Vitest
│   ├── tsconfig.json                   # Test/script project: Node.js types
│   ├── helpers/
│   │   └── http.ts                     # BASE_URL, ADMIN_TOKEN, request helpers
│   ├── fixtures/                       # Sanitized test datasets
│   ├── unit/
│   │   └── validation.test.ts          # Pure TypeScript unit tests
│   ├── ui/
│   │   └── App.test.tsx                 # Vitest + Testing Library React UI tests
│   ├── integration/
│   │   ├── api.test.ts                 # Worker + D1 + KV HTTP tests
│   │   └── concurrency.test.ts         # Simultaneous reservation attempts
│   ├── regression/
│   │   └── v1-compat.test.ts           # Preserve v1.0 behavior after upgrade
│   ├── security/
│   │   └── auth.test.ts                # Admin/cancellation protection
│   └── smoke/
│       └── smoke.test.ts               # Read-only production verification
│
├── scripts/
│   ├── wait-for-worker.ts              # CI readiness probe (run with tsx)
│   └── verify-release.ts               # Evidence/checklist helper
│
├── specs/                              # Approved, authoritative requirements
│   ├── 001-v1-baseline/
│   │   ├── spec.md
│   │   ├── plan.md
│   │   └── tasks.md
│   ├── 002-group-reservation/
│   │   ├── spec.md
│   │   ├── plan.md
│   │   └── tasks.md
│   └── 003-production-release/
│       ├── spec.md
│       ├── plan.md
│       └── tasks.md
│
├── wiki/                               # Project-local engineering Second Brain
│   ├── index.md
│   ├── architecture-decisions.md
│   ├── version-evolution.md
│   ├── testing-lessons.md
│   ├── ci-cd-lessons.md
│   ├── security-and-observability.md
│   ├── incidents-and-fixes.md
│   ├── release-history.md
│   ├── sources/                       # Provenance links to specs, PRs, logs, docs
│   │   ├── source-index.md
│   │   └── external-references.md
│   └── raw/                           # Optional immutable, sanitized evidence
│       ├── reviews/
│       ├── tests/
│       ├── deployments/
│       └── incidents/
│
├── skills/                             # Project instructions, NOT a separate agent
│   ├── ticket-sdd/
│   │   └── SKILL.md
│   ├── ticket-testing/
│   │   └── SKILL.md
│   └── ticket-engineering-wiki/
│       └── SKILL.md
│
└── evidence/                           # Actual verified outputs; redact secrets/PII
    ├── baseline/
    ├── browser/                         # Redacted real-browser acceptance proof
    ├── tests/
    ├── pull-requests/
    ├── ci/
    ├── deployments/
    └── incidents/
```

Start from the instructor's v1.0 TypeScript starter or convert the original JavaScript starter deliberately, then add files as the Labs introduce them. Empty folders do not appear in Git unless they contain a tracked file such as `.gitkeep`.

**Critical baseline rule:** `0002_seat_count_v11.sql` is shown above as the **planned final project structure**. It must **not** be present in the active v1.0 migration set before Lab 2. Place it in the v1.1 feature branch only after students approve CHG-001. Otherwise `db:local` may accidentally apply v1.1 before the exercise begins.

## 4.2 One Git Repository, Multiple Types of Truth

| Path | Owner / purpose | Authority |
|---|---|---|
| `specs/`, `.specify/memory/constitution.md` | Approved product requirements and engineering principles | **Authoritative for intended behavior** |
| `src/`, `client/`, `public/`, `migrations/`, `tests/` | Actual browser/API implementation and executable verification | **Authoritative for observed behavior** |
| `.github/workflows/`, `wrangler.jsonc` | Delivery and environment configuration | **Authoritative for release process** |
| `docs/` | Human-reviewed decisions, plans, reports, evidence index | **Reviewed engineering records** |
| `evidence/` | Captured real test, review, CI, and deployment outputs | **Observed evidence** |
| `wiki/` | Agent-maintained summaries, backlinks, decisions and lessons | **Derived knowledge; never overrides approved specs** |
| `AGENTS.md` | Instructions for working safely within this repository | **Project operating rules, not an independent agent identity** |

## 4.3 TypeScript Toolchain and npm Scripts

Install runtime dependencies **`react` and `react-dom`**. Development dependencies: `typescript`, `wrangler`, `vitest` (3.2 or later for `test.projects`), **`jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@types/react`, `@types/react-dom`**, `tsx`, `esbuild`, and `@types/node`. Choose mutually compatible versions, install them, and commit `package-lock.json`. React is bundled for the browser; it must **not** be imported into the Cloudflare Worker.

```json
{
  "scripts": {
    "build:client": "esbuild client/main.tsx --bundle --jsx=automatic --format=esm --target=es2022 --minify --outfile=public/assets/app.js",
    "build": "npm run build:client",
    "dev:client": "esbuild client/main.tsx --bundle --jsx=automatic --format=esm --target=es2022 --sourcemap --outfile=public/assets/app.js --watch",
    "generate-types": "wrangler types",
    "typecheck": "npm run generate-types && tsc -p tsconfig.json && tsc -p client/tsconfig.json && tsc -p tests/tsconfig.json",
    "dev": "npm run build && wrangler dev",
    "test": "npm run test:unit",
    "test:unit": "vitest run --project unit",
    "test:ui": "vitest run --project ui",
    "test:integration": "vitest run --project integration",
    "test:regression": "vitest run --project regression",
    "test:concurrency": "vitest run --project concurrency",
    "test:security": "vitest run --project security",
    "smoke": "vitest run --project smoke",
    "db:local": "wrangler d1 migrations apply ticket-db --local",
    "db:remote": "wrangler d1 migrations apply ticket-db --remote",
    "db:seed:local": "wrangler d1 execute ticket-db --local --file=seeds/d1-seed.sql",
    "db:seed:remote": "wrangler d1 execute ticket-db --remote --file=seeds/d1-seed.sql",
    "kv:seed:local": "wrangler kv bulk put seeds/kv-seed.json --binding=APP_KV --local",
    "kv:seed:remote": "wrangler kv bulk put seeds/kv-seed.json --binding=APP_KV --remote",
    "seed:local": "npm run db:seed:local && npm run kv:seed:local",
    "deploy": "npm run build && wrangler deploy"
  }
}
```

Rules for the scripts:

- Every `test:*` script and `smoke` runs **Vitest** (including React Testing Library in the `ui` jsdom project); there are no ad-hoc `tsx` test programs. Vitest exits nonzero when any assertion fails, which is what CI needs.
- Always run tests **through the npm scripts**. A bare `npx vitest run` runs every project, including the HTTP and smoke projects that need a running or deployed Worker.
- `tsx` remains only for helper programs such as `scripts/wait-for-worker.ts`.
- `build:client` uses `--minify`. With esbuild's default browser platform, minification also defines `process.env.NODE_ENV` as `"production"`, so the deployed bundle contains React's production build. Without `--minify`, the bundle silently ships React's larger, slower development build. Inspect the built file rather than assuming.
- `dev:client` rebuilds the bundle on every save (development React, with source maps). Run it in a second terminal next to `npm run dev`, then reload the browser. Never deploy its output: `npm run deploy` always rebuilds with `build:client`.
- `*:remote` scripts change production state. Run them only with explicit human approval (Section 17.2).

Example validation implementation:

```ts
// src/validation.ts
export function validateSeatCount(value: unknown): number {
  if (typeof value !== 'number' ||
      !Number.isInteger(value) ||
      value < 1 || value > 5) {
    throw new RangeError('seatCount must be an integer from 1 to 5');
  }
  return value;
}
```

`validateSeatCount` is introduced on the **v1.1 feature branch** (Lab 2 Step 4), not silently inserted into the frozen v1.0 baseline. TypeScript improves static safety, but **does not replace runtime request validation**.

## 4.4 Separate TypeScript Projects per Runtime

The Worker, the React browser client, and the tests run in three different environments. In addition, **Vitest UI tests emulate the DOM with jsdom but cannot substitute for manual testing in a real browser**. Each gets its own `tsconfig`, sharing strict options from a base file. `npm run typecheck` checks all three.

| File | Covers | Global types |
|---|---|---|
| `tsconfig.base.json` | Shared compiler options only | — |
| `tsconfig.json` | `src/**/*.ts` (Worker) | Workers runtime + `Env` from `worker-configuration.d.ts` |
| `client/tsconfig.json` | `client/**/*.ts` and `client/**/*.tsx` (React browser) | DOM + JSX types |
| `tests/tsconfig.json` | `tests/**/*.ts`/`tests/**/*.tsx` (React Testing Library/jsdom), `scripts/**/*.ts`, `vitest.config.ts` | Node.js + DOM + JSX types |

```jsonc
// tsconfig.base.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noEmit": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

```jsonc
// tsconfig.json — Worker (src/). No DOM, no Node types.
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "lib": ["ES2022"],
    "types": ["./worker-configuration.d.ts"]
  },
  "include": ["src/**/*.ts", "worker-configuration.d.ts"]
}
```

```jsonc
// client/tsconfig.json — React browser
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "types": []
  },
  "include": ["./**/*.ts", "./**/*.tsx"]
}
```

```jsonc
// tests/tsconfig.json — Vitest, React Testing Library/jsdom, Node helper scripts
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "lib": ["ES2022", "DOM"],
    "jsx": "react-jsx",
    "types": ["node"]
  },
  "include": ["./**/*.ts", "./**/*.tsx", "../scripts/**/*.ts", "../vitest.config.ts"]
}
```

Rules:

- Keep the root `tsconfig.json` as the **Worker** project, so Wrangler and editors resolve `src/` with Workers types. Follow any `tsconfig` instruction printed by `wrangler types` for the installed Wrangler version.
- Unit tests may import only **pure** modules from `src/` (for example `src/validation.ts`), never code that depends on `Env` or Worker globals. HTTP tests talk to a running Worker and import nothing from `src/`.
- Never add `"DOM"` to the Worker project or Workers types to the React client project to silence an error; fix the import boundary instead. Use `jsx: "react-jsx"` in client and test projects only. The **tests project may include DOM types for React Testing Library/jsdom UI tests**, but browser modules must not import Node-only APIs or Cloudflare `Env`.

## 4.5 Vitest Projects for All Test Layers

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';

// HTTP projects call a running Worker (local) or the deployed Worker (smoke).
const http = { testTimeout: 20_000, hookTimeout: 20_000 };

export default defineConfig({
  test: {
    projects: [
      { test: { name: 'unit',        include: ['tests/unit/**/*.test.ts'] } },
      {
        // Explicit automatic JSX runtime; do not rely on tsconfig discovery.
        esbuild: { jsx: 'automatic' },
        test: { name: 'ui', environment: 'jsdom', include: ['tests/ui/**/*.test.{ts,tsx}'] },
      },
      { test: { name: 'integration', include: ['tests/integration/api.test.ts'], ...http } },
      { test: { name: 'concurrency', include: ['tests/integration/concurrency.test.ts'], ...http } },
      { test: { name: 'regression',  include: ['tests/regression/**/*.test.ts'], ...http } },
      { test: { name: 'security',    include: ['tests/security/**/*.test.ts'], ...http } },
      { test: { name: 'smoke',       include: ['tests/smoke/**/*.test.ts'], ...http } },
    ],
  },
});
```

If the installed Vitest is older than 3.2, express the same projects in `vitest.workspace.ts`; the npm scripts do not change. If a later Vitest/Vite version replaces esbuild as the transformer, set the equivalent automatic-JSX option documented for that version.

Shared HTTP helper:

```ts
// tests/helpers/http.ts
export const BASE_URL = process.env.BASE_URL ?? 'http://127.0.0.1:8787';
export const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? '';

export async function api(path: string, init: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) },
  });
  const text = await res.text();
  return { status: res.status, body: text ? JSON.parse(text) : null };
}

export const adminHeaders = () => ({ Authorization: `Bearer ${ADMIN_TOKEN}` });
```

HTTP tests create **their own events** through the admin API (unique titles per run) instead of depending on seed data, so test files do not interfere with each other. Never print `ADMIN_TOKEN`. The smoke project must **not** fall back to localhost; see Lab 4 Step 5.

## 4.6 Seed Data for Local and Production Environments

`/api/events` and `/api/config` need data. A fresh local D1/KV store (including every CI run) and a fresh production KV namespace are empty, so a seed step is required.

```sql
-- seeds/d1-seed.sql — idempotent; column names must match 0001_initial_v1.sql
INSERT OR IGNORE INTO events (id, title, starts_at, capacity, remaining_seats)
VALUES ('evt-demo-001', 'Global Event Demo Concert', '2027-03-01T09:00:00Z', 100, 100);
```

```json
[
  { "key": "config", "value": "{\"siteName\":\"Global Event Tickets\",\"supportedLocales\":[\"en\",\"ko\",\"mn\"]}" },
  { "key": "announcement", "value": "Welcome to the Global Event Ticket Reservation System" }
]
```

(The second block is `seeds/kv-seed.json`; its keys must match what `src/services/config.ts` reads.)

| Script | When | Approval |
|---|---|---|
| `npm run seed:local` | After every `npm run db:local` on a fresh local store; in every CI run | None |
| `npm run kv:seed:remote` | Once, before the **first** production smoke test (Lab 2 Step 0); later only when a reviewed seed change requires it | **Required** |
| `npm run db:seed:remote` | Optional, once, if production should show a demo event | **Required** |

Seed rules:

- Seeds contain **no reservations, no personal data, and no secrets**.
- D1 seeds use `INSERT OR IGNORE` so running them twice is harmless.
- `kv bulk put` **overwrites** existing keys. Re-running `kv:seed:remote` resets any announcement an administrator changed in production.
- The scripts pass `--local` or `--remote` explicitly because Wrangler's default target for KV commands has changed between versions.

## 4.7 Wrangler Bindings and Browser Assets

The `wrangler.jsonc` configuration must map application bindings to real Cloudflare resource IDs **and serve the `public/` folder at the same origin as `/api/*`**:

```jsonc
{
  "name": "global-ticket-capstone",
  "main": "src/index.ts",
  "compatibility_date": "2026-11-01",
  "assets": {
    "directory": "./public",
    "binding": "ASSETS",
    "run_worker_first": ["/api/*"]
  },
  "d1_databases": [{
    "binding": "DB",
    "database_name": "ticket-db",
    "database_id": "REPLACE_WITH_ACTUAL_DATABASE_ID"
  }],
  "kv_namespaces": [{
    "binding": "APP_KV",
    "id": "REPLACE_WITH_ACTUAL_KV_NAMESPACE_ID"
  }],
  "observability": { "enabled": true }
}
```

Replace placeholders from actual Wrangler results. Use locally appropriate compatibility dates, supported configuration fields, and a verified static-assets setup. **In the browser, open `http://127.0.0.1:8787/`; check that `/`, `/styles.css`, and `/assets/app.js` return success and `/api/events` returns data.** **Never commit tokens or production secrets.** Run `npm run generate-types` after changing bindings. The generated `worker-configuration.d.ts` may be tracked if the team chooses, but it is not edited by hand.

**Secrets by environment — three different `ADMIN_TOKEN` values:**

| Environment | Where `ADMIN_TOKEN` lives | How it is created |
|---|---|---|
| Local development | `.dev.vars` (gitignored) | Copied from `.dev.vars.example`; random value (Lab 0 Step 7) |
| CI (pull requests) | Throwaway `.dev.vars` written inside the runner | Generated per run and masked (Lab 3 Step 7) |
| Production | Cloudflare runtime secret | `npx wrangler secret put ADMIN_TOKEN` (Lab 2 Step 0, after the first deploy) |

**Admin token check: fail closed, constant-time (v5).** `wrangler types` adds `ADMIN_TOKEN` to `Env` only when a `.dev.vars` file exists at type-generation time, but CI runs `typecheck` before writing its throwaway `.dev.vars`. Declare the secret explicitly so the type check does not depend on that file:

```ts
// src/types.ts
export type AppEnv = Env & { ADMIN_TOKEN?: string };
```

```ts
// src/auth.ts
import type { AppEnv } from './types';

const toHex = (bytes: Uint8Array) =>
  [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');

export function isAdmin(request: Request, env: AppEnv): boolean {
  const expected = env.ADMIN_TOKEN;
  if (!expected) return false;                        // missing secret → 401
  const header = request.headers.get('Authorization') ?? '';
  const supplied = header.startsWith('Bearer ') ? header.slice(7) : '';
  const enc = new TextEncoder();
  const a = enc.encode(supplied);
  const b = enc.encode(expected);
  if (a.byteLength !== b.byteLength) return false;    // length is not secret
  return crypto.subtle.timingSafeEqual(a, b);         // Workers runtime API
}

export function newCancelToken(): string {
  return toHex(crypto.getRandomValues(new Uint8Array(16)));   // 128 bits
}

export async function hashCancelToken(code: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(code));
  return toHex(new Uint8Array(digest));
}
```

Compare the admin token with `crypto.subtle.timingSafeEqual` (a Workers runtime extension), never with `===`. Cancellation codes are handled differently: the Worker stores and looks up only `hashCancelToken(code)`. Because the code is random and high-entropy, an SQL equality lookup on the hash is acceptable.

---
# 5. One OpenClaw `main` Agent for All Projects

## 5.1 Policy: Do Not Create a Dedicated Agent

**Do NOT run:**

```bash
openclaw agents add ticket-capstone --workspace "$PWD"
```

The same existing **OpenClaw `main` agent** should coordinate the ticket-capstone repository, the graphene research repository, and other approved projects. The separation mechanism is **repository path + `AGENTS.md` + project skills + approved specs + Git history**, not separate OpenClaw identities, Telegram bots, or agent memories.

```text
                         Telegram / Student
                                │
                                ▼
                       OpenClaw main agent
                                │
                 Shared agent workspace
           (~/.openclaw/workspace/AGENTS.md)
                                │
                  Explicit project selection
                                │
              ┌─────────────────┴──────────────────┐
              ▼                                    ▼
    graphene-research/                   global-ticket-capstone/
    ├── AGENTS.md                        ├── AGENTS.md
    ├── src/                             ├── src/ (TypeScript)
    ├── specs/                           ├── specs/
    ├── tests/                           ├── tests/
    ├── wiki/                            ├── wiki/
    └── skills/                          └── skills/
              │                                    │
              └──────────────┬─────────────────────┘
                             ▼
                 One agent, independent
                project rules and evidence
```

The shared OpenClaw workspace remains the **default agent working directory**, not automatically the repository currently under discussion. Absolute file paths, an explicit repository selection, and project file reads are essential. If host sandboxing prevents access to a project path, adjust access deliberately; do not silently assume access.

## 5.2 `AGENTS.md` Versus `agent.md`

Use the canonical **`AGENTS.md`** filename (uppercase and plural). A casual `agent.md` is **not a substitute** for the OpenClaw workspace bootstrap file. Project-level `AGENTS.md` is a Git-tracked instruction file designed to be opened explicitly before the main agent works on that project.

There are **two instruction scopes**, not two agents:

| Location | Scope | Typical contents |
|---|---|---|
| `~/.openclaw/workspace/AGENTS.md` | All projects handled by the main agent; loaded in normal OpenClaw workspace context | General safety rules, project registry, selection protocol, approvals, global reporting format |
| `<project-root>/AGENTS.md` | **Only the selected Git repository** | Stack, authoritative files, test commands, forbidden operations, Wiki rules, release gates |

`IDENTITY.md`, `SOUL.md`, and `USER.md` belong to the **main agent's own workspace** where appropriate. **Do not duplicate these files inside `global-ticket-capstone/` merely to give the project an identity**. A project is not another OpenClaw agent.

**Important loading limitation:** A project-level `AGENTS.md` located outside the main workspace must **not be presumed to be injected automatically** into a Telegram conversation. The global workspace instruction must direct `main` to **read the selected repository's `AGENTS.md` explicitly** when switching projects or before modifying files. If an execution tool selects the repository as its execution workspace, verify what that tool loads, rather than relying on assumptions.

## 5.3 Suggested Global `~/.openclaw/workspace/AGENTS.md`

Keep the main file concise and generic. Example section to append to the existing global instructions:

```markdown
# Project Selection and Safety — Shared Main Agent

- I am the one OpenClaw `main` agent for multiple projects.
- Do not create a new agent or change the main workspace for a project.
- At the start of a project request, identify its repository.
- Before any project edit, read `<project-root>/AGENTS.md` and `README.md`.
- Read relevant specs, tests, and Git status before implementation.
- If the target repository is unclear, do not edit either repository.
- Never assume instructions from Project A apply to Project B.
- Perform commands only within the selected repository.
- Require explicit human approval for remote migrations,
  deployment, destructive changes, and secret operations.
- Report the current project, paths changed, real test results,
  open risks, and the next requested approval.

## Project Registry (replace with actual validated paths)
- graphene-research: /Users/<YOUR_USER>/Projects/graphene-research
- global-ticket-capstone: /Users/<YOUR_USER>/Projects/global-ticket-capstone
```

Replace the registry paths after the student checks the machine. A registry can link to many projects without copying their source code into OpenClaw's private workspace.

## 5.4 Suggested Repository `global-ticket-capstone/AGENTS.md`

```markdown
# AGENTS.md — Global Event Ticket Capstone

## Project Identity
- Project: Global Event Ticket Reservation System
- Type: Software Engineering / CI/CD capstone
- Main language: TypeScript (strict mode)
- Runtime: Cloudflare Workers, D1, KV; Queues optional
- Controller: existing OpenClaw `main` agent, NOT a new agent

## Before Each Task
1. Confirm this repository's absolute path and Git branch.
2. Read README.md and this AGENTS.md.
3. Read .specify/memory/constitution.md and the relevant specs/.
4. Inspect affected src/, client/, public/, tests/, and migrations/ files.
5. Summarize intended changes and acceptance criteria.
6. Wait for human approval before implementation when required.

## Source of Truth
- Approved requirements: specs/
- Engineering principles: .specify/memory/constitution.md
- Worker code: src/**/*.ts
- React browser source: client/**/*.ts and client/**/*.tsx; HTML mount shell: public/index.html; CSS: public/styles.css
- Database migrations: migrations/*.sql
- Executable verification: tests/**/*.test.ts and tests/**/*.test.tsx (Vitest), scripts/*.ts helpers
- Seed data: seeds/ (no reservations, personal data, or secrets)
- Real outcomes: GitHub PR/Actions, evidence/, docs/
- Derived knowledge: wiki/ (not a replacement for specs/)

## Engineering Rules
- Never write new application logic in handwritten .js files.
- public/assets/app.js is generated from client/main.tsx; edit client/*.ts and client/*.tsx instead.
- Browser must search real events, reserve, and cancel using same-origin Worker APIs; never hard-code production data.
- Never expose ADMIN_TOKEN or cancellation-token hashes in browser code, storage, logs, screenshots, or Wiki.
- Render untrusted event titles and API responses as React text (`{value}`); never use `dangerouslySetInnerHTML` for user/event content.
- React UI component tests (Vitest/jsdom + React Testing Library) and real-browser acceptance are mandatory in addition to API tests.
- Preserve v1.0 behaviors during v1.1 evolution.
- Use runtime validation despite TypeScript static types.
- Do not change migrations already applied to production.
- Do not bypass failing tests or fabricate CI/deployment evidence.
- Never commit secrets, private tokens, or personal customer data.
- Do not perform remote D1 migrations or deploy without approval.
- A Pull Request and passing required CI precede merging.
- Treat D1 inventory as authoritative; do not put seat counters in KV.
- Write multi-statement reservation/cancellation changes with env.DB.batch();
  never use SQL BEGIN/COMMIT (D1 rejects it).
- Keep Worker, client, and test code in their own tsconfig projects.
- Compare ADMIN_TOKEN with crypto.subtle.timingSafeEqual; store only SHA-256 hashes of cancellation codes.
- Reservation/cancellation write tests run against the local Worker only; production is read-only
  except the instructor-approved v1.0 baseline test data (Lab 2 Step 0).
- Write every test with Vitest; run tests only through npm scripts.
- Create the feature branch before any v1.1 plan, code, or migration commit.
- Record a D1 Time Travel bookmark before any remote migration.
- Record a rollback/recovery plan before production changes.

## Verification Commands
- npm ci
- npm run typecheck
- npm run build
- npm run test:unit
- npm run test:ui
- npm run db:local
- npm run seed:local
- npm run test:integration (with local Worker running)
- npm run test:regression (with local Worker running)
- npm run test:concurrency (with local Worker running)
- npm run test:security (with local Worker running)
- npm run smoke (with verified BASE_URL after deployment)
- Manual browser: search → reserve → cancel → refreshed inventory (local only for writes)
- npm run dev:client (optional: rebuild the React bundle on save during UI work)

## Wiki Update Policy
- Store project engineering knowledge in wiki/ inside this repo.
- Summarize only observed facts; label assumptions explicitly.
- Link each conclusion to a spec, code location, PR, test, or report.
- Do not edit approved specs through a Wiki update.
- Treat wiki/raw/ as immutable after archival, except approved fixes.
- Strip tokens, email addresses and other sensitive information.

## Task Completion Report
- Repository / branch / commit
- Approved specification / requirement
- Files changed
- Commands actually executed and their real results
- PR and CI status (verified, failed, or not yet checked)
- Deployment and smoke status (verified, failed, or not attempted)
- Security, data, rollback, and compatibility risks
- Wiki pages updated, with evidence links
- Next human decision
```

When a real starter has a different command, update `package.json`, `AGENTS.md`, and the CI workflow together.

## 5.5 How the Main Agent Switches Projects

Example Telegram request:

```text
Project: global-ticket-capstone
Repository: /Users/<YOUR_USER>/Projects/global-ticket-capstone
Task: Review CHG-001 for the v1.1 group reservation upgrade.
First read AGENTS.md, README.md, the constitution and relevant specs.
Do not modify code or deploy yet.
Report affected TypeScript files, tests, migration risks,
and an implementation plan. Wait for my approval.
```

A later graphene request would name the **graphene repository** and its own `AGENTS.md`. Main-agent context does not make the source documents interchangeable. Encourage students to include a project prefix such as `[ticket]` or `[graphene]` in Telegram messages when they regularly work on multiple projects.

## 5.6 Skill Discovery Without Adding an Agent

**Recommended setup:** Keep reusable agent behavior in the main workspace, and project-specific skills in `global-ticket-capstone/skills/`. OpenClaw can load explicit external skill directories through the main Gateway configuration. A schematic configuration is:

```jsonc
// ~/.openclaw/openclaw.json — example fragment only
{
  "skills": {
    "load": {
      "extraDirs": [
        "/Users/<YOUR_USER>/Projects/global-ticket-capstone/skills",
        "/Users/<YOUR_USER>/Projects/graphene-research/skills"
      ]
    }
  }
}
```

Merge this fragment into the **existing** configuration, rather than overwriting the file. Verify actual directories, permission boundaries, skill names, and effective discovery with the installed OpenClaw version. **Never copy a full OpenClaw config with credentials into Git.** Avoid same-named skills from different repositories: `ticket-sdd` and `graphene-research` are clearer than generic `project-skill` names.

For Spec Kit, initialize **project-local `.specify/` and `.agents/skills/`**. The generic integration can generate skill files, but generating files **does not automatically connect them to OpenClaw**. If project-local skills are to be discovered by `main`, explicitly configure the relevant skill roots or have the agent read the selected project's skill file. When several repos contain identically named `speckit-*` skills, avoid globally loading conflicting copies; maintain one approved common workflow and explicitly use the selected project's constitution/specs/scripts.

**Verification checklist:**

1. `openclaw agents list` shows the **existing `main`**; no ticket-specific agent has been added.
2. The global workspace `AGENTS.md` identifies the project-selection protocol.
3. Each repository has its own Git-tracked `AGENTS.md`.
4. The main agent demonstrably reads the selected project `AGENTS.md` before changes.
5. `openclaw skills list` shows the skills expected in the active configuration; if not, investigate discovery rather than pretending they are loaded.
6. Git status for the **other** project remains unchanged during ticket-capstone work.

---

# 6. Project-Local Karpathy Wiki and Obsidian

## 6.1 One Repository, Two Connected Workflows

```text
Telegram student request / approval
                 │
                 ▼
         OpenClaw main agent
                 │
      Select repository + read AGENTS.md
                 │
          ┌──────┴───────┐
          ▼              ▼
        Spec Kit      Repository
     specs/ + tasks/  src/ + tests/ + CI/CD
          │              │
          └──────┬───────┘
                 ▼
        Verified evidence
     docs/ + evidence/ + PR/CI
                 │
                 ▼
       Karpathy Wiki Skill
                 │
                 ▼
     global-ticket-capstone/wiki/
                 │
                 ▼
       Obsidian Markdown view
```

The **Wiki is local to the ticket project**. Students should open the repository's `wiki/` folder in Obsidian as a vault (or open the repository root when they want links to `docs/` and `specs/`). Obsidian edits the **same Markdown files**; there is no need to mirror the project Wiki in a second unrelated `SecondBrain` vault.

## 6.2 Wiki Structure and Evidence Rules

| Page | Questions it should answer | Examples of required evidence |
|---|---|---|
| `index.md` | What is the current project and release state? | README, approved spec, version tag |
| `architecture-decisions.md` | Why Workers/D1/KV and TypeScript? | Architecture doc, code paths |
| `version-evolution.md` | Why v1.1, what changed, why backward-compatible? | CHG-001, 002 spec, SQL migration, tests |
| `testing-lessons.md` | Which tests failed and how were they fixed? | Real test output, PR, commit |
| `ci-cd-lessons.md` | What happened in GitHub Actions? | Run URL, failed job, corrected run |
| `security-and-observability.md` | How is the app protected and investigated? | Sanitized logs, security review |
| `incidents-and-fixes.md` | What was the incident and its root cause? | Incident report, request IDs |
| `release-history.md` | Which commit produced which release? | Commit SHA, tag, deployment URL, smoke results |
| `sources/source-index.md` | Where are the underlying sources? | Relative links and dated provenance |

**Ingest procedure:** (1) identify approved and observed input; (2) save immutable, sanitized evidence when necessary; (3) extract conclusions; (4) attach exact relative paths, commit hashes, PR URLs, timestamps, or run IDs; (5) update the relevant Wiki pages and `index.md`; (6) have the student review the Wiki changes in a Git diff; (7) submit the Wiki changes through the same code-review process.

**No conflicting source of truth:** An agent may summarize an acceptance criterion in `wiki/`, but only the approved `specs/` document defines that criterion. The Wiki cannot silently rewrite a requirement, claim a failed test passed, or make an unapproved deployment decision.

**Sensitive-data rule:** Never copy administrator tokens, Cloudflare credentials, private customer emails, or unredacted logs into `wiki/`, `evidence/`, Telegram reports, or GitHub. Store links or redacted excerpts instead.

## 6.3 Proposed Project Skill (`skills/ticket-engineering-wiki/SKILL.md`)

```markdown
---
name: ticket-engineering-wiki
description: Maintain verified engineering knowledge for global-ticket-capstone.
---

# Ticket Engineering Wiki

1. Read the selected project's AGENTS.md and approved specs.
2. Identify evidence from code, tests, PRs, CI, deployment, and reports.
3. Never invent a result, source, timestamp, or release status.
4. Add backlinks to real paths and reviewable change identifiers.
5. Write derived knowledge under wiki/ only.
6. Preserve immutable sanitized wiki/raw/ snapshots.
7. Do not alter approved specs via Wiki ingestion.
8. Ask the student to inspect Git diff before commit or merge.
9. Keep this project's Wiki separate from other repositories' Wikis.
```

---

# 7. Lab 0 — Environment Setup and SDD Preparation

**When:** Before November 23, 2026  
**Goal:** Prepare the TypeScript starter, a selected Git repository, the **existing `main` agent**, Spec Kit, and a repository-local Wiki.

## Step 1. Verify Tools and Current Workspace

```bash
node --version
npm --version
git --version
uv --version
openclaw --version
openclaw agents list
```

Confirm the main agent already exists. **Do not create `ticket-capstone` as a separate agent.** Confirm the local repository is really the intended project:

```bash
cd /Users/<YOUR_USER>/Projects/global-ticket-capstone
pwd
git status --short
git remote -v
```

Replace the example path with the student's real path.

## Step 2. Obtain the Actual TypeScript v1.0 Starter

The source PDF described a **JavaScript** starter (`src/index.js`, `src/validation.js`, `.mjs` tests). This revised capstone mandates a **TypeScript** baseline.

The instructor has two options:

- **Preferred:** Distribute a tested **full-stack v1.0 TypeScript/React starter** containing Worker source, `public/index.html`, `public/styles.css`, `client/main.tsx`, `client/App.tsx`, `client/api.ts`, `client/search.ts`, initial migrations, React UI tests, and `AGENTS.md`. The frozen v1.0 React form books one seat and can cancel it using the real Worker API.
- **Alternative:** Before Lab 1, convert the JavaScript starter to TypeScript **and React TSX** in an instructor-controlled preparation branch; implement and verify real event search, one-seat booking, and cancellation. Students must not be graded against an unverified baseline.

Conversion mapping:

| Former JavaScript file | New source of truth |
|---|---|
| `src/index.js` | `src/index.ts` |
| `src/validation.js` | `src/validation.ts` |
| `public/app.js` (handwritten) | `client/main.tsx` + React `client/App.tsx` + `client/api.ts` + `client/search.ts` → generated `public/assets/app.js` |
| `tests/unit.test.mjs` | `tests/unit/validation.test.ts` (Vitest) |
| `tests/integration.mjs` | `tests/integration/api.test.ts` (Vitest) |
| `scripts/smoke.mjs` | `tests/smoke/smoke.test.ts` (Vitest) |
| Missing React/TypeScript configuration | `tsconfig.base.json`, `tsconfig.json`, `client/tsconfig.json` (`jsx: react-jsx`), `tests/tsconfig.json` (`jsx: react-jsx`), `vitest.config.ts`, React/TypeScript/testing dependencies |
| Missing seed data | `seeds/d1-seed.sql`, `seeds/kv-seed.json` |

**Do not label an unconverted JavaScript/vanilla DOM starter a React/TypeScript application.** The instructor must demonstrate a passing baseline before students are graded on new changes.

## Step 3. Install Dependencies, Generate Types, Build

From the selected repository, install the runtime and testing dependencies if the starter does not already declare them:

```bash
npm install react react-dom
npm install -D typescript wrangler vitest jsdom esbuild tsx @types/node \
  @types/react @types/react-dom @testing-library/react @testing-library/user-event
npm run generate-types
npm run typecheck
npm run build
npm run test:unit
npm run test:ui
```

Commit `package-lock.json`. `npm ci` must reproduce the installation on a fresh checkout. Investigate and document missing or failing scripts rather than assuming the target structure is already implemented.

## Step 4. Install and Initialize GitHub Spec Kit

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
specify check
```

Install Spec Kit **from the official GitHub repository**, as its README shows. A bare `uv tool install specify-cli` resolves the name on PyPI instead, which is a supply-chain risk when a whole class runs it. Re-check this command and the `specify init` flags below against the current README on the day of the lab.

For a repository that has **not** yet been initialized with Spec Kit:

```bash
specify init --here --integration generic \
  --integration-options="--commands-dir .agents/skills --skills"
```

If already initialized, use the installed Spec Kit integration-management commands instead of blindly reinitializing. Verify files in `.specify/` and `.agents/skills/`. The generic integration writes files; it does not itself establish automatic OpenClaw skill discovery. Students must verify the actual `main` agent skill setup described in Section 5.

## Step 5. Introduce the Project `AGENTS.md` and Main-Agent Registry

1. Read the main workspace `~/.openclaw/workspace/AGENTS.md`.
2. Add the project registry / context-selection rule without deleting existing global instructions.
3. Create the repository `AGENTS.md` based on Section 5.4.
4. Commit the project file in Git.
5. Ask the **existing** main agent to summarize the project's rules *without writing code*.
6. Verify the reply names the correct repository and no changes to unrelated repositories.

**Do not put `SOUL.md`, `IDENTITY.md`, or `USER.md` into the ticket repository.** Those are main-agent workspace concepts, not required project files.

## Step 6. Create the Project Wiki and Skills

Create `wiki/`, `wiki/sources/`, optional sanitized `wiki/raw/`, and the project skills. Open the Git repository Wiki in Obsidian. Test that an edit to `wiki/index.md` is visible in Git and that backlinks resolve. Confirm that the Wiki Skill never treats summaries as approved requirements.

If the main agent cannot load the project-specific skills, check `openclaw skills list`, the configured `skills.load.extraDirs`, actual paths, permissions, and naming collisions. Do not create a new agent as a workaround.

## Step 7. Verify Local Cloudflare Resources

```bash
npx wrangler login
npx wrangler whoami
npx wrangler d1 create ticket-db
npx wrangler kv namespace create APP_KV
```

Only create resources if they do **not** already exist. Record the actual resource identifiers and populate `wrangler.jsonc`.

Create the local development secret file. `.dev.vars` is gitignored; only `.dev.vars.example` (names, no values) is committed:

```bash
cp .dev.vars.example .dev.vars
echo "ADMIN_TOKEN=dev-$(openssl rand -hex 16)" > .dev.vars
git check-ignore .dev.vars     # must print .dev.vars
```

Apply the **v1.0-only** local migration, seed local D1/KV, and start the Worker:

```bash
npm run db:local
npm run seed:local
npm run dev
```

From another terminal:

```bash
curl -i http://127.0.0.1:8787/api/health
curl -i http://127.0.0.1:8787/api/events
curl -i http://127.0.0.1:8787/api/config
curl -i http://127.0.0.1:8787/
curl -i http://127.0.0.1:8787/styles.css
curl -i http://127.0.0.1:8787/assets/app.js
```

Open `http://127.0.0.1:8787/` in a **real browser** and verify that the search input, one-seat reservation form, confirmation, and cancellation form render. Appendix C provides reference source that students adapt to the approved starter API.

Expected: a successful Worker response, the seeded demo event from D1, and the seeded KV configuration. Retain actual HTTP results in `evidence/baseline/` after redaction.

## Step 8. Prepare a One-Page Proposal

Students prepare `docs/proposal.md` containing product vision, target users, v1.0 state, planned v1.1 group reservations, one individually selected *engineering improvement*, risks, testing strategy, project GitHub URL, and the repository path selected for the main agent.

**Lab 0 deliverables (presented at Review 1):** browser-ready React + TypeScript (TSX)/CSS starter, local event search/reserve/cancel checklist, verified tools, TypeScript starter with split `tsconfig` projects and Vitest, working `npm ci` / tests, local `.dev.vars` (not committed), seeded local D1/KV, existing main-agent access, project `AGENTS.md`, Spec Kit files, Telegram command and approval test, accessible project Wiki, proposal, and **unmodified verified v1.0 baseline**.

**Late-starter fallback (v5):** If the React/TypeScript starter is not distributed before November 23, Review 1 covers the proposal, tool verification, main-agent/`AGENTS.md` proof, and Spec Kit setup only. The starter-dependent Lab 0 items (`npm ci`, tests, seeded local D1/KV, baseline browser check) move to the start of Lab 1 and are presented at Review 2.

---
# 8. Session 1 — November 23 (Monday)
## Review 1 — Product Vision, Requirements, and Development Environment

**Suggested presentation:** three minutes per student. Present `docs/proposal.md`, the current Git branch, the TypeScript v1.0 starter, and proof that the **existing** OpenClaw `main` agent can read the **ticket project's** `AGENTS.md`. Show Spec Kit files and the project Wiki. Do not demonstrate a fictional agent or unverified deployment.

**Instructor question:** “What must happen between writing a feature and making it available to production users?”

## Lab 1 — Lifecycle, Spec-Driven Development, Full-Stack v1.0 Baseline

**Objective:** Establish a reproducible **real-browser + Worker + D1/KV v1.0** baseline and a reviewed software engineering process. A browser screenshot without actual D1-backed booking/cancellation is not a passing baseline.

### Step 1. Write the Engineering Constitution

Ask the selected OpenClaw main agent to use the **selected project's Spec Kit constitution workflow** to propose `.specify/memory/constitution.md`. Require these principles: approved requirements; testable acceptance criteria; backward compatibility; unit and integration testing; GitHub PRs and human review; CI before merge; approval before production release; secret protection; smoke tests and monitoring; incident reporting; synchronized Living Specifications; human ownership of AI outputs; TypeScript as the required application language; no cross-repository edits.

The agent must **show the proposed constitution before saving it**. Students inspect and approve it. Record the decision in `wiki/architecture-decisions.md` with a link to the approved constitution.

### Step 2. Specify the Observed v1.0 Application

In `specs/001-v1-baseline/`, create `spec.md`, `plan.md`, and `tasks.md` documenting **observed** v1.0 behavior:

- Event browsing and **client-side title search** in the browser.
- **Single-seat** reservation initiated from the browser.
- Reservation cancellation via ID + private code in the browser that restores one seat.
- Administrator authentication.
- D1-backed events and reservations, including the **inventory model** (for example, a `remaining_seats` column on `events`) that v1.1 will update.
- KV announcement/configuration retrieval.
- Actual existing tests and release configuration.

Distinguish code-backed observations from guesses. **Do not implement group reservations or apply v1.1 migration in this Lab.**

### Step 3. Inspect and Explain the TypeScript Architecture

Students identify **the React component tree, `client/main.tsx`, `client/App.tsx`, `client/api.ts`, `client/search.ts`, Worker entry**, domain modules, runtime validation, binding types, D1 queries, KV configuration, client build, test runner, and deployment config. Update `docs/architecture.md` with the Section 3 diagram and actual code paths. Explain why D1, KV, Worker code, and GitHub Actions require **end-to-end** rather than isolated testing.

### Step 3A. Implement the v1.0 Browser UI and Event Search (New full-stack lab)

1. Confirm the `/api/events`, reserve, and cancellation contract from the real baseline; update `docs/frontend-ux.md` and `specs/001-v1-baseline/spec.md` to record exact request/response shapes. If using the recommended v3 teaching contract, implement/adapt the API shape in Section 3.4 **before** copying client code.
2. Create `public/index.html` as a minimal HTML shell containing `<div id="root"></div>`, the CSS link, and the compiled `/assets/app.js` script. Do not hand-write a second copy of the reservation form in HTML: **React owns the markup inside `#root`**.
3. Create `client/main.tsx` to call `createRoot(root).render(<App />)`. Ensure `client/tsconfig.json` uses `"jsx": "react-jsx"` and esbuild builds `client/main.tsx` with `--jsx=automatic`.
4. Create `client/api.ts` with typed same-origin calls for `GET /api/events`, `GET /api/config` (optional announcement), `POST /api/reservations`, and `POST /api/reservations/:id/cancel`. Never put D1 credentials or admin tokens in browser code.
5. Create `client/search.ts` with pure case-insensitive title filtering. Create `client/App.tsx` using `useState`, `useEffect`, and `useMemo` to render search results, selected event, controlled forms, confirmation, cancellation, loading, and error statuses. **For the v1.0 baseline set `MAX_SEATS = 1`**; do not expose group-booking behavior early.
6. Run `npm run build` to generate `public/assets/app.js` from the React entry and start `npm run dev`. Check browser DevTools → Network for real API requests; React must not simulate inventory changes locally.
7. Add `tests/ui/App.test.tsx` using **Vitest + jsdom + React Testing Library**. Verify event search, selection, loading/empty/error states, safe rendering of malicious-looking titles, and controlled form behavior. Run `npm run test:ui`. Use the v1.0 test fixture first; v1.1 cases arrive after CHG-001.

**Instructor acceptance:** The UI is not allowed to fake a booking by changing a counter in TypeScript. Confirm the seat change in an actual D1-backed Worker response. Do not add v1.1 quantity selection before the approved change request in Lab 2.


### Step 4. Verify Types, Build, and Local Runtime

```bash
npm run generate-types
npm run typecheck
npm run build
npm run test:unit
npm run test:ui
npm run db:local
npm run seed:local
npm run dev
```

Test the `/api/health`, `/api/events`, and `/api/config` endpoints using the actual local Worker, as shown in Lab 0. Inspect real responses, local D1 storage, and KV configuration. Record command outputs and observations, not merely “PASS” in a document.

### Step 4A. Execute the Real-Browser v1.0 Acceptance Journey (New)

Open `http://127.0.0.1:8787/` and **use mouse and keyboard**. (1) Search for an existing seeded event; (2) choose it; (3) book one seat using a non-sensitive test email; (4) record the returned reservation ID and one-time cancellation code **privately**; (5) compare remaining seats before/after via a refreshed `GET /api/events`; (6) cancel using the code; (7) verify the original inventory returns. Also try a nonexistent keyword, empty email, invalid code, and network/API failure. Put redacted real observations in `docs/browser-test-report.md` and `evidence/browser/`. Never store the raw code or real email in evidence.


### Step 5. Record the Baseline and Verify Git

Use a baseline report in `evidence/baseline/`:

```text
Version: v1.0.0 candidate
Commit SHA: [actual SHA]
TypeScript Check: [actual command/result]
Worker Build: [actual result]
Health API: [actual HTTP result]
Events API + D1: [actual result]
KV Config: [actual result]
Unit/UI Tests: [actual results]
Browser Journey: [real search/reserve/cancel observations, redacted]
Asset Requests: [real HTTP status for /, /styles.css, /assets/app.js]
Known Limitations: [actual observations]
```

Once verified, and only then:

```bash
git tag -a v1.0.0 -m "Verified TypeScript v1.0 baseline"
git push origin v1.0.0
```

If verification fails, preserve the failure and do **not** tag an unverified baseline.

### Step 6. Update the Project Wiki

Ingest approved requirements, the constitution, architecture, commit/tag, and actual test evidence. Update `wiki/index.md`, `wiki/architecture-decisions.md`, and `wiki/sources/source-index.md`. Do not copy a project conclusion into the graphene Wiki.

**Lab 1 deliverables — required at Review 2:** working browser search → single-seat reserve → cancel (real local D1); approved constitution; v1.0 spec (`specs/001-v1-baseline/spec.md`) with the confirmed API contract; working Worker with D1/KV evidence; TypeScript build/type-check evidence; unit and UI test output; the main browser journey evidence (Step 4A items 1–7, redacted); Git baseline commit and `v1.0.0` tag.

**Lab 1 deliverables — may be completed by Review 3 (v5 schedule relief):** `plan.md`/`tasks.md` for `001-v1-baseline`, the full `docs/architecture.md` and `docs/frontend-ux.md`, the Step 4A negative cases (nonexistent keyword, empty email, invalid code, network failure), and the Lab 1 Wiki pages. Review 2 reports their status honestly as *in progress*.

---

# 9. Session 2 — November 25 (Wednesday)
## Review 2 — Working Full-Stack TypeScript v1.0 Cloud Application

Start in the **browser**: search an event, reserve one seat, cancel it, and refresh inventory. Then present the verified Worker, `/api/health`, D1-backed `/api/events`, KV-backed `/api/config`, browser + Worker TypeScript source, test output, Git history, and project Wiki evidence.

**Instructor question:** “Which software components, tests, and release stages are affected if a reservation changes from one seat to five?”

## Lab 2 — Version 1.0 → 1.1: Change Request, Impact, Migration, Unit Tests

**Objective:** Treat Version 1.1 as a **controlled full-stack engineering change**: the browser gains a 1–5-seat selector while API, D1, cancellation logic, tests, documentation, and release remain coordinated.

### Step 0. Release the Verified v1.0 Baseline to Production (Instructor-Supervised, Manual)

v1.1 must be a real **upgrade of a running system**. Before any v1.1 work, release the tagged `v1.0.0` baseline to production. Lab 4's migration, Time Travel bookmark, compatibility check, and Scenario B rollback analysis then operate on a real v1.0 deployment with real v1.0 data. Every remote command requires explicit human approval (Section 17.2). CD automation is still taught in Lab 4; this is a supervised manual release.

```bash
git switch --detach v1.0.0                           # deploy exactly the verified baseline
npx wrangler whoami
npx wrangler d1 migrations list ticket-db --remote   # must show ONLY 0001 as pending
npm ci
npm run build
npm run db:remote                                    # applies 0001_initial_v1.sql only
npm run deploy                                       # first deploy creates the Worker
npx wrangler secret put ADMIN_TOKEN                  # AFTER deploy; paste a NEW random value
npm run kv:seed:remote                               # first release only
npm run db:seed:remote                               # optional demo event
BASE_URL="https://THE-ACTUAL-DEPLOYED-URL" npm run smoke
npx wrangler deployments list                        # record the v1.0 version ID
git switch main
```

- Run `secret put` **after** the first deploy. Before the Worker exists, Wrangler asks whether to create a new Worker only to hold the secret. Admin endpoints fail closed (HTTP 401) during the short gap.
- Generate the production token with `openssl rand -hex 32`; it must differ from the local `.dev.vars` token. Never pass it as a command-line argument.
- Save the actual URL as the `PRODUCTION_URL` Actions variable now (Lab 4 Step 2).
- **Real v1.0 data (instructor-authorized):** create one dedicated test event through the admin API and one one-seat v1.0 test reservation in production, using a test email. Record only the event ID, reservation ID, and remaining seats in `docs/deployment-report.md`; never the email or cancellation code. The instructor keeps the code privately, outside Git. Lab 4 verifies that this reservation reads as `seat_count = 1` after the v1.1 migration. **These are the only production writes in the course.**
- The recorded v1.0 version ID is the target that Lab 4 Scenario B would roll back to.
- Store redacted outputs in `evidence/deployments/v1.0.0/`.

### Step 1. Create Change Request CHG-001

Create `docs/change-request-CHG-001.md` with current and requested behavior:

```text
Current v1.0: one seat per reservation
Requested v1.1: an integer number of seats from 1 to 5
Reason: allow customers to reserve seats for small groups
Affected: TypeScript validation, API, inventory logic, cancellations,
D1 schema, browser UI, UI tests, security checks, CI, deployment, docs, Wiki
```

### Step 2. Write and Approve the v1.1 Specification

Use Spec Kit for `specs/002-group-reservation/spec.md`. Minimum measurable criteria:

1. Event browsing stays functional.
2. Reservation quantity is an integer in **1–5**.
3. Invalid quantity is rejected with the documented API error.
4. Insufficient remaining seats yields the expected conflict response.
5. Successful reservation decreases the authoritative D1 inventory by the requested quantity.
6. Cancellation restores the entire reserved quantity.
7. Existing v1.0 reservations remain valid after migration.
8. Simultaneous requests never oversell remaining inventory.
9. Existing admin authentication and KV behavior remain functional.
10. Release and recovery requirements are documented.
11. The browser renders quantity 1–5, shows reservation quantity and failure states, and never reports success before a 201 response.
12. Searching, reservation confirmation, cancellation, and keyboard navigation remain functional after the upgrade.

Show the proposed criteria to the student; **do not implement until approved**.

### Step 3. Perform a Change Impact Analysis

| Component | Required change | Verification |
|---|---|---|
| Requirements | Group reservation behavior | Approved criteria |
| TypeScript API | Accept `seatCount` | Integration tests |
| `src/validation.ts` | Integers 1–5 only | Unit tests |
| `client/{main,App}.tsx` + `client/{api,search}.ts` + HTML/CSS | React controlled quantity, confirmation, search retention, error states | Vitest + React Testing Library + real browser |
| `src/services/reservations.ts` | Update D1 inventory by quantity in one `db.batch()` | Integration/concurrency tests |
| D1 schema | Add `seat_count` | Migration/data verification |
| Rollback | v1.0 code must not run against v1.1 group reservations | Rollback analysis (Lab 4 Step 4) |
| Cancellation | Restore reserved quantity | Regression tests |
| Authorization | Preserve protected endpoints | Security tests |
| CI | Typecheck (3 projects), build, all Vitest suites incl. security | GitHub Actions |
| CD | Controlled migration + Worker deploy | Approved release checklist |
| Operations | Structured reservation/error logs | Observability evidence |
| Wiki | Change rationale and proof | Provenance links |

Save as `docs/version-evolution-v1.1.md`.

### Step 4. Create the Feature Branch, Then the Plan and Task Breakdown

Create the feature branch **now**, before generating the plan or writing any v1.1 code or migration. Work committed on `main` would bypass the Pull Request and CI gates of Lab 3.

```bash
git switch main
git pull --ff-only
git merge-base --is-ancestor v1.0.0 HEAD && echo "main contains verified v1.0.0"
git switch -c feature/v1.1-group-reservation
git branch --show-current            # must print feature/v1.1-group-reservation
```

Uncommitted CHG-001, spec, and impact-analysis drafts from Steps 1–3 move to the new branch automatically; commit them on the branch, not on `main`. If any were already committed on `main`, ask the instructor before rewriting history.

Generate and approve:

```text
specs/002-group-reservation/spec.md
specs/002-group-reservation/plan.md
specs/002-group-reservation/tasks.md
```

Tasks should keep validation, business logic, migration, tests, and documentation separately reviewable. Do not ask AI to approve its own work.

### Step 5. Implement Version 1.1 in TypeScript

Edit the **TypeScript** sources, not JavaScript files:

```text
src/validation.ts
src/index.ts
src/services/reservations.ts
src/types.ts
client/App.tsx                # React controlled quantity, errors, confirmation, hooks
client/api.ts                 # align typed JSON with approved v1.1 contract
client/search.ts              # preserve existing search behavior
client/main.tsx               # unchanged React mount unless needed
public/styles.css             # accessible forms/error styling if needed
tests/ui/App.test.tsx         # React Testing Library v1.1 cases
# public/index.html remains the same React mount shell
```

Example API request (the real endpoint must match the agreed v1.1 contract):

```json
{
  "eventId": "YOUR_EVENT_ID",
  "email": "student@example.com",
  "seatCount": 3
}
```

Use prepared D1 statements with bound parameters. A valid TypeScript type alone does not guarantee a trustworthy HTTP body.

**Atomic inventory updates with `db.batch()`.** D1 rejects SQL `BEGIN TRANSACTION` / `COMMIT` sent from a Worker, so AI-generated code that uses them fails. Instead, send the inventory update and the reservation insert in one `env.DB.batch([...])` call: the statements run in order as one transaction, and if any statement fails, the whole batch is rolled back. The inventory update is **conditional**, so two simultaneous requests cannot both take the last seat.

```ts
// src/services/reservations.ts — reserve (column names must match the real schema)
export async function reserve(env: Env, input: {
  id: string; eventId: string; email: string; seatCount: number; cancelTokenHash: string;
}): Promise<'created' | 'sold_out' | 'not_found'> {
  const [update, insert] = await env.DB.batch([
    env.DB.prepare(
      `UPDATE events
          SET remaining_seats = remaining_seats - ?1
        WHERE id = ?2 AND remaining_seats >= ?1`
    ).bind(input.seatCount, input.eventId),
    env.DB.prepare(
      `INSERT INTO reservations (id, event_id, email, seat_count, cancel_token_hash, status)
       SELECT ?1, ?2, ?3, ?4, ?5, 'active'
        WHERE changes() = 1`  // insert only if the UPDATE took the seats
    ).bind(input.id, input.eventId, input.email, input.seatCount, input.cancelTokenHash),
  ]);

  if (update.meta.changes === 0) {
    // Classify only: the batch above already decided atomically that no seats were taken.
    const exists = await env.DB.prepare('SELECT 1 FROM events WHERE id = ?1')
      .bind(input.eventId).first();
    return exists ? 'sold_out' : 'not_found';               // → HTTP 409 / 404
  }
  if (insert.meta.changes !== 1) {
    throw new Error('Inventory/reservation mismatch');       // → HTTP 500, investigate
  }
  return 'created';                                          // → HTTP 201
}
```

```ts
// src/services/reservations.ts — cancel: restore exactly seat_count seats
const [cancel, restore] = await env.DB.batch([
  env.DB.prepare(
    `UPDATE reservations SET status = 'cancelled'
      WHERE id = ?1 AND cancel_token_hash = ?2 AND status = 'active'`
  ).bind(reservationId, cancelTokenHash),
  env.DB.prepare(
    `UPDATE events
        SET remaining_seats = remaining_seats +
            (SELECT seat_count FROM reservations WHERE id = ?1)
      WHERE id = (SELECT event_id FROM reservations WHERE id = ?1)
        AND changes() = 1`  // restore only if the cancel succeeded
  ).bind(reservationId),
]);
if (cancel.meta.changes === 0) { /* → HTTP 404: unknown, wrong token, or already cancelled */ }
```

Design rules:

- Never read `remaining_seats` in one query and write it in a later, separate query; another request can run between the two `await`s.
- The follow-up `SELECT` after a zero-row update only chooses between HTTP 404 and 409. It never decides whether seats are taken, so it does not reintroduce a read-then-write race.
- `changes()` in the second statement refers to the row count of the statement before it in the same batch. Integration tests must still assert the final D1 state (seats and reservation rows).
- The no-overselling property must be **demonstrated** by the concurrency test in Lab 3, not presumed from this pattern.

### Step 5A. Upgrade the Browser from v1.0 to v1.1 (New full-stack lab)

1. Keep the same event search/list; ensure results still come from live `GET /api/events` rather than a hard-coded array.
2. On the approved feature branch, change `MAX_SEATS` in `client/App.tsx` from `1` to `5`. React renders `<input id="seat-count" type="number" min={1} max={MAX_SEATS} step={1} value={seatCount} onChange={...} required />` as a **controlled field**. Do not edit `public/index.html` to add form elements: React owns the form.
3. Parse React's string state using `Number(seatCount)`; reject any blank, noninteger, or out-of-range input (`Number.isInteger(qty) && qty >= 1 && qty <= MAX_SEATS`) before calling the Worker. Add React Testing Library tests for 0/6/2.5 and a valid 3-seat request.
4. Include `seatCount: qty` in the typed API request; the server must independently enforce 1–5 and must **never trust browser validation**.
5. After HTTP 201, show the actual reserved quantity, ID, and private cancellation code. After HTTP 409, display `Not enough seats are available` without fabricating success or changing the seat counter optimistically.
6. Keep the entered ID + code in the visible cancellation form only as needed; call the approved cancellation API, then fetch events again to show that **all** booked seats were restored.
7. Verify the UI still permits one-seat v1.0 behavior; use the feature branch from Step 4 and commit the front-end diff in the same PR as the API and migration.

**React-controlled quantity validation example** (inside the `client/App.tsx` submit handler; the full component is in Appendix C):

```tsx
const MAX_SEATS = 5; // v1.0 frozen baseline uses 1
const [seatCount, setSeatCount] = useState('1');
const quantity = Number(seatCount);
if (seatCount.trim() === '' || !Number.isInteger(quantity) ||
    quantity < 1 || quantity > MAX_SEATS) {
  setStatus({ message: `Choose a whole number of seats from 1 to ${MAX_SEATS}.`, error: true });
  return;
}
const receipt = await createReservation({
  eventId: selectedEventId, email: email.trim(), seatCount: quantity
});
```

The JSX input uses `value={seatCount}` and `onChange={e => setSeatCount(e.target.value)}`. **State is not D1 inventory**: after reserve/cancel, refetch `/api/events` rather than optimistically changing remaining-seat counters.

**Browser cases to record:** 1 / 3 / 5 succeed when inventory permits; 0 / 6 / 2.5 fail on the client **and** server; 409 shows a readable error; cancelling a 3-seat booking restores exactly 3. Screenshots are redacted and paired with real request/status evidence.


### Step 6. Add a Backward-Compatible D1 Migration

Create `migrations/0002_seat_count_v11.sql` **on the v1.1 feature branch created in Step 4**, only after approval:

```sql
ALTER TABLE reservations
ADD COLUMN seat_count INTEGER NOT NULL DEFAULT 1
CHECK (seat_count BETWEEN 1 AND 5);
```

The `DEFAULT 1` is the compatibility mechanism for existing one-seat records. The schema change is not a substitute for correct application transactions, cancellation logic, and release ordering. Keep the prior `0001_initial_v1.sql` unchanged after use.

Run the local migration **after** finishing v1.0 baseline verification:

```bash
npm run db:local
npx wrangler d1 execute ticket-db --local \
  --command "PRAGMA table_info(reservations);"
```

Check actual old records still read as `seat_count = 1`. Store a sanitized before/after record of the verification.

### Step 7. Run Unit Tests and Prepare Regression Coverage

Run:

```bash
npm run typecheck
npm run test:unit
```

Seat validation tests:

| Input | Expected |
|---|---|
| `1`, `3`, `5` | Valid |
| `0`, `6`, `2.5`, `null`, `"3"` | Invalid unless a separately specified normalization rule is approved |

Plan regression cases for **browser keyword search, selection, one-seat booking, group booking, cancellation form, browser errors**, older stored reservations, v1.1 group seats, cancellation counts, protected administrator calls, and KV reads. Run `npm run test:ui` after `npm run test:unit`.

### Step 8. Maintain Living Specs and Wiki

Link CHG-001 to the approved spec, changed TypeScript files, migration, tests, and evidence in `wiki/version-evolution.md`. Clearly distinguish **implemented**, **tested locally**, and **not yet deployed**.

**Lab 2 deliverables (presented at Review 3):** v1.0.0 production release record (URL, v1.0 version ID, smoke output, test event/reservation IDs); v1.1 quantity selector + typed API request + browser error/confirmation states; UI test output and browser evidence; feature branch `feature/v1.1-group-reservation` with all v1.1 commits; CHG-001; approved v1.1 spec/plan/tasks; change impact; TypeScript changes using `db.batch()`; migration; type-check evidence; unit-test results; regression plan; verified old-data compatibility; Wiki update.

---

# 10. Session 3 — November 30 (Monday)
## Review 3 — Version 1.1 Evolution and Testing

Show **v1.1 browser search/reserve/cancel and quantity 3** along with the approved change request, updated specification, browser/Worker source diff, migration, old-data verification, tests, and Wiki traceability. Explain the engineering process rather than focusing only on the SQL syntax.

**Instructor question:** “Why do passing new unit tests not prove the release is safe?”

## Lab 3 — Integration, Regression, Concurrency, GitHub PR, CI

**Objective:** Verify interacting components and establish an enforceable review and CI process.

### Step 1. Distinguish the Test Layers

| Test | What it proves | Example |
|---|---|---|
| Unit | Isolated function behavior | `seatCount = 6` is rejected |
| React UI (Testing Library/jsdom) | Client filtering, accessible JSX states, safe rendering | Search only matching titles; malicious text remains text |
| Manual browser E2E | Real HTML/JS + Worker/D1 together | Search → reserve → cancel → refresh |
| Integration | Worker and services working together | POST reservation persists to D1 |
| Regression | Existing behavior survived evolution | Old one-seat reservation still works |
| Concurrency | Simultaneous requests do not oversell | Two attempts for the final seat |
| Security | Protected action remains protected | No admin token → HTTP 401 |
| Smoke | Deployed basic endpoints respond | Health/events/config return expected status |

### Step 2. Run Integration Tests Against a Local Worker

In terminal A:

```bash
npm run build
npm run db:local
npm run seed:local
npm run dev
```

In terminal B, load the **development-only** token from `.dev.vars` (never a production secret) and run every HTTP test layer:

```bash
export ADMIN_TOKEN="$(grep '^ADMIN_TOKEN=' .dev.vars | cut -d= -f2-)"
npm run test:ui
npm run test:integration
npm run test:regression
npm run test:concurrency
npm run test:security
```

All four HTTP suites are Vitest projects; the additional `ui` suite is jsdom-only. They read `BASE_URL` (default `http://127.0.0.1:8787`) and `ADMIN_TOKEN` through `tests/helpers/http.ts`. Never print the token.

### Step 3. Verify Required API Scenarios

| Scenario | Target response |
|---|---|
| Create admin event without authentication | HTTP 401 |
| Create admin event with proper authentication | HTTP 201 |
| Reserve five seats | HTTP 201 |
| Reserve six seats | HTTP 400 |
| Request more than the remaining capacity | HTTP 409 |
| Reserve for a nonexistent event ID | HTTP 404 |
| `GET /api/events/:id` for an unknown ID | HTTP 404 |
| Cancel valid reservation | HTTP 200 |
| Cancel already-cancelled reservation | HTTP 404 |
| Concurrent requests for last seat | Exactly one success; no overselling |

Each Vitest test asserts both the HTTP status and the resulting D1 state.

### Step 3A. Verify the Browser UI and Real End-to-End Journey (New)

1. Run `npm run test:ui`. Use **Vitest/jsdom + React Testing Library** (`render`, `screen`, `userEvent`, `waitFor`) to verify case-insensitive search, empty results, React text escaping of malicious-looking titles (no created `<img>`), selection, form state, loading, API error handling, and booking/cancellation calls. Appendix C includes component tests with mocked APIs.
2. Run the local Worker and open `http://127.0.0.1:8787/` in a real browser. Use Developer Tools → Network to confirm `GET /api/events` returns real data and both POST calls reach the Worker. Keep screenshots redacted.
3. Search `concert` (or a keyword present in the team's actual seed); select an event with at least 5 available seats; reserve **3**; compare D1 inventory before/after. Record actual HTTP 201 and the reservation ID (redact the cancellation code).
4. Cancel that 3-seat reservation using its private code. Verify actual HTTP 200 and that the D1-backed remaining count increases **by 3**, not by 1. Do not store the code in the evidence directory.
5. Try six seats (client rejects), more seats than remain (API 409), and the wrong code (404). Refresh the page and repeat search to confirm that the UI does not depend on stale in-memory fixtures.
6. Check responsive layout at narrow viewport, labels/keyboard focus, clear loading/error messages, and no admin token or private code in URLs, Git, or browser storage.
7. Save `docs/browser-test-report.md` with a timestamp, **environment (local)**, tested browser, actual status codes, sanitized screenshots, pre/post D1 counts, failures, and fixes. Never run mutation tests against production.

**Test independence:** Vitest/jsdom is a fast client test; HTTP Vitest proves API/D1; a real-browser walkthrough proves integration of all layers. All three are required. An optional Playwright suite may automate the browser walkthrough but does not replace the other tests.


### Step 4. Demonstrate the Concurrency Regression

Create an event with one seat remaining. Send two reservation attempts at nearly the same time:

```text
Remaining seats = 1
Request A ──┐
            ├── Cloudflare Worker → D1
Request B ──┘
Expected: one HTTP 201, one HTTP 409; reserved seats = 1
```

Vitest version of the test (it repeats the race, because a single lucky run proves nothing):

```ts
// tests/integration/concurrency.test.ts
import { describe, it, expect } from 'vitest';
import { api, adminHeaders } from '../helpers/http';

describe('last-seat concurrency', () => {
  it('never oversells the final seat (10 rounds)', async () => {
    for (let round = 0; round < 10; round++) {
      const ev = await api('/api/admin/events', {
        method: 'POST',
        headers: adminHeaders(),
        body: JSON.stringify({
          title: `Concurrency ${Date.now()}-${round}`,
          startsAt: '2027-03-01T09:00:00Z',
          capacity: 1,
        }),
      });
      expect(ev.status).toBe(201);

      const attempt = (n: number) => api('/api/reservations', {
        method: 'POST',
        body: JSON.stringify({ eventId: ev.body.id, email: `race${n}@example.com`, seatCount: 1 }),
      });
      const results = await Promise.all([attempt(1), attempt(2)]);
      expect(results.map((r) => r.status).sort()).toEqual([201, 409]);

      const after = await api(`/api/events/${ev.body.id}`);
      expect(after.body.remainingSeats).toBe(0);   // authoritative D1 inventory
    }
  });
});
```

Record failing rounds as evidence. A failing round means the implementation is not concurrency-safe; check that it uses the conditional `db.batch()` pattern from Lab 2 Step 5.

### Step 5. Push the Feature Branch and Open the Pull Request

The feature branch was created in **Lab 2 Step 4**. Confirm you are on it; do not recreate it:

```bash
git branch --show-current     # must print feature/v1.1-group-reservation
git status
git diff
```

If v1.1 commits were made on `main` by mistake, stop and ask the instructor before moving them. After review:

```bash
git add src client public migrations tests seeds docs specs wiki scripts
# Include other actual reviewed files as needed.
git commit -m "feat: add TypeScript group reservations for v1.1"
git push -u origin feature/v1.1-group-reservation
```

The PR must link CHG-001, approved Spec Kit documents, **browser screenshots and `docs/browser-test-report.md`**, TypeScript changed paths (`client/`, `public/`, `src/`), D1 migration, real UI/API tests, compatibility risks, and a rollback plan. **Do not commit generated credentials, private fixtures, or `.dev.vars`.**

### Step 6. Request AI Review but Require Human Approval

Ask the OpenClaw **main agent** to review the PR against the relevant project's `AGENTS.md`, constitution, specs, tests, and migration. Require findings with precise file paths and line references. Evaluate specification completeness, input validation, inventory consistency, compatibility, maintainability, security, test gaps, deployment and recovery risks.

The AI may **recommend** changes. It must not automatically approve its own code. A student or peer reviewer decides whether the PR can merge.

### Step 7. Configure CI With TypeScript Quality Gates

The required GitHub Actions CI process is:

```text
Pull Request → npm ci → wrangler types → tsc (Worker, client, tests projects)
            → build TypeScript client → Vitest unit + ui (jsdom)
            → write throwaway .dev.vars → local D1 migration → seed:local
            → start local Worker → Vitest integration + regression
            → Vitest concurrency + security
            → pass/fail → human code review → merge eligibility
```

`.github/workflows/ci-deploy.yml` — CI job (the CD job is added in Lab 4 Step 3):

```yaml
name: ci-deploy

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  ci:
    runs-on: ubuntu-latest
    env:
      BASE_URL: http://127.0.0.1:8787
      WRANGLER_SEND_METRICS: 'false'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: npm
      - run: npm ci
      - run: npm run typecheck
      - run: npm run build
      - run: npm run test:unit
      - run: npm run test:ui

      # CI-only local secret: random per run, masked in logs, never committed.
      # No Cloudflare credentials exist in this job, so it cannot touch production.
      - name: Create throwaway .dev.vars
        run: |
          ADMIN_TOKEN="ci-$(openssl rand -hex 16)"
          echo "::add-mask::$ADMIN_TOKEN"
          printf 'ADMIN_TOKEN=%s\n' "$ADMIN_TOKEN" > .dev.vars
          echo "ADMIN_TOKEN=$ADMIN_TOKEN" >> "$GITHUB_ENV"

      - run: npm run db:local
      - run: npm run seed:local

      - name: Start local Worker
        run: |
          npx wrangler dev --port 8787 > wrangler-dev.log 2>&1 &
          npx tsx scripts/wait-for-worker.ts

      - run: npm run test:integration
      - run: npm run test:regression
      - run: npm run test:concurrency
      - run: npm run test:security

      - name: Keep diagnostics on failure
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: ci-diagnostics
          path: wrangler-dev.log
          retention-days: 7
```

Rules:

- `.dev.vars` is written **inside the runner** and disappears with it. It is never committed, and `ADMIN_TOKEN` is never echoed after masking.
- The CI job has **no** `CLOUDFLARE_API_TOKEN`, so a pull request cannot reach production D1 or KV.
- `scripts/wait-for-worker.ts` polls `${BASE_URL}/api/health` until HTTP 200 or a timeout, then exits nonzero on timeout.
- `npm run typecheck` runs before the throwaway `.dev.vars` exists, so `ADMIN_TOKEN` is typed through `AppEnv` (Section 4.7), not through generated types.
- React Testing Library UI tests verify `client/App.tsx` and pure `client/search.ts` without production access; **manual browser evidence** is additionally reviewed in the PR.
- Protect the `main` branch: require the `ci` job to pass and at least one human approval before merging.

### Step 8. Practice CI Failure Analysis

On a **temporary test branch**, introduce a controlled defect, for example allowing `seatCount = 6`. Capture the actual failed test and GitHub Actions job; correct the defect and verify a subsequent **real** green run. The broken branch must never deploy. Document both run URLs and analysis in `docs/` / `evidence/`, and record the lesson in `wiki/ci-cd-lessons.md`.

**Lab 3 deliverables (presented at Review 4):** real browser E2E + redacted evidence; UI/jsdom passing tests; real integration, regression, concurrency and security test outputs; reviewed TypeScript PR; human review; working CI that runs the six mandatory non-smoke Vitest projects; deliberate failure diagnosis and corrected CI; linked specs, code, tests, Wiki and evidence.

---

# 11. Session 4 — December 2 (Wednesday)
## Review 4 — Pull Request, Code Review, and CI

Present feature branch history, PR description, review comments, TypeScript type-check/build jobs, automated test results, a controlled failure, a correction, and links to approved specs.

**Instructor question:** “Why must passing tests and code review precede merging into `main`?”

## Lab 4 — Full-Stack CD, Browser Static Assets, Smoke Tests, Release Management

**Objective:** Deliver **the compiled browser UI and matching Worker/D1/KV API** as one safe, versioned, verifiable Version 1.1 release.

### Step 1. Explain the Release Pipeline

```text
Approved PR → Required CI PASS → Human Review → Merge main
        → Release Environment Approval → D1 Time Travel Bookmark
        → Remote D1 Migration
        → Build Browser Bundle + TypeScript Worker Deploy
        → Production React bundle/HTML/CSS + API Read-Only Smoke
        → Observability → Recorded Release Evidence
```

CI produces quality evidence. CD manages controlled delivery. Deployment approval is still mandatory in this course, whether implemented as a GitHub Environment approval or a separately documented release decision.

### Step 2. Configure GitHub Secrets and Variables

Go to **Repository → Settings → Secrets and variables → Actions**. Add relevant scoped credentials in GitHub Secrets, never in the repository or Wiki.

| Name | Kind | Purpose |
|---|---|---|
| `CLOUDFLARE_API_TOKEN` | Secret | Limited-privilege deployment authentication (Workers, D1, KV edit for this account only) |
| `CLOUDFLARE_ACCOUNT_ID` | Secret | Cloudflare account identification |
| `PRODUCTION_URL` | Variable | The **actual** deployed Worker URL, added after the v1.0 baseline release (Lab 2 Step 0) |

The production admin token is **not** a GitHub secret. It is a Cloudflare runtime secret, already set from the student's terminal in Lab 2 Step 0 (after the first deploy). Rotate it the same way only if it may have leaked:

```bash
npx wrangler secret put ADMIN_TOKEN
# Wrangler prompts for the value. Paste a new random value
# (for example from `openssl rand -hex 32`) that differs from
# the local .dev.vars token. Never pass it as a command-line argument.
npx wrangler secret list    # shows the name ADMIN_TOKEN, never the value
```

Admin authentication must **fail closed**: if `ADMIN_TOKEN` is missing, every admin request returns HTTP 401. Do not log secret values.

### Step 3. Back Up D1, Then Run the Approval-Gated CD Job

The CD job runs only after the required CI checks pass on `main` and a reviewer approves the GitHub `production` Environment. **Before every remote migration, record a D1 restore point.** D1 Time Travel is always on and can restore the database to any minute in the last 30 days, but only if the team knows which point to restore to.

**First v1.1 production release — manual, under instructor supervision** (production already runs `v1.0.0` from Lab 2 Step 0):

```bash
# 0. Confirm the target account, database, and pending migrations (only 0002 should be pending)
npx wrangler whoami
npx wrangler d1 info ticket-db
npx wrangler d1 migrations list ticket-db --remote

# 1. Record the Time Travel restore point; copy the bookmark into docs/deployment-report.md
npx wrangler d1 time-travel info ticket-db

# 2. Optional full export. It contains personal data:
#    store it OUTSIDE the repository and never in wiki/, evidence/, or GitHub.
mkdir -p "$HOME/capstone-backups"
npx wrangler d1 export ticket-db --remote \
  --output="$HOME/capstone-backups/ticket-db-pre-v1.1.sql"

# 3. Migrate and deploy (each step separately approved)
npm run db:remote
npm run deploy

# 4. Verify the Lab 2 Step 0 v1.0 test reservation survived the migration (read-only)
npx wrangler d1 execute ticket-db --remote \
  --command "SELECT id, seat_count, status FROM reservations WHERE id = '<V1_TEST_RESERVATION_ID>';"

# 5. Read-only smoke test (Step 5)
BASE_URL="https://THE-ACTUAL-DEPLOYED-URL" npm run smoke
```

**Later releases — automated CD job** appended to `.github/workflows/ci-deploy.yml`:

```yaml
  deploy:
    needs: ci
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production        # protection rule: a human reviewer must approve
    concurrency: production-deploy
    env:
      WRANGLER_SEND_METRICS: 'false'
      # Cloudflare credentials are NOT set at job level: npm ci runs dependency
      # install scripts, which must never see them. Each remote step gets its own env.
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: npm
      - run: npm ci
      - run: npm run typecheck
      - run: npm run build
      - run: npm run test:unit
      - run: npm run test:ui

      # D1 recovery path: record the restore point BEFORE migrating.
      - name: Record D1 Time Travel bookmark
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
        run: |
          set -o pipefail   # without this, `| tee` hides a failure and the release continues with no bookmark
          npx wrangler d1 time-travel info ticket-db | tee d1-bookmark-before-migration.txt
      - name: Keep the bookmark with this run
        uses: actions/upload-artifact@v4
        with:
          name: d1-bookmark-${{ github.sha }}
          path: d1-bookmark-before-migration.txt
          retention-days: 30

      - name: Remote D1 migration
        run: npm run db:remote
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
      - name: Deploy Worker and static assets
        run: npm run deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}

      - name: Production smoke test (read-only)
        run: npm run smoke
        env:
          BASE_URL: ${{ vars.PRODUCTION_URL }}
```

The bookmark file holds no customer data, so it may be kept as a run artifact. A full `d1 export` does contain customer data and is **never** produced in CI.

Credentials are **step-scoped**: only the bookmark, migration, and deploy steps receive `CLOUDFLARE_API_TOKEN`. GitHub's default `run` shell does not enable `pipefail`, so the bookmark step sets it explicitly; a failed `time-travel info` must stop the release before `db:remote`.

**Never run remote migration commands merely because an AI agent suggested them.** The student approves each remote change.

### Step 4. Analyze Migration/Deployment Failure Ordering and Rollback Risk

**Scenario A — migration succeeds, deployment fails:**

```text
Remote D1 migration succeeds
          ↓
Worker deployment fails
          ↓
Old v1.0 Worker is still active with the NEW v1.1 schema
```

This case is **safe by design**: v1.0 code never writes `seat_count`, so new rows get `DEFAULT 1`, which is exactly what a v1.0 reservation means. Verify it with a test anyway.

**Scenario B — rolling back the Worker after group reservations exist (the dangerous case):**

```text
1. v1.1 is live. Event E has capacity 100, remaining_seats 100.
2. Alice reserves 3 seats  → seat_count = 3, remaining_seats = 97.
3. A smoke test fails for an unrelated reason; the team runs
   `wrangler rollback` to the v1.0 version from Lab 2 Step 0. D1 stays on the v1.1 schema.
4. Alice cancels. v1.0 code knows nothing about seat_count and
   restores ONE seat → remaining_seats = 98.
5. Correct value: 100. Two seats are permanently lost from sale,
   no error is logged, and every later report is wrong.
```

Customers are affected too: a cached v1.1 page that sends `seatCount: 3` to the rolled-back v1.0 Worker receives a one-seat reservation while the customer believes they hold three.

Lessons the team must write into `docs/rollback-plan.md`:

- A Worker rollback is **not** a safe undo once group reservations exist. Prefer a **forward fix** (a corrected v1.1.x release).
- If rollback is unavoidable, first block group reservations and cancellations of reservations with `seat_count > 1` (for example a KV feature flag checked by the v1.1 code before rollback, or a maintenance response), then roll back.
- After any rollback, run an inventory reconciliation query and repair differences with an approved, reviewed SQL change:

```sql
-- Events whose stored inventory disagrees with active reservations
SELECT e.id,
       e.remaining_seats                                   AS stored,
       e.capacity - COALESCE(SUM(r.seat_count), 0)         AS expected
  FROM events e
  LEFT JOIN reservations r
         ON r.event_id = e.id AND r.status = 'active'
 GROUP BY e.id
HAVING stored <> expected;
```

- **D1 recovery is independent of Worker rollback.** A D1 Time Travel restore returns the **entire** database to the recorded bookmark, so every reservation made after that point is lost:

```bash
# Only with explicit human approval, after protecting newer reservations
npx wrangler d1 time-travel restore ticket-db \
  --bookmark=<BOOKMARK_RECORDED_BEFORE_MIGRATION>
```

  Record the bookmark that the restore command reports for the state *before* the restore; it allows the restore itself to be undone.

### Step 5. Deploy and Run Read-Only **Full-Stack** Production Smoke Tests

After approval and deployment, capture the **actual URL** from Cloudflare, save it as the `PRODUCTION_URL` Actions variable, and run:

```bash
BASE_URL="https://THE-ACTUAL-DEPLOYED-URL" npm run smoke
```

Required smoke endpoints are read-only:

| Endpoint | Expected |
|---|---|
| `GET /api/health` | HTTP 200 |
| `GET /api/events` | HTTP 200, JSON |
| `GET /api/config` | HTTP 200, JSON (KV seeded in Lab 2 Step 0) |
| `GET /` | HTTP 200 with HTML mount element `#root` (the event-search field appears after React hydrates/renders in a real browser) |
| `GET /styles.css` | HTTP 200 with CSS content type |
| `GET /assets/app.js` | HTTP 200 with JavaScript asset content type |

```ts
// tests/smoke/smoke.test.ts — READ-ONLY: GET requests only
import { beforeAll, describe, it, expect } from 'vitest';

const BASE_URL = process.env.BASE_URL ?? '';   // no localhost fallback for smoke

async function get(path: string) {
  const res = await fetch(`${BASE_URL}${path}`);
  return { res, text: await res.text(), type: res.headers.get('content-type') ?? '' };
}

describe('production smoke (read-only)', () => {
  beforeAll(() => {
    // Stop the whole file early instead of requesting "undefined/api/...".
    if (!/^https:\/\//.test(BASE_URL)) {
      throw new Error('Set BASE_URL to the deployed https:// URL before running smoke.');
    }
  });

  it('GET /api/health → 200', async () => {
    expect((await get('/api/health')).res.status).toBe(200);
  });

  it.each(['/api/events', '/api/config'])('GET %s → 200 JSON', async (path) => {
    const { res, type } = await get(path);
    expect(res.status).toBe(200);
    expect(type).toContain('application/json');
  });

  it('GET / → 200 HTML with the React #root mount node', async () => {
    const { res, text, type } = await get('/');
    expect(res.status).toBe(200);
    expect(type).toContain('text/html');
    expect(text).toContain('id="root"');
  });

  it('GET /styles.css → 200 CSS', async () => {
    const { res, type } = await get('/styles.css');
    expect(res.status).toBe(200);
    expect(type).toContain('text/css');
  });

  it('GET /assets/app.js → 200 JavaScript', async () => {
    const { res, type } = await get('/assets/app.js');
    expect(res.status).toBe(200);
    expect(type).toMatch(/javascript/);
  });
});
```

The smoke project must never create reservations or change production inventory. **An asset HTTP 200 alone does not prove that booking works**: preserve the complete browser acceptance record from local testing and ensure it targets the release commit. After deployment, use the browser to confirm the page loads and client assets are present; keep production verification read-only. The only production writes in the course are the Lab 2 Step 0 baseline test data. Store the actual redacted Vitest output and the deployment commit hash.

### Step 5A. Validate the Deployed Browser (Read-Only)

Open the actual deployed HTTPS URL in a normal browser (not just a terminal). Confirm visible event cards and client-side keyword filtering; inspect Network to see `GET /api/events` and the compiled `/assets/app.js` served from the **same origin**, with no 404 or CORS failure. Check the browser console, responsive layout, keyboard access, and a clear empty-result state. **Do not create or cancel real production reservations** as part of smoke. The write path was demonstrated against the local Worker in Lab 3. Record redacted screen and Network evidence, release commit, and actual URL in `docs/deployment-report.md`.

### Step 6. Deliver the Individual Engineering Improvement End-to-End

Each student delivers the **individual improvement** proposed in `docs/proposal.md` (Lab 0 Step 8) as one small approved change, for example a KV-backed announcement banner: `docs/change-request-CHG-<NNN>.md` → approved spec → branch → PR → CI → human review → merge → gated CD → read-only smoke → verification. Keep it small enough for one PR. Confirm that the deployed behavior corresponds to the reviewed commit. Start in Lab 4; it may continue through Lab 5 and must be finished by Review 6. It is graded separately (Section 15.2).

### Step 7. Prepare the Release and Rollback Reports

Save `docs/deployment-report.md` and `docs/rollback-plan.md` with real SHA, PR, CI run, CD run, the pre-migration D1 Time Travel bookmark, applied migrations, deployed URL, smoke output, operational risks, the Scenario B rollback analysis, and a recovery procedure. Update `wiki/release-history.md` only when release evidence exists.

**Lab 4 deliverables (presented at Review 5):** live full-stack website URL, React bundle/HTML/CSS + API smoke evidence, deployed browser read-only check; approved merged PR; passing CI; approval-gated CD; `ADMIN_TOKEN` runtime secret set (name only shown); pre-migration D1 bookmark; Cloudflare deployment; actual URL; D1 migration record; seeded production KV config; post-release smoke evidence; release and rollback reports; Wiki entry with provenance; individual improvement CHG and PR (in progress or merged).

---

# 12. Session 5 — December 7 (Monday)
## Review 5 — Production Deployment, CI/CD, and Operational Evidence

Show the **actual deployed browser URL, searchable event list, static-asset requests**, merged PR, successful type-check/build/tests, CD run, deployed TypeScript Worker, D1/KV response, read-only smoke test, Git SHA, release record, and rollback plan.

**Instructor question:** “What should the team do if deployment succeeds but the production smoke test fails?”

## Lab 5 — Security, Observability, Incident, Refactoring, Final Release

**Objective:** Demonstrate the Operations and Maintenance stages using verified evidence.

### Step 1. Perform a Security Review

| Requirement | Verification |
|---|---|
| Admin authentication | No token → HTTP 401 |
| Admin token comparison | Constant-time `crypto.subtle.timingSafeEqual`; missing secret → HTTP 401 |
| Authorization | Only permitted admin operations succeed |
| Cancellation authorization | A valid cancellation token is required |
| Secret management | No secrets committed or logged |
| Input validation | Invalid seat quantities rejected in client **and** Worker |
| Browser XSS prevention | Render untrusted titles/messages as escaped React JSX text; prohibit `dangerouslySetInnerHTML` |
| Browser secret protection | No admin token, cancellation hash, email, or secret in bundle/URL/logs/storage |
| Usability/accessibility | Input labels, keyboard focus, clear loading/409/error feedback, narrow screens |
| SQL injection prevention | Parameterized D1 queries |
| Sensitive data protection | Emails/tokens absent from logs and Wiki |
| Environment separation | Local and production credentials differ |

The teaching application uses a simplified administrative bearer-token model, **not** a full customer identity or role-based authorization solution. Document limitations explicitly.

### Step 2. Execute Authentication Tests

Without a token:

```bash
curl -i -X POST http://127.0.0.1:8787/api/admin/events \
  -H 'Content-Type: application/json' \
  -d '{"title":"MIU Global Event","startsAt":"2027-03-01T09:00:00Z","capacity":100}'
```

**Expected:** HTTP 401. With a correctly configured **development-only** token:

```bash
curl -i -X POST http://127.0.0.1:8787/api/admin/events \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"title":"MIU Global Event","startsAt":"2027-03-01T09:00:00Z","capacity":100}'
```

**Expected:** HTTP 201. Save real results after redaction. Do not run these event-creation examples against production for smoke testing.

### Step 2A. Review Browser-Side Security and Error Handling (New)

1. Verify no `ADMIN_TOKEN`, Cloudflare API token, production secret, raw cancellation code, or real user email is baked into the React bundle `public/assets/app.js` or exposed in a URL. Cloudflare binding identifiers must not be used as browser credentials; admin operations remain server-protected.
2. Confirm React renders event titles as **escaped text in JSX** (for example `{event.title}`); never use `dangerouslySetInnerHTML` on untrusted content. In a local React Testing Library test, render the title `<img src=x onerror=alert(1)>` and verify it stays text and no `<img>` element appears.
3. Test empty/malformed email, 0/6/2.5 seats, sold-out 409, invalid/used cancellation code 404, and network failure through controlled React forms. Pending state must prevent double-submit, and successful messages must follow actual 2xx responses.
4. Use keyboard-only navigation and a narrow browser viewport. Labels must be associated with input IDs; focus indicators and `aria-live` updates must be visible/audible.
5. When the backend returns an `X-Request-ID`, optionally display a safe correlation ID for failed requests; do not log raw request bodies, cancellation codes, or email addresses.


### Step 3. Inspect Workers Logging and Observability

```bash
npx wrangler tail
```

Alternatively inspect the Cloudflare Dashboard's Workers Observability features. Students should implement privacy-safe structured logs in `src/logging.ts`. Example event shape:

```json
{
  "level": "info",
  "requestId": "example-correlation-id",
  "method": "POST",
  "path": "/api/reservations",
  "status": 201,
  "latencyMs": 24,
  "errorCode": null
}
```

Explain `requestId`, HTTP method, route, response status, latency, and error code. Do not log full credentials, cancellation tokens, or personal customer emails.

### Step 4. Define Meaningful Operational Metrics

Monitor request count, unexpected server errors, HTTP 5xx rate, latency, failed reservations, and capacity conflicts. Distinguish **valid HTTP 409 business conflicts** from unexpected HTTP 500 failures. If logs are unavailable, report that limitation and do not fabricate an operational graph.

### Step 5. Reproduce and Investigate a Controlled Incident

Create an `INC-001` scenario in the **local or test** environment: a reservation unexpectedly fails because of validation, configuration, D1 error, or code exception. Investigate:

```text
Detection → Request ID + sanitized logs → Reproduction
→ Root cause → Corrective action → Regression test
→ Reviewed PR → Verified release → Wiki lesson
```

Do not deliberately break production. Save `docs/incident-report.md` with summary, timeline, impact, evidence, root cause, correction, regression prevention, and release verification. The main agent may draft the report, but the student must verify the facts.

### Step 6. Refactor TypeScript While Preserving Behavior

Refactor large Worker handlers into `src/services/`, `src/validation.ts`, `src/auth.ts`, or `src/logging.ts` when justified; also refactor React browser responsibilities cleanly among `client/api.ts`, `client/search.ts`, and `client/App.tsx` without breaking the UI. The visible API contract must stay unchanged. Typecheck and all Vitest projects (unit, **ui**, integration, regression, concurrency, security) must still pass, followed by a repeat of the real-browser search/reserve/cancel walkthrough against the local Worker. Record the before/after change in `docs/refactoring-report.md` and PR history.

### Step 7. Prepare v1.1 Release Notes and Rollback Strategy

Complete `docs/release-notes-v1.1.md`. Include actual implemented **browser event search, booking and cancellation**, group reservations, cancellation, validation, TypeScript quality gates, backward-compatible migration, **UI and API tests**, PR, CI/CD, static asset/API production smoke, security, and known limitations (guest reservations, no actual payment, no email verification, as applicable).

Describe code rollback and **independent D1 recovery**, building on Lab 4 Step 4:

- Determine the last known-good Worker version or deployment (`npx wrangler deployments list`).
- State explicitly that rolling back to v1.0 code after group reservations exist **corrupts inventory** (Scenario B), and name the forward-fix alternative.
- List the guard taken before any rollback (for example, blocking group reservations and multi-seat cancellations).
- Include the inventory reconciliation query and who approves a repair.
- Record the pre-migration **D1 Time Travel bookmark** and, if taken, where the off-repository `d1 export` file is kept.
- Explain that `wrangler d1 time-travel restore` replaces the whole database and loses every reservation made after the bookmark; protect or re-apply those reservations first.
- Do not equate `wrangler rollback` with database rollback.
- Obtain human approval before any production rollback or restoration.

Document the procedure without destructive production experiments; practice restores only on a separate test database.

### Step 8. Create the Verified Release Tag

Only after the release is actually validated:

```bash
git tag -a v1.1.0 -m "Verified TypeScript capstone release"
git push origin v1.1.0
```

Record the mapping of the tag to commit, PR, CI/CD, deployment, smoke evidence, and Wiki release history.

**Lab 5 deliverables (presented at Review 6):** UI error and XSS/accessibility review, browser refactoring and re-test evidence; security and authorization review; test outputs; real structured logs/metrics or documented limitations; incident; refactoring evidence; complete release notes; verified rollback plan with the Scenario B analysis and D1 bookmark; release tag; individual improvement deployed with CI/CD and smoke evidence; updated, sourced engineering Wiki.

---

# 13. Session 6 — December 9 (Wednesday)
## Review 6 — Final Software Engineering Defense

The final presentation is a defense of the **complete full-stack engineering lifecycle**, not simply a ticket-booking product demo. A **real, clickable browser search → reserve → cancel demonstration** is compulsory, with write actions performed against the local Worker, while production evidence remains tied to the released commit.

## 13.1 Presentation Structure

| Part | Topic | Suggested time |
|---|---|---|
| A | Product vision, requirements, architecture, v1.0 → v1.1 | 1 minute |
| B | **Live browser**: search → choose event → reserve 3 seats → cancel → refreshed D1 availability | 1 minute |
| C | Browser UI + API tests, PR, CI/CD, Cloudflare React/HTML/JS + Worker release, security, logs | 2 minutes |
| D | Engineering decisions, Wiki evidence, and Q&A | 1 minute |
| **Total** | | **5 minutes per student** |

For 15 students, the defense takes about 75 minutes. When appropriate, teams may use an extended presentation format.

## 13.2 Defense Questions

1. How did your project move from requirements to release and operations?
2. Why is the project TypeScript-based, and where is browser JavaScript generated?
3. What changed between v1.0 and v1.1, and which changes were approved?
4. How did existing reservations remain valid after migration?
5. What is the difference between type checking and runtime input validation?
6. What do unit, integration, regression, concurrency, and smoke tests each prove?
7. Show the actual PR and the required passing GitHub Actions run.
8. What happens after the approved merge, and which step requires release approval?
9. Show the real production URL and smoke-test evidence.
10. How are admin endpoints, cancellation, and secrets protected?
11. How does a request ID help investigate failures?
12. What caused your incident and what regression test prevents recurrence?
13. What if D1 migration succeeds but Worker deployment fails?
14. Why does rolling back a Worker not automatically restore an old D1 schema?
15. Which work did OpenClaw `main` do? What did the student personally verify?
16. Why did you use a project `AGENTS.md` instead of creating a ticket-specific agent?
17. How do you prevent project A's agent instructions from modifying project B?
18. How does the repository's `wiki/` connect decisions to concrete evidence?
19. Show how React `client/App.tsx` calls `client/api.ts` and how both connect to the deployed Worker API.
20. Why is client-side filtering not a substitute for D1-backed reservation logic?
21. Show the browser inventory before a 3-seat reservation, after booking, and after cancellation.
22. How does the UI prevent XSS, duplicate submission, and accidental exposure of cancellation credentials?

Students must cite actual **Git history, TypeScript files, tests, specs, PR comments, GitHub Actions logs, Cloudflare release evidence, and Wiki source links**. A plausible narrative is not proof.

## 13.3 Lab 6 — Portfolio and Final Verification

**Compulsory live browser script (use only test data):** Open the actual local app (`http://127.0.0.1:8787/`); search a known event; select it; reserve 3 seats using a test email; show the returned ID (hide the private code from the audience); demonstrate D1-backed decrease of 3; cancel with the private code without projecting it; show inventory restored by 3; then open the actual production URL **read-only** to show the released UI and matching static-asset/API smoke records. If a live service is unavailable, show the real previously captured evidence and disclose that the live step could not be repeated; **do not fabricate a PASS**.

1. Confirm `v1.1.0` points to the intended commit and deployed release.
2. Recheck the approved v1.1 spec and traceability matrix.
3. Verify that TypeScript typecheck, browser bundle build, UI jsdom, API suites, and real-browser acceptance records exist.
4. Verify reviewed PR, passing CI, gated CD, deployed browser URL, React bundle/HTML/CSS + API smoke evidence.
5. Review security, incident, rollback, and limitations reports.
6. Check the Wiki links and source provenance; correct unsupported claims.
7. Confirm no credentials or private information appear in Git or Wiki.
8. Commit the final portfolio and present the evidence chain.

---
# 14. Final Software Engineering Portfolio — 18 Mandatory Components

The original Week 15/Capstone requirement of **18 components** remains mandatory. TypeScript, the project `AGENTS.md`, and the unified Wiki are supporting evidence within these items; they do not remove any of the original 18.

| No. | Portfolio component | Required evidence |
|---:|---|---|
| 1 | Product Vision | Problem statement, outcomes, target users |
| 2 | Personas | Main users and needs |
| 3 | User Stories | Realistic **browser search/reserve/cancel** scenarios and measurable acceptance criteria |
| 4 | Requirements | Functional and non-functional requirements, approved specs |
| 5 | Architecture Diagram | Browser/static assets → Worker → D1/KV, CI/CD, TypeScript source and Wiki integration |
| 6 | Git Repository History | Reviewed commits, branches, baseline and release tags |
| 7 | Pull Request Evidence | PR description, human review, approval, linked requirements |
| 8 | Unit-Test Suite | TypeScript Worker unit **and client UI/jsdom** test source and real results |
| 9 | Integration-Test Suite | TypeScript HTTP API tests plus real-browser search/reserve/cancel and D1/KV results |
| 10 | CI Pipeline | GitHub Actions workflow and actual typecheck/build/test runs |
| 11 | Cloud Deployment | Actual **browser website** URL, HTML/CSS/JS + Worker API smoke output |
| 12 | Security Configuration | Admin auth, cancellation protection, runtime secrets, safe logging |
| 13 | Observability Evidence | Real structured logs, request IDs, metrics, limitations |
| 14 | Incident Report | Failure, root cause, correction, regression test |
| 15 | Refactoring Report | Structural TypeScript changes and behavior preservation |
| 16 | Version 1.1 Evolution Report | CHG-001, migration, tests, backward compatibility |
| 17 | Final Release Notes | Verified v1.1.0 release, known limitations, rollback strategy |
| 18 | Team Retrospective | Collaboration, human/AI roles, lessons, improvement ideas |

**Additional required SDD and AI evidence:** the constitution; `specs/*/{spec,plan,tasks}.md`; project `AGENTS.md`; TypeScript toolchain with the split `tsconfig` projects and `vitest.config.ts`; prompt log; traceability matrix; sourced `wiki/` pages; proof that one OpenClaw `main` agent selected this project without modifying another project; the individual improvement's change request, PR, CI/CD runs, and evidence (Section 15.2).

## 14.1 Traceability Matrix Template

| Requirement | Authoritative spec | TypeScript code | Test / evidence | PR + CI run | Release |
|---|---|---|---|---|---|
| Group reservations | `specs/002-group-reservation/spec.md` | `client/App.tsx` + `src/services/reservations.ts` | UI/JSdom + API + quantity tests | Actual PR / run URL | v1.1.0 |
| Browser event search | v1.0 + v1.1 UI specs | `client/search.ts`, `client/App.tsx` | UI/jsdom + live browser | Actual PR / run URL | Verified release |
| Browser cancellation | v1.0/v1.1 UI contract | `client/api.ts` + Worker cancellation | Browser D1 before/after + API test | Actual PR / run URL | v1.1.0 |
| Invalid quantity | Same | `src/validation.ts` | Unit validation | Actual PR / run URL | v1.1.0 |
| Admin authentication | Approved security spec | `src/auth.ts` | Security integration | Actual PR / run URL | v1.1.0 |
| KV announcement | Approved config requirement | `src/services/config.ts` | Config integration / smoke | Actual PR / run URL | Verified release |
| Privacy-safe request logging | Approved operations spec | `src/logging.ts` | Sanitized log evidence | Actual PR / run URL | Verified release |
| Compatibility with v1.0 | CHG-001 / spec | D1 migration + handler | Old-data, regression, concurrency, Lab 2 Step 0 production test reservation | Actual PR / run URL | v1.1.0 |
| Individual improvement | `CHG-<NNN>` / its spec | Actual changed paths | Its Vitest tests + smoke | Actual PR / run URL | Actual release |

Students replace every example cell with their actual links and results (Evidence Policy, item 6).

---

# 15. Grading Rubric — Common Core 80 + Individual 20 + Extra Credit (up to 20)

The grading structure decided on November 18 applies. Every student is assessed on the shared ticket-system lifecycle (**Common Core, 80 points**) and on one individually owned engineering improvement (**Individual, 20 points**). Optional work can earn **extra credit of up to 20 points**. The original eight assessment categories are kept inside the Common Core, scaled from 100 to 80.

## 15.1 Common Core (80 points)

| Assessment category | Points | Breakdown |
|---|---:|---|
| Requirements and Architecture | 12 | |
| Functional Implementation | 16 | Browser search/reserve/cancel UI 8; Worker/D1/KV behavior 8 |
| Unit and Integration Testing | 12 | UI/jsdom 4; API unit/integration/regression/concurrency/security 6; real-browser acceptance 2 |
| Git, Pull Requests, and CI/CD | 12 | |
| Security and Observability | 8 | |
| Incident Handling, Refactoring, and Evolution | 8 | |
| Portfolio Documentation | 8 | |
| Final Presentation and Teamwork | 4 | |
| **Common Core total** | **80** | |

## 15.2 Individual Engineering Improvement (20 points)

Each student delivers the one improvement proposed in `docs/proposal.md` (Lab 0 Step 8) as a **small, separately reviewable change in Labs 4–5**: one change request, one PR, its tests, and its deployment (Lab 4 Step 6).

| Criterion | Points | Required evidence |
|---|---:|---|
| Change request and approved spec | 4 | `docs/change-request-CHG-<NNN>.md`, approved acceptance criteria |
| Implementation and tests | 8 | TypeScript diff; Vitest tests that fail before and pass after; no regression |
| PR, CI, and gated deployment | 4 | Reviewed PR, green CI run, approved CD run, read-only smoke |
| Evidence, Wiki, and defense | 4 | Traceability row, sourced Wiki entry, explanation at Review 6 |
| **Individual total** | **20** | |

## 15.3 Extra Credit (up to 20 points)

| Optional work | Up to |
|---|---:|
| Automated Playwright browser E2E for search → reserve → cancel against the local Worker | 8 |
| Optional Queues notification path with tests and privacy-safe logs | 6 |
| Other verified quality work approved in advance (for example, an accessibility audit with fixes, or a load test of the concurrency path) | 6 |

Extra credit is awarded only for verified, reviewed work. Whether a course total may exceed 100 is an instructor policy decision; state it in the syllabus.

The instructor should require **actual TypeScript work**, a complete requirement-to-release evidence chain, a selected-project `AGENTS.md`, and a **verified** Wiki. A working local demo with no reviewed PR, CI, or verified deployment does not satisfy the full Software Engineering outcome. Students should not receive credit for AI-authored but unverified claims.

---

# 16. Instructor's Six-Review Checklist (24 Items)

## Review 1 — November 23: Requirements and Environment

- [ ] Product vision and measurable user stories are defined.
- [ ] Existing OpenClaw main agent, Spec Kit, Telegram, and **project** Wiki are available.
- [ ] Browser-ready React + TypeScript (TSX)/CSS v1.0 starter, Git repository, and correct `AGENTS.md` are ready.
- [ ] Student explains lifecycle and single-agent/multiple-project separation.

## Review 2 — November 25: Cloud Application Integration

- [ ] TypeScript typecheck/build and unit tests have real baseline results.
- [ ] **Real browser** searches events, reserves and cancels 1 seat; Worker/D1 events and KV config work locally.
- [ ] Approved v1.0 baseline spec and Git commit/tag are recorded.
- [ ] Project Wiki links to actual v1.0 evidence and architecture.

## Review 3 — November 30: Software Evolution

- [ ] CHG-001 and v1.1 specification, plan, tasks are approved.
- [ ] Browser 1–5 selector + reservation/cancellation and Worker `db.batch()` implemented in TypeScript on feature branch.
- [ ] v1.0.0 is released to production (Lab 2 Step 0), and the D1 migration preserves old reservation meaning.
- [ ] Unit, **UI/jsdom**, regression plan and actual early browser test evidence are submitted.

## Review 4 — December 2: CI and Code Review

- [ ] Feature branch and GitHub PR link to approved requirements.
- [ ] Human code review and TypeScript typecheck/build gates are evidenced.
- [ ] Unit, **ui**, integration, regression, concurrency, and security tests (all Vitest) run in CI; browser acceptance reviewed.
- [ ] Failed and corrected CI runs are analyzed honestly.

## Review 5 — December 7: CD and Operations

- [ ] Pre-migration D1 Time Travel bookmark, approved CD release, and D1 migration results are documented.
- [ ] Real browser site URL, **HTML/CSS/JS and API read-only smoke**, and production read-only page check are provided.
- [ ] Secrets, authentication, authorization, and logs are inspected.
- [ ] Rollback plan and release provenance are recorded in the Wiki.

## Review 6 — December 9: Final Defense

- [ ] Security, incident, refactoring, and individual-improvement (CHG, PR, CI/CD, smoke) evidence is complete.
- [ ] Verified v1.1.0 version tag, PR, CI/CD and deployment correspond.
- [ ] All 18 portfolio components, sourced Wiki pages, and **browser search→reserve→cancel** evidence are submitted.
- [ ] Student defends AI involvement, main-agent governance, and engineering decisions.

---

# 17. Engineering Governance: Important Distinctions

## 17.1 Main Agent Does Not Mean One Giant Project Workspace

One agent can manage many independent Git repositories. It does **not** imply that all code, research files, and Markdown notes should be merged into a single repository. The desired arrangement is:

```text
OpenClaw main agent (one)
   ├── graphene-research/         (separate Git project + wiki/ + AGENTS.md)
   ├── global-ticket-capstone/    (separate Git project + wiki/ + AGENTS.md)
   └── other projects/            (separate Git projects + project rules)
```

The request is to **combine code and Wiki within each project**, not to combine all unrelated projects together.

## 17.2 Human Approval Boundaries

**Require explicit approval for:** rewriting approved specs; executing an irreversible Git operation; changing the production database; exposing/rotating secrets; merging a PR; deploying to production; running any `*:remote` seed script; setting production secrets; executing rollback or D1 Time Travel restoration; modifying evidence after it has been archived.

**Agent may normally assist with:** reading files, proposing tests, drafting specs, preparing PR descriptions, analyzing test logs, suggesting patches, producing Wiki summaries from verifiable sources, and reporting open issues.

## 17.3 Spec Kit and Wiki Have Different Responsibilities

| Question | Correct authority |
|---|---|
| What must the software do? | Approved Spec Kit `spec.md` |
| How will we build it? | Approved `plan.md`, `tasks.md`, architecture |
| What does the code currently do? | TypeScript source and runtime tests |
| Is the code safe to merge? | CI results and human review |
| Is v1.1 actually deployed? | Cloudflare deploy record and smoke output |
| What have we learned? | Project Wiki, linked to underlying evidence |

The Wiki Skill records and connects knowledge. It does **not** replace version control, CI, formal review, approved requirements, or student responsibility.

## 17.4 Baseline → Upgrade → Release Progression

```text
Verified v1.0 TypeScript branch/tag
              │
              ▼
       CHG-001 approval
              │
              ▼
   specs/002-group-reservation/
              │
              ▼
   React TSX UI + Worker TypeScript + NEW migration
              │
              ▼
    Unit / UI jsdom / Integration
  Regression / Concurrency / Security
       + Real-Browser Acceptance
              │
              ▼
        GitHub PR + CI PASS
              │
              ▼
       Human merge approval
              │
              ▼
      Remote migration approval
              │
              ▼
 Browser Assets + API Deployment
   Read-Only Smoke + Logs
              │
              ▼
     v1.1.0 verified release
              │
              ▼
    Source-linked project Wiki
              │
              ▼
    Final 18-part portfolio
```

---

# 18. Final Educational Goal

## From AI Coding to AI-Assisted Software Engineering

The objective is not simply to ask OpenClaw to produce a working ticket-reservation program with an API or a disconnected mock UI. The objective is to manage a **complete, defensible software engineering lifecycle** for a TypeScript application.

Throughout the six sessions:

- **OpenClaw `main`** coordinates multiple projects while respecting each repository's `AGENTS.md` and human approval boundaries.
- **GitHub Spec Kit** manages living requirements, engineering plans, tasks, and approved changes.
- **React + TypeScript (TSX)/CSS** delivers a real searchable, bookable, cancellable user journey. **Cloudflare Workers** provides the type-checked API integrated with D1/KV; static assets are released together with it.
- **GitHub** provides source history, branches, Pull Requests, and human code review.
- **GitHub Actions** provides actual, reproducible CI/CD quality and release evidence.
- **Karpathy Wiki Skill** updates sourced and reviewable engineering knowledge **inside `global-ticket-capstone/wiki/`**.
- **Obsidian** is an editing and review interface for the same repository's Markdown knowledge.
- **Telegram** carries the student's instructions, approvals, questions, and progress reports to the **shared main agent**.

The final question is:

> **“Can a customer use your real browser UI to find an event, reserve three seats, cancel them, and see correct D1-backed inventory—with test, PR, CI/CD, and release evidence?”**

And the engineering defense is:

> **“Your AI agent helped generate the TypeScript code. How do you demonstrate that this release was correctly specified, independently tested, reviewed, securely deployed, reliably operated, and documented with verifiable evidence?”**

The required answer follows the actual evidence chain:

**Requirement → Approved Specification → React TSX + Worker TypeScript Implementation → UI/API Tests → Real-browser Acceptance → Pull Request → CI → Human Review → Controlled CD → Static-asset/API Smoke → Observability → Verified Release → Project Wiki and Portfolio.**

---

# Appendix A. Recommended Source References and Compatibility Notes

These official resources were consulted to check the revised **main-agent**, **Spec Kit**, and **TypeScript** recommendations. Because tools evolve, inspect the installed versions before applying commands.

1. OpenClaw, *Agent workspace*: https://docs.openclaw.ai/concepts/agent-workspace — the workspace holds global agent instructions and is the default working directory; it is not automatically every external Git repository.
2. OpenClaw, *Skills*: https://docs.openclaw.ai/tools/skills — skill discovery, project and extra-directory roots, name collisions, and configuration considerations.
3. OpenClaw, *Skills configuration*: https://docs.openclaw.ai/tools/skills-config — the `skills.load.extraDirs` option and discovery boundaries.
4. GitHub Spec Kit, *Generic integration*: https://github.github.io/spec-kit/integrations/generic.html — `--commands-dir`, `--skills`, and the important limitation that file generation is not agent invocation wiring.
5. Cloudflare, *Write Cloudflare Workers in TypeScript*: https://developers.cloudflare.com/workers/languages/typescript/ — Worker type generation through `wrangler types`, typechecking and configuration alignment.
6. Cloudflare, *Testing Workers*: https://developers.cloudflare.com/workers/testing/ — unit tests and production-style integration testing options.
7. Cloudflare, *D1 Wrangler commands*: https://developers.cloudflare.com/d1/wrangler-commands/ — migration commands and local/remote operation checks.
8. Cloudflare, *Workers Static Assets*: https://developers.cloudflare.com/workers/static-assets/ — serving compiled browser assets alongside an API Worker.
9. Cloudflare, *D1 Time Travel and backups*: https://developers.cloudflare.com/d1/reference/time-travel/ — `time-travel info` / `restore`, bookmarks, and the 30-day restore window.
10. Vitest, *Test projects*: https://vitest.dev/guide/projects — `test.projects` and `--project` filtering.

# Appendix B. Document Revision Control

| Item | Revised decision |
|---|---|
| Source | `20261121_SE_Capstone Project(1).pdf` (47 pages) |
| Curriculum dates | Retained: Nov 23, 25, 30; Dec 2, 7, 9, 2026 |
| Central objective | Retained: software engineering lifecycle and CI/CD |
| Application | Retained: Global Event Ticket Reservation System v1.0 → v1.1 |
| Primary code language | **Changed to TypeScript (mandatory)** |
| Browser code | TypeScript source bundled into JavaScript; complete booking/cancellation UI required (v3); React + TSX introduced in v4 |
| Source and Wiki folders | **Changed to one unified Git repository** |
| OpenClaw agents | **Changed to one existing `main` agent for all projects** |
| Project instructions | **Added Git-tracked project `AGENTS.md` and main workspace registry** |
| Per-project identity files | **Not duplicated; remain in main agent workspace** |
| Project knowledge | `wiki/` at repository root, linked to code/tests/PR/CI evidence |
| Spec Kit | Remains in project `.specify/` and `specs/`; explicit integration verification |
| Review/Lab model | All six original sessions retained and rewritten for TypeScript/main agent |
| Final portfolio | 18 required components retained |
| Rubric | Original eight categories retained; restructured in v5 to Common Core 80 + Individual 20 + extra credit up to 20 |
| **v2 (Nov 22, 2026)** | |
| Evidence disclaimers | Consolidated into one Evidence Policy box at the top |
| Sprint table | Corrected: v1.1 implementation is in Sprint 1 / Lab 2 (Nov 25–30) |
| Deliverable headings | Unified as "Lab N deliverables (presented at Review N+1)" |
| Feature branch | Created in Lab 2 Step 4, before any v1.1 plan, code, or migration |
| D1 concurrency | Reservation and cancellation use conditional `db.batch()`; SQL `BEGIN`/`COMMIT` prohibited |
| TypeScript projects | Split into Worker, client, and test `tsconfig` projects |
| Tests | All test layers, including smoke, unified on Vitest projects |
| Security tests | `test:security` added to CI and to the `AGENTS.md` verification list |
| Seed data | `db:seed:*` / `kv:seed:*` scripts with `--local` and `--remote` |
| Secrets | `.dev.vars` setup (local and CI) and `wrangler secret put ADMIN_TOKEN` added |
| D1 recovery | Time Travel bookmark (and optional off-repo export) before every remote migration |
| Rollback | Concrete inventory-corruption example and reconciliation query in Lab 4 Step 4 |
| **v3 (Nov 23, 2026)** | **Original full-stack browser UI integrated into the existing six-session schedule** |
| Front-end structure | Added `client/api.ts`, `client/view.ts`, `public/styles.css`, UI docs/evidence and `tests/ui/` |
| Browser features | Search → select event → reserve → confirmation → cancellation → D1-backed inventory refresh |
| Version evolution | v1.0 one seat; v1.1 1–5 seat selector, client/API validation and status handling |
| Tests | Added Vitest/jsdom UI project, mandatory manual real-browser E2E, CI gate, static-asset smoke |
| Production safety | Read-only production smoke; booking/cancellation demonstrations in the local environment (v5 removed "staging") |
| Course governance | Six dates, one main agent, approved SDD, 18 portfolio items and 100-point rubric retained |
| Appendix C (v3) | Original HTML/CSS/TypeScript browser reference and Vitest/jsdom tests (historical) |
| **v4 React edition (Nov 23, 2026)** | **Convert the v3 browser front-end to React + TypeScript (TSX); retain six sessions, Worker/D1/KV architecture, change gates, tests and portfolio** |
| React source architecture | `client/main.tsx` + `client/App.tsx` + `client/api.ts` + `client/search.ts`; `public/index.html` is a `#root` mount shell |
| React tooling | `react`, `react-dom`, TSX/JSX types, esbuild automatic JSX transform, separate client/test TS configs |
| React UI testing | Vitest/jsdom + React Testing Library; component interaction and escaped text, not manual DOM rendering |
| React v1.0→v1.1 | `MAX_SEATS = 1` baseline → `5` only on CHG-001 feature branch, with approved Worker/API/migration changes |
| Appendix C (v4) | Full React TSX app, typed API adapter, styles, controlled forms, component tests, and real-browser checklist |
| **v5 (Nov 23, 2026)** | **Applies the v4 review; six sessions, architecture, and 18-part portfolio retained** |
| v1.0 production baseline | New Lab 2 Step 0: supervised `v1.0.0` production release with instructor-authorized v1.0 test data, so v1.1 is a true upgrade and Scenario B has a real v1.0 rollback target |
| Write-test environment | Undefined "staging" removed; reservation/cancellation writes are local only; production is read-only except the Lab 2 Step 0 test data |
| API contract | `GET /api/events/:id` required; admin-create request/response defined; v1.0 receipt returns `seatCount: 1`; unknown event → 404 (not 409) |
| Client receipt handling | `createReservation()` never discards a `201` receipt over a missing `seatCount`; 404 messages depend on the action |
| React build | `build:client` uses `--minify` (React production build); `dev:client` watch script; generated bundle gitignored |
| Security | Constant-time `ADMIN_TOKEN` comparison; SHA-256 cancellation-code helpers and lookup rationale; `AppEnv` type so typecheck does not depend on `.dev.vars` |
| CI/CD | Cloudflare credentials scoped to remote steps; `set -o pipefail` on the Time Travel bookmark step |
| Tests | Smoke stops early without `BASE_URL` and checks content types and `#root`; explicit automatic JSX in the Vitest `ui` project; `vitest.config.ts` typechecked; 404 scenarios added |
| Spec Kit install | Installed from the official GitHub repository instead of a bare PyPI name |
| Grading | Common Core 80 + Individual 20 + extra credit up to 20; individual improvement delivered in Labs 4–5 (Lab 4 Step 6) |
| Schedule | Duration corrected; late-starter fallback for Review 1; part of Lab 1 may be presented at Review 3 |


---

# Appendix C. React + TypeScript Front-End Reference Implementation (v4, updated in v5)

**Purpose and evidence boundary:** This is an instructional React reference against the **proposed** Worker API in Section 3.4. It is **not a claim that the starter already implements these endpoints**, that npm scripts were executed, or that an actual D1 booking succeeded. First inspect and approve the starter's routes, event/receipt JSON fields, server-side cancellation rules, and v1.0 behavior. Implement Worker handlers and migrations separately. **Do not copy v1.1 behavior into the frozen v1.0 baseline.**

## C.1 Install React, TSX tooling, and UI testing tools

Run these commands from the selected `global-ticket-capstone/` repository if the real starter does not yet include the packages:

```bash
npm install react react-dom
npm install -D typescript wrangler vitest jsdom esbuild tsx @types/node \
  @types/react @types/react-dom @testing-library/react @testing-library/user-event
mkdir -p client public/assets tests/ui
```

Confirm that `package.json` uses the Section 4.3 scripts, notably:

```json
{
  "scripts": {
    "build:client": "esbuild client/main.tsx --bundle --jsx=automatic --format=esm --target=es2022 --minify --outfile=public/assets/app.js",
    "build": "npm run build:client",
    "dev": "npm run build && wrangler dev",
    "test:ui": "vitest run --project ui"
  }
}
```

*The snippet above is partial: merge its scripts into the complete package file in Section 4.3; do not overwrite other scripts.* Typecheck all three projects using Section 4.4, and include `tests/ui/**/*.test.{ts,tsx}` in the `ui` Vitest project. Do not write JavaScript manually into `public/assets/`.

## C.2 `public/index.html` — HTML shell for React

**React renders the entire application inside `#root`.** Unlike v3, the forms and event list are not duplicated in HTML.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Global Event Tickets</title>
  <link rel="stylesheet" href="/styles.css">
  <script type="module" src="/assets/app.js"></script>
</head>
<body>
  <div id="root">
    <p>Loading Global Event Tickets…</p>
  </div>
</body>
</html>
```

Do not point the browser directly to a `.tsx` file. Wrangler serves the compiled bundle through the `assets.directory: "./public"` setting already defined in Section 4.7.

## C.3 `public/styles.css` — responsive, keyboard-friendly CSS

```css
:root { font-family: system-ui, sans-serif; line-height: 1.5; }
body { margin: 0; background: #f7f9fc; color: #172434; }
.container { width: min(840px, 92%); margin: 1.5rem auto; }
section { background: #fff; padding: 1.25rem; margin: 1rem 0;
          border: 1px solid #d9e1eb; border-radius: .65rem; }
label { display: block; margin-top: .75rem; font-weight: 600; }
input, button { box-sizing: border-box; font: inherit; border-radius: .3rem;
                padding: .65rem; margin: .3rem 0 .7rem; }
input { width: 100%; border: 1px solid #718399; }
button { border: 1px solid #345f8d; background: #eaf2fb; cursor: pointer; }
button:disabled { opacity: .55; cursor: not-allowed; }
button:focus-visible, input:focus-visible { outline: 3px solid #e39b24; }
.event-button { display: block; width: 100%; text-align: left; }
.event-button[aria-pressed="true"] { background: #cfdef3; }
.status[data-kind="error"] { color: #a02020; }
.private-code { overflow-wrap: anywhere; }
@media (max-width: 520px) {
  .container { width: 96%; }
  section { padding: .8rem; }
}
```

## C.4 `client/api.ts` — typed same-origin Worker API adapter

Keep JSON types explicit. The response shape below is the **proposed teaching contract**, not proof of the actual starter. Verify field names with API integration tests. Cancellation codes must never be placed in URLs, logs, or persistent browser storage.

```ts
// client/api.ts
export interface EventView {
  id: string;
  title: string;
  startsAt: string;
  remainingSeats: number;
}

export interface ReservationInput {
  eventId: string;
  email: string;
  seatCount: number;
}

export interface ReservationReceipt {
  reservationId: string;
  seatCount: number;
  cancelToken: string; // shown once; only a hash is stored server-side
}

export class ApiError extends Error {
  constructor(readonly status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });
  let body: unknown;
  try { body = await response.json(); }
  catch { body = undefined; }

  if (!response.ok) {
    const obj = body && typeof body === 'object'
      ? body as Record<string, unknown> : null;
    const message = typeof obj?.error === 'string'
      ? obj.error : `HTTP ${response.status}`;
    throw new ApiError(response.status, message);
  }
  return body as T; // Follow with runtime/contract checks.
}

export async function getEvents(): Promise<EventView[]> {
  const body = await request<unknown>('/api/events');
  if (!body || typeof body !== 'object' ||
      !('events' in body) || !Array.isArray(body.events) ||
      !body.events.every((item: unknown) => {
        if (!item || typeof item !== 'object') return false;
        const event = item as Record<string, unknown>;
        return typeof event.id === 'string' &&
          typeof event.title === 'string' &&
          typeof event.startsAt === 'string' &&
          typeof event.remainingSeats === 'number' &&
          Number.isFinite(event.remainingSeats);
      })) {
    throw new Error('Unexpected /api/events response; check the approved contract.');
  }
  return body.events as EventView[];
}

// Optional KV-backed text. Adapt the shape to the real /api/config route.
export async function getAnnouncement(): Promise<string | null> {
  const body = await request<unknown>('/api/config');
  if (!body || typeof body !== 'object') return null;
  const value = (body as Record<string, unknown>).announcement;
  return typeof value === 'string' ? value : null;
}

export async function createReservation(
  input: ReservationInput
): Promise<ReservationReceipt> {
  const receipt = await request<unknown>('/api/reservations', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  if (!receipt || typeof receipt !== 'object') {
    throw new Error('Unexpected reservation response.');
  }
  const r = receipt as Record<string, unknown>;
  // The server has already created the reservation (HTTP 201). Throw only if the
  // customer could not cancel it: the ID and the code are the essential fields.
  if (typeof r.reservationId !== 'string' || typeof r.cancelToken !== 'string') {
    throw new Error('Reservation created, but the receipt is unreadable. Contact support.');
  }
  // The approved contract returns seatCount in v1.0 (always 1) and in v1.1.
  // If it is missing, show the requested quantity rather than discarding the
  // receipt; the API integration tests must still assert the field is present.
  const seatCount = Number.isInteger(r.seatCount)
    ? (r.seatCount as number) : input.seatCount;
  return { reservationId: r.reservationId, cancelToken: r.cancelToken, seatCount };
}

export async function cancelReservation(
  id: string, cancelToken: string
): Promise<void> {
  await request<unknown>(
    `/api/reservations/${encodeURIComponent(id)}/cancel`,
    {
      method: 'POST',
      body: JSON.stringify({ cancelToken }),
    }
  );
}
```

**API adaptation checkpoint:** If `/api/config` exposes separate KV keys, adapt `getAnnouncement()` to the approved response rather than silently inventing a new contract. If `/api/events` returns a raw array instead of `{events: [...]}`, update this adapter, the Worker spec, and the integration tests together. Avoid storing receipt data in localStorage, sessionStorage, cookies, or a URL. **Never discard a `201` receipt** because of a contract mismatch: the reservation already exists in D1, and without its ID and code the customer cannot cancel it.

## C.5 `client/search.ts` — pure, testable search function

React takes care of safe DOM updates. Filtering remains pure TypeScript.

```ts
// client/search.ts
import type { EventView } from './api';

export function filterEvents(
  events: EventView[], keyword: string
): EventView[] {
  const normalized = keyword.trim().toLocaleLowerCase();
  return events.filter(event =>
    event.title.toLocaleLowerCase().includes(normalized)
  );
}
```

## C.6 `client/main.tsx` — mount React once

```tsx
// client/main.tsx
import { createRoot } from 'react-dom/client';
import { App } from './App';

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root in public/index.html');
createRoot(root).render(<App />);
```

Use `react-jsx` in the client and tests `tsconfig` files, plus esbuild's `--jsx=automatic`. React and ReactDOM are bundled into the generated JavaScript; the Worker remains framework-independent.

## C.7 `client/App.tsx` — React search → reserve → cancel

This is the **final v1.1 teaching example**. For the **Lab 1 v1.0 baseline**, change **`MAX_SEATS` from `5` to `1`**, retain one-seat booking, and test it before starting Lab 2. After CHG-001 approval, change it to `5` **on the feature branch**, update the Worker + migration, and add group-seat tests. Never present the v1.1 code as a verified v1.0 implementation.

```tsx
// client/App.tsx
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import {
  ApiError, cancelReservation, createReservation,
  getAnnouncement, getEvents,
} from './api';
import type { EventView, ReservationReceipt } from './api';
import { filterEvents } from './search';

const MAX_SEATS = 5; // v1.0: 1. Change to 5 only in approved Lab 2.

type Status = { message: string; error: boolean };

type Action = 'load' | 'reserve' | 'cancel';

function friendlyError(error: unknown, action: Action): string {
  if (error instanceof ApiError) {
    if (error.status === 409) return 'Not enough seats are available.';
    if (error.status === 400) return 'Invalid reservation input.';
    if (error.status === 404) {
      return action === 'reserve'
        ? 'That event no longer exists; refresh the list.'
        : 'Reservation not found or code invalid.';
    }
    if (error.status >= 500) return 'Server error; try again later.';
    return `Request failed (HTTP ${error.status}).`;
  }
  return error instanceof Error ? error.message : 'Network or unexpected error.';
}

export function App() {
  // React state holds UI values, never authoritative D1 inventory.
  const [events, setEvents] = useState<EventView[]>([]);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [seatCount, setSeatCount] = useState('1');
  const [cancelId, setCancelId] = useState('');
  const [cancelToken, setCancelToken] = useState('');
  const [receipt, setReceipt] = useState<ReservationReceipt | null>(null);
  const [announcement, setAnnouncement] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>({
    message: 'Loading events...', error: false,
  });

  const visibleEvents = useMemo(
    () => filterEvents(events, search), [events, search]
  );
  const selectedEvent = events.find(event => event.id === selectedId);

  const refreshEvents = useCallback(async () => {
    setLoading(true);
    try {
      const latest = await getEvents(); // real Worker API → D1
      setEvents(latest);
    } finally {
      setLoading(false);
    }
  }, []);

  // The real API is called on page load, not replaced with demo fixtures.
  useEffect(() => {
    void refreshEvents()
      .then(() => setStatus({ message: 'Ready to search.', error: false }))
      .catch(error => setStatus({ message: friendlyError(error, 'load'), error: true }));
    void getAnnouncement()
      .then(setAnnouncement)
      .catch(() => setAnnouncement(null)); // optional KV text
  }, [refreshEvents]);

  async function handleReserve(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    if (!selectedId) {
      setStatus({ message: 'Choose an event first.', error: true });
      return;
    }
    const quantity = Number(seatCount);
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (seatCount.trim() === '' || !Number.isInteger(quantity) ||
        quantity < 1 || quantity > MAX_SEATS || !validEmail) {
      setStatus({
        message: `Enter a valid email and 1–${MAX_SEATS} whole-number seats.`,
        error: true,
      });
      return;
    }

    setBusy(true);
    setStatus({ message: 'Sending reservation...', error: false });
    try {
      const result = await createReservation({
        eventId: selectedId, email: email.trim(), seatCount: quantity,
      });
      // Only the server's successful 201 receipt establishes success.
      setReceipt(result);
      setCancelId(result.reservationId);
      setCancelToken(result.cancelToken); // temporary React state only
      setStatus({ message: 'Reservation confirmed.', error: false });
      try {
        await refreshEvents();
      } catch {
        setStatus({
          message: 'Reservation succeeded, but availability refresh failed.',
          error: true,
        });
      }
    } catch (error) {
      setStatus({ message: friendlyError(error, 'reserve'), error: true });
    } finally {
      setBusy(false);
    }
  }

  async function handleCancel(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const id = cancelId.trim();
    const code = cancelToken.trim();
    if (!id || !code) {
      setStatus({ message: 'Enter ID and private code.', error: true });
      return;
    }
    setBusy(true);
    setStatus({ message: 'Cancelling reservation...', error: false });
    try {
      await cancelReservation(id, code);
      setCancelToken(''); // remove secret after successful use
      setReceipt(null);  // remove the previously revealed secret
      setStatus({
        message: 'Reservation cancelled; refreshing availability...',
        error: false,
      });
      try {
        await refreshEvents();
      } catch {
        setStatus({
          message: 'Cancellation succeeded, but refresh failed.',
          error: true,
        });
      }
    } catch (error) {
      setStatus({ message: friendlyError(error, 'cancel'), error: true });
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="container">
      <header>
        <h1>Global Event Tickets</h1>
        <p>Find an event, reserve seats, and cancel securely.</p>
        <p aria-label="Announcement">
          {announcement ?? 'Welcome to Global Event Tickets.'}
        </p>
      </header>

      <section aria-labelledby="find-title">
        <h2 id="find-title">Find an event</h2>
        <label htmlFor="event-search">Search events by title</label>
        <input
          id="event-search" type="search" autoComplete="off"
          placeholder="e.g. concert" value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div aria-label="Matching events">
          {loading ? <p>Loading events...</p> :
            visibleEvents.length === 0 ? <p>No matching events.</p> :
            visibleEvents.map(event => (
              <button
                key={event.id} type="button" className="event-button"
                aria-pressed={selectedId === event.id}
                disabled={event.remainingSeats <= 0 || busy}
                onClick={() => setSelectedId(event.id)}
              >
                {event.title} | {event.startsAt} | {event.remainingSeats} seats left
              </button>
            ))}
        </div>
        <p aria-live="polite">
          {selectedEvent ? `Selected: ${selectedEvent.title}` : 'No event selected.'}
        </p>
      </section>

      <section aria-labelledby="reserve-title">
        <h2 id="reserve-title">Reserve seats</h2>
        <form onSubmit={handleReserve}>
          <label htmlFor="email">Email</label>
          <input
            id="email" type="email" autoComplete="email" required
            value={email} onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="seat-count">Number of seats (1–{MAX_SEATS})</label>
          <input
            id="seat-count" type="number" min={1} max={MAX_SEATS}
            step={1} required value={seatCount}
            onChange={e => setSeatCount(e.target.value)}
          />
          <button type="submit" disabled={busy || !selectedEvent}>
            {busy ? 'Working...' : 'Reserve'}
          </button>
        </form>
        {receipt && (
          <p className="private-code" aria-label="Reservation confirmation">
            Reserved {receipt.seatCount} seat(s). ID: {receipt.reservationId}.
            {' '}Your private cancellation code: {receipt.cancelToken}.
            {' '}Keep it safe and redact screenshots.
          </p>
        )}
      </section>

      <section aria-labelledby="cancel-title">
        <h2 id="cancel-title">Cancel a reservation</h2>
        <form onSubmit={handleCancel}>
          <label htmlFor="cancel-id">Reservation ID</label>
          <input
            id="cancel-id" required value={cancelId}
            onChange={e => setCancelId(e.target.value)}
          />
          <label htmlFor="cancel-token">Private cancellation code</label>
          <input
            id="cancel-token" type="password" required autoComplete="off"
            value={cancelToken} onChange={e => setCancelToken(e.target.value)}
          />
          <button type="submit" disabled={busy}>
            {busy ? 'Working...' : 'Cancel reservation'}
          </button>
        </form>
      </section>

      <p className="status" role="status" aria-live="polite"
         data-kind={status.error ? 'error' : 'info'}>
        {status.message}
      </p>
    </main>
  );
}
```

**React security model:** JSX text interpolation escapes untrusted strings by default. Avoid `dangerouslySetInnerHTML`, unsanitized DOM APIs, `console.log(receipt)`, persistent storage for private cancellation codes, and administrator credentials in the bundle. Since a code is displayed for the customer to retain, **redact it before recording or sharing the screen**. This is a classroom demo, not a production-hardened authentication or payments product.

**React state versus server truth:** `visibleEvents` is a derived view over fetched events. Do not subtract seats with `setEvents` after a POST: the Worker and D1 decide success. The UI refetches after a confirmed response. Server checks must reject invalid seat counts even if someone bypasses the form.

## C.8 `tests/ui/App.test.tsx` — Vitest + React Testing Library

These tests mock only `client/api.ts`; they exercise the **real React component and JSX output** in jsdom. They are not substitutes for the separate API/D1 integration tests or the manual real-browser exercise.

```tsx
// tests/ui/App.test.tsx
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../../client/App';
import {
  ApiError, cancelReservation, createReservation,
  getAnnouncement, getEvents,
} from '../../client/api';
import type { EventView } from '../../client/api';
import { filterEvents } from '../../client/search';

// Preserve ApiError while mocking network calls.
vi.mock('../../client/api', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../../client/api')>()),
  getEvents: vi.fn(),
  getAnnouncement: vi.fn(),
  createReservation: vi.fn(),
  cancelReservation: vi.fn(),
}));

const fixture: EventView[] = [
  { id: 'e1', title: 'Concert', startsAt: '2027-03-01', remainingSeats: 10 },
  { id: 'e2', title: 'Workshop', startsAt: '2027-03-02', remainingSeats: 5 },
];

beforeEach(() => {
  vi.mocked(getEvents).mockResolvedValue(fixture);
  vi.mocked(getAnnouncement).mockResolvedValue(null);
});
afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe('React browser UI', () => {
  it('filters titles without case sensitivity', () => {
    expect(filterEvents(fixture, '  CON  ').map(e => e.id)).toEqual(['e1']);
  });

  it('searches and selects the actual event', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Concert/ });
    await user.type(screen.getByRole('searchbox'), 'con');
    expect(screen.getByRole('button', { name: /Concert/ })).toBeTruthy();
    expect(screen.queryByRole('button', { name: /Workshop/ })).toBeNull();
    await user.click(screen.getByRole('button', { name: /Concert/ }));
    expect(screen.getByText('Selected: Concert')).toBeTruthy();
    await user.clear(screen.getByRole('searchbox'));
    await user.type(screen.getByRole('searchbox'), 'absent');
    expect(screen.getByText('No matching events.')).toBeTruthy();
  });

  it('escapes event titles; does not create injected markup', async () => {
    vi.mocked(getEvents).mockResolvedValue([
      { ...fixture[0], title: '<img src=x onerror=alert(1)>' },
    ]);
    const { container } = render(<App />);
    await screen.findByRole('button', { name: /<img src=x/ });
    expect(container.querySelector('img')).toBeNull();
    expect(container.textContent).toContain('<img src=x onerror=alert(1)>');
  });

  it('reserves 3 seats, then cancels with returned code', async () => {
    const user = userEvent.setup();
    vi.mocked(createReservation).mockResolvedValue({
      reservationId: 'r-demo', seatCount: 3, cancelToken: 'private-demo',
    });
    vi.mocked(cancelReservation).mockResolvedValue(undefined);
    render(<App />);
    await user.click(await screen.findByRole('button', { name: /Concert/ }));
    await user.type(screen.getByLabelText('Email'), 'student@example.com');
    await user.clear(screen.getByLabelText(/Number of seats/));
    await user.type(screen.getByLabelText(/Number of seats/), '3');
    await user.click(screen.getByRole('button', { name: /^Reserve$/ }));
    await waitFor(() => expect(createReservation).toHaveBeenCalledWith({
      eventId: 'e1', email: 'student@example.com', seatCount: 3,
    }));
    expect(await screen.findByLabelText('Reservation confirmation')).toBeTruthy();
    const cancelSection = screen.getByRole('heading', {
      name: 'Cancel a reservation',
    }).closest('section');
    if (!cancelSection) throw new Error('Missing cancellation section');
    await user.click(within(cancelSection).getByRole('button', {
      name: 'Cancel reservation',
    }));
    await waitFor(() =>
      expect(cancelReservation).toHaveBeenCalledWith('r-demo', 'private-demo')
    );
    await waitFor(() =>
      expect(screen.queryByLabelText('Reservation confirmation')).toBeNull()
    );
    expect(vi.mocked(getEvents).mock.calls.length).toBeGreaterThanOrEqual(3);
  });

  it('shows 409 without claiming a booking succeeded', async () => {
    const user = userEvent.setup();
    vi.mocked(createReservation).mockRejectedValue(
      new ApiError(409, 'Sold out')
    );
    render(<App />);
    await user.click(await screen.findByRole('button', { name: /Concert/ }));
    await user.type(screen.getByLabelText('Email'), 'student@example.com');
    await user.click(screen.getByRole('button', { name: /^Reserve$/ }));
    expect(await screen.findByText('Not enough seats are available.')).toBeTruthy();
    expect(screen.queryByLabelText('Reservation confirmation')).toBeNull();
  });
});
```

**Version gating for the tests:** The test that reserves three seats belongs to **Lab 2 v1.1**, not the v1.0 test suite. For Lab 1, first test a `seatCount: 1` booking, then commit the three-seat case only after CHG-001. Add UI cases for `0`, `6`, `2.5`, invalid email, a 404 for a deleted event, disabled buttons during pending calls, malformed API responses, KV fallback, invalid code (404), and network failure as students progress.

Run:

```bash
npm run generate-types
npm run typecheck
npm run build
npm run test:ui
npm run db:local
npm run seed:local
npm run dev
# Open http://127.0.0.1:8787/ in a real browser.
```

If the JSX test project reports missing JSX types, check Section 4.4 (`jsx: "react-jsx"` and installed `@types/react`) rather than adding DOM types to the Worker. Do **not** report these commands as successful unless a student really executes them.

## C.9 Mandatory local browser walkthrough and evidence

The instructor first validates the **actual** Worker API, D1 migrations, KV config, and static assets. Students document only real behavior.

| Step | React browser action | Expected evidence (not pre-verified) |
|---|---|---|
| 1 | Open the local URL | HTML `#root`, `/styles.css`, and compiled `/assets/app.js` load; React renders the page |
| 2 | Search `concert` | Controlled search filters actual `GET /api/events` data |
| 3 | Select a seeded event with 10 available seats | Selected event ID matches the D1-backed event |
| 4 | In v1.0 reserve 1 seat; in v1.1 reserve 3 | Real POST 201; quantity, ID and private code shown only on success |
| 5 | Refresh events | In the v1.1 example, remaining seats 10 → 7; compare actual D1 |
| 6 | Cancel using reservation ID + code | Real POST 200; secret removed from React state/confirmation |
| 7 | Refresh | In the v1.1 example, remaining seats 7 → 10; compare actual D1 |
| 8 | Enter 0, 6, 2.5 seats | React form rejects; separately prove Worker 400 |
| 9 | Request more than remaining inventory | Worker 409, readable React status; no D1 inventory change |
| 10 | Supply invalid/used cancellation code | Worker 404; no restored seats |
| 11 | Test keyboard, small screen, network failure | Accessible labels, focus, pending/empty/error states |
| 12 | Verify production (read-only) | GET page/assets/events/config; no production reservation mutations beyond the Lab 2 Step 0 test data |

**Evidence template (`docs/browser-test-report.md`):** tested commit, browser and environment, approved contract revision, event fixture, actual Network status codes, pre/post D1 counts, redacted screenshots, failed/passing tests (actual logs), reviewer, risks, and approved next steps. The example numbers are **test scenarios**, not observed results.

## C.10 React v1.0 → v1.1 change checklist

| Area | Frozen v1.0 (Review 2) | Approved v1.1 (Reviews 3–6) |
|---|---|---|
| `client/App.tsx` | `MAX_SEATS = 1`; one-seat reservation | `MAX_SEATS = 5`; controlled quantity 1–5 |
| `client/api.ts` | `seatCount: 1` request; same cancellation endpoint | Quantity from validated state; approved JSON contract |
| `client/search.ts` | Case-insensitive client search | Preserve behavior; avoid search regression |
| React Testing Library | Single-seat flow, search, selection, safe text | 3/5 seats, 0/6/2.5 rejection, 409/404 and concurrency-facing UI |
| Worker / validation | One-seat baseline API behavior | Runtime input validation 1–5 |
| D1 | v1.0 schema and inventory | `0002_seat_count_v11.sql`, atomic quantity-based reserve/cancel |
| PR/CI/CD | Verified local v1.0 | Feature branch → PR → CI → human approval → gated release |
| Browser/operations | Real browser + D1-backed confirmation | Real browser E2E, read-only production smoke, incident/log evidence |

**Final release gate:** React + TypeScript compilation; passing Vitest React UI tests and Worker unit/integration/regression/concurrency/security tests; a real browser search/reserve/cancel journey against local D1; a reviewed PR; successful, approved CI/CD; read-only production smoke for page/CSS/React bundle/API; and a verifiable 18-part portfolio. Keep any missing evidence explicitly marked **not yet verified**.
