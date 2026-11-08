# M18 — Governors & Living World Maps

Owner-authorized incremental implementation. Base is merged M17 `46d318857386a2da0df917a6e5479356648d1740`. PR23 (`7cd756cda14cfd387d8dd6014ec331779d3dbb0d`) is proposed documentation, not merged canon; read its three bibles as guidance without copying its files, renaming M17 data or merging it. Keep all16 kingdoms/128 IDs. No other open runtime PR at start.

## Bounded scope

Add three carefully selected starts alongside unchanged Marches home/Brookstead: Thornmere (`briar-3`, forest village), Datehaven (`saffron-3`, dryland village sustained by wells), Bell Shoal (`stormhaven-2`, coastal town). Use existing simulation/buildings and fixed local world dimensions. Different curated sites, stocks, population, deposits and buildings; no new economic rates, terrain collision system or simulated remote cities. New art/palettes must reflect actual starting conditions without pretending decorative terrain blocks construction.

Preserve old schemas1/2/3 and exact old-origin capture behavior. New starts use schema4 with a validated supported origin ID, referencing the same static scenario profile used by initialization and governor presentation. Unknown IDs and impossible skirmish/origin combinations reject atomically. New-origin saves needv0.18+; old saves still load unchanged. Keep all location IDs stable; new browsing remains transient. No silently converting an old city to a new start.

Extend the existing native-radio chooser with five clearly described starts. World dossiers offer an explicit route to a supported start choice; during play, replacing a city requires the existing confirmation safeguard. Merely inspecting any location never starts a city. Governor identity uses the actual origin profile and canonical kingdom/banner, including after restore. Keep political systems informational.

Replace schematic repeated kingdom maps with deterministic regional terrain variants and illustrated building clusters; add a continent-map stage showing naturally placed kingdoms and settlement miniatures. Six distinct land/rivers/forest/mountain/island compositions, stable coordinates and original inline SVG. Maps can pan within the atlas independently of the live city; text kingdom choices remain available. No random placement on each render, obscured labels, decorative oceans used as buildable town sites or new global camera behavior. Reuse the existing dialog/hierarchy/return controls.

Preserve the M16 live renderer and update only new-origin palettes/vegetation where appropriate. Keep roads, gathering, staffing, production formulas, units and selection geometry unchanged. Original art only, no asset purchase or full3D/renderer rewrite.

Evaluate preview0828199's verified bowed-string implementation as a third optional music style; keep the approved default city theme and original ambience unchanged. Reuse its tests and code, not a second competing implementation. City Life overlap remains unconfirmed: add focused evidence, not speculative layout changes.

## Acceptance

Every new start is reachable and actually playable, has resources/deposits/valid layouts, food/workforce feedback and matching governor identity, and round-trips its save. Existing starts and old fixtures remain unchanged. All128 locations remain inspectable; only five supported starts. Test inspection vs start confirmation, title/keyboard/focus/restore, geometry/marker bounds, distinct geography, independent atlas pan, roads/Undo/fullscreen and economic regression. Screenshots, one fresh review, exact-head CI and packaged five-smoke candidate. No M18 merge, deployment or spending without separate approval.
