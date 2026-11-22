# Boat builders — v0.57

Owner requests a Shipyard button matching other Construction items and last in the list, an obvious Fleet X close, boat orders in building inspectors while retaining Fleet, fishing boats from fisheries, and warships plus trade ships from shipyards. Routine choices are delegated; no additional approval loop. Existing paid Shipyard icon is sufficient, no Leonardo generation.

Shared Construction cost table must own Shipyard120wood/90gold/40stone styling; remove ad-hoc price injection. Sticky header X and explicit Escape close must preserve paid orders and remain available after order/list refresh. Controlled Chrome reproduced the missing X; the old text Close worked there, so do not claim its reported failure was independently reproduced.

Typed production: fishing boat from coastal Fishery60wood/25gold/20full-staff seconds; warship from Shipyard80wood/40gold/30seconds; trade ship from Shipyard100wood/60gold/40seconds. Each factory has one active order; one fishing boat per Fishery, repeat shipyard production up to existing global20boats/orders. Mismatched producer/type rejected before spending. Cancellations/lost producers refund the correct typed cost once. New ships spawn in free coastal positions.

Fishing boat within100map units horizontally of its home berth, stationary, raises its Fishery base catch9→12per5-second cycle. Existing staffing scales output, actual harvest/ledger, HUD forecasts and Town readiness consistently. Moving/remote boats give no bonus, and multiple boats cannot stack a bonus. Do not add income to trade ships or invent combat; those hulls can build/sail and their route/combat roles remain later.

Naval payload version2/schema14 stores kind. Version1/schema13 queues/boats become warship hulls with exactly the old cost,time,position,progress and target. Keep legacy base validation strict; typed validation checks factory-kind mapping, unknown kinds including prototype strings, caps/IDs/geometry/targets and atomic failure. Schemas1–12 unchanged. Preserve Fishery's original menu facts through composition.

Existing art with different vessel scale is reused. New instructions must be in Advisor Tester. Update PR77/new ZIP; PR76/v055 release candidate stays separate. No merge/main push/deploy or paid media work.
