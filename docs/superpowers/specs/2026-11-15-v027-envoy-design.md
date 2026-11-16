# Proposed v0.27 — An Envoy to Ironmere

**Status: owner approved this scope for implementation on 15 November 2026. Not yet implemented or released.** Owner requested a recommendation for the next version and asked work to proceed. This document makes the proposed milestone concrete before changing gameplay. The owner subsequently explicitly approved the written v0.27 scope. Baseline: released v0.26, main `8dff174d1d9ca2a14bba51f9e125cc647d08b8e1`, successful production release `43712799913`.

## Player experience

After becoming a regional supplier, use part of the town's earned wealth to send an envoy to Ironmere. Meet its existing ruler, Lady Elowen, consider two understandable offers, and choose a commercial charter suited to the town's production. The visit and decision become part of the saved Chronicle. Existing shipments and standing orders retain their terms.

The purpose is a first small diplomatic chapter with a consequence, building directly on the working town. It follows the released trade progression and the owner’s recorded request for one meaningful neighbour interaction before a wider campaign. The pending, older master-roadmap PR #24 remains a proposal; it is not silently merged or treated as additional authorization.

## Approach

Recommended: one resource-funded, deterministic envoy chapter attached to the existing Market/atlas, with one exclusive charter choice and one additional manual order. A wider multi-neighbour diplomacy simulation or physical travel would introduce separate campaign architecture and considerably more balance work; those stay in the future backlog. A cosmetic conversation without an actual economic outcome would not meet this milestone's purpose.

These are Atlas's proposed implementation choices, not decisions already made by the owner. No new world canon beyond the existing Ironmere/Lady Elowen material is established by this proposal; draft conversation copy remains reviewable.

## Proposed scope

1. **Earn the visit.** After all three v0.26 supplier agreements, offer a single envoy visit from Market → Neighbour trade and the existing Ironmere atlas details. The initial proposal is 30 gold paid once, then 120 running game seconds. Display the fee and commitment before departure. Travel progresses only while the city runs, with the existing Pause, world-overview and hidden-tab rules. Do not remove existing atlas information or pretend that a physical travel map has been implemented.
2. **A small conversation with a real decision.** On arrival, present a concise exchange and three explicit choices: timber charter, provisions charter, or leave without signing. The player can defer the conversation. Leaving does not fabricate an agreement; no refund of the already completed paid visit is promised. The existing ruler/name/geography are retained.
3. **One exclusive new opportunity.** A signed charter unlocks one additional manually dispatched commission appropriate to the choice. Provisional terms: 16 planks → 80 gold for timber, or 24 actual reserved baskets → 108 gold for provisions. Use the existing 120-second cargo journey and single supplier-cargo slot; every dispatch deducts real goods once. Require the real completed loading yard. Existing timber/pantry standing orders keep their existing prices and one/two-batch limits. No automatic sales or automatic dispatch is added.
4. **Visible diplomatic outcome.** Ironmere details distinguish an unvisited partner, a completed visit and the chosen charter. Chronicle records the paid visit, the actual decision and completed charter cargo. City Life/Advisor gives concise state-based next steps through existing entries. No invented trust score or hidden random success roll.
5. **A modest visual addition.** Original envoy/letter/seal artwork and a clearly labelled atlas journey indicator, matching v0.26. It represents the abstract envoy visit; workers and caravans are not depicted performing simulated journeys they do not actually perform. Keep the improved deposits and resource-bar graphics.

## Provisional balance rationale

The 30-gold visit creates a real initial investment. Timber charter pays 5 gold/plank versus 4.5 on existing standing timber orders; provisions pays 4.5 gold/basket versus 4.25 on existing standing pantry orders and 4 on automatic sales. The proposed large batch earns 8 or 6 additional gold respectively compared with two ordinary standing batches, while tying the one supplier-cargo slot for the same two game minutes. The timber choice spends 64 wood at full workshop conversion; the food choice consumes real basket production under existing food/export policy. Compare labour, reserves, stock capacity and normal-clock progression before freezing quantities. Routine numerical balancing can be settled during implementation; changes to the milestone's structure require owner review.

## Interface and compatibility

Use the existing Market → Neighbour trade panel and Ironmere atlas details; keep at most the relevant next action prominent and explanations behind disclosures. Preserve keyboard focus, stale-input guards, readable terms and Pause. Avoid new permanent main-HUD panels.

Plan strict optional schema 10 for new envoy/charter state. Load schemas 1–9 without inventing diplomatic visits, choices, resources, rewards or history. Preserve existing workshops, basket reservations, pending construction, all original/new shipments and their terms. Document that older clients cannot load a save after it gains schema-10 state. Single-player save restoration continues to restore the whole city.

## Delivery and acceptance

- Review this scope before product implementation. Then record the concrete implementation plan and build a feature-branch playable candidate.
- Fund the complete visit and first commission through actual city production, gathering and paid construction; distinguish accelerated checks from normal-clock playtesting.
- Test all choices/defer paths, affordable/unaffordable payment, repeated/held activation, Pause/overview/hidden-tab handling, loading-yard loss, cargo-slot contention and prevention of duplicate deductions, choices and rewards.
- Save/load before departure, during travel, during the conversation, after declining/signing, during charter cargo and after its return. Recheck genuine schema-1–9 fixtures and existing shipment terms/history.
- Provide screenshots of the actual interfaces/art, a fresh exact-source playable artifact, clean full final-head CI, asset-integrity checks and packaged smoke. Inspect the graphical addition at ordinary play scale.
- Merge and production deployment remain separate owner approvals. Current v0.26 production stays unchanged during this work.

## Boundaries

This milestone does not implement warfare, seamless travel, physical caravans, alliances between multiple simulated kingdoms, multiplayer, payments or an expanded farming system. Those remain later independent slices. No paid service or hosting change is introduced.
