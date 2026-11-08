# City construction and opening pacing

Owner authorized proceeding with assigned villager construction and asked Atlas to determine the appropriate gathering rate from evidence. Existing future-direction note remains the broader vision. Implement one focused slice using the existing single-file game and native controls; no repeated design approval is needed under that authorization.

## Evidence and decision

A controlled three-worker assignment (one each to wood, stone, gold) using real gathering/tick code yielded 8,756.75 resources at home and 8,688.75 at Brookstead after 180 simulated seconds, with travel, depletion and retargeting. No spending or construction was simulated. Datehaven's sparse wood yielded 5,756.75. Existing rate: 17 per worker per second at a deposit. Civic costs are far below this income; placement is instant. These are simulation measurements, not a claim of a human completing the town in three minutes.

Use 2.5 per worker per second in the city campaign as a first playable balance, not a proven final 30-minute economy. Leave food/civilian production, taxes, prices, recruitment and skirmish gathering unchanged. At steady gathering a 75-wood farm costs 30 worker-seconds instead of 4.4. More workers can still accelerate expansion.

## Approaches

Slowing gathering alone preserves instant towns. Timed construction with no workers removes the requested labour choice. Chosen implementation: paid construction sites worked by map villagers, separate from completed buildings. This avoids unfinished farms feeding residents or unfinished roads supplying services and keeps the existing civilian staffing model intact.

## Behaviour

City civic buildings except roads become sites when placed. Existing starting buildings, loaded legacy buildings and skirmish buildings remain completed; roads retain their existing batch placement in this slice. Road construction labour and assigned repairs are later work, explicitly outside this slice.

Spend materials once at placement, occupy the normal footprint, auto-assign currently selected living friendly workers if any; otherwise wait visibly for assignment. Right-click a site with selected workers or use the Worksites panel to assign them. Reassignment replaces their prior orders and stops gathering. Up to four workers work at once, at multipliers 1, 1.6, 2.1, 2.5; travel time does not count. Further assigned workers wait. Basic buildings need 36 work-seconds, amenities 24, advanced production/services 60. Show progress, active/assigned builders, waiting reason and controls to assign, release, locate and cancel. Cancellation refunds only the uncompleted fraction; Undo explicitly refunds the original placement as in the existing game. Completion creates the real building and releases workers; neither capture nor inspecting changes progress. Pause, overview and the title screen freeze simulation as before.

Keep projects separate from completed buildings. Sites reserve IDs and footprints; workers refer to sites. Save schema 5 only when unfinished projects require it, preserving older schema captures when none exist. Schema 5 supports all city origins and stores exact project progress, costs and worker references. Restore paused; reject malformed projects, foreign/soldier builder orders and invalid references atomically. Restart clears projects. Existing schema 1–4 saves remain readable.

## Validation and limits

Characterize before/after income with the same script. Test paid placement, no-builder waiting, actual movement then progress, faster multi-worker completion, no early service, interruption, cancellation/undo, pause, schema roundtrip/rejection, restarting, keyboard panel controls and phone/desktop layout. Run affected existing suites plus the full repository suite once for this simulation change; no CI monitoring. Keep this a draft branch pending owner merge/publication decisions. No claim that the complete 30-minute experience is finished.
