# START HERE — Shattered Crowns0.70 handoff

**Owner requested immediate ZIP/checkpoint before chat credits expire (28 November2026). This is a playable development checkpoint, NOT a fully verified production release.** Read AGENTS.md and this file before acting. User authorizes integration of these supplied files; do not ask again whether to add them. No protected game merge/deployment approved.

## What to preserve
Source branch `feat/owner-cinematics` in https://github.com/GKoromilas01/Shattered-Crowns . Parent0.69 commit f48eec9f701121886aec7afc57dec8cbd1e0a782, PR93 (depends on First Winter PR92). New0.70 checkpoint commit is included in CHECKPOINT.json in delivered ZIP. Latest stable game remains v0.66; existing Sand Labs4.28 playtest is0.69. **0.70 has not been uploaded to Sand Labs yet.** Do not confuse development source with production release.

## Owner intent and authorization
Integrate all7 supplied ZIPs into the next version, plus meaningful future graphics/gameplay upgrades. Explicit future direction: game should approach other-game reference quality, buildings should be larger/readable, map should zoom properly, and gameplay needs more meaningful activities. Current slice integrates media; do not claim that the renderer/gameplay overhaul is already built. Existing reference briefs and original city concept are stored; exact other-game screenshots were NOT found. Ask owner to resend the exact references when agreeing the graphics target.

Every change needs GitHub handoff for Claude/other AIs. Keep Sand Labs12projects alphabetical, desktop first. No unsolicited changes to other apps/Chronoscope. No paid generation without actual cost review. Private Mode ON for Leonardo media. Do not selfmerge game source PRs or alter protected production release.

## Seven received files — all integrated in working0.70
Four Hailuo03 video MP4s: Homes7.292s, Market7.292s, Growth7.292s, Parade6.583s. Originals retained in assets/v070/originals; optimized silent VP9 copies in assets/v070/video. Existing game music plays beneath films. New runtime keys milestone_homes/market/growth/parade.
Three Music-v1 MP3s: **Crown Anthem I120.033s**, **Crown Anthem II119.980s**, **Roman Rebuilding170.005s**. Owner explicitly approved neutral titles I/II because both uploaded filenames refer to the four-minute prompt. They are actually two minutes; do not call either Greek or four minutes without listening/confirmation. Roman prompt requested3minutes but output is2:50. Original MP3 bytes unchanged; decoded fingerprints all distinct. Original archive filenames, hashes, dimensions and actual durations: assets/v070/inventory.json.
No agent-side generation/credits spent. Screenshot showed Private Mode ON; do not invent verified account subscription tier or each file's price. No lyric/pronunciation accuracy claim made from filenames.

## Implemented behavior
- Homes/Market/Growth cards use real films, matching Georgia Italic22px ivory captions and transparent subtitle background.
- Parade: Our defenders return. / For hearth and home, the village welcomes them. Plays once per city after a dispatched land raid is cleared, Keep survives and no live enemy units remain. Presentation receipt only, no economy bonus/save-schema change.
- Menu → Films & new music: replay all4clips and select new recordings without changing progression. Native original playlist now14tracks, keeps full decoded file durations, mute/volume/next.
- Audio controller extracted from generated HTML to src/v070/audio-controller.js. Same old audio behavior except new tracks/labels and read-only duration/position status.
- Milestone and construction films queue without overlap; restore cancels old queue and delayed construction callback.
- Review found real fade race: done=true made cancellation return while600ms cleanup could later unpause restored city. Fixed via separate cleaned/cleanupTimer and immediate cleanup plus epoch/city guard. New tests reproduced RED (overlay counts1vs0,2vs1), then passed. Reviewer found no residual race.

