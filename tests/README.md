# Regression tests

Run `npm ci`, then `npx playwright install chromium firefox webkit`.
Run `npm run build` before `npm test` to test the current source and both generated distributions.
Use `TEST_BROWSER=firefox npm test` or `TEST_BROWSER=webkit npm test` for the other engines.

The tests use Node's test runner, Rollup and Playwright as development tooling. They do not add runtime dependencies.
Browser tests cover the cases named in the suite. They do not establish support for historical browser versions or replace manual screen-reader checks.
