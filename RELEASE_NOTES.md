# Release notes

## 0.3.0 — Milestone 3: testing and release safeguards (proposed)

- Preserves the exact Milestone 2 game, including all roads, camera, economy and menu code.
- Reproducible Node 24 / Playwright 1.57.0 tests, automatic pinned Chromium setup, structured reports, screenshots and retained failure traces.
- Required PR verification, staged artifact smoke and read-only deployed Pages smoke. The existing 28 regressions remain intact.
- Explicitly approved, protected Pages publishing from successfully verified main candidates. Artifact checksums are bound to committed source, not merely self-reported metadata.
- Pre-fetched verified fallback and automatic restoration on publication or post-release smoke failure. Durable stable assets are archived as GitHub Releases; rollbacks do not depend on Actions artifact retention.
- Release provenance and documented protection activation, rollback, issue handoff and autonomy boundaries.

Activation requires approval, merging this PR, configuring Pages Actions hosting and production reviewers. No production setting or deployment is changed by this PR itself. The legacy in-game version badge is deliberately unchanged; release.json identifies the pipeline release.

## 0.2.0 — Milestone 2 baseline

City Life & Economy, squash merge `831da5cfbcc1d94fe6d26c289084bdc5d94f4ab4`. Twenty-eight Chromium regressions passed. This immutable game version is the explicitly pinned first-release fallback. See [Milestone 2](docs/MILESTONE2.md).
