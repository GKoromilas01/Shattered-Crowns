# Version 0.7.0 — Peaceful City & Kingdom Overview

Giannis's city-first direction is the foundation: build a city worth protecting, then expand into kingdom strategy. This release adds a peaceful campaign and a separate surrounding-region overview. It builds on released v0.6.0 at c9b74a804fd9c050f42324b1f097a706b849a814.

## Play

Fresh games default to **Peaceful city campaign**. Your detailed city has no enemy keep or troops, no recruitment AI competing for its resource deposits, and no scheduled attacks. You may still gather, build, train defensive units, use formations, and manage the full existing economy, services and happiness. Food shortages and poor city planning still have their existing consequences.

Open **Menu → Kingdom map**, or press zoom-out once more after reaching the city's 55% minimum zoom. The separate overview contains your city, the rival castles Ironmere, Ashford and Valewatch, and Brookstead village. Select a settlement to read its ruler, relations, description and trade prospects. **Return to city** or Escape returns to the same camera and zoom. The overview suspends simulation while open and preserves the underlying Pause setting. City shortcuts and camera movement are isolated from the modal. Buttons support Tab, Enter and Space; Return stays visible on narrow screens.

These settlements and paths are an informational first region, not simulated enemy cities or active trade routes. No diplomacy contracts, wars, sieges, political story choices or networked players are implemented here. The existing legacy Atlas and political demonstrations remain separate from this region and are not promoted into authoritative campaign systems.

## Prosperity and preparation

Kingdom map and the existing Advisor explain current preparation. The campaign remains peaceful even when all goals are met. Readiness requires all five conditions together:

- At least 16 civilian residents.
- At least one occupied house, no displaced residents, and water/road access for every occupied house.
- The measured last food cycle has no shortfall, production after exports meets demand, and reserve holds at least four current cycles of household demand.
- Citizen satisfaction is at least 65.
- At least 200 gold and three living defensive combat units.

Sustain these for twelve five-second city cycles to reach the **Prosperous city** preparation milestone. A failing cycle resets the streak; current failing conditions immediately make readiness false. Values are initial balancing choices for testing, not a promise about ideal pacing. The milestone never triggers an attack. Pausing, the overview and time away do not advance simulation. Four calendar days of protection remains a proposal for a later persistent online mode, not a timer in this release.

## Classic mode and saves

**Menu → New game scenario → Classic skirmish → Start new scenario** selects the released battle behavior. Confirmation is required before replacing unsaved progress. Existing browser checkpoints are retained. Restart/difficulty changes keep the active scenario; a normal fresh page uses the default campaign, while `?scenario=skirmish` explicitly opens classic mode.

Released schema-1 saves restore as classic skirmish, including their enemy keep, units, economy and AI. They are not silently converted into peaceful cities. Campaign snapshots use schema 2 and include validated readiness-cycle progress and selected settlement. Loading either scenario restores its saved scenario regardless of the current page mode, pauses in city view and cancels placement. Schema-1 captures remain available for classic mode. Older v0.6 clients cannot load schema-2 campaign files; the current version accepts both formats. File envelopes, size bounds, local keys, backup recovery, prior-city protection and storage warnings remain unchanged.

`tests/fixtures/city-v060.json` was captured from the exact released v0.6.0 HTML, rather than synthesized by the new encoder. It proves old-save loading into the new default campaign. Corrupt/unknown campaign selections, invalid counters and enemy entities/AI queues in campaign files fail before changing the city.

## Start screen and original audio

First-time visitors see a full-screen title before entering their city. Enter city opens normal play; Begin with the Advisor opens the existing optional guide. Preview opening music permits listening while the city clock waits. Keyboard focus stays within the entry screen and Space/Enter activate its buttons without triggering city shortcuts. Returning browsers retain the existing introductory-screen preference.

Gentle original Web Audio chords and short distinct worker/army selection cues begin only after a user gesture. **Menu → Sound** independently controls music, effects, master mute and 0–100 volume. Settings persist in this browser separately from city saves. Hidden pages suspend sound; unsupported audio or denied storage leaves the game usable. No licensed recordings, network audio, new dependencies or cinematic intro are included. Giannis approved the gentle ambience after listening to the preview. Worker and army cues are provisional first-pass effects and need a dedicated quality pass. This is a modest synthesized ambient theme, not a finished orchestral score.

## Defense placement feedback

Tower, fortress and wall rules keep their existing prices, collision checks and selected-worker range. The Construction details now explain missing workers, exact required/current resources, blocked plots and the 180-map-unit worker limit. A selected worker's blue circle marks that limit. Failure does not spend resources. Placement rechecks affordability after arming the tool, preventing a defense from spending resources already used on recruitment or other actions. Successful placement and undo retain the existing engine path. New tests exercise real controls and map clicks, including a narrow screen and a worker selected directly with the mouse. Construction clicks are marked by the authoritative engine so the legacy delayed selection refresh cannot overwrite placement feedback; the feedback area remains readable and scrollable at 390px.

## Visual proof of concept and longer-term ideas

Giannis requested a better-looking scene as a proof of concept. An original [art-direction illustration](visual-concepts/city-art-direction.png) and [logo concepts](visual-concepts/README.md) were delivered separately; it is **not the running renderer or a shipped graphics upgrade**. It proposes coherent medieval stone/timber architecture, slate/terracotta roofs, woodland, readable roads, and warm light. Converting the direction into optimized playable assets remains a separate graphics milestone after founder feedback. The founder's brand, graphics, adaptive-AI, Sand Coin research and social-contribution ideas are recorded in [Sand Labs vision](SAND_LABS_VISION.md), with proposals distinguished from implemented behavior.

## Verification and release

Run the unchanged Node 24 / Playwright Chromium workflow:

```sh
npm ci
npm test
npm run build:site
npm run verify:site
SMOKE_DIR=dist EXPECTED_RELEASE_SHA=$(git rev-parse HEAD) npm run test:smoke
```

All prior regression assertions are retained. Their setup selects the actual classic scenario where they test the released skirmish. New default-campaign tests cover peace, long simulation, measured readiness/reversal, save migration and corruption, checkpoint reload, scenario confirmation, minimum-zoom navigation, exact camera/Pause/selection restoration, held keys, rapid re-open and keyboard/mobile use. Existing real-gathering road smoke journeys run against the default city. Startup smoke also verifies campaign/overview on versions that expose it; this conditional maintains read-only smoke compatibility with the previous live v0.6 release during feature CI.

Representative screenshots: `gallery/m7-kingdom-390.png`, `m7-kingdom-768.png`, `m7-kingdom-1440.png`. CI retains the existing reports, screenshots, browser diagnostics and failure traces. The PR records exact final counts and evidence links. Road drawing and the unified Construction/Units controller are byte-identical to the released base. Camera changes only suspend input for the overview and connect its minimum-zoom boundary.

No dependency, backend, paid asset, CI permission, release approval or publication workflow changes are required. No merge or deployment without Giannis approving the tested PR.
