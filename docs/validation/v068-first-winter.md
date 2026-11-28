# First Winter0.68 candidate verification — 2026-11-28

Branch feat/first-winter from origin/main d5612cd. No merge, release or deployment. Sand Labs retains approved live version until owner/Claude publication.

- Pure rules:6/6 passed, including one-shot charges, insufficient resources, timed order, review→success, malformed checkpoints, inherited option rejection and fractional clock deadlines.
- Existing save regression file:17/17 save cases passed in the combined run; that earlier run also had one now-corrected new UI test assertion (it incorrectly expected an uninspected Keep to remain open after loading a fixture). Do not describe that combined command as green.
- Gameplay/upgrades/Advisor regression run:18/18 passed (first-winter rules/browser, player-control, v066). Historical v066 version assertion now checks current release metadata; current Tester assertions check new First Winter steps.
- Review found the native restore event invalidated visible Keep handlers after rendering. Regression reproduced dead Begin button (RED), then restore listener now forces fresh rendering. Follow-up reviewer minor inherited method name found in pure action lookup: RED then Object.hasOwn guard GREEN.
- Added fractional clock deadline regression after a real checkpoint at60.3833 seconds revealed subtraction rounded480 to479.9999999999. Compare absolute deadlines consistently instead.
- Final browser, embedding and packaging evidence will be recorded below. Full remote quick/live-smoke/verify must be green before release. The historical full suite takes overan hour; no full-suite success is claimed here.

Manual owner playtest: select Keep, Begin First Winter, review allsix needs. Pause and confirm countdown holds. Three council choices appear during preparation. Export/restore; review history. After countdown, assess, improve unmet needs and reassess. These steps also exist inside Advisor Tester and are not automatically marked passed.

Final review additionally caught duplicate Keep upgrade sections caused by the existing registration wrapper composing with later menus. Added a Royal Keep test (RED: three sections), then made the existing upgrade wrapper idempotent. Existing banner/upgrade functionality retained. Both sc47Art and sc47Media embedded blocks compared byte-for-byte with origin/main: identical. Pipeline unit tests22/22 passed. Final feature/browser/gameplay run follows this fix.

Final targeted run: `CHROMIUM_PATH=/usr/bin/chromium node --test tests/first-winter-rules.test.cjs tests/first-winter.test.cjs tests/v066.test.cjs tests/player-control.test.cjs` —23/23 passed, zero failures. This includes allfive new native/browser cases and the idempotent upgrade-section regression. Pure rules6/6; existing upgrades8/8; player control4/4. `node --test tests/pipeline.test.cjs` —22/22 passed. Embedding rebuild/check and git diff whitespace check passed. Desktop1366×768 inspected visually; no new mobile work.
