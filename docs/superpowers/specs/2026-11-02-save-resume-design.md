# Version 0.6.0: Save/resume and longer-session reliability

Giannis chose save/resume and longer-session reliability for the next version. Base: released Milestone 5, 1540fd1ec0e66176ab4e8f6465a7cd3d55940d7e. Work independently on feat/save-resume; no merge or deployment without approval.

## Approach

Use a versioned JSON checkpoint of the existing simulation, stored locally with one previous-good backup. The same format can be exported/imported as a file. A city-only snapshot would lose armies, gathering orders and raid timers; a server/cloud service adds unnecessary accounts and operating costs. The chosen approach keeps the existing single-page/static-site architecture and all game mechanics.

## State fidelity

Save resources, food/trade, population, houses/occupancy and evolution timers, economy clock, measured ledgers, satisfaction transitions, growth, prosperity, enemy resource balances, combat/AI clocks and queues, nodes, alive units/buildings, combat stats, formations/stances, medic/festival cooldowns, civilian policies, selected objects, control groups and safe undo history. Encode entity/node references by ID/index and rebuild references in two passes. Preserve reinforced Keeps. Clear transient projectiles, floating text, drags and armed placement on restore. Restore camera center/zoom and pause; no offline catch-up or instant economy ticks. Unseeded future random choices need not reproduce identical future unit positions.

## Validation and safety

Format/schema/map versions are explicit. Reject unknown formats/versions, oversize input (1 MiB), excessive collections, invalid types/numbers/IDs, duplicate entities, broken active references and unsafe text/prototype keys before touching the running city. Reconstruct canonical state using known fields only. Stale undo references to destroyed buildings are legal and retain the existing safe-refund guard. Check an integrity checksum for accidental file corruption; it is not an anti-cheat/security signature. Validate before changing storage or simulation. Invalid imports leave both the running game and checkpoints intact.

Local storage writes keep a previous valid checkpoint, never copy corrupt data over a good backup, and rely on atomic setItem. Failed primary writes attempt backup rollback; if recovery writes are also denied, the latest checkpoint stays safe and the warning states the backup limitation. Other-tab writes pause autosave with a visible Menu indicator. If the latest checkpoint is corrupt, resume can use the previous valid one and explain recovery. Storage failures are visible and recoverable; export/import still work in memory without storage. Never silently clear saves. A fresh page does not auto-load. A prior checkpoint is protected until explicit resume/import or Save current city. Autosave is enabled for a fresh city with no prior checkpoint and after successful manual save/resume/import; every 30 simulation seconds and on leaving, without saving a finished defeat automatically. Restarting creates a new city identity and protects the prior checkpoint until the player explicitly saves the new city.

## UI

Reuse Game Menu for Save city, Resume saved city, Export save and Import save, with a compact saved-at/status description. No new toolbar, mandatory popup, global hotkeys, or control handler. Restore always pauses and clearly tells the player to resume. Existing menu remains scrollable/usable on narrow viewports; current save status uses textContent. Ration policy restoration reuses existing handlers, including the automatic policy's hysteresis state. Camera/UI integration calls existing APIs rather than adding competing navigation/controllers.

## Evidence and release

Retain all 84 regressions and release guards. Add Chromium cases for resource/house/service/food fidelity, orders and ID references, queues/undo/control groups, policies/cooldowns, camera and pause, reload/resume, file portability, corrupt/unknown/oversize saves, storage failure, backup recovery and protected previous cities. Run at least ten simulated minutes with save/restore in the middle and continued economy conservation (defensive fixtures may isolate long-session persistence; existing real-resource opening remains unchanged). Capture screenshots/errors; zero uncaught exceptions. Run local full suite, reviewed fixes, exact packaged smoke, feature CI before PR, and PR checks. No paid services, production settings or deployment changes.
