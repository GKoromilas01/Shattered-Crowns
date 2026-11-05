# Milestone 16 — Playable 2.5D Visual Improvements

This is the first bounded playable visual proof, not a finished art overhaul. The approved fantasy concept remains the atmosphere target; the game still uses its existing Canvas 2D renderer and world coordinates.

- Cached, softly varied meadow ground replaces the repeated diamond texture. Coastlines, river, crossings and buildable terrain retain their geometry.
- Harvestable woodland has layered broadleaf canopies, coordinate-seeded palette variation, trunks and ground shadows. Resource amounts, collision and gathering are unchanged.
- Existing housing tiers gain shaded return walls, roof planes and timber braces within the existing drawing bounds. Tier requirements and footprints are unchanged.
- Workers have readable aprons and pouches; military units retain team colors and equipment with restrained cloth/belt details. Selection and orders are unchanged.

Faster rendering exposed a legacy delayed-camera race: startup/restart callbacks could overwrite a freshly chosen village or loaded save view. Delayed actions now belong to their original city identity, and Brookstead retains its engine-defined initial camera.

No new gameplay, settings menu, renderer dependency or external asset downloads. New art consists of original Canvas drawing code. Approved title artwork and audio are preserved. Save schemas and fields are unchanged; new captures identify v0.16.0, and earlier fixtures load normally.

## Acceptance

Compare the before/after screenshots at normal play scale, then build, gather, select units, lay roads and inspect the economy in the candidate. Art appeal needs owner/playtester feedback. The current proof does not replace every building/resource drawing, add elevation mechanics or deliver the fidelity of the concept illustration.

Regression coverage checks pure deterministic drawing, canvas-state isolation and unchanged saved simulation state during paused frames at 390/1440 widths. The full existing browser/economy/road/save/audio suites and packaged smoke journeys remain required gates. Exact results, source commit, performance measurements and download are recorded in the draft PR.
