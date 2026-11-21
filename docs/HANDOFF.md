## v0.50 candidate — A Clearer Town

Owner authorized quiet, on-demand information plus useful existing building menus. Branch `ui/v050-clearer-town` continues from released `e0b65bb`. See [Milestone 50](MILESTONE50.md) and [validation](validation/v050-clearer-town.md). New sources: `src/v050/presentation.js`, `src/v050/building-menus.js`; embed-v026 includes both. Small native producer hooks stay in the non-generated core of index.html. All sc47 art/media blocks are preserved byte-for-byte.

Routine updates go to the bounded session journal; native Chronicle remains authoritative for persistent history. Automatic timed decisions minimize without canceling deadlines; old event callbacks cannot transact across restore. Native close controls coordinate panels. Workshop reuses existing workplace operations; School reads actual scPeople entries. No new simulation or schema. Owner/Claude retains merge/release responsibility.

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
- `window.scDayNight`: phase names only; the tint was REMOVED in v0.38 (owner: night looks like a pause). The chip now shows only the weather.
- Next steps (see docs/ROADMAP_LONG_TERM.md section 11): building hubs (Stables, School, Monastery), crime and law, court and council.
- v0.36 also: survivors journey now opens with three code-drawn story pages (peace, raid, ashes; skippable) and a trail picture for each stage by terrain (`story`, `trail` in the journey IIFE). Real cut scenes to replace them later.

