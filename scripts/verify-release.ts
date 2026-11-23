// Checklist helper only. Never manufacture evidence of passing tests or deployment.
import { existsSync } from 'node:fs';
const files = ['docs/deployment-report.md', 'docs/rollback-plan.md', 'docs/browser-test-report.md',
  'docs/traceability-matrix.md', 'docs/release-notes-v1.1.md'];
for (const file of files) console.log(`${existsSync(file) ? 'PRESENT' : 'MISSING'}: ${file}`);
console.log('Presence is NOT proof of completion; inspect actual approved evidence.');
