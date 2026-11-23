---
name: ticket-engineering-wiki
description: Project-specific ticket wiki maintenance workflow for global-ticket-capstone, not a separate OpenClaw agent.
---
# Ticket Wiki Maintenance

1. Confirm the explicit `global-ticket-capstone` repository path and `AGENTS.md`.
2. Read the authoritative `specs/` and user-approved changes before any modification.
3. Operate only in the selected project; no production write or secret operation without human authorization.
4. Review affected TSX, Worker, SQL and Vitest code together; trace tests to acceptance criteria.
5. Record only actual, redacted outputs. Update `wiki/` using concrete links to specs, code, tests, reports and PRs.
6. Return observed tests, unresolved risks and next required approval. Never fabricate verification or create another agent.