## v0.37
- People: summary line, filters (All/Working age/Children/Elders), Household line in the person detail, ages advance +1 per 60 economy cycles (children can become workers).
- (Weather was added here and REMOVED in v0.41 by the owner's decision.)

## v0.37.1 hotfix
- (Weather canvas hotfix note obsolete: weather removed in v0.41.) Lesson that still holds: any new canvas must override the global `canvas{background:#31523b}` rule.

## Owner working rules (2026-11-18)
- Each release should bundle several new things; avoid one-small-fix versions that cost an hour of CI each. Batch non-urgent fixes into the next feature version (urgent bugs excepted, like the v0.37.1 blank map).
- When the owner suggests new features, do not drop current work or follow the order given. Read the roadmap docs (ROADMAP_IDEAS.md, ROADMAP_LONG_TERM.md, DESIGN_GROWTH_AND_WAR.md), set the priorities, and build in the order that is best for the game. Errors/bugs reported by the owner are handled first.
- Before starting each new version (including fix-only ones), tell the owner what it will contain and wait for his agreement before building. Urgent breakages may be fixed first but still tell him the plan. Also tell him the full time to live (~2 hours from push: PR checks ~50 min, main checks ~50 min, release + his approval click).

- v0.38 (owner-approved plan): School building (🎓, 90 wood/60 gold/30 stone; drawn in code in `schoolArt` in src/v026/renderer.js, not in the atlas; one adult becomes Teacher, children "attend" and gain knowledge in People); Ruler card at the top of People (portrait via `scJourney.portrait`, leader from localStorage `shattered-crowns-leader-v1`); music Next-track button `#scMusicNext` and `scMusic.info()/next()`; People panel moved below the top bar with its own scroll; night overlay lightened (night rgba(20,35,85,.2)); new-origin deposits pulled closer to the keep (briar/saffron/stormhaven). Edits to building width/size tables live in src/v026/*.js (re-run `node scripts/embed-v026.cjs`). Tests: tests/school.test.cjs.

- v0.38 follow-ups from owner play: night tint removed entirely; guide step 1 explains selecting workers and right-clicking the foundation; foundation placed with no workers selected shows a hint; Marches home opens with 220 food (100 ran out in two minutes without a farm).

- v0.39 (owner-approved): School placement fixed (click-handler type list was missing 'school'); Chapel (⛪ 70 wood/80 gold/50 stone, `chapelArt` in src/v026/renderer.js, Priest role, counts like a theater for homes within 240 units); two new music themes organ ('Cathedral organ') and pastoral ('Shepherd pipes') in `modalDefs` (8 tracks total; owner: STOP adding themes for now, revisit near theme #30); People detail has Show home / Show workplace buttons (`scPeople.lastFocus`); children age 10x faster than adults (`age0<16 ? cycles/6 : cycles/60`); survivors' journey sets `window.scSmallKeep` (localStorage `shattered-crowns-small-keep`) so the keep renders at width 80; planning-focus and caravan held-activation tests made race-proof. New building checklist: src/v026 width+size tables, src/v027 icon keys, index.html costs maps (`const costs={...}` x6), civicCosts, times, radii, dock button HTML, build menu array, `scBuildingTypes`, map-click type list in the pointerup handler (the one that was missed), ROLE/SKILL in People, role text.

## v0.40.0
- Placing a building by UI click now auto-sends up to 3 nearest free workers (`scStartConstruction`); selected workers still take priority. Tests that need unassigned foundations call `__constructionTest.release()` / `__livingCityTest.release()`.
- `sc39SiteMarkers` draws a gold ring and a label with builder count and ETA (rate measured per second); `scFocusRing` flashes a ring for Show home/workplace.
- Survivors' start (`window.scSmallKeep`) draws `campArt` in the v026 renderer instead of a small Keep.
- Weather was tried in v0.40 and removed again in v0.41 (see below). Night mode stays dropped.
- No new music themes (8 tracks) by the owner's request.

## v0.41.0
- OWNER DECISION: no weather effects at all (rain, snow, fog, clouds) and nothing weather-related that touches crops. Removed `sc40Weather`, the ☂ toggle, `window.scWeather`, the `#sc37Weather` canvas and the clock-chip label. Do not re-add without the owner asking.
- ROOT CAUSE of "School/Chapel cannot be built" (v0.38-v0.40): the placement-rectangle mode list in the overlay (`['tower',...,'theater','school','chapel','workshop'].includes(mode)`, in src/v026/overlays.js and the hand-edited copies in index.html) did not contain school/chapel, so no rectangle appeared. New buildings must be added to EVERY mode list; grep for `'theater'` and `'clinic'` when adding a building.
- Added in v0.41: `window.scStoryCards` (story cards on first harvest, first School, first Chapel, 10 residents; polls the economy snapshot each second, primed on first poll so existing state never pops a card, shows each once per city, click or 7 s to close, `#scStoryCard`); School/Chapel inspector line (Teachers/Priest, children attending, parish size) in `describeBuilding`.

## v0.43.0 (includes the whole v0.42 branch: v0.42 was never released on its own)
- v0.42 content: `window.scEvents` (trader, refugees; v0.43 adds sickness), building-registry test (`tests/building-registry.test.cjs`), `test:quick` + `quick` CI job, trait in People rows, roadmap notes.
- v0.43: families move from the Keep into houses that have food, a well and road access (`cityReconcileOccupancy`: only 2 ruler residents stay in the Keep, overflow up to 8 seats; total capacity unchanged), person page explains why someone is still in the Keep; `window.scChapters` (3 chapters, panel `#scChapters`, pointer-events none, story card on completion); sickness event (mood dip via `happiness`, less with Healer/Chapel or herbs).
- Owner feedback: Show workplace worked; Show home used to point at the Keep because the first 8 residents were always counted there.

## v0.44.0 — The Advisor's Table
- Events are decisions: each card has 2-4 choices, a ★ on the advisor's counsel, a 30 s countdown (counts only while unpaused) and a cautious default on timeout. `scEvents.fire(kind, seconds)` lets tests shorten the countdown.
- New events: bandits (pay / stand firm / hide; the Keep and people are never lost, only small resource losses) and a feast request. Trader can also buy wood; refugees can be taken as workers only; fever can be met with prayer (needs Chapel) or quarantine.
- Advisor record: counsel is judged at decision time (is the advised option safe for the stockpile afterwards?) and shown as "n of m counsels proved sound" in the event card and the chapter box.
- Chapters 4 (Well, Clinic, 6 houses) and 5 (Plaza, Theater, Garden).
- "Retreat instead of wipe-out": the city mode has no raids yet (only skirmish has enemy attacks), so it was delivered as the bandit event; real raid retreat belongs with defence waves.
- Tests: tests/school.test.cjs (events decisions, chapters 4-5). The test helper clicks #sc154Pause, so tests that rely on the countdown must unpause first.
- Docs merged: idea intake (base building, anti-snowball, subgenres, asymmetry, big vision triage). Owner idea recorded: stable / shipyard for trading ships.

## v0.45.0 — The Market Square
- `window.scMarket`: three goods (Food, Planks, Stone) traded at a built Market in lots of 10 for gold. Buy price = price +15%, sell = price -15%; each trade moves the price 4% (clamped 50%-200% of the regional base); prices drift back to base every 5 s (only while unpaused). Because of the spread, cycling trades can never gain wealth (tested).
- Regional base prices: `REGION` table keyed by origin id (home: all 1.0; brookstead: food 0.8, stone 1.3). Add a row for each new origin. Prices are NOT saved (reset to regional base on start/load) to avoid touching the strict save validator; revisit if prices become long-lived.
- Panel `#scMarketPanel` appears at right (top:340px, below the Guide) when a player Market is inspected; includes an Advisor hint (cheap/dear/steady) and a traded-goods counter.
- Trader event quotes live prices (stone: 40 x price, wood: 40 x price x 0.95). Chapter 2 gained the goal "trade 20 goods at the Market".
- Deliberately not done: separate wheat/fish stocks and bread trading (food is one stock; bakery bread still auto-sells at 4 gold each), the special game currency (name chosen: Florin; gold stays the only currency), stable and shipyard (planned next).
- Tests: tests/market.test.cjs (quick tier). The test helper pauses the game, so the 5 s price recovery is not exercised there.

## v0.46.0 — Every Building Has Its Own Menu
- `window.scBuildingMenus.register(type, fn)`: a building type's menu lives in `#scBuildingMenu` inside the Selected building panel (`#scCityInspection`), right under its heading. `fn(building)` returns `{html, bind(host)}`; the host re-renders only when the html string changes. Menu buttons need the `#scBuildingMenuStyle` rules (the panel has global `float:right` button CSS).
- Menus now: Market (trade), Keep (taxes), Theater (festival), Bakery (community feast), Granary, Lumberyard, Farm and Fishery (status, suggestion, sell shortcuts). Add new buildings by registering a menu; keep the global Advisor and floating panels light.
- `window.scTax` (Low/Normal/High): gold factor 0.6/1/1.4 on the population part of tax income (`window.scTaxFactor`) and mood target +2/0/-3 (`window.scTaxMood`, added to the "Meal policy" modifier). Not saved (resets to Normal on start/load), like meal policy.
- Festival and feast reuse the existing `window.scFestival` rules (Theater / Bakery, 90 s cooldown, saved).
- Voice: group selections now speak after slow box drags and hotkey selections (`lastCanvas` is also refreshed on pointerup in the field and on selection hotkeys).
- Tests: tests/menus.test.cjs and tests/market.test.cjs (quick tier), tests/voices.test.cjs.
