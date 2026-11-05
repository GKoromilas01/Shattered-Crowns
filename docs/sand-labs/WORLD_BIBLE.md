# Shattered Crowns — World Bible v0.1
**Status: proposed canon framework; reconcile names and data against Milestone 17 before finalizing.** No fabricated historical canon is asserted here.

## World premise
An original fantasy world of connected continental regions and islands, in which villages grow into prosperous cities under diverse crowns. Trade, food, services, local loyalties and politics shape daily life. Mythology and heroes give places identity without forcing constant warfare.

## Scale and navigation
- Intended scale: **six geographical regions, 16 kingdoms and 128 settlements** across continents/islands, reflecting the Milestone 17 draft implementation and owner vision.
- World > region/continent > kingdom > city/town/village > settlement dossier.
- The world map must communicate coastline, waterways, distance and settlement type clearly.
- Browsing or inspecting a location is distinct from starting a fully playable city. Preserve the existing supported starts until a separate gameplay milestone implements more.
- Preserve save identifiers and previously supported city starts; do not derive stable IDs from display names.

## Kingdom dossier schema
Each of 16 kingdoms should eventually have:
`id`, `display_name`, `region_id`, `banner_id`, `motto`, `capital_settlement_id`, `government_type`, `ruler`, `geography`, `economy`, `cultural_identity`, `origin_history`, `mythology`, `named_heroes`, `relationships`, `architecture_palette`, `audio_motif`, `sources_and_status`.
All names, rulers, mottos, heroes and symbols must be original or cleared for commercial use. Distinguish confirmed canon from proposal.

## Settlement dossier schema
Each of 128 settlements should have:
`id`, `kingdom_id`, `region_id`, `name`, `type` (city/town/village), `map_position`, `terrain`, `resources`, `local_history`, `notable_people`, `banner_or_crest`, `steward`, `political_affiliation`, `starting_availability`, `playable_scenario_id_or_null`, `implementation_status`.
Dossier cards should explain **why to choose this place**, show its map context and clearly label **Explore/Inspect** versus **Play/Start**.

## Distribution and data integrity
- Exactly 16 unique kingdom IDs and 128 unique settlement IDs at the target scale; region distribution may vary with geography.
- Every settlement references a valid kingdom and region; every kingdom has a coherent capital or designated seat.
- At least one clear geographic identity per region (coast, mountain, woodland, plains, island, etc.).
- No duplicate or contradictory capital, banner, hero or ruler assignments without intentional lore.
- Validation should check counts, referential integrity, stable ordering, focus/accessibility, layout, performance and old save loading.

## Mythology, history and heroes
Each kingdom needs a short founding account, two or more traditions or legends, at least one memorable historical turning point, and distinctive notable figures. The Milestone 17 draft references 32 named heroes; confirm exact records at merge before declaring their stories canon. Mythology should be **fictional in-universe tradition**, not presented as real historical fact. Avoid direct borrowing of protected fictional worlds and characters.

## Politics: staged design
**Current/draft scope:** read-only political dossiers: government, ruler and relationships, helping the player choose a starting location.
**Future, separate approval:** loyalty, allegiances, diplomacy, elections, succession, rebellions, taxation and treasury mechanics. These should emerge from population, services and prosperity; do not destabilize the peaceful economy prematurely.
Political systems are fictional game mechanics, not endorsements of real-world ideologies.

## Heraldry and cultural identity
Original coats of arms for all 16 kingdoms; one motto per kingdom. Define clear emblem silhouettes, palette, banner geometry and meaning. Avoid appropriating existing coats of arms or merely recoloring copyrighted art. Allow settlement-level symbols only where they add clarity.

## Player journey
1. Open world map, view regions and navigable continent/island groupings.
2. Select a region; see kingdoms and contextual geography.
3. Select a kingdom; see banner, motto, myth, history, heroes, ruler and political profile.
4. Select a settlement; see location, type, resources, local identity and start status.
5. Start only if explicitly supported, otherwise inspect and return without a broken button or save mutation.

## Integration and acceptance
Use the actual Milestone 17 structured data as the source of current implemented names and locations once merged; this document is a **schema and editorial guide**, not a replacement database. Review with Atlas for data contracts, save compatibility, UI focus, world navigation and test coverage. Validate 16/128 records and supported starts. No lore expansion should silently alter economic balance, road behavior or gameplay controls.

## Editorial workflow
For each reference from Giannis: record URL, author, what it teaches, copyright/permission, original adaptation idea and status. Draft kingdom dossiers in small batches; Alex reviews coherence and rights, owner approves canon, Atlas integrates through tested PRs. Keep a changelog for canon revisions.

## Open owner decisions
Final world/continent names, tone of mythology, desired amount of political detail in the selection UI, visual references and which settlements become playable next. These are **not blockers** for creating the documentation foundation.
