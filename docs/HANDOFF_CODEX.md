# Handoff for Codex / ChatGPT (written 2026-11-21 by Claude; Claude's credits run out, back Monday)

Owner: Giannis Koromilas (GKoromilas01), Athens. Game: Shattered Crowns, browser RTS/city-builder. Live: https://gkoromilas01.github.io/Shattered-Crowns/

## Where things stand
- **v0.47 is LIVE** (painted art for the whole map, biome textures, 4 Leonardo anthems, 5-clip opening story video).
- **v0.49 is in progress on branch `feat/v049-prep`** (not merged, not live). Already on that branch:
  1. Start-of-game card fixes: "first harvest" card/milestone only after the player builds a farm; first trader event only after 2 player-built buildings (`sc49BaseFarms`, `sc49BaseBuild` in index.html).
  2. Painted construction sites: a site draws the finished painted sprite rising from the ground (`window.sc47PaintSite`, called from `src/v026/renderer.js` line ~44).
  3. Anthems: play once, fade out, ~25 s quiet gap (`playlist.gap`), Leonardo tracks interleaved more often, longer (~3 min) versions embedded from `assets/v049/music-longer`. Originals (1 min) stay in `assets/v047/music`.
  4. Intro steps for two NEW clips (`village`, `attack`) already in the code; they are skipped until the clips exist in `assets/v047/video/`.
- **Claude's remaining v0.49 work (Monday):** embed the two new clips (Leonardo clips are made, waiting for owner to download them), run intro tests, open the PR, watch CI, merge, release.
- Deferred (not decided): gold and rock art, painted settlement icons/portraits, cards -> graphics/videos gradually, 3-5 min Leonardo anthems (quote price first).

## DO NOT (so we don't spoil or redo work)
- Do not edit `index.html` generated regions by hand. Edit `src/v026/*.js`, `src/v027/*.js` or `scripts/embed-*.cjs`, then run: `node scripts/embed-v026.cjs && node scripts/embed-v047.cjs && node scripts/embed-v026.cjs --check`. (A few hand-edited hooks live directly in index.html near lines 1478-1500 and the audio engine ~9679-9720; edit them carefully and re-run the check.)
- Release deploys ONLY `index.html`, so all media must stay embedded in it. Do not move art/audio/video to separate files.
- Do not revert or restyle the new painted art, biome textures, anthems or intro videos. Do not go back to old sprites.
- Do not rebase/force-push `feat/v049-prep`. Work on a new branch from it (e.g. `feat/v049-gameplay`) or wait until it merges; do not edit the same lines as above.
- Do not spend Leonardo credits, buy anything, or enter payment details. Never click Make Public or Delete in Leonardo. Art must be clearly better, original, commercially usable, consistent. Log any asset in `docs/ASSET_LOG.md`.
- Do not merge to main or start a release on your own: merge only after the main CI run is green; the owner clicks the GitHub "production" approval himself.
- Do not invent big new systems. Owner wants an addictive, balanced game, not a very detailed one. Ideas go to the roadmap docs until he agrees.

## Owner's working rules
- Bundle several visible changes per version; each checkable in about 30 seconds of playing.
- Before each version: tell him contents and time-to-live, get agreement. Give honest time estimates (he was upset by 10+ hour waits).
- His bug reports come first; otherwise set priorities from roadmap docs.
- Building menus/info belong inside that building's own panel, not floating panels.
- Rewrite the short tester steps each version.

## What Codex is best used for (suggested)
1. **Gameplay balance and flow** (best fit): early game pacing for the caravan start and the other starts, economy numbers (food/wood/stone/gold rates, costs, event frequency), making the first 10 minutes clear and fun. Verify by playing in a real browser, not only by tests.
2. **Test/CI reliability**: caravan UI tests (`tests/caravan-ui.test.cjs`, `caravan-followup-ui.test.cjs`) are flaky on CI (slow frames; keyboard focus/panel timing). Root cause not fully fixed; painted art makes frames slower on weak machines (possible optimisation: cache painted sprites, fewer per-frame draws).
3. **Performance of painted art** on slow devices (measured 31 fps at 4x CPU throttle vs 41 old).
Avoid for Codex: generating art/video/music, release approvals.

## Commands
- Tests: `NODE_PATH=$(npm root -g) node --test --test-concurrency=1 tests/<name>.cjs` (full run: `node scripts/run-tests.cjs`).
- CI jobs: quick, live-smoke, verify (~45 min), required-ci. Pushing a new commit cancels in-flight CI on the PR.
- Throwaway remote branch `probe/keyboard-ci` can be deleted when owner agrees.
