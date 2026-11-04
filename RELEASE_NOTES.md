# Release notes

## v0.11.0 — Village Steward

- City Life → Village shows actual idle/gathering map workers, gathered resources and remaining/recovering deposits.
- Select idle workers without disturbing busy orders; locate the active deposit nearest your Keep and use existing right-click gathering controls.
- Village needs link measured food shortages and current housing, staffing and service gaps to existing details.
- Preserve economy balance, audio, roads, controls, peaceful/classic modes and save schemas1/2/3, including a genuine v0.10village fixture.

Draft dependent on PR15; no merge or deployment authorized. See [Milestone11](docs/MILESTONE11.md).

## v0.10.0 — Settlement Starts

- Opening music begins with the first title click/navigation key and continues into play, with no preview button. Master mute/zero volume and restored-city sound choices remain respected.

- Choose the unchanged Marches home or a real Brookstead village with its own starting arrangement and farm/house/well/roads. Map inspection never commits the choice.
- Village saves use strict schema3 origin metadata; old schema1/2 checkpoints restore unchanged. Only the actual home is marked yours in the atlas.
- New games enable music while preserving master mute, volume, effects and style. Restoring a city or using maps does not reset sound choices.
- Preserve peaceful/classic rules, city economy, controls and roads/costs/undo. No paid services, multiplayer or production release.

See [Milestone10](docs/MILESTONE10.md) and [verification](docs/validation/m10-verification.md).

## v0.9.0 — The Living World

- Owner-playtest follow-up: removed opening music preview; added a starting-home guide and pre-entry world inspection, plus visible World map and Music on/off controls in the city. Music begins on actual entry when enabled.

- Replaced the sparse kingdom terrain with original inline mountains, valley contours, forest, river and coastline, plus distinct village/town/castle markers.
- Added Highpass Gate, Willow Ford and West Beacon as inspectable geographic landmarks, without travel orders or resource bonuses.
- Connected Menu/world/continent/kingdom/city navigation; three continent and kingdom records prepare later governor selection. Only the Marches is playable; future regions are clearly labeled.
- Preserved city simulation, peaceful mode, economy, roads/undo, controls, opening/music and schema 1/2 saves. World browsing never replaces a city. No backend, 3D conversion or paid infrastructure.

See [Milestone 9](docs/MILESTONE9.md) and [verification evidence](docs/validation/m9-verification.md).

## v0.8.1 — Opening, Construction & Music Polish

- Construction/Units commands retain the 88px HUD and show complete cards with visible previous/next controls, including native Windows-style scrollbars. Wheel, touch and keyboard scrolling remain available.
- The illustrated title appears before engine UI, covers the city until entry and waits for initialization; page reloads also start at the title. The approved city illustration is embedded title art, while gameplay retains its existing renderer.
- Added an original sixteen-bar melodic city theme with soft plucked accompaniment, bass and harmony. Menu → Sound offers the original gentle ambience too; style persists separately from existing volume/mute/music/effects preferences.
- Preserved roads, costs/undo, game controls, scenarios, save formats and safeguards. No dependencies, external media requests or licensed recordings.

See [v0.8.1 notes](docs/POLISH081.md) for previews and verification.

## v0.8.0 — City Planning & Economy Clarity

- City Life now leads with measured food balance, housing, staffing and home-service summaries. Food production minus demand, reserve change, shortages and overflow are labeled separately.
- Keyboard-accessible section navigation and Locate actions help find the next planning problem while retaining current zoom, Pause, selected units, orders and armed construction.
- Live updates preserve focused section/Locate controls and expanded details; responsive cards use the existing green/cream/gold palette.
- Fixed stale opening-music preview state and unavailable-audio interaction without changing the approved ambience.
- Existing controls, roads, peaceful/classic modes and save formats remain compatible. No simulation balance, dependency, deployment or release-approval changes.

See [Milestone 8](docs/MILESTONE8.md) for exact meanings, verification and limits.

## 0.7.0 — Peaceful City & Kingdom Overview (proposed)

- Fresh cities are peaceful: rival castles live on a separate informational kingdom overview. Classic skirmish remains selectable in Menu with its existing AI and raids.
- Open Menu → Kingdom map or zoom beyond the city minimum; inspect settlements and return to the same camera/Pause setting. The overview suspends simulation and isolates city input.
- Measured readiness goals explain food reserves, housing, happiness, treasury and defenses. Sustained prosperity never schedules an attack; campaign warfare is a later milestone.
- Campaign schema-2 saves retain readiness and settlement selection; released schema-1 files restore as classic games without conversion. Existing checkpoint protection and backup safeguards remain.
- First-time visitors get a keyboard-accessible title screen; the city waits until entry. Original gentle ambience and distinct worker/army selection cues have independent music/effects, mute and volume controls in Menu.
- Defense placement explains workers, resources, range and blocked plots visibly, and rechecks resources at confirmation to prevent overspending after choosing a tool.
- Original regression assertions and road/controller code are retained; new Chromium scenarios cover peace, migration, navigation, keyboard/mobile controls, readiness and import/reload. See [Milestone 7](docs/MILESTONE7.md).

