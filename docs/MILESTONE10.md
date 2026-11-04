# Version 0.10.0 — Settlement Starts

This milestone builds on PR #14's accepted v0.9.0 city/atlas. While that PR remains open, this is a dependent feature branch; it does not authorize either PR to merge or deploy.

## Choose an actual home

Choose your starting place → Aurelia → The Shattered Marches now offers two playable starts. Continent and kingdom remain fixed because no other region is simulated yet.

- **Marches home:** the existing keep, original local deposits, six units and 240 gold /100 wood /30 stone /90 food. The baseline start remains unchanged.
- **Brookstead village:** a different keep location and local resource layout, with a real farm, house, well and three road tiles. It starts with the same eight residents and six friendly units, plus200 gold /90 wood /30 stone /110 food. The starter neighborhood is a head start, not a claim of carefully proven long-term balance. Expand production/services normally.

The selected start's conditions appear beside the chooser. Inspecting the map never commits the choice; only **Begin as governor** creates the different home. Existing fast Enter city and Advisor entry retain the current city. Both starts use the existing2.5D city terrain, economy, construction and controls; this is not a new biome or a second world simulation.

The atlas marks only the actual home as **Your home**. If you govern Brookstead, the old home is **Marches Landing**, an informational neighbor. Inspecting another settlement never relocates your city or changes ownership. Restart keeps the current origin; starting a scenario through the existing scenario menu uses the default home.

## Music defaults

Explicit new-game entry and new scenario initialization enable music, including when an earlier game saved music as off. Master mute, volume (including zero), effects and music style are retained. Opening music begins after the first title click or navigation key, without a preview button, and continues into the city; the toolbar music control remains available. Turning music off during a game stays off through ordinary maps/menus and save restore. A scene restored before initial entry is also exempt from the new-game reset.

## Saves

Original-home campaign saves retain schema2 and classic saves retain schema1. Brookstead uses schema3 with a validated campaign.originId. v0.6/v0.7/v0.8/v0.9 saves restore their exact simulation state into the original home, paused as before. Village identity, city identity, inspection selection, resources and camera survive checkpoint/portable save restoration. Foreign origin IDs and enemy/raid injection into peaceful schema3 are rejected before mutation.

Brookstead saves require v0.10.0 or later; older builds reject that new schema rather than silently load the village as the wrong home. Existing home saves are not silently converted or stripped of campaign data.

## Boundaries

Peaceful/classic rules,44-unit road snapping and3×3 roads with costs/undo, existing economy, controls, title art and original music score/mix remain. No multiplayer, accounts, political questionnaire,3D conversion, paid services or production release. Further continents and villages are later milestones.

[Verification evidence](validation/m10-verification.md).

Owner-playtest correction: [opening-music activation and regression evidence](validation/m10-opening-music.md). Browser policy may require that first interaction before sound can play.
