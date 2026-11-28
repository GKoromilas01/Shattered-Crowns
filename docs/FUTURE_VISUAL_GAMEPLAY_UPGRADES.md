# Owner direction — next graphics and gameplay upgrades

28 November2026. Owner wants a substantial visual/gameplay improvement, approaching the quality of other-game images previously supplied: larger/readable buildings, a zoomable map, richer scenery and more gameplay. These are general directions for subsequent versions, not permission to buy unknown assets or claim a renderer rewrite is already delivered. Media integration0.70 is the current concrete deliverable.

## Available references
Read GRAPHICS_REFERENCE_BRIEF.md, ART_DIRECTION.md, ROADMAP_ART_AND_SYSTEMS.md and docs/visual-concepts/city-art-direction.png. The stored material describes materials, working harbours, stalls, streets and clear silhouettes. The concept is an original illustration, not a screenshot of the game. Exact screenshots of the other named/reference game were not located in this workspace; do not pretend we rechecked them or infer that game's identity. Ask owner to resend those when choosing the actual visual target. Use references for quality/scale, not copied buildings or layouts.

## Recommended sequence (proposals, not built)

### First: scale, camera and a representative city scene
- Larger, individually readable buildings at normal desktop zoom; tune footprints/spacing together, rather than stretching sprites into each other.
- Smooth zoom anchored under the pointer, an obvious reset/fit view and stable pan speed. Hit-testing, placement ghosts, selection rings, road connections and minimap coordinates must stay aligned at every zoom.
- Coherent ground contact, shadows, tree/building depth order, shore/water transitions and road entrances, using the current original painted assets.
- Demonstrate one real playable small district before converting every building. Compare normal and closer views at1366×768; no mobile work currently requested.
- Acceptance: selecting a building/placing a road still works after zoom/pan, larger buildings do not overlap illegibly, soldiers/workers remain visible, and the representative district meets an agreed screenshot target.

### Second: a more active settlement with consequential economy
- Reuse native production chains to add visible supply/demand goals and trade-offs, not decorative counters.
- Add a small set of production/market/defence objectives with clear rewards/costs and recovery from shortages.
- Villager work/transport detail should correspond to real tasks; no fake crowd that hides broken staffing.
- Consider differentiated building upgrade benefits only after the baseline map/zoom stays reliable.

### Third: defence and expansion
- Clear threat warnings, useful unit formations/defend/patrol orders, repair/recovery and meaningful costs for expeditions.
- Add one new strategic choice per version—such as supply-aware outposts or a regional commission—rather than an unbalanced batch of systems.
- Victory parade celebrates earned defence; it does not create resources or invent a victory.

## Narration follow-up
Owner asked for spoken voiceovers for every video subtitle. No recorded narrator files were among these seven ZIPs. The four films include MP4 audio streams, but this does not prove they narrate the game text. Runtime films remain muted under the game playlist. Natural narration needs a short reviewed voice sample and timing/mix/skip/mute handling before full generation. Do not substitute system/computer speech without owner choosing that quality. No voice API or paid generation authorized at an unknown price.

## Handoff
Carry this direction forward in Claude/other-AI handoffs. Before the actual graphics version, agree a bounded design and inspect the specific reference screenshots. No need to ask again whether the owner wants better graphics; that preference is explicit. Decide implementation details using the native architecture and show a concrete representative result.
