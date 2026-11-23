# Architecture Decisions

- React manages selection, forms, and feedback as UI state. TypeScript defines the event and reservation shapes used by the client. [Client code](../client/App.tsx)
- The Worker serves static assets and exposes the same-origin API that validates inputs and applies reservation rules. [Worker routes](../src/index.ts)
- D1 owns inventory and reservation state so concurrent mutations can be conditional and atomic. KV keeps public configuration and announcements independently readable. [Architecture](../docs/architecture.md)
- Chrome exercised the real Worker and the local D1 query showed one seat deducted and restored. [Browser evidence](../docs/browser-test-report.md)
