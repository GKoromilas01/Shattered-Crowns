# v0.54 — A Quieter Town

Owner asked for less map congestion, reuse of existing graphics, quiet chapel bells every ten or fifteen minutes, and a school bell at 08:00. Owner confirmed game time, not the computer clock. This continuation includes v053's automatic frozen-frame opening.

## Changes and choices

Idle worksites retain their unfinished painted artwork but no permanent pulsing yellow ring, percentage or progress bar. Hovering one, selecting a worker assigned to it, or choosing it in Menu → Worksites shows the relevant details. No saved buildings, natural resources or worker assignments move.

The already-paid bridge graphic replaces the procedural planks at the existing crossing. Its orientation is adjusted to the crossing; terrain geometry, collisions and paths are unchanged. Missing/loading art retains the original fallback. No new graphics or tokens.

Town time uses the existing saved simulation elapsed time: starts at 06:00, one game minute per active second, a day lasts 24 active minutes. It is a local daily ambience clock; the existing independent seasonal council/test calendar is unchanged. Menu → Sound displays the time and its scale, without adding another permanent map toolbar item.

A completed, enabled friendly School rings once when town time passes 08:00. A completed friendly Chapel rings every fifteen active minutes. Sine partials with a soft 80ms attack and low gain create a quiet bell; this is an original synthesized effect, separate from the unchanged recorded music. Existing mute, effect toggle and master volume apply. Menu → Sound → Quiet town and school bells separately disables bells and remembers the preference in this browser.

No new bells are triggered during the opening, pause, overview, title or hidden tabs. A bell already ringing can retain its short natural decay when pausing/opening the title; mute and effect controls still apply. Restoration/replacement and time jumps establish a new baseline instead of replaying missed bells. There is no offline catch-up burst. The existing elapsed field preserves clock position without a new save schema.

## Advisor Tester

**Journal & objectives → Open guide → Guide: Tester** contains the following manual checks:

1. Place two foundations and move the pointer away. Artwork remains; permanent rings, progress bars and percentages disappear. Hover, select an assigned builder, or open that site in Worksites to inspect it.
2. Look at the existing river crossing. The painted bridge replaces the plain graphic. Worker movement and the crossing stay the same.
3. In Menu → Sound enable effects and town bells. A School rings at 08:00 (two active minutes after a fresh 06:00 start); a Chapel at fifteen active minutes. These require completed buildings. Music may be off.
4. Mute, disable effects or turn bells off. No bells. Pause or change tabs; no catch-up burst. Save/Return preserves town time.
5. New Game still plays the button-free opening with frozen-frame narration; Return bypasses it.

## Naval graphics audit and next implementation

Existing originals/runtime graphics: assets/v047/{originals,runtime}/{bridge,shipyard,ship}. The bridge is integrated here. Shipyard/ship artwork exists, but the playable build registry, unit registry and save validator do not support those entities yet. A visible decorative boat would not implement a shipyard or shipbuilding.

Next naval slice: explicit shoreline shipyard placement, selected-worker funded construction, a paid first boat, legal water navigation/docking, persistent orders and versioned saves. Then connect one real cargo route to the existing market economy. The owner's future film references in GRAPHICS_REFERENCE_BRIEF.md remain art direction, not authorization to purchase/regenerate assets. Do not silently introduce boats that can cross land or that vanish on load.

## Validation

Initial browser checks reproduced permanent worksite labels and the missing town-clock/bridge API before correction. Final results, source identity, package smoke and remote CI are reported in the candidate PR. No merge, deployment, purchases or new media generation.

Fresh read-only review found no Critical/Important issues. Minor deferred: an already-started bell may retain its short decay after pause/title transitions. Audio fixture injection anchor is retained; stale tester wording exclusion was removed because describing a completed School as a bell prerequisite is not a claim of automatic test completion. Manual flags and real Next-without-world-mutation assertions remain.
