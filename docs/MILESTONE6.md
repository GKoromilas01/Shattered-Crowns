# Version 0.6.0: Save/resume and session reliability

Chosen next-version direction: save/resume and longer-session reliability. Built on released Milestone 5, `1540fd1ec0e66176ab4e8f6465a7cd3d55940d7e`. No server, account, paid service or new game mechanic is introduced.

## Use

Open the existing **Menu**:

- **Save city** writes the current session to this browser/origin. A changed valid checkpoint retains the previous good one.
- **Resume saved city** restores the latest valid checkpoint, or recovers the previous one if the latest is damaged. The city resumes paused; use the existing Resume control to continue.
- **Export save** downloads a portable JSON file. Keep a copy outside browser storage for longer-term backup.
- **Import save** validates and restores a compatible JSON file, then attempts to keep a local checkpoint. Import/export remain available in memory when local storage is unavailable.

A reload starts a fresh scene; it never silently loads or overwrites an existing checkpoint. Use Resume to continue the saved city. Autosave runs every 30 simulation seconds for a new city without prior stored data, and after a successful save/resume/import. It also attempts a synchronous checkpoint when leaving. Restarted/fresh cities with prior stored data protect that data until an explicit Save/Resume/Import choice. Finished games are not automatically written over a playable checkpoint.

When another tab changes checkpoints, this tab pauses autosave and marks Menu with an attention indicator. Choose Resume to take the saved version, Save city to retain this tab's city, or export a file. Saving failure also marks Menu; it does not clear old data or stop gameplay. Browser/OS termination can happen between checkpoints, so periodic autosave is best effort rather than a guarantee of retaining the very last input.

## State and validation

The versioned save contains resources, food/trade, civilian population, occupancy/evolution, prosperity, measured food and satisfaction history, enemy gold/wood, simulation/AI clocks and queues, nodes, armies, orders, target identities, formations/stances, medic/event cooldowns, reinforced Keeps, control groups, selection, undo, ration/trade policies and camera center/zoom. Reference IDs/node indices are reconnected to the restored live objects in two passes. Automatic ration hysteresis is restored before deriving occupancy, so the previous scene's policy cannot change the loaded city's residents.

Restoration pauses, resets frame timing, cancels armed placement and discards transient pointer drags/projectiles/floating effects. Damage is already applied by the existing combat rules; no pending economic cycle or offline income is replayed. The original unseeded future random unit positions are not promised to reproduce identically. Browser fullscreen state, unrelated political/calendar demo data and personal checklists/preferences are not portable city data; those existing browser-local systems are untouched.

Both schema and world versions are checked. Files are limited to 1 MiB, bounded collections/nesting and known fields, finite valid values, unique entity IDs, valid active references, legal stances and occupancy, and coherent measured arithmetic. Unknown versions and unsafe text/prototype keys are rejected before mutation. A checksum detects accidental corruption; it is not an encryption or anti-cheat signature. This is a local single-player save format.

Primary and previous-good checkpoints use separate versioned local keys. Invalid primary data is never rotated over a valid backup. Failed writes preserve the latest checkpoint and attempt to restore the prior backup if rotation already happened. If the browser also blocks that recovery write, the warning explicitly says the older backup may have advanced. Invalid imports leave both the current simulation and stored checkpoints intact. Existing unsupported/corrupt stored data is not automatically overwritten by a fresh city. A single previous checkpoint is kept, not an unlimited history.

## Verification

Clean Node 24 checkout:

```sh
npm ci
npm test
npm run build:site
npm run verify:site
SMOKE_DIR=dist EXPECTED_RELEASE_SHA=$(git rev-parse HEAD) npm run test:smoke
```

The runner uses Playwright 1.57.0's pinned Chromium; Linux OS libraries can be installed with `npx playwright install-deps chromium`. Restricted hosts may set `CHROMIUM_PATH=/usr/bin/chromium`; the actual version is captured in evidence.

All 84 existing tests and all CI/release workflows are retained. Seventeen additional Chromium scenarios cover full economy/history round trips, gathering/target identity and control groups, corrupt/unknown/oversize data, real reload and Menu resume, portable file UI, backup recovery, denied/quota storage, policies/queues/undo/cooldowns, occupancy ordering, exact positive health, wide zoom, previous-city autosave protection, multi-tab protection, camera/placement cancellation, narrow menus and ten simulated minutes with full AI.

The long-session fixture saves during the first raid, advances, restores that checkpoint, and continues beyond ten simulated minutes through another raid. It compares restored unit/building/node/queue/control-group state, checks food/workforce/occupancy conservation, validates a further export and IDs, and captures screenshots plus `gallery/m6-ten-minute-session.json`. Defensive fixtures isolate persistence during the longer run; the untouched existing test separately proves a real-resource opening through gathering/construction controls. Tests inject their clock/fixtures only into the served test response, never the shipped game.

Evidence uses the existing CI screenshot/browser-error/environment/JUnit/JSON/failure-trace artifacts. Representative files include `m6-resumed-city.png`, `m6-ten-minute-city.png` and `m6-save-menu-390.png`. The PR records exact run IDs, results and artifacts.

## Release and limits

Game rules, economic arithmetic, roads/refunds, Construction/Units, camera/fullscreen/minimap and service/happiness behavior remain authoritative. The original road/controller code is unchanged; only save-state and policy-restoration hooks are added. No CI/publishing/rollback workflow or production setting is changed. Feature CI must pass before opening the PR; merge and deployment need Giannis approval.

Local storage is browser/profile/origin-specific and can be cleared or restricted by the browser. Exported files are the portable backup. There is one prior-good checkpoint, no cloud synchronization, and a 1 MiB file limit. Larger campaigns, browser crashes at arbitrary instruction boundaries and real touch hardware remain beyond the bounded automated scenarios. Future save/world versions need explicit compatibility handling; unknown versions fail safely.
