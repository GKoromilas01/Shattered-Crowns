# Milestone 17 — World Expansion & Kingdom Identity

The atlas now contains six geographical regions, 16 kingdoms and 128 selectable settlements, eight per kingdom. Each kingdom has an original vector banner and motto, a history and myth, two named heroes, government/ruler identity and two recorded relationships. Settlement dossiers identify local purpose, history, geography, steward and starting availability.

World map → continent → Kingdom identity → settlement. The Marches still has its existing detailed terrain map and resource-guide bridge. The Kingdom identity control exposes all eight Marches locations; other kingdom cards open their dossiers directly. Relationship buttons lead to the other kingdom's identity. World/continent/kingdom breadcrumbs support returning without replacing the city.

Only **Marches home and Brookstead** remain available starts. All other locations are selectable for inspection. No remote economies, units, travel, wars, treaties, elections or rebellions are simulated. Politics is public fictional identity, not a player-belief questionnaire or a live political system. Pre-entry dossiers can return to the existing two starting choices; browsing during play never starts another city.

## Compatibility and provenance

The canonical catalogue retains `marches`, `cinder-coast`, `winter-crown` and the original five settlement IDs. A `legacyRealmId` links the 16 identities to the older historical reference material. Older archive/government sandbox menus are preserved as reference features; they do not define additional playable cities or expand the new canonical world count. New lore uses curated original names and kingdom histories with settlement-role descriptions; deeper individual stories remain future work.

World dossier selections are transient. The existing five-value saved `selectedLocation` whitelist, schemas 1/2/3, optional staffing fields and all city data are unchanged. Existing regional markers retain their saved-selection behavior. New captures identify v0.17.0. Restore/restart closes the atlas and clears transient identity browsing.

All banner/map artwork is inline original SVG; there are no external assets, dependencies or services. Kingdom maps illustrate relative locations using a common schematic terrain template; they are not 128 playable maps. Existing terrain/resource geometry, unit picking, roads, economy and audio remain intact. The small live-city visual refinement removes doubled shadows from harvestable trees; depleted stumps keep their contact shadows. Painter verification now samples every housing tier and worker/military variants.

## Verification and acceptance

Tests check exact counts, unique IDs/banners, nested immutability, parent/relationship links, only two supported starts, all 128 UI routes at phone/desktop widths, snapshot/camera preservation, keyboard focus, title entry and save restore. Phone continent controls have non-overlap/bounds checks. Existing atlas, economy, controls, regression and packaged smoke tests remain required.

Exact commit, CI results, screenshots and verified ZIP are recorded in the draft PR. Owner acceptance should assess readability, banner/lore appeal and clarity that inspection-only locations are not city starts. This increment establishes a broad world identity; it does not deliver world simulation or a full replacement of every city asset.

No M17 merge or production deployment is authorized. Alex independently reviews the draft PR before separate owner approval.