## 0.6.0 — Save/Resume & Session Reliability

- Save the running city locally and resume it after reload; export/import a portable JSON save through the existing Menu. Restores pause the game and clear armed placement.
- Session data includes economy/history, services/happiness, armies/orders, AI clocks, queues, control groups, undo, reinforced Keeps, cooldowns, policies and camera. Existing game rules and controls are retained.
- Versioned bounded validation rejects corrupt/incompatible data before changing the city. Checkpoint rotation preserves a previous valid save and recovers from a damaged latest copy.
- Fresh/restarted cities protect prior checkpoints; other-tab saves pause autosave and mark Menu for attention. Storage failures preserve good data and allow portable file use.
- Chromium coverage includes real reload/file UI, policy restoration ordering, reference identity, storage denial, backup recovery, narrow layouts and ten simulated minutes with a mid-raid save/restore. See [Version 0.6.0 notes](docs/MILESTONE6.md).

## 0.5.0 — Milestone 5: City Services & Citizen Happiness (proposed)

- One service resolver explains water, healthcare and market reach, staffing, road access and empty food reserves. Working providers take precedence over nearer inactive ones.
- Happiness now approaches an explained 0–100 satisfaction target by at most two points per five-second cycle. Actual residents, food fulfillment/reserves, services, employment and existing amenities determine the factors. Existing meal policies modify the target; paid events retain their explicit bonuses.
- Existing housing, migration and prosperity respond to the same service and happiness state. City Life and selected-building feedback explain blockers and recovery; Advisor stays optional.
- Existing food arithmetic, controls, roads/refunds, prices, staffing priorities and settlement grace are retained. Feature pushes now run read-only verification before a PR; main-only approved publishing and rollback safeguards remain unchanged.
- New Chromium coverage includes a complete five-minute service shortage/recovery, bounded satisfaction, service boundaries and fallback, staffing, policies, pause/reset and narrow UI. See [Milestone 5](docs/MILESTONE5.md).

## 0.4.0 — Milestone 4: Living City (proposed)

- Measured producer harvest, logistics, bakery inputs/output/exports and household consumption shares reconcile with the existing food reserve.
- Selected-building feedback and City Life explain staffing, coverage, housing blockers and next actions. Advisor prioritizes actual shortages, idle production, broken supply and unemployment.
- A five-minute normal/easy settlement grace (three minutes on hard) supports early city growth; existing costs, rates, roads and Construction/Units controls are preserved.
- Narrow layouts keep Pause, menus, minimap and commands accessible. Chromium regressions cover the new feedback, broken supply and a five-minute opening from original resources.
- Existing protected release, smoke and rollback safeguards remain unchanged. No merge or deployment is authorized by this release note. See [Milestone 4](docs/MILESTONE4.md).

## 0.3.0 — Milestone 3: testing and release safeguards (proposed)

- Preserves the exact Milestone 2 game, including all roads, camera, economy and menu code.
- Reproducible Node 24 / Playwright 1.57.0 tests, automatic pinned Chromium setup, structured reports, screenshots and retained failure traces.
- Required PR verification, staged artifact smoke and read-only deployed Pages smoke. The existing 28 regressions remain intact.
- Explicitly approved, protected Pages publishing from successfully verified main candidates. Artifact checksums are bound to committed source, not merely self-reported metadata.
- Pre-fetched verified fallback and automatic restoration on publication or post-release smoke failure. Durable stable assets are archived as GitHub Releases; rollbacks do not depend on Actions artifact retention.
- Release provenance and documented protection activation, rollback, issue handoff and autonomy boundaries.

Activation requires approval, merging this PR, configuring Pages Actions hosting and production reviewers. No production setting or deployment is changed by this PR itself. The legacy in-game version badge is deliberately unchanged; release.json identifies the pipeline release.

## 0.2.0 — Milestone 2 baseline

City Life & Economy, squash merge `831da5cfbcc1d94fe6d26c289084bdc5d94f4ab4`. Twenty-eight Chromium regressions passed. This immutable game version is the explicitly pinned first-release fallback. See [Milestone 2](docs/MILESTONE2.md).
