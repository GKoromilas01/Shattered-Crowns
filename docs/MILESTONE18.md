# Milestone 18 — Governors & Living World Maps

Five peaceful governor starts now connect the title chooser, atlas dossiers and actual playable city. Existing Marches Landing and Brookstead remain available. New choices are Thornmere (Briarwatch woodland village), Datehaven (Saffron Expanse dryland village) and Bell Shoal (Stormhaven coastal town). Their populations, stocks, deposits and initial buildings differ. Existing placement, staffing, production and service rules apply to all starts.

Choose a starting place on the title screen, or inspect a supported settlement in World map → continent → kingdom. A dossier's start button previews a title choice; during play it explicitly confirms replacement of the current city. Save your current city first. The City Life banner opens your actual governor's kingdom; inspecting another location does not change your identity.

Six continent maps have deterministic geography, coastlines, islands, mountains, rivers and forests. Scroll the continent map to explore its illustrated settlements; click a miniature to inspect its kingdom and settlement. Keyboard focus and native scrolling are supported. Village, town, city and castle miniatures share original isometric artwork. The legacy detailed Marches terrain/resource map remains accessible. The 16 kingdoms and all 128 settlements retain their stable identities.

New origins have distinct cached ground palettes. Collision, water, fisheries, roads and the local world's physical geometry are unchanged. These are themed starts in the existing local world, not three newly generated physical maps.

Menu → Sound → Music style offers an optional **City theme · bowed strings**, based on the separately tested original preview (`0828199f8b4813ee1cddf21dd20362902a81c33d`). The approved city theme remains the default; original gentle ambience and existing browser preferences are preserved. No borrowed composition, paid audio or external asset service is used. City Life focus/hit-testing checks cover all six sections at 390×844, 1366×606 and 1440×900; no reported overlap was reproduced, so no speculative layout fix was made.

## Compatibility and limits

- Old save schemas 1, 2 and 3 retain their contracts. The three new origins use schema 4 and require v0.18+ to load; unknown origins are rejected rather than silently substituted.
- Five starts are playable. The other 123 locations are informational, with no background city simulation, diplomacy, multiplayer or travel economy.
- Cartographic terrain and paths are illustrative; they do not alter city collision or resource coordinates. Continental maps pan rather than shrink controls below a usable size.
- Political information remains read-only. No production deployment or merge is authorized by this milestone.
- Reviewed PR #23's proposed Sand Labs Art/World Bibles at `7cd756cda14cfd387d8dd6014ec331779d3dbb0d`. Existing canonical IDs and original warm, readable 2.5D direction take precedence over provisional documentation. PR #23 is separate and was not merged or duplicated here.

## Review evidence

See [verification](validation/m18-verification.md), [plan](superpowers/plans/2026-11-05-governors-living-maps.md) and screenshots in `docs/screenshots/m18-*`. The draft PR will record the exact candidate commit, CI results and downloadable verified-site artifact. Owner and Alex review precedes any merge or release.
