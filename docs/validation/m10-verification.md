# Milestone 10 verification

Base: accepted v0.9.0 candidate5b3ab15 and its test-only CI repair9e55a16. PR #14 remains a separate dependency. No merge, deployment or expenditure is authorized.

## Development evidence

Eight initial browser cases failed against v0.9.0 because the engine had no origin identity, village start, schema3 or new-game music reset. The first implementation exposed a camera variable-scope error, caught as an uncaught JavaScript error by the tests; camera scaling now uses the actual canvas rectangle independently on both axes. Nine origin cases then passed, including both starts, strict invalid origins, old-save migration, village portable/checkpoint reload, pre-entry inspection, ownership, new-game music and actual stone gathering/3×3 roads/costs/undo.

The new road test initially clicked stale coordinates after camera updates and recentered between drag endpoints. It now follows the existing smoke test's per-axis coordinates, settles animation-frame camera updates, and centers only the first drag point. Actual worker orders, mined resources and road refunds are exercised; no stock injection or copied game economy substitutes for play.

A real v0.9.0 checkpoint fixture was captured from the exact unmodified released candidate5b3ab15. Legacy v0.6/v0.7/v0.8 fixtures remain. Restore assertions compare complete simulation/campaign state and city identity rather than snapshot timestamps.

## Audio CI measurement correction

The existing v0.9.0 CI run completed177/178 cases; worker-cue sampling could miss the short attack under runner load. A test-only fix was applied separately to PR #14: execute the actual private cue through the actual native graph in OfflineAudioContext and measure every256-sample RMS window at the unchanged>.035 floor. The real keyboard/selection routing test remains. A deliberately quiet.22 effects gain fails at.01864 RMS; all20 audio tests pass with the unchanged2.2 gain. Game files, gain, score and the approved v0.9.0 download were unchanged by that repair.

Milestone10 adapts old effects-only assertions by explicitly disabling music after new-game entry; muted volume/style/effect settings remain asserted. It does not weaken the audibility threshold or remove selection coverage.

## Completion evidence

Final review, full-suite, exact-source build, package smoke, screenshot and CI results are recorded after execution and in the PR. Local environment: Node24, Playwright1.57, explicit systemChromium154; pinned CI is separate. Managed browser policy blocks file:// before execution; HTTP package checks do not certify physical Windows/device listening.

An ownership regression exposed inherited strength text calling Marches Landing “Your living city” while Brookstead was home. The failing assertion now also checks that only the actual home receives that language; the informational neighbor overrides those fields.

The verification job ceiling increases from20 to25 minutes to accommodate the expanded browser suite plus exact-package smoke without repeatedly timing out near the previous ceiling. Tests and publication/approval conditions are unchanged; this is a bounded timeout, not new infrastructure or an authorization to spend.

Independent review found one Important issue: shifted village stone overlapped an unchanged gold center, so a real gold click ordered stone gathering. A new real-click regression failed with all three workers targeting stone. Village-only node spacing now removes colliding deposits; default-home node arrays are untouched. Final targeted/full evidence follows. The review's minor coverage suggestion—restoring through the API before title entry—remains deferred; ordinary UI restores occur after entry and are directly tested. That defensive pre-entry branch was inspected as correct.

Long-term village balance and physical Windows/device/file-path behavior remain human-playtest limits. No other Critical/Important findings were reported; the unchanged deterministic audio measurement fix was verified separately against v0.9.0.

Final review-fix focused run: **33/33 passed**, zero failures/skips (ten origin cases,22 pipeline cases and one CI-policy case). The gold-center regression passed through actual worker orders after its observed failure. Phone chooser and village/atlas screenshots at390px and1440px show the real game. The previous-version dependency's independent run41754714411 is green after its test-only repair.

Deferred minor: direct API restore before initial title entry is inspected but not directly browser-tested; normal Menu/portable/checkpoint restores after entry are covered. The UI does not expose pre-entry restore, so this is future-facing coverage rather than a known user-visible defect.

[Village gameplay](../screenshots/m10-brookstead-city-1440.png) · [Village ownership in atlas](../screenshots/m10-brookstead-atlas-1440.png) · [Phone starting choices](../screenshots/m10-start-choices-390.png) · [Phone city](../screenshots/m10-brookstead-city-390.png) · [Phone atlas](../screenshots/m10-brookstead-atlas-390.png).
