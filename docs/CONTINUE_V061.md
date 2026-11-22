# Claude continuation — v061 playtest fixes

Owner asked to stop implementation and write this handoff because credits are running out. **Do not claim these fixes are implemented.** This session investigated and wrote a plan only; no gameplay source was changed.

## Start from here

Branch: `fix/v061-town-defenses`, based on playable v060 commit `9c11b48a0a3e4289a6f63bb4d57c5d00c57565e4`.

Worktree used here: `/workspace/work/v055-continuous-opening`. Fresh clone: use the branch above. v060 draft PR: https://github.com/GKoromilas01/Shattered-Crowns/pull/78 . Do not revert to older main. Read AGENTS.md, docs/MILESTONE60.md, docs/CONTINUATION.md and the owner's latest requirements below. The v061 plan is docs/superpowers/plans/2026-11-22-v061-town-defenses.md; its notification scope was expanded by the owner after it was written, as recorded below.

v060 implemented three-times-slower simulation, direct ship orders, larger sea, fishing schools, first-contact trade agreements, winding river, and a warned frontier/outpost war loop. Preserve these, original media, and explicitly selected builders. v060 local evidence is in validation and PR78. Latest exact-head GitHub Actions run known here was45052656803, pending when last checked; check its actual result, do not assume green. No verified stable v060 release was published.

## Owner's latest instructions — implement all of these

1. **Towers and walls build instantly; possibly castle/fortress too.** They must take worker construction time consistent with the slower rhythm. Do not steal gatherers. A placed defense should be a non-operational worksite until explicitly assigned workers finish it. Check fortress too. Existing costs should remain.
2. **Connect to road/town button causes unwanted map scrolling.** Owner clarified: the button is in a screen area where approaching it makes the map scroll down. Move the action near the top of the building inspector, away from the map edge, and prevent edge-pan when the pointer is over interface controls. This is not a request to change road economics or scroll the page.
3. **Restore EVERY pre-existing game notification, request and event visibly.** Owner first described Market messages such as “Ironmere wants wood,” then explicitly expanded: “every request not only ironmere,every game notification and event that existed.” Do not fix only Ironmere. Automatic notifications must appear onscreen again, with access to their relevant action; Journal history alone is insufficient. Restore story/milestone updates, trade requests/returns, and automatic decisions/events. Keep Journal history and a dismiss/read-later path. Preserve explicit payments, event defaults/deadlines, and safe controls across city import/reset. Avoid duplicate notices and map obstruction. Ensure pending requests in saved towns can be reviewed even if already marked noticed.
4. **Raid damage and repairs.** Owner reports seeing no damage from a raid, and wants workers to repair damaged buildings. Investigate real combat and visible feedback; do not simulate fake damage. Add explicit selected-worker repair orders for damaged friendly buildings, without automatically taking miners/other workers off their jobs. Preserve HP/jobs across saves; pause/hidden timing must remain frozen. Destroyed buildings are not repairable. Explain material costs and inability to repair. Repair balance is an implementation choice, not an owner-specified number.
5. **Defense choices were unclickable.** Reproduce with a real new/saved town (not only a fixture with soldiers). In v060 Keep → Defend home requires existing army; Attack also requires warning/active frontier. Explain missing conditions, show army/queue counts, and make paid recruitment readily accessible in the Keep. Never create a free army or silently skip grace. Check whether anything beyond legitimate disabled conditions blocks clicks.
6. **Music and videos explicitly deferred.** Owner said “forget music and video 4 now.” Do not generate, replace, extend or spend credits on media in this fix pass.
7. Put the new manual checks inside **Advisor Tester**, as the owner requested for every version. Provide a downloadable exact-commit GitHub ZIP (workspace-only links failed for this user).

## Findings from read-only investigation

### Defense construction bypass

In native index.html placement pointerup, the city branch uses `scStartConstruction(buildingType,p)` only when `civicCosts[buildingType]` exists. Towers/walls/fortress have separate `scDefenseCosts` and fall through to `addBuilding`, so they are instant. Their times/radii are absent from `scConstructionTimes` / `scConstructionRadii`.

Existing worksite functions: `scStartConstruction`, `scConstructionAssign`, `scConstructionTick`, cancel/refund/undo. Definitions and core hooks are native index.html; use source modules for new logic and regenerate embedded blocks with scripts/embed-v026.cjs and embed-v047.cjs. Do not hand-edit embedded art/media.

Defense placement currently picks the nearest friendly worker merely for range eligibility (180 units). This must not become automatic construction assignment. `scConstructionAssign` already uses selected workers only. Incomplete defenses must stay out of operational buildings and therefore must not shoot. Existing tests/usability.test.cjs deliberately assert instant defense construction: update those expectations to the new requirement, preserving costs/undo/selection assertions. tests/building-registry.test.cjs and tests/market.test.cjs cover adjacent behavior.

### Road scrolling

