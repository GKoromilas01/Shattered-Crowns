# Version 0.9.0 — The Living World

Milestone 9 continues from verified v0.8.1 (`a76e309`). The world atlas is a playable browsing layer around your existing city, not a second simulation or a multiplayer service.

## Explore the Marches

Open Menu → Kingdom map, or zoom out past minimum city zoom. The regional map now shows the Ironspine mountains, Sunvale valley, Willow River, Elderwood forest and western coastline. Original vector roofs and battlements distinguish a village, towns and castles. Select a settlement to inspect its ruler, character and possible future trade interests. These remain descriptions, not live trade contracts or simulated rival cities.

Three landmarks can be selected on the map or through the labeled list:

- **Highpass Gate:** the upland road through the Ironspine.
- **Willow Ford:** the crossing toward Ashford.
- **West Beacon:** a reference point on the western coast.

Landmarks explain the terrain without granting resources, ordering troops or teleporting the city. A visible key explains marker sizes and symbols; selected places have both visual and accessible pressed states.

## Look beyond the kingdom

Choose **World overview** inside the atlas, or open it directly from Menu. Inspect **Aurelia**, **Emberreach** and **Frostward**, then select a kingdom. Aurelia's Marches opens the existing regional map. The Cinder Coast and Winter Crown are explicitly marked future regions; inspecting them leaves your city and governor unchanged. **Aurelia · The Marches** returns directly to the home kingdom; **Return to city** or Escape returns to the current city.

`scWorldAtlas` is a recursively frozen catalog with stable continent, kingdom, settlement and landmark IDs and parent relationships. This prepares later continent/kingdom/village onboarding without introducing a new save format or pretending that onboarding is already implemented. World browsing and landmark inspection are transient. The five previously saved settlement IDs are unchanged. Restoring a city or starting a scenario closes and resets the atlas browsing state.

## Preserved behavior

The atlas uses the existing modal lifecycle: simulation and camera input suspend while it is open; underlying Pause, camera/zoom, unit selection and orders return intact. Browsing cannot issue city hotkeys. Focus survives periodic readiness updates and returns to the original control on exit. The Return button stays in the sticky heading on smaller screens.

City construction, 3×3/6×6 roads and undo/costs, measured economy, peaceful mode and classic skirmish, saves/checkpoints/import, opening screen and approved music remain. Only release metadata becomes 0.9.0; existing schema 1/2 saves remain compatible. No new dependencies, network assets, backend, paid services or 3D engine.

[Verification and screenshots](validation/m9-verification.md). Real hardware and Windows listening evidence remain separate from Linux browser tests. No merge or deployment is authorized by this milestone.
