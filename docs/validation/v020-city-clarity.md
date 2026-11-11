# v0.20 City Clarity verification

Base8128e17, released v0.19 after PR34. Dedicated feature branch; production unchanged. Owner explicitly authorized routine design/implementation choices. No preparation workspace/files were available; roadmap preserved from the brief in V020_RESEARCH_AND_BACKLOG.md.

New regression first run:10 expected failures,1 existing assigned-builder behaviour pass. First implementation8/11, identifying inspector focus before visibility and a fixture whose housing was no longer full after starvation departures. The fixture now observes its first unmet-meal cycle; the inspector waits for visible geometry. Extra held-Save tests reproduced browser checkpoint overwrites across restored contexts with both Space and pointer; existing activation epochs now guard Save and Download before executing. Simulation rules, prices and save formats are unchanged.

Results and exact-source/package evidence are recorded below after execution. No CI result, actual-device coverage or deployment is claimed from local tests.

## Focused results and review

- Final UI batch:28/28 passed, zero failures/skips. Includes all16 new clarity/save/focus scenarios, three existing layout sizes and nine Governor scenarios.
- Affected Advisor/workplace/construction/planning/save batch:63/64 initially passed. The sole stale createdWith0.19 expectation is corrected to release.json; both relevant genuine v0.7/v0.8.1 legacy-version scenarios passed in a separate2/2 run with all original exact state/campaign assertions.
-126 inline scripts parsed; git diff --check passed.
- Independent source reviewer found no simulation/save-format defects and identified two focus-return gaps. Regraded as Important for this scope and reproduced both: vanished Employment Inspect row after restore; Worksites Close from Governor. Own additional feedback-dismiss Space test reproduced unwanted global Pause. One fix pass resolves all three, each covered by a failing-then-passing regression. No unresolved reported issue remains.
- Actual screenshots inspected at390×844 and1440×900: v020-unmeasured, v020-attention, v020-save in docs/screenshots. Food/housing/unassigned construction appear before figures. Save display shows actual browser checkpoint time and requests for portable files remain distinct. The demo advances actual simulation to its first unmet-meal cycle and places its real paid foundation; no stocks/people/buildings fabricated. No image compositing or external assets.

Research/application and deferred owner direction: ../V020_RESEARCH_AND_BACKLOG.md. No renderer loops, asset loading, economy or save-format changes; polish is original restrained CSS within existing panels.

The completed full-suite and final-package evidence is recorded below. Focused counts overlap the complete run; no GitHub CI success is inferred.

## Final native-input audit

A separate direct keyboard test found that the new disclosure summary was outside the original native-input selector: Space reached the global shortcut and left the disclosure closed. The partial full run was stopped and its incomplete output retained locally, not reported as a full result. The existing input guard now includes Governor summaries. Native Space and Enter both open the disclosure while preserving Pause and focus; the four focused save/native-input scenarios also pass. Final screenshot capture was refreshed after this input-only fix. The earlier89558a9 package is superseded; the final package is built from the corrected commit.

## Completed final verification — 11 November 2026

Frozen corrected source: `61c831824223a9db5f8da402e93dd85476a0f333`.

- `CHROMIUM_PATH=/usr/bin/chromium npm test`: **395/395 passed**, zero failures, skips or cancellations;1,958.7 seconds. Includes all18 new clarity/native-input scenarios and the suite’s five smoke journeys.
- Separate final exact-source package: **5/5 smoke journeys passed**, zero failures/skips. Build, checksums and immutable committed Git-source verification passed for `work/candidate-final`. Manifest verificationRunId0 denotes local evidence, not GitHub release approval. The earlier89558a9 candidate is superseded.
- Runtime: Node24.19.0, Playwright1.57.0, explicitly selected Chromium154.0.8037.57. Full logs/events/environment retained locally in test-results/all; final packaged evidence in test-results/packaged-final.
- Final game SHA256: `e6cdff0d236149c9e524eaeba9a466f94c49e86c19559d78bd450245a8b79a1d`.
- Final release metadata SHA256: `7644b1f16bad1036fb14b2c07364d0fb3c5f4a3f2ee953bcdacbb085b1d73807`.
- All six actual screenshots were refreshed after the input correction; appearance/hierarchy remains as inspected. No mock game statistics or composited scene assets.

Independent review findings were addressed through reproduced regressions; no unresolved reported finding remains. Final documentation follow-up changes no game, release or test bytes. GitHub’s pinned-browser CI remains an independent merge gate; it is not polled and no result is claimed. Physical devices, other browser engines, Windows listening and long-campaign preference/balance remain human playtesting. No main merge, publication, monetization activation or production setting change occurred.
