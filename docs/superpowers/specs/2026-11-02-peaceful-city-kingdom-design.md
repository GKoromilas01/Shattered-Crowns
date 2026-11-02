# Version 0.7.0: Peaceful City & Kingdom Overview

Giannis approved a city-first game and two connected map views, then authorized independent implementation. Released base: c9b74a804fd9c050f42324b1f097a706b849a814 (v0.6.0). This milestone implements that foundation, not persistent multiplayer, detailed enemy cities or siege combat.

## Experience and scope

- Fresh games default to a peaceful city campaign. No enemy units or keep inhabit the home city, no hidden AI recruits consume local resources, and absence of a local enemy does not trigger victory. Keep the existing city dimensions, starting resources, resource nodes and friendly controls. Classic skirmish remains a visible selectable mode with its released AI and timers.
- A separate kingdom overview shows the home city, three original rival settlements, a village, roads, woodland and a river. Selecting a place shows its ruler, description, relations and trade potential. These are explicitly informational prospects, not working diplomacy, trade contracts or military commands.
- Open the overview from the existing Menu or by zooming out beyond the city's minimum zoom. A real Return to city button and Escape return to the exact camera position/zoom. The city simulation is suspended while the overview is open, without changing the user's underlying Pause setting. Restore focus on return. The detailed city remains the authoritative simulation.
- The overview shows city-readiness criteria drawn from the real economy: at least 16 residents; no displaced residents and road/water service for occupied homes; satisfaction at least 65; treasury at least 200 gold and three living combat units; measured food production at least demand with zero shortfall and four cycles of food reserve. Sustain all conditions for twelve five-second city cycles. These are initial balancing choices by Atlas, not claims of a proven ideal. Readiness is reversible and does not start an attack. Show exact progress and why criteria fail.
- State clearly: this version remains peaceful even when prosperous. Warfare and political-story systems are later milestones. Four calendar days of beginner protection is a future persistent-online proposal; no wall-clock expiry or offline simulation is introduced here.

## Approach

Chosen: two views sharing one city state, as approved by Giannis. Retain the inline HTML/JS packaging architecture and add one cohesive kingdom controller, not a rewrite or a huge always-running world. A single enlarged battlefield would undermine peaceful city building; a new networked persistent world is a separate project.

## Compatibility and safeguards

- Keep road drawing/cost/undo and unified Construction/Units controller unchanged. Preserve camera/fullscreen/minimap, all measured economy/service arithmetic, local checkpoint backup rules and release workflows.
- Classic mode keeps schema 1 saves and original 102 regressions (only their setup explicitly chooses the real classic scenario). Fresh campaign saves use schema 2 with validated campaign metadata: readiness-cycle count and selected kingdom location. v0.6 schema 1 saves restore as classic skirmish, paused. Invalid campaign state must fail before mutation. Campaign saves must not inject enemy entities or AI queues.
- Existing checkpoints remain protected on fresh start/restart. Starting another scenario requires explicit confirmation and does not erase browser checkpoints. Do not automatically convert old cities or strip enemy entities from their saves.
- Kingdom view is not restored as an open dialog; loaded city starts paused in city view. Inspection selection/readiness survive reload/resume/import. A new game resets campaign data.
- No paid services, external assets, backend or dependency changes. No merge or deployment until Giannis approves the tested PR.

## Verification

Chromium tests cover default peaceful startup, a long simulated opening, explicit classic behavior, readiness progress and reversals, view/camera/selection/placement/pause safety, responsive keyboard-accessible overview, real gathering and 3x3/6x6 roads in campaign, save/reload/import and schema-1 migration, corrupt campaign rejection, and scenario confirmation/cancellation. Retain original regression assertions and five deployment smoke journeys; add campaign smoke on the default source when supported, while current-live pre-release verification remains compatible with released v0.6.

Use real game engine adapters only in served test responses. Run source, exact packaged build and feature CI before PR. Independent whole-branch review, fix important findings, and run final regression verification. Report actual counts, artifacts and limitations.

## Authorized audio addition

Giannis subsequently requested worker/army selection sounds and gentle beginning ambience in this same version. Add one self-contained Web Audio controller with original synthesized cues and a quiet original chord progression; no third-party recordings, assets, paid services or dependencies. A future cinematic intro/epic theme is not part of this milestone.

Audio begins only after a trusted interaction, never before browser activation. Menu controls offer separate music/effects toggles, master mute and 0–100 volume, with safely validated browser-local preferences (not city-save data). Selection cues follow actual canvas selection or existing army/worker controls/hotkeys; silent restore and kingdom interactions must not issue city-selection sounds. Debounce rapid cues, bound/clean up voices, stop ambience while hidden and resume appropriately. Missing Web Audio, denied storage or resume failure must not break gameplay.

Automated Chromium verification checks real AudioContext activation and output signal, worker/army cues through actual controls, mute/volume and persisted settings, unsupported/storage-denied behavior, responsive Menu controls and unaffected city state. These tests verify audio routing and signal, not subjective quality or physical speakers. Finish the current source run as pre-audio evidence, then rerun the complete expanded suite after audio review.

### Authorized start screen addition
Giannis requested a start screen with music and delegated its design. Reuse the existing first-visit welcome entry points: a full-screen original typographic title, Enter city, Advisor, and optional music preview. The city clock and gameplay hotkeys wait until entry; audio requires a gesture and respects browser sound preferences. Returning browsers retain the existing introductory-screen preference. No cinematic or external media dependencies. Verify keyboard entry, waiting clock, actual audio signal, and mobile/desktop bounds.

### Tower feedback addition
Giannis reported uncertain tower failures and overlapping UI. Preserve prices and geometry; expose missing-worker, current/required-resource, distance and blocked-plot messages in existing Construction details. Recheck affordability when confirming placement; invalid attempts never charge. Automated real map clicks cover failure and success, plus narrow-screen feedback.

### Visual exploration
The original art-direction concept delivered separately is a proof of visual direction, not an implemented renderer change. Preserve it and the founder's long-term proposals in docs/SAND_LABS_VISION.md. Production art conversion should follow founder feedback and performance checks in a separate milestone.
