# Handoff: where each version stands

Read this first when continuing. Newest at top. Details are in `docs/MILESTONE*.md`.

## How to run
`npm ci && npm test` (Node 24+, Playwright Chromium). After editing `src/v026|v027|v028`, run `node scripts/embed-v026.cjs` (check with `--check`). The atlas code and world map data live directly in `index.html` (not generated).

## v0.32
- Owner rule: every settlement starts as a Village (atlas kind, origin names, legend). Towns/cities only appear when a player grows one (not yet implemented in the engine; tier labels to come with the village-tier model).
- Continent map opens scrolled to the centroid of its settlements. Known gap: Southveil's islands sit on the south edge of the world image, so they cannot be fully centred; fix by regenerating the world map with Southveil moved inward (tools/worldmap, then recompute continent crops and site rows).

## v0.31
- Owner test of v0.30 passed (map, voices, roads, advisor modes, stock). v0.31: Connect to town now draws an unbroken path edge to edge; Guide moved top-right; new emblem icons for Worker/Soldier/Archer (CSS background on `#sc140Commands button[data-sc31]`); Brookstead stock 240/180/50/120. Owner asked for later: improved music for both anthems; Caelan portrait lives in Trade panel > Beyond the Town Gates > Ashford.

## v0.29 (in progress)
- Roads step 2 done: select a building with no road access and a "Connect to town · N stone" button lays a thin path (12 stone/tile) to the nearest road/keep/market. Units steer around buildings (move() in index.html).
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
- Assets: before any image is generated, remind the owner of the checklist at the end of docs/ART_DIRECTION.md (paid plan + Private Mode for defining art). The owner asked to be reminded every time.
- Owner decisions (v0.29): starting stock should afford 2-3 buildings, a bit more is fine, then gather or trade; do not make the opening harsh. The advisor guides the first 4-5 buildings. The advisor has two modes the player chooses: **New player** (teaches what to build next) and **Tester** (tells the owner the next thing to test, so they do not hunt through menus). Tester steps must be updated with every version.
- Art: every new image follows docs/ART_DIRECTION.md (one shared palette, no mixed styles).
- Every version adds: UI/gameplay/fixes, a small graphics improvement or cut scene, a sound improvement (e.g. an extra anthem; music is generated in Web Audio).
- Log every AI-generated image in `docs/ASSET_LOG.md`.
- Merging and deploying need the owner's approval.

## v0.33 (owner feedback on v0.31)
- Connect to town: grid-aligned L route, offered for every own building (was missing when close to keep/market); shows "Connected ✓" or "No clear path" when disabled.
- Lower-left hint notices hidden; Guide panel closable (X) with reopen tab; auto-hides behind side panels.
- Building inspector compact by default with "Show full details" toggle (owner request: too much text).
- Voice lines now also play when a group is selected from the Units buttons (not only canvas clicks).
- Tester steps rewritten (Trade: City Life → Trade → choose Ashford).
- Music playlist theme length now 5 minutes (was 7).
- Owner wishlist (later versions): more anthems in medieval style - Celtic, Oriental, Byzantine, Roman - using violins, flutes and medieval organ voices. Owner loves the second anthem. Follow docs/ART_DIRECTION.md-style consistency for audio too.

## v0.34
- Southveil continent view re-cropped (`scCropFix`): settlements were on the bottom edge of the world image; the view now pads beyond the image with a dark frame and an "edge of the known world" caption. Land polygons and positions are transformed to the new crop; world-map positions unchanged.
- Milestone story cards (`window.scMilestones`): homes, harvest, market, growth, caravan; shown once per browser (localStorage `shattered-crowns-milestones-v1`); disabled under automation unless `window.scMilestoneTest`.
- docs/ART_PIPELINE.md: art specs and the future asset-file migration.
- Tester steps rewritten.

## v0.35 (all free/code-drawn; no Leonardo or paid AI used)
- Four generated themes (Celtic, Byzantine, Oriental, Roman) with violin/flute/organ/horn voices added to the playlist (`modalTheme`, `window.scModalThemes`); new 'organ' voice.
- Survivors start (`window.scJourney`, button "Begin as survivors (journey)" on the start screen): supplies, five stages river/ridge, terrain from the origin's biome, leader name + code-drawn portrait stored in localStorage `shattered-crowns-leader-v1`; applies via `scApplyJourney` (population 3-8, reduced stock). Castle size is not yet reduced.
- Ranks: Sergeant/Captain/General from victories (`scEarnKill`), shown in the selection title; General triggers a story card.
- NOT in this version (needs more design): sea trade/ships, spies, marriages/alliances, wiring resource-profile.js and war-costs.js, real cut-scene stills, asset files.

## v0.36 (living society, step 1)
- `window.scPeople`: residents are derived deterministically from the economy snapshot (no save changes): name, age, role from filled workplace slots, home, traits, six stats that grow with experience. People button (top bar) lists and inspects them; a selected worker shows a person name and role.
- `window.scDayNight`: 6-minute day (dawn, day, dusk, night, pre-dawn), soft tint overlay and clock chip. Real-time, not tied to pause.
- Next steps (see docs/ROADMAP_LONG_TERM.md section 11): building hubs (Stables, School, Monastery), crime and law, court and council.
