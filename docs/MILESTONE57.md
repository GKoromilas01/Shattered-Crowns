# v0.57 — Boat Builders

Shipyard now uses the shared Construction cost/style treatment and appears last. Fishery inspectors build fishing boats; Shipyard inspectors build warships and trade ships. Menu → Fleet retains all ordering actions and has an accessible × and Escape close; closing keeps construction running.

| Vessel | Producer | Wood / gold | Full-staff seconds |
|---|---|---|---|
| Fishing boat | Fishery | 60 / 25 | 20 |
| Warship | Shipyard | 80 / 40 | 30 |
| Trade ship | Shipyard | 100 / 60 | 40 |

Two resident jobs control production speed. One active order per producer, one fishing boat per Fishery, repeat ships per Shipyard, global twenty-vessel/order limit. A stationary fishing boat within 100 map units of its own berth raises its staffed Fishery base catch from 9 to 12. Sailing away removes this bonus. Warships and trade ships can sail; combat and cargo routes are future work.

Save schema14 migrates schema13 boats/orders to warships without changing their old costs, progress or position. Keep an old exported backup before testing if you want to downgrade.

Manual checks: Journal & objectives → Open guide → Guide: Tester. Current steps cover appearance/order, each producer and vessel, fishing output, ×/Escape and Save/Return. Existing painted assets are reused; no generation or spending. Candidate only; no merge or deployment.
