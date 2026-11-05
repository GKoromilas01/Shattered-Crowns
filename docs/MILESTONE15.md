# v0.15.0 — City Progression & Staffing Priorities

City Life → Employment now offers **Prioritize / High priority** for every staffed workplace, plus **Restore default food-first staffing**. Alex and the owner approved priorities across job types. With no priorities set, the previous food-first allocation is unchanged. High-priority open sites receive available civilian staff first; ordinary sites then use the original farm/fishery/lumberyard/market/clinic/granary/bakery order. Ties retain that role order and building insertion order. Two residents remain reserved for essential duties.

The impact panel compares current assignments with the default at the same population and paused-site choices. It shows exactly which sites gained or lost staff. Food-producer staff losses raise a clear food warning; reduced clinic, market or granary staff raises a service warning. Base harvest is labelled separately from measured food balance, because logistics, baking and distribution can change the actual result. Reduced service staffing does not necessarily mean a service has stopped; current readiness remains in the existing Food details.

Every priority is reversible. Reset removes all priority flags without reopening paused sites. A paused site uses no staff and retains its choice until reopened. Map workers, unit orders, camera, roads, construction/Undo and global Pause are unaffected. Native keyboard and held-pointer activation survive live refresh; changed controls stay visible while deliberate manual scrolling is respected.

The owner's M14 playtest feedback is also addressed: Economy shows explicit policy checkmarks, a current-choice summary, visible reserve headings and consumption-duration labels before the longer explanation. A missing bakery or paused game explains why selecting a policy may produce no immediate exports. The Pause explanation updates promptly after Resume. Food priority is described as an intentional choice, not a broken bakery.

## Saves and preserved rules

Save schemas 1/2/3 continue loading all earlier cities unchanged. The optional boolean building.cityWorkPriority is accepted only on owned staffed workplaces. Absent means ordinary staffing; invalid, foreign and nonworkplace flags reject atomically. Reset deletes the flag. Priority-bearing saves require v0.15+; older builds safely reject an unknown field rather than silently discard the staffing decision. A genuine resource-funded v0.14 city is included in compatibility coverage.

No production/conversion rate, job-slot count, price, cost, immigration, happiness or prosperity formula changes. No new resource, currency, wage, tax, technology tree or automatic unit order. Approved audio, artwork and graphics remain unchanged.

A restored resource-funded M14 city demonstrates the new decision: adding two farms leaves the bakery unstaffed under default allocation. Prioritizing its market and bakery lowers base harvest from39→26 food per cycle and enables2food per cycle packed for exports. The warning identifies the farm losing staff. Reset restores ordinary staffing and stops new packing. Only time is accelerated; stocks and population are not injected. This is an observed trade-off, not a guaranteed growth or income forecast.

M14 was merged with owner approval at33fd3858a7923677e623d026fbc2de81b485db42; its post-merge CI passed249cases and5packaged smokes. This M15 PR is a new development draft for Alex's independent review. **No M15 merge or production deployment is authorized.** No paid services, dependencies or architecture changes.
