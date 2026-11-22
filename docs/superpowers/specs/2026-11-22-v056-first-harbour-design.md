# First Harbour — v0.56

Owner authorized a functional coastal shipyard and first buildable boat, with GitHub review and test ZIP. Prior requests delegate routine implementation choices; proceed without another approval loop. Release approval separately applies to delivered v055 and remains blocked by pending PR/main verification and owner/Claude merge.

Shipyard: existing painted art, 120 wood/90 gold/40 stone, radius22, y755 on south coast, legal spacing and selected-worker foundation construction60 seconds. Construction list contains Shipyard; no inland shipyards. No resource debit on blocked or unfunded placement. Existing worksite cancel/undo applies.

Boat: existing ship art,80wood/40gold,30 full-staff active seconds,2 resident jobs. One boat/order per shipyard, global limit20. Paid order debits once; cancellation returns the original boat cost. Destroyed/undone yard cancels/refunds its unfinished boat order on next active tick; launched boats survive and remain commandable in Menu → Fleet. No automatic hiring of map workers.

Boats have their own authoritative state rather than being counted as soldiers/workers. Speed45 map units/second; navigation is restricted to the convex southern sea band x35..W-35,y820..H-25. Commands use Fleet/shipyard controls: sail east/west, stop, return to a surviving home berth. No arbitrary pathfinding, combat, sea trade income or river navigation yet. Native map pan/selection retained. Fleet window is manual only, never a new permanent top toolbar item.

Schema13 only when naval state or shipyard entities exist. Persist nullable Town charter plus naval version,nextBoatId,paid orders,boats,targets. Strict atomic incoming validation; schemas1–12 load unchanged and gain no naval progress. Town schema12 rules remain strict. Never let a new subtype bypass old-schema restrictions. Save/return preserves production/movement; restore/new game invalidates held UI activations and closes Fleet. No new assets or credits.

Implementation reuses native construction/employment/menus, adds one harbour engine source and one presentation source. Compare with an alternative native boat unit: rejected because infantry selection/combat/army-count/save assumptions would make it a larger and riskier slice. Reuse south-coast convex water geometry instead of pretending to support rivers/general water paths.
