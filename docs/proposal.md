# Global Event Ticket Reservation System — capstone proposal

## Product vision

Help customers find events, see ticket availability, reserve tickets, and cancel a reservation without contacting an administrator. Administrators maintain the event catalogue and set capacity. The system must preserve correct inventory when requests overlap or a cancellation is repeated.

## Release scope

- **v1.0** lets customers browse and search by title, reserve one seat, receive a reservation ID and private cancellation code, and cancel to restore one seat. [Local browser results](browser-test-report.md)
- **Proposed v1.1** allows groups of one to five to book together and restores the same number of seats upon cancellation. Existing one-seat reservations must remain cancellable after an approved backward-compatible D1 migration. [CHG-001](change-request-CHG-001.md)

## Proposed individual improvement

Add a repeatable browser acceptance test to catch regressions in the reservation flow. It should start with isolated local data, drive search, booking, and cancellation through the React UI, and check D1 before and after each mutation. It should fail if a repeated cancellation restores a second seat. Its report should include browser version, HTTP statuses, and inventory counts while excluding emails, reservation IDs, and cancellation codes.

## Testing and risks

Use Vitest unit tests for input rules, React UI tests for rendering and form behavior, local Worker integration and regression suites for the API contract, concurrency tests for inventory, and security tests for admin authorization and cancellation. Real-browser acceptance covers the customer journey. Use conditional D1 mutations with atomic batches for inventory consistency, review secret exclusions before staging, and run build and regression checks before requesting release approval. Review schema compatibility and rollback before applying any remote migration.

## Development environment

React and TypeScript, Cloudflare Workers with D1 and KV, Git and GitHub Actions, Spec Kit, the existing OpenClaw `main` agent, and the repository Wiki for Obsidian.

- Local project: `C:/Users/dell/Desktop/MIU/MIU Courses (2026)/Software Engineering/Assignment/global-ticket-capstone-starter-v1/global-ticket-capstone`
- Branch: `main`
- GitHub URL: pending a repository remote
- Student and reviewer sign-off: pending
