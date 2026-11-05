# M17 — World Expansion & Kingdom Identity

Owner authorized implementation after M16 acceptance. Approach: extend the existing offline atlas, retaining its working Marches terrain and starting choices. A detached second atlas would duplicate navigation; a fully simulated world would exceed scope. Use original vector banners and curated fantasy identities, without new dependencies or paid assets.

Deliver a frozen world catalogue containing six geographical regions, 16 kingdoms and 128 settlements (eight per kingdom). Preserve legacy atlas IDs and the five existing Marches places. Reconcile the older 16-realm lore through documented legacy references, not by changing saved city IDs or historical menus. The three original atlas kingdom IDs remain stable. New world browsing is transient and never serialized as a new playable city.

World → continent → kingdom dossier → settlement dossier. Keep existing regional terrain and Return/Find city resources controls. Each kingdom has a distinct original banner/motto, history, mythology, two heroes, public government/ruler/relationship identity, geography and settlement list. Settlement descriptions distinguish location, local purpose and founding history. Politics is read-only lore, not live diplomacy or inferred player politics.

Only Marches home and Brookstead remain supported starts. All 128 locations are selectable for inspection; unsupported starts say so plainly. Browsing cannot start a scenario, issue orders, change economy, move the camera or modify saves. Existing selectedLocation behavior for the original five places remains; new selections stay outside the save model. On restore/restart, close the atlas and reset transient browsing.

Use one responsive atlas dialog with context navigation and cached DOM identity renders. Eight settlement markers must fit narrow viewports and have accessible text choices. Scoped HTML/CSS/SVG only; preserve live city art/cache, audio, roads, controls and all economy formulas. No full 3D, simulation expansion, new infrastructure or monetization.

Acceptance: exact catalogue counts and parent links, unique IDs/banners, useful nonempty identities; every settlement reachable through the UI; phone/desktop fit, keyboard focus preserved across refresh; paused/running/title/restore cases unchanged; comprehensive regressions, package smokes, CI, screenshots and draft PR. M17 remains unmerged and undeployed pending Alex review and separate owner approval.
