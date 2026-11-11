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

The complete npm test suite is running on the frozen source. Package evidence and final results will be recorded when complete; focused checks do not claim full-suite or GitHub CI success.

## Final native-input audit

A separate direct keyboard test found that the new disclosure summary was outside the original native-input selector: Space reached the global shortcut and left the disclosure closed. The partial full run was stopped and its incomplete output retained locally, not reported as a full result. The existing input guard now includes Governor summaries. Native Space and Enter both open the disclosure while preserving Pause and focus; the four focused save/native-input scenarios also pass. Final screenshot capture was refreshed after this input-only fix. The earlier89558a9 package is superseded; the final package is built from the corrected commit.
