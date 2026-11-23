# Test plan

**Local**: unit, jsdom React UI, Worker HTTP integration, regression, concurrency, security. Validate HTTP codes and local D1 counts; unique event fixture per test; all writes are local. **Manual**: actual browser search → book → cancel. **Production**: GET-only smoke; check page, stylesheet, JS, health, events, KV. Do not describe pending tests as PASS.
