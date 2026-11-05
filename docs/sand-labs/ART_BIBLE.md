# Shattered Crowns — Art Bible v0.1
**Status: proposed art direction, pending owner reference review.** This is a practical production brief, not a claim that a full graphics engine or all assets exist.

## Experience target
A readable, original, warm fantasy medieval **2.5D isometric city builder**, with the city-building clarity of classic management/RTS games and a distinct Shattered Crowns identity. Economy, prosperity and village life are the visual focus; war is occasional. Avoid copying another game's distinctive artwork, interface, emblems or names.

## Visual pillars
1. **Readable at play scale:** building function, roads, resource states, workers and selected units remain identifiable at common desktop/mobile viewport sizes.
2. **One world:** consistent perspective, proportions, shadows, palette, materials and line treatment across all assets.
3. **Living settlements:** farms, markets, wells, houses, fishing and workplaces communicate activity without visual noise.
4. **Progressive richness:** four housing tiers visibly evolve; wealth, staffing and services have restrained visual cues.
5. **Original fantasy identity:** banners, architecture and terrain express each kingdom's culture without real-world heraldic copying.

## Existing technical baseline
The playable renderer is browser-based Canvas 2D with 2.5D drawing. Milestone 16 introduced a playable visual proof: terrain variation, trees, dimensional houses and detailed units. This is **not** a full new engine. Preserve game camera, fullscreen, drag/selection, 3×3 road behavior, build placement, UI legibility, economy arithmetic, save compatibility and mobile performance.

## Style rules for proposed assets
- Camera: consistent isometric projection and anchor points; never change gameplay hitboxes as a side effect of a visual change.
- Silhouette first: distinguish house, granary, market, bakery, well, tower, fortress, healer and production sites at normal zoom.
- Relative scale: workers and soldiers comparable; important civic buildings recognizable without dwarfing houses; roads remain usable and continuous.
- Materials: coherent wood, stone, plaster, thatch and fabric language. Weathering and ornament increase with tier and wealth.
- Lighting: stable light direction, restrained contact shadows, no duplicate tree shadows; selection outlines remain visible.
- Terrain: grass, woodland, hills, rivers, shore and water transitions should support building rules and accessibility, not obscure them.
- Color: use a shared limited palette and sufficient contrast; kingdom color should be identifiable without relying only on color.
- Motion: small idle and work animations, readable even when muted; no unnecessary screen shake or heavy effects.
- UI: clear construction costs, tooltips, kingdom dossier hierarchy, breadcrumbs and accessible focus; avoid overlapping windows.

## Production asset specification
Each proposed asset entry must have: ID, category, kingdom/biome variant, function, reference source, dimensions/anchor, orientation, animation states, layer/sort order, palette, license, optimization budget, owner approval, and screenshot/test evidence. Keep original editable source and export separately. No unsupported AI-generated asset should be assumed production-safe.

## Prioritized art work
**A. Next:** align civic buildings, housing tiers, workers and terrain to one style; remove visual inconsistencies; test river/road/tower readability.
**B. Later:** distinct kingdom architecture kits, settlement portraits, biome transitions, market activity, restrained particle/weather cues.
**C. Deferred:** major renderer rewrite, full 3D migration, cinematic character animation and expensive pipelines unless separately approved.

## Audio companion direction
Preserve approved gentle original ambience. Future selection feedback may mix natural tool/armour sounds with *occasional brief spoken replies*; use restrained volume, cooldowns and user mute settings. Audio should not obscure UI feedback. Record commercial rights and provenance.

## Quality gates
Compare before/after screenshots at representative zooms, mobile and desktop; cover all housing tiers, civic structures, workers, soldiers and archers, selection overlays, river crossings, construction placement and long-running city performance. Maintain existing automated tests and record measurable frame-time results. New art must not imply a feature exists when it does not.

## Reference review queue
Await user-supplied example sites and images. For each, capture **what is admired** (shape, mood, readability, material, layout), **what to avoid**, and **rights**. Owner approves the consolidated style sheet before mass asset generation or purchases.

## Acceptance for Art Bible v1
Owner-approved moodboard; visual tokens and sample building/unit sheets; one integrated playable test scene; performance comparison; provenance and commercial-use review; Atlas technical feasibility review. This document alone does not authorize new tooling costs or production deployment.
