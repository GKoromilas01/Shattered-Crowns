# Governors and released Advisor integration

Base main: `1cea473611fcf0ad1c845ae5db34d2462448c19d` (released Advisor PR #27).
Incoming governor/maps branch: `11c69d4c335ed74dc7a86402404cfae1af44a7e5` (existing PR #25).

## Scope and resolution

Runtime merged automatically. The only textual conflicts were two add/add milestone/report documents. Canonical M18 documents retain Governors & Living World Maps; the released Advisor notes are preserved in docs/ADVISOR_UPDATE.md and docs/validation/advisor-update-verification.md. README links distinguish them. Existing original branches and PR #26 remain untouched.

Measured assessment, Advisor summary/Pause and priority-card script bodies are byte-identical to released main. All original Advisor tests remain. New tests exercise advice, measured cycles, section navigation, state/view/Pause preservation and restoration across all five origins. On main the two existing origins passed, while the three new origins failed for unsupported starts; after integration all five passed.

## Verification to date

- Focused run: **36/36 passed**, covering Advisor model/browser, five-origin integration, governor starts/save schemas, city layout, living maps and optional strings. Command: `CHROMIUM_PATH=/usr/bin/chromium node --test --test-concurrency=1 tests/advisor-model.test.cjs tests/advisor.test.cjs tests/advisor-governors.test.cjs tests/governors.test.cjs tests/living-maps.test.cjs tests/strings-preview.test.cjs tests/city-life-layout.test.cjs`.
- Independent read-only review found no Critical/Important defects, independently passed the six model tests and diff whitespace check. It did not run browser/full/package checks. Minor evidence limit: all-five-origin navigation asserts state/view/Pause; explicit armed placement/selected-unit preservation remains covered by the unchanged released Advisor tests rather than repeated on a new origin.
- Phone and desktop Datehaven Advisor captures: docs/screenshots/integration-advisor-390.png and integration-advisor-1440.png. Visual inspection confirms readable advice, visible Close and native scrolling.
- Node24.19.0, Playwright1.57.0, explicit Chromium154.0.8037.57 locally. Physical-device and other-engine feedback remains owner playtesting.

Full regression, exact-source packaging and CI results will be recorded in the integration PR. No merge to main or deployment is authorized/performed by this integration task.
