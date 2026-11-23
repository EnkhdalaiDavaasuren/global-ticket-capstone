# Security review (template)

- Secret management: .dev.vars local; GitHub throwaway CI; Cloudflare runtime production.
- Admin bearer token constant-time check; denies when missing/wrong.
- Cancellation 128-bit token shown once; store only SHA-256; never log or persist it.
- Worker input validation and prepared SQL / D1 batch atomicity.
- Browser XSS/keyboard testing and privacy-safe screenshots.
- Outstanding threats / actual failed and passing cases / approver:
