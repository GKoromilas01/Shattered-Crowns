# v0.14.0 — City Economy & Quality of Life

**City Life → Economy** connects the existing food chain, trade policies, resident growth and prosperity. Food producers, shared reserves, bakeries, trade baskets and market sales retain their current rules. There are no new resources, currencies, operating costs or production multipliers.

Choose **Food priority** to stop packing new trade baskets, or **Export surplus** to permit packing when the existing staffing, granary, market, storage and reserve checks pass. Food priority still allows ordinary grain-to-bread conversion and sales of existing baskets. Reserve buttons choose the existing0/1/2/4consumption-cycle options, always retaining the existing8-food minimum after packing2food. A consumption cycle is five simulation seconds. These are the same options saved by older versions and available in the legacy trade panel; both interfaces stay synchronized.

Each bakery now explains its current export prerequisites. The actual export loop and this diagnosis share one eligibility function, preserving the strict190-unit granary and220-unit market distances, half-staffing threshold,80-basket cap and all previous conversion/sale formulas. A paused granary retains its physical storage prerequisite; paused bakeries and markets lose production/service staffing. Current readiness is separate from measured last-cycle production: harvest, baking, household delivery and staffing can change eligibility during a cycle. Reserve checks occur before household delivery. The existing Food section retains the full measured ledger.

The same section shows resident capacity and stable arrival progress, links to Housing and Employment, and exposes the current prosperity score, target and five existing factors. Prosperity still approaches its target by at most2points per five-second cycle. No population, happiness, immigration, tax, service, staffing or prosperity formula changes.

Native policy buttons support keyboard and pointer input without changing camera, selection, orders, construction targeting or global Pause. Live refresh preserves focused controls and held presses. Invalid policy values, the title, world overview, ended games and a missing living player Keep reject policy changes atomically. Existing controls, graphics, approved music, roads/costs/Undo and peaceful/classic scenarios remain intact.

Save schemas1/2/3 stay unchanged. The existing breadExport/breadReserveCycles options are reused; no new save fields are added. A genuine v0.13Brookstead fixture with a paused farm, export-off and four-cycle reserve proves compatibility. Paused-workplace saves retain their establishedv0.12+requirement.

Screenshots use a resource-funded Brookstead playthrough: real gathering and construction, with only simulation time accelerated. The village grew8→12residents, prosperity0→24, stopped new export packing under Food priority, then sold4baskets after enabling exports. These observations demonstrate the existing management loop, not a guaranteed growth timeline or new balance.

Draft for Alex's independent review. Merge and deployment require separate owner approval. No paid dependencies, services or architecture changes.