## Narration and future graphics — NOT complete
Owner wants spoken voiceover for every subtitle. No narrator recordings were supplied; do NOT substitute poor system/computer speech and call finished. Full text prepared in docs/NARRATION_SCRIPT_V070.md. Need a short reviewed natural voice sample/provider, proper timing, music ducking, mute/skip/restore handling. Existing MP4 audio streams do not establish that subtitles are narrated; runtime films deliberately muted.
Next graphics/gameplay plan: docs/FUTURE_VISUAL_GAMEPLAY_UPGRADES.md. First representative playable district with larger buildings + reliable pointer-anchored zoom/selection/roads/minimap, then richer settlement details and consequential economy/trade/defence. No new assets bought, no renderer rewrite shipped in0.70.

## Verification observed
- First integration:5/5 real-media browser tests passed.
- Combined feature/first-scenes/milestones/settlement/player-control:25/25 passed before fade tests were added.
- Final fade/owner/first-scenes/settlement run:20/20 passed, including9owner-media tests, real file decoding/signal/MP3 exact hashes/durations, parade gates (including destroyed Keep), queue/restore, delayed callback, switching replay, both fade-race regressions.
- Pipeline22/22 passed. Embedding rebuild/check and whitespace checks passed.
- Older native rotation regression initially expected11tracks; after legitimate expansion to14, updated expected order. Focused corrected rotation rerun1/1 passed (/tmp/sc70-rotation-final.txt). Larger audio/anthem/opening command may still be running at checkpoint; inspect copied logs in ZIP. Do not claim command/all-suite green unless actual final output confirms it. Any final old-expectation failure needs the already-corrected test rerun, not removing new tracks.
- Full required source CI and FINAL exact artifact broad smoke are not complete. Local package build/verify result, if performed, is only packaging evidence. Source review/CI must be checked before production release. No sourcePR0.70 created yet unless later continuation records it.

## Continue in this order
1. Check CHECKPOINT.json/Git HEAD; keep all current source/assets/docs. Read docs/validation/v070-owner-media.md and copied test logs.
2. Finish native audio/opening checks if necessary; rerun targeted corrected rotation. Run `CHROMIUM_PATH=/usr/bin/chromium node --test tests/owner-media.test.cjs tests/first-scenes.test.cjs tests/milestones.test.cjs tests/settlement-cinema.test.cjs tests/player-control.test.cjs tests/anthem.test.cjs` as needed, avoid redundant costly runs when evidence already current.
3. Native source rebuild: `node scripts/embed-v026.cjs && node scripts/embed-v047.cjs && node scripts/embed-v026.cjs --check`. Do not edit embedded media by hand. New media integrity verified by embed-v047 against inventory.
4. Package exact committed checkpoint with `node scripts/release.cjs build <dir>` and `verify`; run actual packaged smoke tests (`SMOKE_DIR=<dir> CHROMIUM_PATH=/usr/bin/chromium node --test tests/smoke/pages.test.cjs`). Current owner-media tests accept SC_TEST_GAME for testing packaged HTML.
5. Open dependent source PR against feat/settlement-cinema, no selfmerge. Required exact-head quick/live-smoke/verify remain gates for protected production release.
6. Publish only an explicitly labelled separate Sand Labs0.70 playtest using verified package, update hub version/card+handoff and public manifest, preserve main stable launch. This follows owner's standing request to test every finished app on Sand Labs. Use clean /workspace/Sand-Labs-Gallery-Public; avoid stale Sand-Labs-Public-Preview WIP. Source/private /workspace/Sand-Labs-Applications has unrelated dirty Pavlos files/Zoetica image: don't include them.
7. User tests all new media via Menu. Then address natural narrator sample and agree concrete next graphics target using actual reference screenshots.

## ZIP usage
Playable ZIP: extract, open index.html (or serve folder with a local web server). Full-source ZIP includes rebuild sources/assets/tests/docs; run npm ci and install Playwright Chromium only if doing development/testing. No API key or cloud account needed for this offline game/media checkpoint. Preserve city backup before switching versions; saves are browser/origin-local.
