# Resume v0.59 Open Seas — WIP checkpoint,22 November2026

This is unfinished development, not a verified release. Resume this branch; do not restart from main or v058. Read ../AGENTS.md, ../CLAUDE.md and the current spec/plan in docs/superpowers/. User requested a durable handoff before credits run out.

## Branches and releases

- Remote continuation branch: `ui/v059-open-seas`. Local worktree `/workspace/work/v055-continuous-opening`, same local branch name. This checkpoint commits all current source/tests/docs.
- Parent game commit: `78a097b89d09db5c6c8ee7fed470efd54d19eef8` (v0.58), on PR77 / `ui/v056-first-harbour`.
- Owner manually published [v0.58.0-test.1](https://github.com/GKoromilas01/Shattered-Crowns/releases/tag/v0.58.0-test.1) as a PRE-RELEASE. Its tag points to78a097b. Release notes honestly say local checks passed but full GitHub verification has not passed. Do not relabel it verified/stable or move its tag.
- Main was v0.28 at last read, commit e0b65bb92fced272db77eb66ab2463aae60075e9. Last stable release tag stable-run-44916197614 references verified run44910812795. Read current GitHub state before release actions.
- User authorizes publishing verified releases ourselves. Actual blocker: connector supports PRs/git but has no create-release action; workspace GH_TOKEN is invalid. A standard GitHub CLI device flow was approved by the user in GitHub, but CLI completion failed with GraphQL Forbidden; `env -u GH_TOKEN -u GITHUB_TOKEN gh auth status` still said not logged in. Do not ask them to repeat that failed flow. Git push works. Owner asked for manual Release instructions and published v058 themselves.
- No v059 release/deployment/merge has been performed. Never self-merge under repository agreement; owner/Claude owns review/merge. Release approval is not proof of successful CI.

## Owner's latest requirements (approved)

1. Eliminate Open Fleet intermediary. Fishery/Shipyard panels build their own boats and offer only their own boat shortcuts. Clicking an actual ship opens that ship's own controls. Shipyard must not show fishing-boat commands.
2. Enlarge sea and select ships/right-click destinations. Open water moves; fish schools gather; marked ports trade. Warships can move, defend working boats and attack real coastal hostiles.
3. Follow Age of Empires IV fishing style: visible fish schools, differing abundance, finite stocks, return catch to home Fishery and repeat; deep-water stocks recover. First visit discovers richness. Avoid infinite free food from arbitrary empty water.
4. Market → Trade with settlements opens world map and partner information. Owner explicitly approved simple first-contact agreements before sea trading. Reuse current Ironmere envoy/charter and Valewatch surveyed introductory shipment/trust; no duplicate diplomacy state.
5. Keep the existing bridge, replace the rigid straight river with a gentle meander/irregular banks/reeds/shallows and slightly improve terrain in the same palette. Preserve town positions/crossing/collision corridor.
6. Future suggestions only: experienced sailors, repairs/stronger hulls, nets, cargo holds; upgrades belong to selected ships. See NAVAL_FUTURE_IDEAS.md. No new graphics generation, media changes or credit spending.
7. Every new manual check must be in Advisor Tester, not only chat. This part is NOT yet updated to v059.

## Implemented in this WIP

- Canvas2450x1600 instead of2450x900, added700 sea southwards. Land/shore/bridge coordinates unchanged. Native save migration accepts old900-high worlds after checking their old coordinate bounds; naval schema16/version4.
- src/v056/harbour-engine.js: command(id,point), school/port definitions, direct select bridge, queued loaded orders, repeat fishing, saved stocks/discovery and strict state migration. School positions (650,1030),(1150,1250),(1850,1450), catch6/3/9, capacities72/30/120. Deep banks regenerate .1 stock/active second; others finite. Empty schools seek another nonempty school or wait for recovery. Fish enters normal Food ledger on home unloading. Recalled trade cargo/payments still arrive only at home.
- Ports: Ironmere Landing(350,1120), Valewatch Harbour(2100,1450). New trade orders gate on existing Ironmere signed charter or completed Valewatch introduction; inherited in-flight legacy voyages may finish.
- src/v056/presentation.js replaced old Fleet dialog with scoped building controls, selected-ship panel, native pointer handlers, school/port markers and Market partner section inside existing world-map dialog. Painter uses cached metadata/boats to avoid full building scans each frame.
- src/v059/terrain.js provides river-center/river/meadow hooks; native fallback renderer calls them. IMPORTANT: normal painted renderer does not yet call them (see blocker below).
- Shipyard preview metadata and static Quick Dock button added. Quick registry coastal-placement fixture now tests y755. Palette test expects20 choices. Old School test now checks no unselected builders and explicit assignment.

## Known blockers — fix these first

A fresh read-only review (v059_review) found THREE Important issues. Do not dispatch another review loop; reproduce/fix these and run targeted checks:

1. `scNavalCommand` school+existing fishing branch fails to clear superseded `b.nextOrder`. Loaded fishboat → empty-water command queues nextOrder/repeatfalse → new-school command repeattrue leaves stale queue → unload zeroes cargo but queue stays. Schema16 validation rejects such state. Clear the superseded queue and add a regression for this exact sequence, preserving cargo.
2. Normal renderer skips new terrain hooks. `index.html` draw exits after `sc26WorldRenderer.render` succeeds. River/meadow hooks are below that return. `src/v026/renderer.js` terrain still paints straight rectangular river, so the visible user request is not met in normal play. Integrate hooks into normal cached terrain as well, preserve painted bridge, and visually inspect actual fully loaded renderer. Update cache key if needed to ensure dimensions/new terrain are honored. Current river-center mathematical test alone does NOT prove visible changes.
3. Default Send to trade chooses closest port without filtering agreement readiness, then rejects if closest locked even when another port is open. UI enables on any ready port. Choose nearest ELIGIBLE port; test a town with only the farther partner open.

FOURTH confirmed issue from failing native test:
4. Market world-map Send envoy is disabled. Opening world overview makes env.canSend false due to overview gating. The action already closes world map before calling the real API, but the displayed button uses that overview-dependent canSend and can never be clicked. Compute read-only resource/phase/busy eligibility for the view; keep authoritative checks after closing. Audit Valewatch survey/intro button eligibility for the same issue. Preserve no mutation during ordinary viewing.

Additional unfinished integration:
- Several OLD tests still refer to removed Fleet dialog, schema15, or one-off fishing. Update them to actual direct inspector/map controls and schema16 without dropping meaningful assertions. Files tests/harbour.test.cjs, boat-builders.test.cjs, working-fleet.test.cjs, player-control.test.cjs, settlement-growth.test.cjs. For legacy fixtures strip NEW fields (stocks,nextOrder,mission.repeat) before setting13/14/15 shapes. Do not change genuine old-schema validation to accept new fields.
- Update Advisor Tester, release notes, milestone59, HANDOFF/CONTINUATION around final behavior. No final v059 package/ZIP has been created.
- Capture real desktop/mobile screenshots and inspect the meander in the NORMAL renderer. Check full sea minimap/camera, starting camera, native land orders, no overflow and no uncaught browser errors.

## Evidence and verification

- Current new tests: tests/open-seas.test.cjs. Latest run `/tmp/v059-final-seas.log`:7/8 passed, one failed (Market Send envoy disabled). It covers expanded world/legacy migration, scoped building commands/no Fleet, native left/right clicks, differing catches/loaded redirects/recall, agreement gate/water-only move/port escrow, river-center alignment, Market diplomatic action and saved stocks/discovery/regeneration.
- Quick tier `/tmp/v059-quick.log`:62/62 passed after fixing earlier quick CI failures. This run preceded the latest stock/discovery changes. Do not claim whole CURRENT tree has62 verified passes without rerunning.
- v058 remote CI run45024874703: quick job137215609959 failed7 cases (missing preview/dock registry, coastal plot fixture, stale19-count palette, stale auto-builder School expectation). Those fixes are in this WIP and quick62 passed locally. Full verify was still running at last read; PR76/v055 run45001399351 completed FAILURE. No newer release is fully verified.
- Earlier v058 local mission8/8 and package smoke7/7 passed, as recorded in its milestone. These do not prove v059 complete.
- Relevant text logs copied into docs/validation/v059/ for fresh environments. Generated traces/screenshots live in ignored test-results locally.

Environment commands (do not npm install):
```
node scripts/embed-v026.cjs
node scripts/embed-v047.cjs
node scripts/embed-v026.cjs --check
TEST_ARTIFACT_DIR=test-results/v059-resume NODE_PATH=/workspace/work/v026-art-sample/node_modules CHROMIUM_PATH=/usr/bin/chromium node --test tests/open-seas.test.cjs
TEST_ARTIFACT_DIR=test-results/v059-quick-resume NODE_PATH=/workspace/work/v026-art-sample/node_modules CHROMIUM_PATH=/usr/bin/chromium npm run test:quick
```
Use separate artifact directories for independent runs. Inspect all failures. Run relevant updated naval/economy/save/opening checks and final committed package smoke. Build/package via scripts/release.cjs after committing final code; deliver an exact-SHA GitHub ZIP. Check full GitHub CI before calling any release verified. Avoid repetitive CI polling; fix known failures first.

## Original user preferences retained

Full story, separate illustrated prose screens between short fading videos, transparent captions/no visible story buttons, New Game intro only, original one-minute Leonardo music and coherent painted palette. Explicitly selected builders only. Quiet worksite indicators, game-time bells, same paid Chapel/School/bridge art. Goal: immerse yourself in a medieval town, make consequential decisions and think deeply. No new asset spending authorized.
