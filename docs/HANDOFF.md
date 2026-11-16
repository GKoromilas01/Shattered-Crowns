# Handoff: where each version stands

Read this first when continuing. Newest at top. Details are in `docs/MILESTONE*.md`.

## How to run
`npm ci && npm test` (Node 24+, Playwright Chromium). After editing `src/v026|v027|v028`, run `node scripts/embed-v026.cjs` (check with `--check`). The atlas code and world map data live directly in `index.html` (not generated).

## v0.29 (in progress)
- Done: fictional world map (`docs/WORLD_MAP_V029.md`), settlement placement from terrain, resource profiles in atlas text.
- Done: "Crown anthem · marching horns" music style (original 16-bar D-minor march, Web Audio, Menu → Sound → Music style; `tests/anthem.test.cjs`).
- Done: unit voice lines (browser speech synthesis, Menu → Sound toggle, `tests/voices.test.cjs`); rotating playlist style (7 min per theme, 6 s fades; add themes to `playlistTracks`); the anthem builds over loops from simple to full strings, harp and horns.
- Pending: map polish; hook resource profiles into city starts; per-version cut scene, new anthem and small graphics upgrade.

## v0.28 Beyond the Town Gates (PR #44 merged-approved; Ashford in PR #45)
- Done (PR #45): Ashford engine terms, earned 48-basket reserve after a double pact, accessibility test fix, `tests/ashford.test.cjs`.
- Done (PR #45): Ashford UI (partner chooser `#sc28Contact`, Ashford atlas route), `tests/ashford-ui.test.cjs`, `docs/validation/v028-ashford.md`.
- Done: Caelan portrait (`assets/v028/caelan.*`, see `docs/ASSET_LOG.md`).
- Pending: browser funded-route walkthrough for Ashford.

## Design direction
See `docs/DESIGN_GROWTH_AND_WAR.md`: everyone starts as a village and grows; multiplayer online; war allowed but costly to the aggressor.

## Standing rules
- Art: every new image follows docs/ART_DIRECTION.md (one shared palette, no mixed styles).
- Every version adds: UI/gameplay/fixes, a small graphics improvement or cut scene, a sound improvement (e.g. an extra anthem; music is generated in Web Audio).
- Log every AI-generated image in `docs/ASSET_LOG.md`.
- Merging and deploying need the owner's approval.