Native index.html creates `#scConnectTown` as a floating fixed button centered near bottom92px. Map edge-pan listener checks pointer position, excludes only the minimap, and can pan underneath overlay controls. Relevant native variables/functions: scEdgeX/Y/Hold/Velocity and scEdgeScroll. Move/reuse the existing button; keep scConnectPlan/scConnectToTown authoritative. Guard controls from edge-pan rather than merely hiding the symptom with a delay. Inspector is `#scCityInspection`; menus are `#scBuildingMenu`.

### Hidden notifications — exact source

`src/v050/presentation.js` adds CSS hiding `#scChapters,#sc24Saying,#sc25Receipt,#sc24Offer` and non-explicit `#scStoryCard` / `#scEventCard`. Its `notify(title,text)` only appends entries to Journal; no onscreen toast. `scan()` collects some hidden content into Journal. Automatic events are reduced to a toolbar decision button; explicit scEvents.fire calls still open cards. This is why notifications disappeared.

Native `<script id="sc24Presentation">` sets `offerOpen=!window.sc50UI` when an earned offer is first noticed and sends only a generic Journal message. Thus merely removing CSS does not restore automatic trade requests. Trade panel is `#sc24TradePanel`; native API `scCaravanUI.open()` opens it, and `scCaravan.snapshot()` exposes trade/followup. Notification delivery must not dispatch/charge resources automatically. The v026 supplier presentation also wraps old agreements into `#sc26EarlierAgreements` details; keep requests discoverable.

An approach to consider: a small visible notice queue with Review/Dismiss, all entries retained in Journal, and existing decision cards visibly reopened on arrival. Use textContent, not injected HTML; epoch guard held controls and reset queue on city change. Don't make all messages modal, don't lose requests behind HUD scrolling, and don't restrict restoration to trade. These are engineering suggestions, not completed code.

### War/repair findings

`src/v060/war-engine.js` creates real enemy soldiers/archers with attack orders targeting the home Keep. Native `attack()` subtracts HP and records damage; renderer already shows injured-building health bars (`src/v026/renderer.js` health()). Prior native combat test proves defenders fight; an undefended/damage-visibility test is still needed. Small armies take real time to travel at the slowed pace; distinguish “wave departed” from “already fighting.”

No worker repair order exists. Native unit loop only handles build/gather/attack/move. Right-click native handler routes sites first, then enemy/node/move. Add repair before node/move only when a damaged friendly building is clicked and selected workers exist. Do not hijack non-workers. Repair workers must skip normal idle combat while performing the job. Stop cleanly on full HP, no materials or dead target.

Save capture serializes referenced orders generically, but strict prepare allows move/attack/gather/build only and rejects friendly attack targets. New repair orders need explicit worker/team/building/live-target validation and version gating. Defense worksites also need schema gating so old schema checks remain strict. Current latest save schema17 is used for war; schema16 for naval. Schema18 is a reasonable next version, but handle optional war correctly: `scWarPrepare` currently assumes every schema>=17 has war, while a repaired peaceful town may have none. Naval prepare for schemas>=13 expects initialized compatible state; use existing `scNavalEnsure` or design the new schema shape deliberately. Do not simply broaden old schema validators.

`src/v060/presentation.js` Keep buttons disable when q.army is0; attack additionally disables in peace/won. No explanation or paid recruitment action is provided next to them. Native `spawn('soldier')` is the existing paid recruitment path (80gold, queue, native6 simulation seconds); use its existing rules, not a duplicate implementation.

## Suggested tests (not yet written)

- Actual mouse placements for tower/wall/fortress create sites, spend once, do not shoot; no selected worker means no progress; explicit assignment completes after native time; partial save/return and undo/cancel work.
- Native raid reaches an undefended building and lowers HP. HP does not regenerate without orders. One selected worker repairs at a visible resource cost; other gatherers keep orders. Repair saves roundtrip and invalid/old-schema references reject atomically.
- Empty-army Keep explains disabled defense and offers existing paid recruitment; queued soldier completes on native clock and defense becomes usable; attack remains locked until warning.
- Hover Connect action at desktop/mobile edges with unpaused game: camera does not move; action remains reachable, costs unchanged.
- Earn a real neighbour request using tests/support/caravan.cjs fixture, ensure visible notice and working Review; test an already-noticed saved offer. Trigger automatic decisions/story updates/returns too, not only Ironmere. Dismiss does not pay; import/reset cannot reuse stale actions.
- Regressions: slower-frontier, player-control, saves, construction/usability, connect-town, market/menus, caravan/event presentation. Use existing Playwright installation via NODE_PATH=/workspace/work/v026-art-sample/node_modules and CHROMIUM_PATH=/usr/bin/chromium. Node24.

## Delivery / continuity

Keep the current branch changes documented and push the branch. Never push/merge main yourself. Owner authorized publishing verified releases, but this session's GitHub Release API is unavailable: browser device authorization succeeded, CLI completion failed Forbidden. Do not ask the owner to repeat OAuth. Git push and GitHub PR connector work. Required CI must actually pass before calling a build verified. v058 test tag is historical; do not move it. User's previous working download was GitHub's archive/<full SHA>.zip, then extract and open index.html.
