## Current candidate — v0.60 A Slower Frontier

Continue branch `ui/v060-slower-frontier`. Read [MILESTONE60.md](MILESTONE60.md) and [validation/v060-slower-frontier.md](validation/v060-slower-frontier.md). This includes the completed v059 naval/terrain work and the approved slower pace plus first land-war loop. Historical v059 blockers are resolved. Do not merge main or describe pending CI as verified.

## Latest WIP checkpoint — v0.59

**Continue on remote branch `ui/v059-open-seas`. Read [CONTINUE_V059.md](CONTINUE_V059.md) first.** It records current code, the four known blockers, test evidence, release/auth status and exact remaining work. v059 is unfinished, not verified or released. Owner manually published v058 as test pre-release; its tag remains untouched.

# Continuation checkpoint — 22 November 2026

This is the starting point for Claude, Codex or another assistant. It records implemented work separately from future ideas. Follow ../AGENTS.md and the owner's latest instructions. Update this file after each delivered version.

## Current continuation — v0.58 Working Fleet

Current GitHub topic remains PR77 / branch ui/v056-first-harbour (local branch ui/v058-working-fleet). Read [MILESTONE58.md](MILESTONE58.md) and validation/v058-working-fleet.md first. The exact candidate SHA and immutable ZIP are posted in PR77 and delivery chat. v057 below is historical.

Owner corrected the report: Shipyard war/trade construction works. They requested useful fishing/trade/war orders and cinematic fades. Implemented coastal missions, escrow, catch through ledger, limited holding coastal raiders, protection/attack, hull damage/sinking, schema15 migration and frame-driven fades. Actual fish uses Food, as their latest message says. No new media or credit spending. Overseas maps, enemy fleets, invasions, repairs and full sea-route diplomacy remain future work; do not claim those exist.

Follow latest validation and GitHub CI, not the historical run below. No release approval or self-merge/deployment of v058. Tester contains the new instructions. Continue with owner playtest feedback before adding more scope.

## Previous delivered game

- v0.57.0, Boat Builders, game commit `e4be37a02309890c609089217f5b63ef6869466e`.
- GitHub branch `ui/v056-first-harbour`, PR [77](https://github.com/GKoromilas01/Shattered-Crowns/pull/77). Local branch was `ui/v057-boat-builders`; local worktree `/workspace/work/v055-continuous-opening`. Fresh clones should use the GitHub branch, not depend on those local paths.
- [Immutable playtest ZIP](https://github.com/GKoromilas01/Shattered-Crowns/archive/e4be37a02309890c609089217f5b63ef6869466e.zip): extract and open index.html. This checkpoint is not a production deployment.
- [Milestone57](MILESTONE57.md), [validation](validation/v057-boat-builders.md), screenshots in validation/v057/, implementation spec/plan in superpowers/.

## Implemented and retained

- New Game plays the introduction; Return restores the save without replaying it. Starting settlement is a survivors' camp. Reinforcement, not merely chapter completion, triggers the castle appearance.
- Short videos play normally. Longer narration appears on separate illustrated dark screens between clips. Preserve the full story. No visible Continue/Skip/Pause story buttons, no full-width dark subtitle strip, no ten-second frozen-frame narration. These supersede earlier frozen-frame requests.
- Construction uses explicitly selected workers; do not recruit every miner/gatherer automatically.
- Original approximately one-minute Leonardo tracks rotate; extended/simpler originals stay archived. Preserve the coherent painted graphics and sound identity. Paid Chapel/School/bridge art is reused.
- Construction progress rings/bars are quiet until relevant (hover/selection). School bell is at 08:00 game time; soft Chapel bells follow active game time, respecting pause/background and sound settings.
- Shipyard uses shared construction styling and is last. Fishery builds fishing boats (60 wood/25 gold,20 full-staff seconds). Shipyard builds warships (80/40,30s) and trade ships (100/60,40s). Own building inspectors are the primary UI; Menu → Fleet remains. Fleet ×/Escape closes without canceling orders.
- Two resident producer jobs; one active order per producer; one fishing boat per Fishery; repeat Shipyard ships; twenty vessels/orders globally. Fishing boat near its own berth raises staffed base catch9→12. Ships sail, stop and berth. Combat and cargo routes are NOT implemented.
- Save schema14 migrates schema13 generic ships/orders to warships, preserving progress and positions. Preserve older schema support; advise keeping an exported backup for downgrading.

## Owner's enduring preferences

The purpose is to immerse the player in a medieval town, make consequential decisions and think deeply. Prefer a few visible, testable improvements each version. Put every new manual test instruction in Journal & objectives → Open guide → Guide: Tester, not only in chat. Do not claim manual checks passed automatically.

Visual references supplied in chat are inspiration for LATER builds, not a demand to replace everything now: modest wooden shore shipyards/rowboats; rocky sheltered ports; rough robes and restrained stone chapels; busy cloth-covered markets; candlelit stone advisor rooms; snowy northern mountain journeys and fur clothing; warm eastern courts, gardens, textiles, queens, priests and warlocks. Make original designs with the approved game's palette, not copied characters/scenes. Reference screenshots themselves are not guaranteed to be stored in this repository. Read ART_DIRECTION.md and ASSET_LOG.md; reuse existing assets before proposing generation. No automatic purchase or Leonardo credit spending is authorized by this handoff.

## Verification and release status at delivery

Local tests passed:7 typed-vessel cases,40 harbour/growth/pipeline regressions,1 Advisor Tester case,7 packaged smoke cases (55 total). Fresh review findings were fixed and retested. Source embed check, diff check and ZIP checksum validation passed. See validation record for scope; this is not a full remote-CI success claim.

Exact game-head CI [45007573651](https://github.com/GKoromilas01/Shattered-Crowns/actions/runs/45007573651) was pending at last lookup. Recheck before integration. No self-merge/main push/deployment was performed.

PR76 is a separate v055 release candidate (`3252d57e5a4f506f020fa5eb868221ba72371bfa`), with owner release approval for that candidate. Do not confuse that approval with permission to deploy v057. Read current GitHub state before acting; do not infer that recorded pending/open statuses are still current. Owner/Claude own merges under AGENTS.md. Production release workflow requires a successful exact MAIN verification run, not a PR run ID.

## How to continue

1. Fetch/check out the current PR77 branch and read HANDOFF.md, MILESTONE57.md, RELEASE_NOTES.md and AGENTS.md. Check current PR/CI and owner feedback before changing code.
2. Prefer fixing playtest reports before adding naval combat/cargo scope. Those systems remain future ideas, not promised completed features. Other long-term ideas live in ROADMAP_IDEAS.md and DESIGN_GROWTH_AND_WAR.md; historical roadmap claims may be superseded by newer milestones.
3. Edit source modules (current naval code remains in src/v056/, tester steps in src/v052/). Regenerate with `node scripts/embed-v026.cjs`, `node scripts/embed-v047.cjs`, then `node scripts/embed-v026.cjs --check`. Do not edit generated media blocks.
4. Run relevant tests, update in-game Tester and documentation, package the committed source, deliver an exact-commit ZIP and report CI honestly. Never overwrite the separate release candidate accidentally.

This documentation update does not change game behavior, media or save format.
