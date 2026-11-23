# React front-end UX acceptance

AC-UI-01 real D1-backed events; 02 case-insensitive title search; 03 one-seat v1.0; 04 1–5-seat v1.1 after approval; 05 reject 0, 6 and noninteger v1.1; 06 409 no optimistic decrement; 07 restore booked seats on cancel; 08 invalid/used code never restores; 09 D1 inventory comparison; 10 production assets version matches Worker; 11 accessible labels, keyboard, safe text output.

Screens: header/announcement, event search and buttons, selected event, reservation form, one-time receipt, cancellation form, status. Never store private code in browser storage or screenshots.

In v1.0, event search matches titles case-insensitively and trims surrounding spaces. Selecting an available event enables Reserve. The browser requires an email, and the Worker enforces exactly one seat. A successful response displays the receipt and refreshes availability. Cancellation clears the displayed code and receipt, then reloads inventory.

[Browser results](browser-test-report.md) cover search, selection, invalid email, reserve, cancel, and the error shown for an incorrect or reused code. The local integration suite covers HTTP 409 for sold-out inventory. Keyboard-only and offline acceptance remain open.
