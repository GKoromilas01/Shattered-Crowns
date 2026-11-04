# Milestone 10 — Settlement Starts (scope preparation)

## Accepted baseline and authority

Giannis reported that the corrected v0.9.0 candidate works and asked to keep it, defer further changes to the next version, and continue without exhausting credits. PR #14 remains the separate review candidate at 5b3ab1558b1c9f7f68ccd91499a4c7cb807b8f3c. This branch is based on that candidate because it contains the accepted entry/map fixes; it depends on PR #14 and must not duplicate or merge it. No new runtime changes or release claims are made by this scope document.

## Proposed focused outcome

- Offer two real starting homes within Aurelia: the existing Marches home and a playable Brookstead village start. Each choice must initialize a real city, not merely change a label or inspection selection.
- Give the village a visibly distinct resource/settlement arrangement, explain its starting conditions, and preserve viable food, water, road access and defensive preparation. Keep the existing home as the unchanged baseline option. Exact starting balance is an implementation decision to validate, not an already approved numerical balance.
- Carry the chosen home through save/export/import/resume and map navigation. Reflect actual player ownership in the atlas without duplicate home markers or pretending that every preview village is simulated.
- New-game music starts enabled. Keep title silence and the in-game music control. Preserve master mute and chosen volume; do not erase effects/style preferences. Resolve previously saved music-off behavior explicitly during new-game initialization, not through unrelated clicks or every page reload. Restoring an existing city must preserve its identity and must not silently create a new village.
- Keep other continents/kingdoms clearly unavailable until they have real playable starts. One continent with two honest home choices is the first increment, not a claim of a complete inhabited world.

These are Atlas's proposed implementation boundaries under the user's delegation. Additional kingdoms, populated worlds, NPC governance, multiplayer/chat/forums, politics and sea systems remain later projects. No 3D conversion or paid services.

## Technical reconnaissance still required before runtime changes

The engine currently creates one fixed-size city and its resource nodes in init(). Campaign schema 2 stores only mode, readiness and inspection selection. Its world-layout validator and exact campaign keys must not be silently relaxed to smuggle in home metadata. Determine and document a versioned origin representation, with explicit migration/default-home behavior for v0.6 schema 1 and v0.7/v0.8/v0.9 schema 2 saves. Preserve strict invalid-save rejection and atomic restore.

The current map's `home` inspection ID is not a start-location identity. Separate those concepts. Verify how the chosen home changes the map's ownership/position and how old saved inspection IDs resolve. Avoid two map buttons representing the same player city.

Trace terrain rendering, node regeneration, starting camera, building proximity checks and 44-unit road snapping before choosing a village layout. Reuse the existing city/economy engine; do not build a second simulation. Review default-music/new-game behavior against the existing four-field browser preferences and trusted-gesture activation.

## Verification budget and acceptance

Use targeted failing-then-passing tests while developing. Run one final complete regression suite after implementation and focused review, then exact committed-source package verification and smoke tests. Repeat broadly only for runtime changes, failures or unresolved concerns. Do not rerun the unchanged v0.9.0 suite for this planning-only commit.

Acceptance requires both homes to be actually playable, resources and roads usable, fresh music behavior visible, chosen-origin persistence correct, all released save fixtures restored without data loss, no false home ownership, retained peaceful/classic rules and controls, screenshots, and a separately reviewed unmerged PR. Merge, deployment and spending require explicit approval. This scope is preparation; no v0.10.0 build is yet available.

## Subsequent opening-music feedback

The owner then requested audible opening music. This supersedes the quiet-title requirement only: begin after the first trusted title click/navigation key and continue the same context into play, with no preview button. Keep city suspension, explicit master mute/zero-volume and restored-city preference preservation. No zero-interaction autoplay guarantee is possible across browsers.
