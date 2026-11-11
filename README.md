# Shattered Crowns

Browser-first medieval city-building RTS with a peaceful city campaign, kingdom overview and classic skirmish mode. Serve this directory with `python3 -m http.server 8000` and open http://localhost:8000.

Current development: [Milestone 19 — A Living, Prosperous City](docs/MILESTONE19.md). A real-data Governor overview, direct workplace panels and five-start economic/save verification.

## Automated testing

From a clean checkout with Node.js 24:

```sh
npm ci
npm test
```

The runner installs and uses the Chromium revision pinned by Playwright 1.57.0. A bare Linux host needs Chromium OS libraries (`npx playwright install-deps chromium`); CI installs these before the same test command. An explicit `CHROMIUM_PATH` override is available on restricted machines, and its actual browser version is recorded.

The suite preserves all 28 Milestone 2 regressions and adds Living City scenarios, release-safety checks and five production-compatible smoke journeys. See [Milestone 4](docs/MILESTONE4.md) for production changes and [Milestone 5](docs/MILESTONE5.md) for services and satisfaction. [Version 0.6.0](docs/MILESTONE6.md) adds local save/resume and portable saves through Menu. [Version 0.7.0](docs/MILESTONE7.md) adds the peaceful city campaign, a separate kingdom overview backward-compatible campaign saves, first-visit title screen, original ambient/selection audio and clearer defense placement feedback. [Version 0.8.0](docs/MILESTONE8.md) adds measured city-planning summaries, section navigation, building location actions and synchronized opening-music preview state. [Version 0.8.1](docs/POLISH081.md) fixes native-scrollbar command clipping, presents an illustrated title before the city, and adds an original melodic theme with the previous ambience selectable. [Version 0.9.0](docs/MILESTONE9.md) adds an illustrated regional map, inspectable landmarks and a connected world atlas while preserving the current city and saves. [Version 0.10.0](docs/MILESTONE10.md) adds a real Brookstead village start, persistent home identity and new-game music defaults while retaining the original start. [Version 0.11.0](docs/MILESTONE11.md) adds village stewardship, safe idle-worker selection and deposit location. [Version 0.12.0](docs/MILESTONE12.md) adds reversible workplace operation and clear resident-growth requirements. [Version 0.13.0](docs/MILESTONE13.md) improves starting-home choices, defense construction and terrain/resource discovery. [Version 0.14.0](docs/MILESTONE14.md) adds accessible economy policies, shared trade diagnostics and population/prosperity planning. [Version 0.15.0](docs/MILESTONE15.md) adds reversible cross-workplace staffing priorities, risk feedback and explicit policy choices. Traces for failures, screenshots, browser errors, environment versions, JUnit, JSON-line results and logs are written to `test-results/`. Successful traces are pruned; historical committed screenshots are not overwritten.

```sh
npm run test:unit
npm run test:smoke
SMOKE_BASE_URL=https://gkoromilas01.github.io/Shattered-Crowns/ npm run test:smoke
```

Live smoke gathers actual resources for road tests and never replaces the served game or modifies server data. Read the [testing/release runbook](docs/RELEASE_PIPELINE.md) for artifact smoke, clean setup, required checks, protection activation and rollback.

The released [measured city advisor](docs/ADVISOR_UPDATE.md) ranks bottlenecks with simulation evidence and direct City Life review actions. The stacked city-management candidate combines that advisor with [Governors & Living World Maps](docs/MILESTONE18.md) and [A Living, Prosperous City](docs/MILESTONE19.md). It requires separate integration and publication approval.

## Releases and owner approval

PR/main CI verifies game behavior, release integrity and staged/deployed smoke. `required-ci` is the required status check to configure in main's ruleset. It does not enable protection automatically.

The proposed release pipeline publishes only explicitly selected, verified main candidates through a protected manual workflow. It validates immutable source bytes, pre-fetches the current stable fallback, verifies production after publishing and restores the fallback on failure. Stable payloads are archived durably as GitHub Release assets. Owner approval is required before merge, activation or deployment.

**Current hosting is not silently changed:** switching Pages from branch publishing to Actions and configuring branch/environment protection are explicit administrator activation steps. Until that switch, legacy branch publishing bypasses these new release gates. No workflow file alone can promise otherwise.

See [release notes](RELEASE_NOTES.md), [Milestone 2 gameplay rules](docs/MILESTONE2.md) and the [release/autonomy runbook](docs/RELEASE_PIPELINE.md). Codex tasks and hourly reminders are not a continuously running agent.
