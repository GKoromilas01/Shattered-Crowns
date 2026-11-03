# Milestone 8 verification record — 3 November 2026

Base: PR #11 merge `d5cb8ca7fe8be1f9a87bda7b2bc659cd04bae0d1`. Remote main was fetched and matched this SHA. GitHub had no open PRs/issues or Milestone 8 branch when development began. Prior milestone plans, notes, release safeguards and the genuine v0.6 save fixture were inspected; no separate saved implementation checkpoint was found.

## Milestone 7 baseline

The unchanged game source ran all 130 existing cases: 126 passed and four release-pipeline tests failed because the initial global-Playwright workaround did not provide the locked `yaml` package:

- release workflow is dispatch-only, protected and has a failure restore path
- required CI cannot publish candidates when tests fail and PR jobs have no deployment rights
- release cancellation is recovered and diagnostic failure cannot invalidate stable history
- release preflight accepts pasted surrounding whitespace and passes the validated run ID to artifact download

After `npm ci`, `node --test tests/pipeline.test.cjs` passed **21/21**, including all four above. Every original browser case passed in the baseline, including roads/costs/undo, peaceful/classic scenarios, old-save restoration, checkpoint safeguards, real gathering and construction, keyboard/camera/fullscreen controls and long simulated sessions. This evidence is a baseline run plus a dependency-corrected pipeline recheck, not a claim of one uninterrupted green baseline run.

## Reproductions and review

- Opening-music preview retained `aria-pressed=true` after muting. New browser regression failed before the fix and passed after the preview used controller state. Unsupported Web Audio disables preview. Ambient composition, oscillator envelopes and mixing remain unchanged.
- Seven initial planning tests failed against M7 for missing summary/navigation/Locate behavior. New summary arithmetic, empty/pre-cycle states, responsive sections and Locate behavior subsequently passed targeted checks.
- A fresh read-only whole-branch reviewer found a Space-key conflict with global Pause/pan handlers. A real keyboard regression failed, then passed after interception scoped to City Life buttons/summaries. Native activation remains intact.
- Reviewer also reproduced lost keyboard focus when a focused building disappeared. Treated as important for this usability milestone; a failing regression now passes with a visible section fallback and explanation.
- Stale IDs, enemy IDs and genuine v0.7 restoration passed targeted checks. The fixture was captured from the exact M7 merge source without substituting engine logic.
- The initial stale-button test raced the expected 500ms live removal of vanished building controls. Its test now destroys and activates the retained rendered button in one JavaScript turn, exercising the actual stale-activation path deterministically.
- An early final run overlapped the baseline and hit the unchanged 6000ms page-load timeout in the existing audio-selection test before gameplay. It was stopped; final verification runs sequentially. No timeout or assertion was weakened.

## Preservation checks

Diff and byte comparisons retain the unified Construction/Units, single camera and zoom controllers. Engine roads, construction placement/costs/undo, economy arithmetic and audio tone/ambient generation are unchanged. The only save encoding change is `createdWith: '0.8.0'`; schema/version acceptance, restore and storage safeguards are retained. Real v0.6 and v0.7 fixtures cover compatibility.

## Final candidate

The final sequential full suite passed **141/141, 0 failed, 0 skipped**, in 827.7 seconds: `CHROMIUM_PATH=/usr/bin/chromium TEST_ARTIFACT_DIR=test-results/m8-verified npm test`. It includes all 130 prior cases, one new audio regression and ten planning/compatibility/keyboard cases. Candidate-build and packaged-smoke results are recorded in the PR after execution. Local environment: Node **24.19.0**, Playwright **1.57.0**, explicitly selected system Chromium **154.0.8037.57**. GitHub CI independently uses the repository's pinned browser. These are distinct environments; local results do not certify another browser version or physical touch devices.

No workflows, dependencies or release approval gates changed. No merge, deployment or paid asset/service action was performed.
