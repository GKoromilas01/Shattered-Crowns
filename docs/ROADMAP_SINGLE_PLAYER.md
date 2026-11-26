# Shattered Crowns single-player roadmap

The owner approved this direction on 26 November 2026. Start each version from the latest verified source on `main`. The v0.66 merge is the baseline for this roadmap. Confirm the current deployment separately.

## The first complete game

One city grows from a survivors' camp to a regional power. The player survives the first winter, earns a town charter by sustaining the settlement and fulfilling a trade agreement, faces a rival's demands, and resolves a final crisis at the crossing. Defenses, trade promises and alliances open different ways through the crisis. A decisive outcome and a short epilogue show what the city's choices cost and earned. Offer optional free building after the ending. Aim for a 60–90 minute first campaign, then adjust after playtesting.

Single-player sets the priorities. Multiplayer will have separate goals, rules and balance in a later roadmap. Useful design precedents include Stronghold's link between economy and defense, Anno 1800's growth through meeting needs, Against the Storm's explicit objectives and Frostpunk's final crisis. Use original Shattered Crowns scenarios and assets.

## Version index

The numbers below are proposed planning slots. Each linked Markdown file carries the proposed scope and a player check. Before implementing a version, record its approved scope, verified starting commit, assets and budget, save compatibility, and open questions in that brief. After implementation, add the tested commit, verification results and next owner action under the same brief.

| Version brief | Proposed focus | Player check |
| --- | --- | --- |
| [v0.67.0](versions/v0.67.0.md) | Reliable camera return and bridge routing, with one original river gate and bridge visual proof. Triage stuck units and video pacing alongside this work. | Finish or skip a building scene and return to the city. Order units across the bridge and see them follow it. |
| [v0.68.0](versions/v0.68.0.md) | Survivors through charter. Visible campaign objectives, autumn harvest and winter reserves, and a meaningful trade commitment. | Earn a charter and see the city advance through an achievement. |
| [v0.69.0](versions/v0.69.0.md) | The rival city. A credible demand, visible preparations, and routes to seek allies, bargain or defend. | See an earlier trade or defense decision unlock a distinct response. |
| [v0.70.0](versions/v0.70.0.md) | Playable campaign from camp to the Battle for the Crossing, with victory, defeat and an epilogue. | Complete the campaign and identify an earlier choice that affected the ending. |
| [v1.0.0](versions/v1.0.0.md) | Release the first complete single-player game after onboarding, pacing, balance, accessibility and save compatibility are verified. | A new player can follow the goals from camp to an ending. |

## Graphics target

Use the owner's [four screenshot examples](GRAPHICS_REFERENCE_BRIEF.md#strategy-game-screenshots-supplied-26-november-2026) as the visual target for the map and game. Aim for elevated perspective and depth, readable stone fortifications and bridges, natural banks and paths, grounded character scale and shadows, and legible formations. Design original architecture, heraldry, portraits and interface elements. The screenshots are visible in the owner conversation. The source image files still need to be added to the reference collection.

Use the [cinematic references](GRAPHICS_REFERENCE_BRIEF.md#cinematic-screenshots-supplied-26-november-2026) for cutscene framing and carry the same materials, landscape and lighting into the playable world.

Start with one playable river-gate scene in the current renderer. Judge it at normal play zoom with real movement and crossing orders. Evaluate a larger renderer project after that test. The historical estimate is 420–840 Leonardo tokens for 6–12 still generations, based on the logged rate of 70 per image. Check the current rate and get owner approval before spending credits on art, music or video.

## Continental starting villages and music

Each continent's starting village should have a distinct cultural identity. Express it through architecture, visual arts and paintings, religious traditions and spaces, poetry, literature, customs, and music. Begin with one playable starting village per continent as regions are added. Later villages on the same continent can share architecture and traditions while varying their banners, leaders, proverbs and music.

The owner's inspiration list is Aztec, Indian, Persian, Roman, Greek, Arab, Egyptian, Ottoman, Gaulish, African, Spanish, Visigothic, Gothic, and Viking. Use these as inspiration for original fictional regions. Choose specific periods and traditions when designing a region, especially for the broad Indian, Arab and African references. Keep Visigothic and Gothic as separate entries in the inspiration list pending that research. The list does not set a release order or map every inspiration to a separate continent.

Plan one new original anthem for every version. Use its music to establish the identity of the featured village or culture. Ask the owner before any new Leonardo.ai anthem generation, with the proposed style and an estimate of the credits. Record the approval and track details in the version brief and asset log.

Add new owner direction to this roadmap as it arrives. Carry the relevant details into the affected version brief, and record what was implemented and tested for Claude at the end of each version.

## Progression and later work

- Earn city stages through visible achievements in the settlement. Plan six Keep appearances over time, with three meaningful stages for the first campaign. Use the existing three-look upgrade pattern for ordinary buildings where it adds a visible benefit. Tie benefits to staffing, education or production.
- Add spring recovery and summer trade when they change decisions. Keep upgrades available when their requirements are met, regardless of season.
- Prioritize the remaining usability reports: disabled plank sale feedback, expandable House details, staged road connection inside the building panel, and a short shipyard queue for fishing, trade and war vessels.
- Expand after the first complete campaign with distinctive regional starts, naval trade and blockades, crew recruitment, diplomacy and siege logistics. Add court and cultural scenes, festivals, theatres, music and regional identity gradually. Use [content](ROADMAP_CONTENT_2026-11-23.md) and [art and systems](ROADMAP_ART_AND_SYSTEMS.md) roadmaps for the longer backlog, and [growth and war](DESIGN_GROWTH_AND_WAR.md) for related design.
