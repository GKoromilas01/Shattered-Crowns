# Brookstead's First Charter — approved v0.23 design

Owner approved 13 November 2026. Base: main 99aeb738f2ede95d46fb33350845bd9d29a0b3c2. Implementation/feature PR authorized; merge and deployment require separate approval.

## Experience and boundary
One optional new-game Brookstead chapter: original founding context, welcome a household into a newly constructed serviced home, demonstrate sustainable food for six consecutive five-second cycles, choose a shared granary or common garden, and persist a branch-specific Chronicle outcome. Other four starts and sandbox remain unchanged. No arbitrary slowdown, caravan, diplomacy, new currency, reward buff, paid service or mobile expansion.

The approved approach is an authored Brookstead chapter. A readiness-only narrative wrapper would auto-complete too much in the existing village. Five authored origins would exceed the small scope.

## Behavior
Opt in from the existing new-game home chooser, unchecked by default and enabled only for Brookstead. Explicit opt-in starts a fresh Brookstead city; never silently enroll restored saves. New home means a completed owned house created after chapter enrollment, occupied, with water and road access. No displaced residents. The food objective requires measured household shortfall zero, harvest plus logistics plus net bakery production minus exports at least demand, and stock at least four demand cycles. Six consecutive real economy cycles are required; snapshots cannot advance progress. Lost prerequisites reset the food streak before the decision.

One petition, two mutually exclusive investments: granary (existing 85 wood/35 stone) or garden (existing 35 wood/15 gold). Choosing grants nothing and starts no construction. The ordinary construction UI funds/builds the project. Only a completed owned matching project created after the choice qualifies. Granary completion proves its existing physical storage benefit; logistics remain conditional on normal staffing and connections. Garden must benefit an occupied home using the existing beauty radius. The serviced new home and sustainable food must still hold at resolution. Cancellation/refunds, rates, staffing and builder handoff remain unchanged. A completed charter is historical; later demolition must not erase its record or grant a second resolution.

## Persistence and UI
Chapter state and one immutable outcome record use schema 6. Schemas 1–5 remain accepted and unenrolled. Schema 6 retains empty/nonempty construction arrays and live build-order restoration. Validate enum values, bounds, stage/choice/outcome relationships and origin before mutating a city. Older clients cannot read schema 6; document this limitation. Reset/new city clears state; restore replaces it atomically. No external localStorage history keyed separately from the checkpoint.

Reuse Advisor for a compact chapter section and Chronicle History for the persistent outcome. No new global dashboard, automatic popup or forced camera/pause change. Existing completion cue and restrained brass/forest styling provide gradual presentation improvements. Native keyboard controls, focus, reduced motion and mute must remain safe; stale held input after restore cannot choose a petition.

## Acceptance and verification
Both investments complete through normal resource-funded construction; blocked, cancelled, demolished, paused, overview and restored cases remain honest. Save before decision, during construction and after completion; reload cannot duplicate outcomes. Verify legacy fixtures, corruption rejection and unchanged resources/costs. Exercise keyboard/focus and existing narrow layout without expanding mobile scope. Run focused browser tests, full regression, exact-source package verification and packaged smoke; final-head pinned-browser CI is a separate PR gate.

Opening reconnaissance used unmodified v0.22 UI with read-only telemetry/legal-plot checks, no grants or injected time. Short routes completed farm/house/well in about 151–162 game seconds, spending 160 wood/35 stone/55 gold; roadless homes stayed empty. Farm completion including travel: 18.6 seconds with three builders, 38.0 with one. These are short observations, not a thirty-minute balance claim; browser contention made wall time unsuitable for pacing.
