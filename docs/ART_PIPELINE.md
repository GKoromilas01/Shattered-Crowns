# Art pipeline - keeping graphics swappable

Goal: upgrading to high-quality art later should be a file swap, not a rebuild (owner decision, 2026-11-18).

## Rules for every new image
- One palette (docs/ART_DIRECTION.md). One camera angle: three-quarter top-down, light from top-left.
- Units: 64x64 px sprite cell at 1x, transparent background, feet on the bottom-centre pixel. Buildings: footprint-aligned, base centred on the bottom edge, width a multiple of 32 px.
- Portraits: 512x512, shoulders-up, parchment-toned background.
- Cut-scene stills: 1280x720.
- File names: `type-name-variant.webp` (e.g. `unit-archer-idle.webp`, `building-market-l1.webp`).
- Log generator, plan, privacy mode, date in docs/ASSET_LOG.md. Defining assets only on a paid plan with Private Mode.

## Later engineering step (not yet done)
Move embedded base64 images out of index.html into `assets/` files referenced by a manifest, so a new art set replaces files only. Target: around v0.40, when buildings and units are final and paid-plan art is generated in one batch.

## Current stand-in
v0.34 milestone story cards draw their pictures with canvas code in the game palette. Real cut-scene stills (1280x720) will replace them card by card.
