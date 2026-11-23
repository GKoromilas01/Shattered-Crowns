# v0.50 — A Clearer Town

Owner requested less unsolicited information and useful additions to unfinished menus in one version. Screenshots were explicitly optional; implementation authorized on 21 November 2026. No merge or deployment authorization.

- Journal & objectives holds the current chapter and up to 40 recent informational updates for this city session. Routine milestones, sayings, shipment notices and optional trade offers stop opening large cards over the map. Full Chronicle retains the established settlement history.
- Automatic timed events use a compact notice with the actual remaining deadline and default choice. Opening or minimizing it spends nothing. Existing choices, eligibility, rewards and default outcome remain authoritative; Pause, World map and hidden tabs suspend the countdown. Loading or starting a city invalidates old choices.
- Guide opens on request. Journal, residents, advisor, City Life, trade and worksites use native close controls when switching context. Selected foundations retain construction details; other sites retain their painted stages without a text label over each one.
- Workshop inspector adds real shared timber/plank stock and production explanation alongside its existing workplace pause and staffing-priority controls. Those controls are reused, not duplicated. Employment remains the place to compare food staffing.
- School inspector lists actual derived teachers and attending pupils with a residents shortcut. No new jobs, education bonuses or fictional capacity controls.

Simulation, footprints, placement, camera, resource access, media, shipments and economics are retained. No save schema change: schemas 1–11 continue through the established loader. The journal is ephemeral; it does not invent or replay historical milestones after restore. Persistent shipment, saying and diplomatic history remains in the native Chronicle. Opening a pending event is not itself persisted, as in the previous version.

## Quick owner check

1. Confirm **V0.50.0**. Start a city: the guide and chapter checklist should no longer cover the map.
2. Open **Journal & objectives**, read the objective/updates, then **Open guide** and Escape. Full Chronicle and Diplomacy remain accessible there.
3. Build/select a **Workshop**: inspect wood/planks, pause or prioritize through its existing controls. Review Employment to see the food tradeoff.
4. Build/select a **School**: read its actual teacher/pupil list and **View residents**. Zero pupils or no available teacher are valid states.
5. When an automatic decision arrives, open the compact notice and choose **Read later**. The notice retains the countdown/default. Pause and World map freeze it; minimizing does not.
6. Select a foundation to see its progress label; switch to Journal/People and back. Save/resume and confirm stock, shipments and the quiet opening survive.

No new art, audio, video, warfare, caravan system or broad economy rebalance is included.

## Final approved entry and saving flow (supersedes the earlier opening notes)

The owner approved New Game / Return to Game. New Game offers Enter city / Begin with the Advisor, then map-based village selection, then the existing seven videos on **every new game**, then the chosen village (Advisor opens afterward when requested). Return loads the newest valid browser checkpoint without videos. No replay checkbox or sign-up/password. One named profile is stored on this browser, with clear local-only wording.

Autosave every five minutes of active foreground play, three rotating autosaves separate from manual primary/backup checkpoints. Manual Save now and Export remain available. Return sorts validated manual/autosave candidates by actual save time and skips damaged candidates; no load mutates the city before validation. Starting a new game requires confirmation when existing saves are present, and preserves them until subsequent explicitly permitted autosaves rotate. Clear status reports the newest save and failures. Storage exceptions must preserve existing data and offer export. Cross-tab changes suspend automatic writes until the player chooses what to resume or save. Browser cleanup can remove these saves; downloaded exports are the portable backup. No schema change or external service.

## Owner opening feedback: camera, settlement and story

Keep v0.50: new games frame the actual starting Keep after title/map/video layout has settled, without moving restored cities. Reuse the existing painted survivors' camp for an unreinforced peaceful Keep, following its existing saved reinforcement state so normal saves need no extra flags/schema and the real paid reinforcement can reveal the castle. Footprints, starting stock and placement stay unchanged.

The seven existing clips become one coherent narrated opening. Five automatically paced prose passages bridge the short clips; subtitles remain short. Later house/market shots are explicitly hopes for the future, ending at a modest camp rather than promising a finished town. Optional Pause/Continue/Skip controls support slower reading; there are no route/supply/death choices or required story buttons. Pause timing while hidden, honour reduced-motion fades, and invalidate all delayed work on restore/replacement. No new media generation or purchases. The full original text is in STORY_V050_OPENING.md.
