# Testing, releases and owner control

Implements issue #3. Pipeline work is isolated from the game: `index.html` must remain byte-identical to merged Milestone 2 (`831da5cfbcc1d94fe6d26c289084bdc5d94f4ab4`).

## Clean checkout

Use Node 24 and npm. From a clean checkout:

```sh
npm ci
npm test
```

The runner automatically downloads the Chromium revision pinned by Playwright 1.57.0 when it is missing. No running game server is needed. On a bare Linux installation, install system libraries once with `npx playwright install-deps chromium` (requires the host's package-manager privileges). CI installs these libraries, then exercises the same automatic browser setup as `npm test`. Download hosts must be permitted by the machine's network policy.

A deliberate alternative for constrained machines is `CHROMIUM_PATH=/usr/bin/chromium npm test`. This changes the browser build, so the actual version is always recorded. It is not represented as the pinned CI browser. The managed development environment blocks Playwright download hosts and uses this override; GitHub CI validates the default pinned browser.

Commands:

- `npm test`: original 28 game regressions, pipeline safety tests, five unmodified-game smoke journeys.
- `npm run test:unit`: fast artifact/provenance/workflow safety checks.
- `npm run test:smoke`: five smoke journeys against a local server serving the actual game files.
- `SMOKE_BASE_URL=https://gkoromilas01.github.io/Shattered-Crowns/ npm run test:smoke`: read-only HTTP/client-side checks against production. Browser memory/localStorage are discarded per scenario; no production database or source is changed.
- `npm run build:site`: package exact committed game/version bytes into a fresh `dist/`. Refuses an existing output directory to avoid stale files. Remove only generated `dist/` before rebuilding.
- `npm run verify:site`: verify the packaged file allowlist, regular-file rule, hashes, version and provenance.
- `SMOKE_DIR=dist EXPECTED_RELEASE_SHA=<40-character-SHA> npm run test:smoke`: smoke the exact packaged game.

The production-compatible road smoke gathers stone through real worker selection and orders, draws 3×3 and 6×6 perimeters, checks dimensions/costs, then undoes and verifies refunds. It never injects starting resources or replaces the served game. The original fixture-based mechanics regressions remain unchanged in scope and assertions.

## Reports and artifacts

Every run writes `test-results/<mode>/test-output.txt`, `environment.json`, JUnit XML, JSON-line results and per-scenario screenshots/browser diagnostics. Failing tests retain Playwright DOM/network traces; successful traces are pruned after completion to bound storage. Open a retained trace with `npx playwright show-trace <trace.zip>`. Test-generated galleries now go to `test-results/gallery`, leaving committed historical screenshots unchanged.

PR/main verification publishes `verification-evidence` and `live-smoke-evidence` for seven days, even when tests fail. Only a completely successful full suite and staged smoke can upload `verified-site` (90-day candidate retention). Release diagnostics have a 90-day lifetime. Stable payloads are also archived durably as three GitHub Release assets under `stable-run-<approved-release-run-id>`; they remain available after Actions artifacts expire. All services used are the repository's existing public GitHub/Pages infrastructure; no paid external service is added. Artifact usage remains subject to the owner's GitHub account quota.

## Required checks and actual protection status

The `required-ci` job requires both verification/staged smoke and deployed-site smoke to succeed. Failure or a skipped dependency makes it fail. PR jobs have read-only repository permissions and cannot publish Pages. A green PR check does not itself make branch protection active.

At implementation time, GitHub's main-branch metadata reported `protected: false`, and Pages used its dynamic branch-source deployment workflow. No repository settings were changed. Administrators must verify these settings, not infer them from workflow files.

After approving this tested milestone, configure a main ruleset or branch-protection rule:

1. Target `main`, require pull requests, block force pushes and branch deletion.
2. Require the exact `required-ci` status check from this PR's workflow; require it on the latest main base (strict/up-to-date checks). Apply the rule to administrators where appropriate.
3. If there are independent collaborators, require an approving review. A sole owner cannot approve their own GitHub PR; do not configure an impossible self-review requirement. Owner approval/merge remains an explicit decision.
4. Verify the ruleset is enabled/enforced and inspect a PR's required check list. A workflow file alone cannot enforce a merge policy.

## First activation — approval required

Do not activate these settings or dispatch a release merely because CI is green.

1. Obtain owner release approval and merge the reviewed pipeline PR.
2. In Settings → Pages, change the publishing source from **Deploy from a branch** to **GitHub Actions**. Until this is done, legacy automatic branch deployment bypasses these safeguards. Existing published bytes remain the reference; preflight will compare them before any managed publication.
3. Create the `production` environment. Add the owner/authorized reviewer as a required reviewer, and restrict deployment branches to `main`. For a sole owner who initiates and approves releases, allow self-approval of deployments; separate initiator/reviewer roles may enable prevention of self-review. Disable unneeded bypasses.
4. Ensure repository/organization Actions policy permits the release job's explicitly declared Pages, OIDC, Actions read and release-asset write permissions. Production metadata must be readable by the job's token. Missing required reviewers or unreadable metadata fails preflight; the workflow never silently creates protection or assumes administration rights.
5. Wait for the new successful main verification run. Record its run ID and exact source SHA, then dispatch **Approved verified Pages release** from `main` with that ID, the SHA, `rollback=false`, and `confirm=deploy`. Approve the protected production job.

The first fallback is built from the pinned M2 Git object and SHA-256 in `release-baseline.json`. It must match the actual current live game; an unknown or changed production site stops activation. No legacy state is guessed. Subsequent fallbacks come from the latest successful managed release's durable assets, and must match current live bytes and metadata.

## Managed release and failure behavior

A merge triggers verification/candidate construction, never publication. Publishing is a separate explicit `workflow_dispatch`, accepted only from `main`. Ordinary releases require current main; PR runs, failed/pending runs, foreign workflows/repos, expired candidate artifacts and stale main SHAs are rejected. An explicit rollback follows successful approved-release history instead.

Preflight verifies that GitHub reports main as protected, actual production reviewer protection, authenticated run provenance, artifact integrity, immutable committed Git bytes and the current fallback. Only `index.html`, `release.json` and `release-manifest.json` may be deployed. The manifest records version, source SHA, verification run and file hashes; credentials, dependencies and diagnostic files cannot enter the site artifact.

After publication, the same production smoke journeys must pass against the expected manifest/source bytes. CDN convergence is polled for a bounded interval; failed gameplay assertions are not retried. Only then are assets staged in a provisional draft release; a stable-site receipt must succeed before that complete archive is published. Archives are never automatically marked GitHub Latest. Failed or cancelled attempts reconcile provisional/published records back to draft after recovery. Nonfatal diagnostic-upload warnings cannot invalidate an already committed stable state. If publish, live smoke or stable recording fails after a publish attempt, the job republishes its already validated fallback and smoke-tests it. The run stays failed and the bad candidate does not become the stable reference. Cancellation during publication is included in cleanup eligibility. Cancellation cleanup is attempted too. API outages/forced runner termination can prevent physical restoration; investigate failed recovery immediately rather than declaring production healthy.

The separate deployment-status workflow also smoke-tests the fixed canonical URL after successful deployment events. It never follows arbitrary event-provided URLs or checks out event-provided code, and has no write permission.

## Rollback

For an intentional rollback, dispatch the same approved release workflow from `main`:

- `rollback=true`;
- `candidate_run_id` = the **successful approved release workflow run ID** of the desired stable version (not its verification CI run);
- `expected_sha` = that stable asset manifest's exact source SHA;
- `confirm=deploy`.

The protected reviewer approves again. The job downloads `stable-run-<ID>` assets, validates successful protected-release history and committed Git content, checks current production against its own fallback, publishes the selected old version, and runs live smoke. If it fails, the pre-rollback stable site is restored. No force push or history rewrite is needed.

Do not rerun an already completed release to overwrite its immutable stable tag/assets; start a new dispatch/run. If historical assets/tags or Git objects have been manually removed, stop and recover from a trusted archived payload or make an approved revert PR and re-verify. Do not delete/replace release archives to make validation pass. Before the first managed release, the pinned M2 baseline is the only automatic bootstrap fallback.

## Issue → branch → PR → release

1. Owner supplies an issue and authorizes work. Agent reads scope, creates a separate branch, records implementation decisions and keeps game/regression invariants.
2. Agent implements, runs Chromium and failure checks, fixes findings, obtains independent code review and opens a PR with logs, screenshots and risks.
3. GitHub Actions runs required CI automatically. Agent may fix/retest its branch independently; it may not approve/merge its own release on the owner's behalf without authorization.
4. Owner reviews the completed tested milestone and explicitly approves release/merge. Merge creates a verified main candidate, not a deployment.
5. Owner or an explicitly authorized operator selects the exact successful run/SHA and dispatches the protected release; required reviewer approval remains necessary.
6. Automation publishes, checks production, records stable assets or restores fallback, and reports the resulting run and source SHA.

Optional handoff: keep the next issue's acceptance criteria and preserved invariants in its body; after a milestone, supply its number to a new authorized Codex task. There is no hidden continuous agent. Codex tasks do not restart themselves after ending; ChatGPT hourly reminders are notifications, not a persistent developer. This repository does not create reminders, paid services or unattended milestone implementation. Available clients may differ in workflow-dispatch/admin capabilities; do not claim these actions ran unless the corresponding API/job result confirms them.
