# Milestone 23 — Brookstead's First Charter

Approved 13 November 2026. Feature candidate based on released main 99aeb73; no merge/deployment authorization is implied.

## One optional opening chapter
Choose Brookstead in the existing title home chooser and check **Play First Charter**. This explicitly starts a new Brookstead city. Leave it unchecked for sandbox; other four starts remain available. Objectives appear inside Advisor, after ordinary economic guidance. Founding context is optional reading, not new world-wide lore or a mandatory movie.

Welcome a household into a completed home built after enrollment, with water and road access and nobody displaced. Demonstrate six consecutive five-second economy cycles with no household shortage, measured production covering demand, and four demand cycles in reserve. Snapshot/UI refresh and Pause never manufacture progress. Losing prerequisites before the petition resets that streak.

The village then asks for one shared investment:
- **Granary:** normal 85 wood and 35 stone. Its existing 160-place physical storage benefit resolves the investment; harvest logistics still require normal staff and connections.
- **Garden:** normal 35 wood and 15 gold. The new garden must be within the existing 175-map-unit beauty radius of an occupied home.

Choosing grants no resources, bonuses or people and starts no construction. Use the ordinary Construction controls and real builders. Only a matching completed owned project created after the decision qualifies. Keep the new home serviced and food sustainable at resolution. A cancelled foundation does not finish the chapter; normal proportional refunds and builder handoff remain. The final record is history, not a live claim that the town remains healthy afterward.

## Saved Chronicle and compatibility
The branch-specific outcome appears in **Chronicle → History**, including the resolution's game time, population and food. It is checkpoint data, not a second localStorage history. Loading schemas 1–5 replaces chapter state with none; it never invents earlier history. Restart/new city clears the current chapter. Finished history survives later demolition and repeated reload without duplicate outcomes.

Active/completed chapters use strict **schema 6**, retaining empty or unfinished construction arrays and build-order references. Earlier schemas retain their previous capture/restore rules. Invalid chapter versions, stages, choices, bounds and outcome relationships reject before changing the current city. Older game releases do not understand schema 6; keep an older exported checkpoint if planning a downgrade. No silent conversion back to an older format is promised.

## Presentation and limits
The chapter uses the existing dark/forest/brass hierarchy, a small progress indicator and native buttons. Founding context is a disclosure. It adds no permanent global HUD panel, automatic popup, forced camera motion or new audio channel; existing construction sounds still respect effects/mute. Restore/new-city invalidates stale held choice input. Existing narrow layouts remain protected without expanding mobile scope.

No changes to construction/gathering speeds, costs, staffing, population growth, roads or existing save data. No caravan, diplomacy, neighbour simulation, paid service, new currency or reward buff. No claim that the chapter lasts thirty minutes: pacing needs first-time human playtests, not an arbitrary slowdown.

See the approved [design](superpowers/specs/2026-11-13-first-charter-design.md), [implementation plan](superpowers/plans/2026-11-13-first-charter.md), and [verification](validation/v023-first-charter.md).
