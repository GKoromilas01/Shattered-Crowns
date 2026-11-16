# World map (v0.29 work in progress)

A fictional world map replaces the hand-drawn atlas background. It is **not** Earth.

- Image: `assets/v029/world-map.webp` (2688×1536). It is also embedded as a data URI in `index.html` (`worldMapData`) because the release publishes only the single-file bundle and tests serve only `index.html`.
- Generator: `tools/worldmap/gen_world_map.py <seed> <out.png> <scale>` (numpy/scipy/PIL; seed 21, scale 2 gives the shipped image). It also writes a `_masks.npz` terrain file.
- Placement: `tools/worldmap/place_settlements.py` reads the masks and writes `assets/v029/placement.json` (continent crop boxes, land polygons in crop-local percent, 128 settlement positions with biome and resource levels 1–4 for timber, stone, game, fish, farmland).
- Game: the atlas world view draws the image; each continent view shows a crop of it; `s.continentPosition`, `s.biome`, `s.resources`, `s.resourceNote` come from `placement.json`. Clicking towns, banners, history and dossiers are unchanged. Kingdom (region) view art and `atlasPosition` are unchanged.
- Six continents and 16 kingdoms × 8 settlements are preserved. Resource levels never drop below "scarce" (1). Desert (Emberreach) has oases with wood, rocky mesas with stone, and the most game.
- Resource profiles are currently **descriptive atlas information only**; they do not yet change city deposits. Playable origins keep their existing starts. Hooking profiles into city generation is a later task.
- Known polish left: desert tone is a bit dull, rivers are faint, settlement placement is greedy per kingdom cell.
