# Milestone 3 — testing and release safeguards

Authority: issue #3; autonomous implementation and PR only. Base 831da5cfbcc1d94fe6d26c289084bdc5d94f4ab4. No production code changes, merge, deployment, Pages setting changes or protection activation in this milestone's implementation session.

## Approach

Use GitHub Actions and the existing Node/Playwright stack. Keep all 28 regression assertions and all game bytes. Replace the present branch-triggered release path only through an explicitly documented, owner-approved migration to Pages Actions hosting; until that migration, current branch-source hosting is not protected by this new workflow. Do not claim repository protections are enabled.

Default `npm ci; npm test` resolves the lockfile-pinned Playwright Chromium (downloads it when absent), records the browser version and creates screenshots, traces and logs. A documented CHROMIUM_PATH override is available for constrained environments. A clean Node 24 checkout needs standard Chromium OS libraries; CI installs these explicitly. Existing browser test setup may be shared without weakening assertions.

CI runs the original 28 checks, pipeline unit/policy checks and read-only browser smoke journeys. Only after regression success and staged-artifact smoke success does it upload `verified-site`. A stable required-ci check summarizes all required jobs. PR CI also exercises the deployed Pages URL without modifying server state. Smoke tests cover real startup, menu switching, 3×3/6×6 road geometry/costs/undo, Advisor, camera/fullscreen/minimap and City Life/economy, gathering real resources rather than injecting a replacement game.

Artifacts contain only index.html, release.json and a SHA-256 release-manifest.json, bound to source SHA and verification run. Reject changed game bytes, malformed provenance, extra files, symlinks and tampering. Pin a bootstrap rollback to the explicitly verified M2 source/hash.

Deployment is workflow_dispatch only from main, with an exact verified CI run ID and expected SHA, explicit release/rollback selection and protected production environment. Preflight requires actual required reviewers and fails closed if metadata cannot be read. Ordinary releases require current main; rollback selects a previous successful main verification run. Before touching production, fetch and validate the last successful managed release's durable GitHub Release assets (or explicitly pinned M2 bootstrap for the first release), and match it to current live bytes. Missing fallback stops release. Approval permits restoring that fallback in the same job if publication or live smoke fails; failures do not create a new stable record. Archive stable bytes as three validated GitHub Release assets keyed to the successful approved release run, so rollback does not depend on 90-day Actions artifact retention. Actions evidence/candidate artifacts retain a documented lifetime.

Provide standalone deployment-status smoke checks and release workflow smoke after publication, with bounded manifest/CDN polling and no retries of failed game assertions. No workflow changes hosting settings automatically. Document branch rules, required reviewers, first activation, rollback, issue→branch→PR→test→review→approval→merge→release and honest autonomy limits. Codex sessions/reminders do not self-restart as continuous agents.

## Evidence

Run all regression/unit/staged smoke checks locally, clean-checkout tests, failure-injection tests for safety boundaries, independent review, and GitHub PR CI including live URL smoke. Attach logs/artifacts and release notes. No paid services. Request approval only when the tested PR is ready; call out activation prerequisites and any untested deployment side effects.
