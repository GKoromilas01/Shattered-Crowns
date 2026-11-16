# Milestone 28 — Beyond the Town Gates

Owner-approved design: [detailed scope](superpowers/specs/2026-11-15-v028-beyond-town-gates-design.md). This first playable prototype delivers Valewatch; Ashford and the second partner-art pass follow the owner’s prototype review. PR #44 remains a feature branch stacked on v0.27. Neither merge nor production deployment is approved.

Open **City Life → Diplomacy & Neighbour trade**, or the same action in a Market inspector. The first visible chapter offers a **10-gold Valewatch survey**, available in every peaceful start without a Market or previous supplier chapter. A survey takes 60 running game seconds. It shares one travelling envoy with the original Ironmere visit. Pause, atlas overview and hidden tabs suspend travel; no offline progress occurs. Classic Skirmish stays combat-focused.

The atlas shows the unsurveyed route, actual survey progress, discovered Valewatch and its earned pact state. Original artwork depicts Warden Mira. Read her two offers, defer without changing state, or refuse once for −1 trust. Negotiations reopen free. Refusing repeatedly never stacks the penalty.

| Manual cargo | Goods deducted at departure | Return | Trust |
| --- | --- | --- | --- |
| Introductory timber aid | 40 wood | 30 stone | +1 |
| Alternative manufactured introduction | 12 planks | 60 gold | +2 |
| Subsequent basic order | 8 planks | 38 gold | +1 |
| Pact, earned at 3 trust | 16 planks | 84 gold | +1 |
| Two pact batches, earned at 6 trust | 32 planks | 168 gold | +1 |

Introductory choices are mutually exclusive when dispatched. Every cargo takes 60 seconds outward and 60 returning, uses the shared supplier cargo slot, and credits its immutable reward once. The first introduction requires no Market. Its return independently unlocks the ordinary real loading yard: **60 wood, 80 gold, 30 stone, 8 planks**, paid through construction and completed by real builders. Subsequent and pact orders require that yard and an open, road-connected Market with at least half its jobs filled. Departed cargo returns even if the Market or yard is lost. Signing the earned pact has no additional fee.

At full staffing, the existing workshop still consumes four wood for one plank every five seconds. Thus the manufactured introduction represents 48 wood, a basic order 32 wood, and a pact 64 wood. The pact gives 84 gold versus 76 for two Valewatch basic orders, 80 for the original Ironmere timber charter, or 72 for two ordinary plank batches. Trust requires completed returns; opening a view or signing never grants goods. Existing Ironmere shipments, charters, basket food-reserve policy, reservations and automatic sales retain their terms. No physical caravans or automatic dispatch are introduced.

## Saves and limits

The first paid survey activates strict schema 11. Schemas 1–10 load without invented exploration or trust. Existing resources, supplier receipts, regional shipments, optional schema-10 diplomacy and history are preserved. New partner cargo has its own 512-return ledger and IDs, independent of the original 512 supplier returns; a pending return reserves capacity before spending. Histories are never truncated. Old/new supplier cargo cannot overlap. Ashford’s prototype state must remain exactly empty.

Keep an older export for downgrade: older clients cannot load schema 11. When relations are active, basket reservation capacity supports the planned 48-basket partner cargo; this prototype exposes no Ashford contracts. Otherwise the existing 32-basket cap remains.

## Delivery gate

See [prototype validation](validation/v028-prototype.md) for checks, environment, performance, saves, screenshots and package provenance. This is a complete first-partner prototype for owner review, not the full two-partner v0.28 release. After review, expand Ashford within the approved scope. Separate approval remains necessary for merge and deployment.
