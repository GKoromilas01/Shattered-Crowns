# Shattered Crowns

Browser-first medieval city-building RTS. Serve this directory with `python3 -m http.server 8000` and open http://localhost:8000.

## Automated testing

From a clean checkout with Node.js 24:

```sh
npm ci
npm test
```

The runner installs and uses the Chromium revision pinned by Playwright 1.57.0. A bare Linux host needs Chromium OS libraries (`npx playwright install-deps chromium`); CI installs these before the same test command. An explicit `CHROMIUM_PATH` override is available on restricted machines, and its actual browser version is recorded.

The suite preserves all 28 Milestone 2 regressions and adds Living City scenarios, release-safety checks and five production-compatible smoke journeys. See [Milestone 4](docs/MILESTONE4.md) for production, housing and balance changes. Traces for failures, screenshots, browser errors, environment versions, JUnit, JSON-line results and logs are written to `test-results/`. Successful traces are pruned; historical committed screenshots are not overwritten.

```sh
npm run test:unit
npm run test:smoke
SMOKE_BASE_URL=https://gkoromilas01.github.io/Shattered-Crowns/ npm run test:smoke
```

Live smoke gathers actual resources for road tests and never replaces the served game or modifies server data. Read the [testing/release runbook](docs/RELEASE_PIPELINE.md) for artifact smoke, clean setup, required checks, protection activation and rollback.

## Releases and owner approval

PR/main CI verifies game behavior, release integrity and staged/deployed smoke. `required-ci` is the required status check to configure in main's ruleset. It does not enable protection automatically.

The proposed release pipeline publishes only explicitly selected, verified main candidates through a protected manual workflow. It validates immutable source bytes, pre-fetches the current stable fallback, verifies production after publishing and restores the fallback on failure. Stable payloads are archived durably as GitHub Release assets. Owner approval is required before merge, activation or deployment.

**Current hosting is not silently changed:** switching Pages from branch publishing to Actions and configuring branch/environment protection are explicit administrator activation steps. Until that switch, legacy branch publishing bypasses these new release gates. No workflow file alone can promise otherwise.

See [release notes](RELEASE_NOTES.md), [Milestone 2 gameplay rules](docs/MILESTONE2.md) and the [release/autonomy runbook](docs/RELEASE_PIPELINE.md). Codex tasks and hourly reminders are not a continuously running agent.
